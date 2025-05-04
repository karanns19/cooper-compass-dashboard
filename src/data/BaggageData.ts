export interface BaggageItem {
    id: number;
    passengerName: string;
    pnrNumber: string;
    flightNumber: string;
    baggageTag: string;
    status: 'Delivered' | 'In Transit' | 'Missing';
    lastLocation: string;
    trackingTimeline: TrackingEvent[];
}

export interface TrackingEvent {
    title?: string;
    status: string;
    location?: string;
    time: string;
}

export const baggageData: BaggageItem[] = [
    {
        id: 1,
        passengerName: "James Smith",
        pnrNumber: "M123456",
        flightNumber: "AA 100",
        baggageTag: "B123456",
        status: "Delivered",
        lastLocation: "Dubai Terminal 3",
        trackingTimeline: [
            { title: "Checked in at Chennai Airport", status: "Completed", time: "7:30 AM", location: "Chennai Airport" },
            { title: "Loaded on Flight AI202", status: "Completed", time: "8:15 AM" },
            { title: "In Transit", status: "Completed", time: "9:00 AM", location: "Enroute to Dubai" },
            { title: "Flight Delayed", status: "Canceled", time: "9:30 AM" },
            { title: "Placed on Baggage Belt", status: "Pending", time: "11:15 AM" }
          ]
    },
    {
        id: 2,
        passengerName: "Maria Garcia",
        pnrNumber: "M654321",
        flightNumber: "BA 200",
        baggageTag: "B654321",
        status: "In Transit",
        lastLocation: "London Heathrow",
        trackingTimeline: [
           {title: "Checked in at Madrid Barajas", status: "Completed", time: "6:00 AM", location: "Madrid Barajas" },
            { title: "Loaded on Flight BA200", status: "Completed", time: "7:00 AM" },
            { title: "In Transit", status: "On Stage", time: "8:30 AM", location: "Enroute to London" },
            { title: "Arrived at London Heathrow", status: "Pending", time: "10:00 AM" },
            { title: "Placed on Baggage Belt 5", status: "Pending", time: "10:15 AM" }
        ],
    },
    {
        id: 3,
        passengerName: "John Doe",
        pnrNumber: "M789012",
        flightNumber: "DL 300",
        baggageTag: "B789012",
        status: "Missing",
        lastLocation: "Los Angeles Airport",
        trackingTimeline: [
            {title: "Checked in at New York JFK", status: "Completed", time: "5:00 AM", location: "New York JFK" },
            { title: "Loaded on Flight DL300", status: "Completed", time: "6:00 AM" },
            { title: "In Transit", status: "completed", time: "7:30 AM", location: "Enroute to Los Angeles" },
            { title: "Arrived at Los Angeles Airport", status: "On Stage", time: "9:00 AM" },
            { title: "Baggage Missing", status: "Pending", time: "9:15 AM" }
        ],
    },
    {
        id: 4,
        passengerName: "Emily Johnson",
        pnrNumber: "M345678",
        flightNumber: "UA 400",
        baggageTag: "B345678",
        status: "Delivered",
        lastLocation: "San Francisco Airport",
        trackingTimeline: [
            {title: "Checked in at Chicago O'Hare", status: "Completed", time: "8:00 AM", location: "Chicago O'Hare" },
            { title: "Loaded on Flight UA400", status: "Completed", time: "9:00 AM" },
            { title: "In Transit", status: "Completed", time: "10:30 AM", location: "Enroute to San Francisco" },
            { title: "Arrived at San Francisco Airport", status: "On Stage", time: "12:00 PM" },
            { title: "Placed on Baggage Belt 2", status: "Pending", time: "12:15 PM" },
            { title: "Picked Up by Passenger", status: "Pending", time: "12:30 PM" }
        ],
    }
];
