export type AlertType = 
    | 'transfer'
    | 'security'
    | 'missing'
    | 'unclaimed'
    | 'damaged'
    | 'system'
    | 'weight'
    | 'no-show'
    | 'tagless'
    | 'stuck'
    | 'mishandling';

export type AlertStatus = 'active' | 'investigating' | 'resolved' | 'pending';

export interface AlertItem {
    id: string;
    title: string;
    description: string;
    type: AlertType;
    priority: string;
    timestamp: string;
    details: string;
    location?: string;
    status: AlertStatus;
    baggageTag?: string;
    flightNumber?: string;
    affectedFlights: string[];
}

export const alertsData: AlertItem[] = [
    {
        id: '1',
        title: 'Transfer Delay at Delhi Airport',
        description: 'Baggage transfer from 6E-123 to AI-101 delayed due to high volume',
        timestamp: '12:35 PM',
        type: 'transfer',
        priority: 'medium',
        details: 'Transfer Point: TP2\nExpected Delay: 15 minutes\nAffected Bags: 12\nReason: High transfer volume',
        location: 'DEL T3',
        affectedFlights: ['6E-123', 'AI-101'],
        status: 'active'
    },
    {
        id: '2',
        title: 'Security Hold - Additional Screening Required',
        description: 'Bag MAA345678 flagged for additional security screening',
        timestamp: '06:45 AM',
        type: 'security',
        priority: 'high',
        details: 'Bag Tag: MAA345678\nFlight: SG-201\nLocation: Security Screening Area\nRequired Action: Manual inspection',
        location: 'MAA T1',
        affectedFlights: ['SG-201'],
        status: 'investigating'
    },
    {
        id: '3',
        title: 'BHS System Slowdown',
        description: 'Baggage handling system experiencing reduced speed at Bangalore Airport',
        timestamp: '07:40 AM',
        type: 'system',
        priority: 'high',
        details: 'Location: T1 BHS\nAffected Area: Main sorting system\nImpact: 5-10 minute delays\nAction: Technical team dispatched',
        location: 'BLR T1',
        affectedFlights: ['6E-123', 'AI-102'],
        status: 'active'
    },
    {
        id: '4',
        title: 'Excess Baggage Fee Required',
        description: 'Bag DEL456789 exceeds weight limit',
        timestamp: '11:05 AM',
        type: 'weight',
        priority: 'low',
        details: 'Bag Tag: DEL456789\nCurrent Weight: 18.2 kg\nLimit: 15 kg\nRequired: Payment of excess baggage fee',
        location: 'DEL T3',
        affectedFlights: ['6E-456'],
        status: 'active'
    },
    {
        id: '5',
        title: 'Passenger No-Show Alert',
        description: 'Passenger not boarded but baggage loaded for flight 6E-456',
        timestamp: '12:45 PM',
        type: 'no-show',
        priority: 'high',
        details: 'Flight: 6E-456\nBag Tag: DEL789012\nRequired Action: Offload baggage\nLocation: Gate G3',
        location: 'DEL T3',
        affectedFlights: ['6E-456'],
        status: 'active'
    },
    {
        id: '6',
        title: 'Unclaimed Baggage Alert',
        description: 'Baggage unclaimed at carousel for 20 minutes',
        timestamp: '01:15 PM',
        type: 'unclaimed',
        priority: 'medium',
        details: 'Bag Tag: BLR123456\nFlight: 6E-123\nLocation: Carousel 3\nDuration: 20 minutes\nAction: PA announcement made',
        location: 'BLR T1',
        affectedFlights: ['6E-123'],
        status: 'active'
    }
]; 