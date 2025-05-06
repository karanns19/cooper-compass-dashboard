export interface WorkSummary {
    baggageHandledToday: number;
    baggageLostCases: number;
    baggageTransferUpdates: number;
    averageResolutionTime: number;
}

export interface UserSettings {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    dailyReportEmail: boolean;
}

export interface User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    role: string;
    employeeId: string;
    location: string;
    workSummary: WorkSummary;
    settings: UserSettings;
}

// Dummy test users
export const testUsers: User[] = [
    // Airport Staff (Bengaluru Airport)
    {
        id: '1',
        email: 'test_airport@paperpod.com',
        password: 'Airport@123',
        firstName: 'Test',
        lastName: 'Airport',
        profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        role: 'Airport Staff',
        employeeId: 'BLR10001',
        location: 'Kempegowda International Airport, Bengaluru',
        workSummary: {
            baggageHandledToday: 210,
            baggageLostCases: 2,
            baggageTransferUpdates: 25,
            averageResolutionTime: 19
        },
        settings: {
            emailNotifications: true,
            pushNotifications: true,
            smsNotifications: false,
            dailyReportEmail: true
        }
    },
    // Airline Staff (Akasa Air)
    {
        id: '2',
        email: 'test_airline@paperpod.com',
        password: 'Airline@123',
        firstName: 'Test',
        lastName: 'Airline',
        profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        role: 'Airline Staff',
        employeeId: 'AKASA20001',
        location: 'Akasa Air, Bengaluru Hub',
        workSummary: {
            baggageHandledToday: 95,
            baggageLostCases: 0,
            baggageTransferUpdates: 8,
            averageResolutionTime: 15
        },
        settings: {
            emailNotifications: true,
            pushNotifications: false,
            smsNotifications: true,
            dailyReportEmail: false
        }
    }
]; 