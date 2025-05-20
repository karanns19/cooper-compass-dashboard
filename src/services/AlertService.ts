import { BaggageItem } from '../data/BaggageData';
import { AlertItem, AlertType } from '../data/AlertsData';

export interface Alert {
    id: string;
    type: AlertType;
    severity: 'high' | 'medium' | 'low';
    message: string;
    timestamp: string;
    location: string;
    baggageTag?: string;
    flightNumber?: string;
    passengerName?: string;
    status: 'active' | 'resolved';
    details?: string;
    recommendedAction?: string;
}

export class AlertService {
    private static instance: AlertService;
    private alerts: AlertItem[] = [];
    private readonly SCAN_TIMEOUT_MINUTES = 5;
    private readonly WEIGHT_LIMIT_KG = 23;
    private alertListeners: ((alerts: AlertItem[]) => void)[] = [];
    private interval: number | null = null;

    private constructor() {}

    public static getInstance(): AlertService {
        if (!AlertService.instance) {
            AlertService.instance = new AlertService();
        }
        return AlertService.instance;
    }

    public checkBaggageStatus(baggage: BaggageItem): AlertItem[] {
        const newAlerts: AlertItem[] = [];

        // Check for tagless bag
        if (!baggage.baggageTag || baggage.baggageTag === 'UNKNOWN') {
            newAlerts.push(this.createTaglessBagAlert(baggage));
        }

        // Check for stuck bag
        const stuckAlert = this.checkForStuckBag(baggage);
        if (stuckAlert) {
            newAlerts.push(stuckAlert);
        }

        // Check for mishandling
        const mishandlingAlert = this.checkForMishandling(baggage);
        if (mishandlingAlert) {
            newAlerts.push(mishandlingAlert);
        }

        // Check for overweight
        if (baggage.weight > this.WEIGHT_LIMIT_KG) {
            newAlerts.push(this.createOverweightAlert(baggage));
        }

        // Check for security hold
        if (baggage.status === 'Security Hold') {
            newAlerts.push(this.createSecurityHoldAlert(baggage));
        }

        // Add new alerts to the list
        this.alerts.push(...newAlerts);
        return newAlerts;
    }

    public checkBoardingReconciliation(
        baggage: BaggageItem,
        isPassengerBoarded: boolean
    ): AlertItem[] {
        const newAlerts: AlertItem[] = [];

        // Check if bag is loaded but passenger hasn't boarded
        const isBagLoaded = baggage.trackingTimeline.some(
            event => event.title.includes('loaded') && event.status === 'Completed'
        );

        if (isBagLoaded && !isPassengerBoarded) {
            newAlerts.push(this.createNoShowAlert(baggage));
        }

        // Check if passenger has boarded but bag isn't loaded
        if (isPassengerBoarded && !isBagLoaded) {
            newAlerts.push(this.createMissingBagAlert(baggage));
        }

        this.alerts.push(...newAlerts);
        return newAlerts;
    }

    public checkSystemHealth(
        location: string,
        expectedScans: number,
        actualScans: number
    ): AlertItem[] {
        const newAlerts: AlertItem[] = [];

        // If scan count is significantly lower than expected
        if (actualScans < expectedScans * 0.5) {
            newAlerts.push(this.createSystemFailureAlert(location));
        }

        this.alerts.push(...newAlerts);
        return newAlerts;
    }

    private checkForStuckBag(baggage: BaggageItem): AlertItem | null {
        const timeline = baggage.trackingTimeline;
        if (timeline.length < 2) return null;

        const lastEvent = timeline[timeline.length - 1];
        const lastEventTime = new Date(lastEvent.time);
        const currentTime = new Date();
        const minutesSinceLastEvent = (currentTime.getTime() - lastEventTime.getTime()) / (1000 * 60);

        if (minutesSinceLastEvent > this.SCAN_TIMEOUT_MINUTES) {
            return {
                id: `stuck-${baggage.baggageTag}-${Date.now()}`,
                title: 'Stuck Bag Alert',
                description: `Bag ${baggage.baggageTag} appears to be stuck at ${lastEvent.location}`,
                type: 'stuck',
                priority: 'High',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                details: `No movement detected for ${Math.floor(minutesSinceLastEvent)} minutes`,
                location: lastEvent.location,
                status: 'active',
                baggageTag: baggage.baggageTag,
                flightNumber: baggage.flightNumber,
                affectedFlights: [baggage.flightNumber || 'Unknown'],
            };
        }

        return null;
    }

