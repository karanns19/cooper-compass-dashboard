// Dummy Data
export type BaggageData = {
  id: string;
  from: string;
  to: string;
  connectingFlight: string;
  baggageTag: string;
  arrivalTime: string;
  status: 'Pending' | 'Issue' | 'Completed';
  comments: string;
  details: Array<{
    from: string;
    to: string;
    destination: string;
    lastUpdated: string;
    location: string;
  }>;
};

export const dummyData: BaggageData[] = [
  {
    id: '1',
    from: 'AA 100',
    to: 'UA 100',
    connectingFlight: 'AI202',
    baggageTag: 'B123456',
    arrivalTime: '10:30 AM',
    status: 'Pending',
    comments: 'Awaiting scan confirmation',
    details: [
      {
        from: 'AA 100',
        to: 'UA 100',
        destination: 'NYC',
        lastUpdated: '10:25 AM',
        location: 'Terminal 1 Gate A4',
      },
      {
        from: 'DL 200',
        to: 'BA 300',
        destination: 'LAX',
        lastUpdated: '10:50 AM',
        location: 'Terminal 2 Gate B5',
      },
    ],
  },
  {
    id: '2',
    from: 'DL 200',
    to: 'BA 300',
    connectingFlight: 'DL305',
    baggageTag: 'B654321',
    arrivalTime: '11:00 AM',
    status: 'Completed',
    comments: 'Baggage successfully transferred',
    details: [
      {
        from: 'DL 200',
        to: 'BA 300',
        destination: 'LAX',
        lastUpdated: '10:50 AM',
        location: 'Terminal 2 Gate B5',
      },
      {
        from: 'UA 400',
        to: 'LH 500',
        destination: 'ORD',
        lastUpdated: '12:00 PM',
        location: 'Terminal 3 Gate C7',
      },
    ],
  },
  {
    id: '3',
    from: 'UA 400',
    to: 'LH 500',
    connectingFlight: 'LH789',
    baggageTag: 'B789012',
    arrivalTime: '12:15 PM',
    status: 'Issue',
    comments: 'Baggage delayed due to weather',
    details: [
      {
        from: 'UA 400',
        to: 'LH 500',
        destination: 'ORD',
        lastUpdated: '12:00 PM',
        location: 'Terminal 3 Gate C7',
      },
    ],
  },
  {
    id: '4',
    from: 'AF 600',
    to: 'EK 700',
    connectingFlight: 'EK123',
    baggageTag: 'B345678',
    arrivalTime: '1:45 PM',
    status: 'Pending',
    comments: 'Awaiting transfer to connecting flight',
    details: [
      {
        from: 'AF 600',
        to: 'EK 700',
        destination: 'DXB',
        lastUpdated: '1:30 PM',
        location: 'Terminal 4 Gate D2',
      },
    ],
  },
  {
    id: '5',
    from: 'BA 800',
    to: 'QR 900',
    connectingFlight: 'QR456',
    baggageTag: 'B901234',
    arrivalTime: '2:30 PM',
    status: 'Completed',
    comments: 'Baggage successfully loaded',
    details: [
      {
        from: 'BA 800',
        to: 'QR 900',
        destination: 'DOH',
        lastUpdated: '2:15 PM',
        location: 'Terminal 5 Gate E3',
      },
    ],
  },
  {
    id: '6',
    from: 'LH 1000',
    to: 'AA 1100',
    connectingFlight: 'AA789',
    baggageTag: 'B567890',
    arrivalTime: '3:00 PM',
    status: 'Issue',
    comments: 'Baggage missing during transfer',
    details: [
      {
        from: 'LH 1000',
        to: 'AA 1100',
        destination: 'MIA',
        lastUpdated: '2:50 PM',
        location: 'Terminal 6 Gate F1',
      },
    ],
  },
  {
    id: '7',
    from: 'EK 1200',
    to: 'AF 1300',
    connectingFlight: 'AF456',
    baggageTag: 'B234567',
    arrivalTime: '4:15 PM',
    status: 'Pending',
    comments: 'Awaiting baggage scan',
    details: [
      {
        from: 'EK 1200',
        to: 'AF 1300',
        destination: 'CDG',
        lastUpdated: '4:00 PM',
        location: 'Terminal 7 Gate G6',
      },
    ],
  },
  {
    id: '8',
    from: 'QR 1400',
    to: 'BA 1500',
    connectingFlight: 'BA123',
    baggageTag: 'B678901',
    arrivalTime: '5:30 PM',
    status: 'Completed',
    comments: 'Baggage transferred successfully',
    details: [
      {
        from: 'QR 1400',
        to: 'BA 1500',
        destination: 'LHR',
        lastUpdated: '5:15 PM',
        location: 'Terminal 8 Gate H4',
      },
    ],
  },
  {
    id: '9',
    from: 'AA 1600',
    to: 'DL 1700',
    connectingFlight: 'DL789',
    baggageTag: 'B345678',
    arrivalTime: '6:45 PM',
    status: 'Issue',
    comments: 'Baggage damaged during transfer',
    details: [
      {
        from: 'AA 1600',
        to: 'DL 1700',
        destination: 'ATL',
        lastUpdated: '6:30 PM',
        location: 'Terminal 9 Gate I2',
      },
    ],
  },
  {
    id: '10',
    from: 'UA 1800',
    to: 'LH 1900',
    connectingFlight: 'LH456',
    baggageTag: 'B901234',
    arrivalTime: '7:30 PM',
    status: 'Pending',
    comments: 'Awaiting transfer confirmation',
    details: [
      {
        from: 'UA 1800',
        to: 'LH 1900',
        destination: 'FRA',
        lastUpdated: '7:15 PM',
        location: 'Terminal 10 Gate J3',
      },
    ],
  },
];

export interface TransferHubItem {
    id: string;
    fromFlight: string;
    toFlight: string;
    baggageTag: string;
    lastUpdate: string;
    status: "Pending" | "Issue" | "Completed";
  }
  
export const transferHubData: TransferHubItem[] = [
    {
      id: "1",
      fromFlight: "AA 100",
      toFlight: "AA 100",
      baggageTag: "B123456",
      lastUpdate: "10:30 AM",
      status: "Pending",
    },
    {
      id: "2",
      fromFlight: "DL 200",
      toFlight: "DL 200",
      baggageTag: "B123456",
      lastUpdate: "11:30 AM",
      status: "Pending",
    },
    {
      id: "3",
      fromFlight: "UA 416",
      toFlight: "UA 416",
      baggageTag: "B123456",
      lastUpdate: "9:30 AM",
      status: "Issue",
    },
    {
      id: "4",
      fromFlight: "AE 783",
      toFlight: "AE 783",
      baggageTag: "B123456",
      lastUpdate: "10:00 AM",
      status: "Pending",
    },
    {
      id: "5",
      fromFlight: "UA 574",
      toFlight: "UA 574",
      baggageTag: "B123456",
      lastUpdate: "2:00 PM",
      status: "Completed",
    },
    {
      id: "6",
      fromFlight: "DL 430",
      toFlight: "DL 430",
      baggageTag: "B123456",
      lastUpdate: "3:00 PM",
      status: "Issue",
    },
    {
      id: "7",
      fromFlight: "AB 468",
      toFlight: "AB 468",
      baggageTag: "B123456",
      lastUpdate: "4:00 PM",
      status: "Completed",
    },
    {
      id: "8",
      fromFlight: "CT 586",
      toFlight: "CT 586",
      baggageTag: "B123456",
      lastUpdate: "10:00 AM",
      status: "Completed",
    },
  ];
  