export interface BaggageItem {
    id: number;
    passengerName: string;
    pnrNumber: string;
    flightNumber: string;
    baggageTag: string;
    status: 'Delivered' | 'In Transit' | 'Missing' | 'Security Hold' | 'Transfer' | 'Loading' | 'Unloaded';
    lastLocation: string;
    weight: number;
    trackingTimeline: TrackingEvent[];
    currentAirport: string;
    destinationAirport: string;
    transferDetails?: {
        fromFlight: string;
        toFlight: string;
        transferPoint: string;
    };
}

export interface TrackingEvent {
    title: string;
    status: 'Completed' | 'In Progress' | 'Pending' | 'Delayed' | 'Alert';
    time: string;
    location: string;
    details?: string;
}

export const baggageData: BaggageItem[] = [
    {
        id: 1,
        passengerName: "Rajesh Kumar",
        pnrNumber: "6E123456",
        flightNumber: "6E-123",
        baggageTag: "BLR123456",
        status: "In Transit",
        lastLocation: "Security Checkpoint T1",
        weight: 15.5,
        currentAirport: "BLR",
        destinationAirport: "DEL",
        trackingTimeline: [
            { 
                title: "Checked in at Bangalore Airport T1", 
                status: "Completed", 
                time: "07:30 AM", 
                location: "Check-in Counter 12" 
            },
            { 
                title: "Baggage Drop Scan", 
                status: "Completed", 
                time: "07:32 AM", 
                location: "Self Drop Kiosk 3" 
            },
            { 
                title: "Security Screening", 
                status: "In Progress", 
                time: "07:45 AM", 
                location: "Security Checkpoint T1",
                details: "Standard security screening in progress"
            }
          ]
    },
    {
        id: 2,
        passengerName: "Priya Sharma",
        pnrNumber: "AI101789",
        flightNumber: "AI-101",
        baggageTag: "DEL789012",
        status: "Transfer",
        lastLocation: "Transfer Point TP2",
        weight: 18.2,
        currentAirport: "DEL",
        destinationAirport: "BOM",
        transferDetails: {
            fromFlight: "6E-123",
            toFlight: "AI-101",
            transferPoint: "TP2"
        },
        trackingTimeline: [
            { 
                title: "Arrived from Bangalore", 
                status: "Completed", 
                time: "12:30 PM", 
                location: "Terminal 3" 
            },
            { 
                title: "Unloaded from 6E-123", 
                status: "Completed", 
                time: "12:35 PM", 
                location: "Gate G5" 
            },
            { 
                title: "Transfer Processing", 
                status: "In Progress", 
                time: "12:40 PM", 
                location: "Transfer Point TP2",
                details: "Baggage being transferred to connecting flight"
            }
        ]
    },
    {
        id: 3,
        passengerName: "Amit Patel",
        pnrNumber: "SG201345",
        flightNumber: "SG-201",
        baggageTag: "MAA345678",
        status: "Security Hold",
        lastLocation: "Security Screening Area",
        weight: 12.8,
        currentAirport: "MAA",
        destinationAirport: "BLR",
        trackingTimeline: [
            { 
                title: "Checked in at Chennai Airport", 
                status: "Completed", 
                time: "06:30 AM", 
                location: "Check-in Counter 8" 
            },
            { 
                title: "Security Hold", 
                status: "Alert", 
                time: "06:45 AM", 
                location: "Security Screening Area",
                details: "Additional security screening required"
            }
        ]
    },
    {
        id: 4,
        passengerName: "Neha Gupta",
        pnrNumber: "6E456789",
        flightNumber: "6E-456",
        baggageTag: "DEL456789",
        status: "Loading",
        lastLocation: "Gate G3",
        weight: 14.3,
        currentAirport: "DEL",
        destinationAirport: "BOM",
        trackingTimeline: [
            { 
                title: "Checked in at Delhi Airport", 
                status: "Completed", 
                time: "11:00 AM", 
                location: "Check-in Counter 15" 
            },
            { 
                title: "Security Screening", 
                status: "Completed", 
                time: "11:15 AM", 
                location: "Security Checkpoint T3" 
            },
            { 
                title: "Loading onto Aircraft", 
                status: "In Progress", 
                time: "12:30 PM", 
                location: "Gate G3",
                details: "Baggage being loaded onto flight 6E-456"
            }
        ]
    }
];