    private checkForMishandling(baggage: BaggageItem): AlertItem | null {
        const lastEvent = baggage.trackingTimeline[baggage.trackingTimeline.length - 1];
        
        // Check if bag is on wrong route
        if (lastEvent.location.includes(baggage.destinationAirport) === false) {
            return {
                id: `mishandling-${baggage.baggageTag}-${Date.now()}`,
                title: 'Mishandled Bag Alert',
                description: `Bag ${baggage.baggageTag} may be on incorrect route`,
                type: 'mishandling',
                priority: 'High',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                details: `Bag detected at ${lastEvent.location} but should be heading to ${baggage.destinationAirport}`,
                location: lastEvent.location,
                status: 'active',
                baggageTag: baggage.baggageTag,
                flightNumber: baggage.flightNumber,
                affectedFlights: [baggage.flightNumber || 'Unknown'],
            };
        }

        return null;
    }

    private createTaglessBagAlert(baggage: BaggageItem): AlertItem {
        return {
            id: `tagless-${Date.now()}`,
            title: 'Tagless Bag Alert',
            description: 'Unidentified bag detected in system',
            type: 'tagless',
            priority: 'High',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            details: 'Bag entered system without valid tag',
            location: baggage.lastLocation,
            status: 'active',
            baggageTag: baggage.baggageTag,
            flightNumber: baggage.flightNumber || 'N/A',
            affectedFlights: [baggage.flightNumber || 'N/A'],
        };
    }

    private createNoShowAlert(baggage: BaggageItem): AlertItem {
        return {
            id: `noshow-${baggage.baggageTag}-${Date.now()}`,
            title: 'No-Show Passenger Alert',
            description: `Bag ${baggage.baggageTag} loaded but passenger not boarded`,
            type: 'no-show',
            priority: 'High',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            details: 'BRS reconciliation failure - bag loaded without passenger',
            location: baggage.lastLocation,
            status: 'active',
            baggageTag: baggage.baggageTag,
            flightNumber: baggage.flightNumber || 'N/A',
            affectedFlights: [baggage.flightNumber || 'N/A'],
        };
    }

    private createMissingBagAlert(baggage: BaggageItem): AlertItem {
        return {
            id: `missing-${baggage.baggageTag}-${Date.now()}`,
            title: 'Missing Bag Alert',
            description: `Passenger boarded but bag ${baggage.baggageTag} not loaded`,
            type: 'missing',
            priority: 'High',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            details: 'Passenger boarded but bag not found on aircraft',
            location: baggage.lastLocation,
            status: 'active',
            baggageTag: baggage.baggageTag,
            flightNumber: baggage.flightNumber || 'N/A',
            affectedFlights: [baggage.flightNumber || 'N/A'],
        };
    }

    private createOverweightAlert(baggage: BaggageItem): AlertItem {
        return {
            id: `overweight-${baggage.baggageTag}-${Date.now()}`,
            title: 'Overweight Baggage Alert',
            description: `Bag ${baggage.baggageTag} exceeds weight limit`,
            type: 'weight',
            priority: 'Medium',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            details: `Bag weight: ${baggage.weight}kg (Limit: ${this.WEIGHT_LIMIT_KG}kg)`,
            location: baggage.lastLocation,
            status: 'active',
            baggageTag: baggage.baggageTag,
            flightNumber: baggage.flightNumber || 'N/A',
            affectedFlights: [baggage.flightNumber || 'N/A'],
        };
    }

    private createSecurityHoldAlert(baggage: BaggageItem): AlertItem {
        return {
            id: `security-${baggage.baggageTag}-${Date.now()}`,
            title: 'Security Hold Alert',
            description: `Bag ${baggage.baggageTag} under security screening`,
            type: 'security',
            priority: 'High',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            details: 'Bag selected for additional security screening',
            location: baggage.lastLocation,
            status: 'active',
            baggageTag: baggage.baggageTag,
            flightNumber: baggage.flightNumber || 'N/A',
            affectedFlights: [baggage.flightNumber || 'N/A'],
        };
    }

    private createSystemFailureAlert(location: string): AlertItem {
        return {
            id: `system-${Date.now()}`,
            title: 'System Anomaly Alert',
            description: 'Baggage handling system slowdown detected',
            type: 'system',
            priority: 'High',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            details: 'Significant reduction in scan activity detected',
            location: location,
            status: 'active',
            baggageTag: 'N/A',
            flightNumber: 'N/A',
            affectedFlights: ['N/A'],
        };
    }

    public getActiveAlerts(): AlertItem[] {
        return this.alerts.filter(alert => alert.status === 'active');
    }

    public getAlertById(alertId: string): AlertItem | undefined {
        return this.alerts.find(alert => alert.id === alertId);
    }

