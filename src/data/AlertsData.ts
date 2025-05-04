export interface AlertItem {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    type: 'transfer' | 'security' | 'missing' | 'unclaimed' | 'damaged';
    priority: 'high' | 'medium' | 'low';
    details: string;
}

export const alertsData: AlertItem[] = [
    {
        id: '1',
        title: 'Transfer delay for baggage B654321',
        description: 'The baggage transfer from flight EK401 to EK789 is delayed.',
        timestamp: '10 min ago',
        type: 'transfer',
        priority: 'medium',
        details: 'Baggage Tag: B654321\nFrom Flight: EK401\nTo Flight: EK789\nDelay Reason: Weather disruption\nExpected Transfer Time: 30 min',
    },
    {
        id: '2',
        title: 'Security Hold',
        description: 'Bag #5566778 from flight BA143 flagged for additional security check. Immediate attention.',
        timestamp: '10 min ago',
        type: 'security',
        priority: 'high',
        details: 'Bag Tag: 5566778\nFlight: BA143\nHold Reason: Suspicious item detected\nRequired Action: Security team review',
    },
    {
        id: '3',
        title: 'Baggage missing for B345621',
        description: 'The baggage tagged B345621 on flight AI202 is reported missing.',
        timestamp: '01:00 PM',
        type: 'missing',
        priority: 'high',
        details: 'Baggage Tag: B345621\nFlight: AI202\nLast Seen: Belt 3\nReported By: Staff ID 1023\nAction: Investigation started',
    },
    {
        id: '4',
        title: 'Unclaimed Bag Notice',
        description: 'Baggage #3344556 from flight AI304 unclaimed for 25 minutes at Belt 4.',
        timestamp: '01:00 PM',
        type: 'unclaimed',
        priority: 'low',
        details: 'Baggage Tag: 3344556\nFlight: AI304\nLocation: Belt 4\nUnclaimed Duration: 25 min\nAction: Announcement made',
    },
    {
        id: '5',
        title: 'Damaged Bag Reported',
        description: 'Bag tag 1234567 from flight EK512 reported damaged at transfer hub.',
        timestamp: '01:00 PM',
        type: 'damaged',
        priority: 'medium',
        details: 'Bag Tag: 1234567\nFlight: EK512\nDamage: Broken handle\nReported At: Transfer Hub\nAction: Owner notified',
    }
]; 