import { BaggageItem, TrackingEvent } from '../data/BaggageData';
import { AlertService } from './AlertService';

interface Passenger {
    name: string;
    pnrNumber: string;
    flightNumber: string;
    baggageCount: number;
    isBoarded: boolean;
}

interface Flight {
    number: string;
    departure: string;
    arrival: string;
    from: string;
    to: string;
    passengers: Passenger[];
}

export class BaggageSimulationService {
    private static instance: BaggageSimulationService;
    private flights: Flight[] = [];
    private baggageItems: BaggageItem[] = [];

    private constructor() {
        this.initializeFlights();
    }

    public static getInstance(): BaggageSimulationService {
        if (!BaggageSimulationService.instance) {
            BaggageSimulationService.instance = new BaggageSimulationService();
        }
        return BaggageSimulationService.instance;
    }

    private initializeFlights() {
        // Initialize flights with real-world data
        this.flights = [
            {
                number: "6E-123",
                departure: "10:00",
                arrival: "12:30",
                from: "BLR",
                to: "DEL",
                passengers: [
                    {
                        name: "Deepthi",
                        pnrNumber: "6E123001",
                        flightNumber: "6E-123",
                        baggageCount: 2,
                        isBoarded: false
                    },
                    {
                        name: "Karan",
                        pnrNumber: "6E123002",
                        flightNumber: "6E-123",
                        baggageCount: 1,
                        isBoarded: false
                    }
                ]
            },
            {
                number: "6E-456",
                departure: "12:30",
                arrival: "14:30",
                from: "DEL",
                to: "CCU",
                passengers: [
                    {
                        name: "Aathi",
                        pnrNumber: "6E456001",
                        flightNumber: "6E-456",
                        baggageCount: 2,
                        isBoarded: false
                    }
                ]
            }
        ];
    }

    public generateCheckInEvent(passenger: Passenger, checkInTime: string): TrackingEvent[] {
        const events: TrackingEvent[] = [];
        const checkInTimeDate = new Date(checkInTime);
        
        // Check-in event
        events.push({
            title: `Checked in at ${this.getAirportName(passenger.flightNumber.split('-')[0])}`,
            status: "Completed",
            time: checkInTimeDate.toLocaleTimeString(),
            location: "Check-in Counter"
        });

        // Bag drop scan (1-2 minutes after check-in)
        const bagDropTime = new Date(checkInTimeDate.getTime() + (Math.random() * 60000 + 60000));
        events.push({
            title: "Baggage Drop Scan",
            status: "Completed",
            time: bagDropTime.toLocaleTimeString(),
            location: "Self Drop Kiosk"
        });

        // Security screening (5 minutes after check-in)
        const securityTime = new Date(checkInTimeDate.getTime() + 5 * 60000);
        events.push({
            title: "Security Screening",
            status: "In Progress",
            time: securityTime.toLocaleTimeString(),
            location: "Security Checkpoint",
            details: "Standard security screening in progress"
        });

        return events;
    }

    public generateConveyorEvents(baggageTag: string, checkInTime: string): TrackingEvent[] {
        const events: TrackingEvent[] = [];
        const checkInTimeDate = new Date(checkInTime);

        // Conveyor scan (5 minutes after check-in)
        const conveyorTime = new Date(checkInTimeDate.getTime() + 5 * 60000);
        events.push({
            title: `Tag ${baggageTag} scanned at security scanner`,
            status: "Completed",
            time: conveyorTime.toLocaleTimeString(),
            location: "Security Scanner"
        });

        // Sorter entry (8 minutes after check-in)
        const sorterTime = new Date(checkInTimeDate.getTime() + 8 * 60000);
        events.push({
            title: `Tag ${baggageTag} entering sorter`,
            status: "In Progress",
            time: sorterTime.toLocaleTimeString(),
            location: "Baggage Sorter"
        });

        return events;
    }

    public generateLoadingEvents(baggageTag: string, flightNumber: string, departureTime: string): TrackingEvent[] {
        const events: TrackingEvent[] = [];
        const departureTimeDate = new Date(departureTime);
        const loadingTime = new Date(departureTimeDate.getTime() - 20 * 60000); // 20 minutes before departure

        events.push({
            title: `Tag ${baggageTag} scanned at Gate`,
            status: "Completed",
            time: loadingTime.toLocaleTimeString(),
            location: `Gate ${this.getRandomGate()}`,
            details: `Loading for flight ${flightNumber}`
        });

        return events;
    }