    public resolveAlert(alertId: string): void {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            alert.status = 'resolved';
        }
    }

    public startBackgroundAlerts() {
        if (this.interval) return;
        
        this.interval = window.setInterval(() => {
            const newAlert = this.generateRandomAlert();
            this.alerts.unshift(newAlert);
            this.notifyListeners([newAlert]);
        }, 5000); // 5 seconds
    }

    public stopBackgroundAlerts() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    public subscribe(listener: (alerts: AlertItem[]) => void) {
        this.alertListeners.push(listener);
        return () => {
            this.alertListeners = this.alertListeners.filter(l => l !== listener);
        };
    }

    private notifyListeners(alerts: AlertItem[]) {
        this.alertListeners.forEach(listener => listener(alerts));
    }

    private generateRandomAlert(): AlertItem {
        const alertTypes: AlertType[] = ['transfer', 'security', 'missing', 'unclaimed', 'damaged', 'system', 'weight', 'no-show', 'tagless', 'stuck', 'mishandling'];
        const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const randomFlight = `6E-${Math.floor(Math.random() * 900) + 100}`; // 6E-100 to 6E-999
        const randomBagTag = `DEL${Math.floor(Math.random() * 900000) + 100000}`; // DEL100000 to DEL999999
        const randomLocation = ['DEL T3', 'BLR T1', 'BOM T2', 'MAA Domestic'][Math.floor(Math.random() * 4)];
        
        let title: string = '';
        let description: string = '';
        let details: string = '';
        let priority: 'High' | 'Medium' | 'Low' = 'Medium';

        switch (randomType) {
            case 'transfer':
                title = 'Transfer Delay Alert';
                description = `Baggage transfer delayed for flight ${randomFlight}`;
                details = `Bag ${randomBagTag} delayed at ${randomLocation} for transfer to flight ${randomFlight}.`;
                priority = 'High';
                break;
            case 'security':
                title = 'Security Hold Alert';
                description = `Bag ${randomBagTag} under security hold`;
                details = `Bag ${randomBagTag} at ${randomLocation} requires additional security screening.`;
                priority = 'High';
                break;
            case 'missing':
                title = 'Missing Bag Alert';
                description = `Bag ${randomBagTag} not located for flight ${randomFlight}`;
                details = `Bag ${randomBagTag} for flight ${randomFlight} cannot be found in the system at expected location ${randomLocation}.`;
                priority = 'High';
                break;
            case 'unclaimed':
                title = 'Unclaimed Baggage Alert';
                description = `Unclaimed bag detected at ${randomLocation}`;
                details = `Bag ${randomBagTag} has been at arrival carousel for extended period without being claimed.`;
                priority = 'Medium';
                break;
            case 'damaged':
                title = 'Damaged Baggage Alert';
                description = `Damaged bag detected at ${randomLocation}`;
                details = `Bag ${randomBagTag} was found damaged during handling at ${randomLocation}.`;
                priority = 'Medium';
                break;
            case 'system':
                title = 'System Anomaly Alert';
                description = `System issue detected at ${randomLocation}`;
                details = `Reduced scan rates or system errors reported at ${randomLocation}.`;
                priority = 'High';
                break;
            case 'weight':
                title = 'Overweight Baggage Alert';
                description = `Overweight bag detected: ${randomBagTag}`;
                details = `Bag ${randomBagTag} at ${randomLocation} exceeds the allowed weight limit.`;
                priority = 'Medium';
                break;
            case 'no-show':
                title = 'No-Show Passenger Alert';
                description = `Bag ${randomBagTag} loaded, passenger did not board flight ${randomFlight}`;
                details = `BRS mismatch: Bag ${randomBagTag} loaded on flight ${randomFlight} but passenger is marked as no-show.`;
                priority = 'High';
                break;
            case 'tagless':
                title = 'Tagless Bag Alert';
                description = `Unidentified bag found at ${randomLocation}`;
                details = `Bag without a valid tag found in handling system at ${randomLocation}.`;
                priority = 'High';
                break;
            case 'stuck':
                title = 'Stuck Bag Alert';
                description = `Bag ${randomBagTag} immobile at ${randomLocation}`;
                details = `Bag ${randomBagTag} has not been scanned for an extended period at ${randomLocation}.`;
                priority = 'High';
                break;
            case 'mishandling':
                title = 'Mishandled Bag Alert';
                description = `Bag ${randomBagTag} potentially mishandled`;
                details = `Bag ${randomBagTag} is at ${randomLocation} but should be on route to its destination.`;
                priority = 'High';
                break;
            default:
                title = 'Unknown Alert';
                description = 'An alert of an unknown type was generated.';
                details = '';
                priority = 'Low';
        }

        return {
            id: Date.now().toString(),
            title: title,
            description: description,
            type: randomType,
            priority: priority,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format timestamp nicely
            details: details,
            location: randomLocation,
            status: 'active', // Assuming newly generated alerts are active
            baggageTag: randomBagTag,
            flightNumber: randomFlight,
            affectedFlights: [randomFlight], // Assuming alert affects this flight
        };
    }
} 