    public generateTransferEvents(baggageTag: string, fromFlight: string, toFlight: string): TrackingEvent[] {
        const events: TrackingEvent[] = [];
        const transferPoint = this.getRandomTransferPoint();

        events.push({
            title: `Tag ${baggageTag} transferred to ${toFlight}`,
            status: "In Progress",
            time: new Date().toLocaleTimeString(),
            location: transferPoint,
            details: `Transfer from ${fromFlight} to ${toFlight}`
        });

        return events;
    }

    public generateArrivalEvents(baggageTag: string, arrivalTime: string): TrackingEvent[] {
        const events: TrackingEvent[] = [];
        const arrivalTimeDate = new Date(arrivalTime);
        const carouselNumber = this.getRandomCarousel();

        // Arrival scan
        events.push({
            title: `Tag ${baggageTag} scanned at Arrival Zone`,
            status: "Completed",
            time: arrivalTimeDate.toLocaleTimeString(),
            location: "Arrival Zone"
        });

        // Carousel assignment
        const carouselTime = new Date(arrivalTimeDate.getTime() + 10 * 60000); // 10 minutes after arrival
        events.push({
            title: `Tag ${baggageTag} on carousel ${carouselNumber}`,
            status: "Completed",
            time: carouselTime.toLocaleTimeString(),
            location: `Carousel ${carouselNumber}`
        });

        return events;
    }

    private getAirportName(code: string): string {
        const airports: { [key: string]: string } = {
            'BLR': 'Kempegowda International Airport',
            'DEL': 'Indira Gandhi International Airport',
            'BOM': 'Chhatrapati Shivaji Maharaj International Airport',
            'MAA': 'Chennai International Airport',
            'CCU': 'Netaji Subhas Chandra Bose International Airport'
        };
        return airports[code] || code;
    }

    private getRandomGate(): string {
        return `G${Math.floor(Math.random() * 10) + 1}`;
    }

    private getRandomTransferPoint(): string {
        return `TP${Math.floor(Math.random() * 4) + 1}`;
    }

    private getRandomCarousel(): number {
        return Math.floor(Math.random() * 8) + 1;
    }

    public simulateBaggageFlow(passenger: Passenger, checkInTime: string): BaggageItem {
        const baggageTag = this.generateBaggageTag(passenger.flightNumber);
        const flight = this.flights.find(f => f.number === passenger.flightNumber);
        
        if (!flight) {
            throw new Error(`Flight ${passenger.flightNumber} not found`);
        }

        const trackingTimeline = [
            ...this.generateCheckInEvent(passenger, checkInTime),
            ...this.generateConveyorEvents(baggageTag, checkInTime),
            ...this.generateLoadingEvents(baggageTag, flight.number, flight.departure)
        ];

        const baggageItem: BaggageItem = {
            id: Math.floor(Math.random() * 1000000),
            passengerName: passenger.name,
            pnrNumber: passenger.pnrNumber,
            flightNumber: passenger.flightNumber,
            baggageTag: baggageTag,
            status: "In Transit",
            lastLocation: "Security Checkpoint",
            weight: Math.floor(Math.random() * 20) + 5, // Random weight between 5-25 kg
            trackingTimeline: trackingTimeline,
            currentAirport: flight.from,
            destinationAirport: flight.to
        };

        // Check for alerts
        const alertService = AlertService.getInstance();
        alertService.checkBaggageStatus(baggageItem);

        this.baggageItems.push(baggageItem);
        return baggageItem;
    }

    public simulateBoarding(passenger: Passenger, isBoarded: boolean): void {
        const baggageItems = this.baggageItems.filter(
            item => item.pnrNumber === passenger.pnrNumber
        );

        const alertService = AlertService.getInstance();
        baggageItems.forEach(baggage => {
            alertService.checkBoardingReconciliation(baggage, isBoarded);
        });
    }

    public simulateSystemHealth(location: string): void {
        const alertService = AlertService.getInstance();
        const expectedScans = 100;
        const actualScans = Math.floor(Math.random() * 100);

        alertService.checkSystemHealth(location, expectedScans, actualScans);
    }

    public getBaggageItems(): BaggageItem[] {
        return this.baggageItems;
    }

    private generateBaggageTag(flightNumber: string): string {
        const prefix = flightNumber.split('-')[0];
        const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        return `${prefix}${random}`;
    }
} 