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
    {
        id: '1',
        email: 'test_user1@paperpod.com',
        password: 'Test@123',
        firstName: 'Test',
        lastName: 'User1',
        profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        role: 'Supervisor',
        employeeId: 'AIR12345',
        location: 'Terminal 2, Chennai International Airport',
        workSummary: {
            baggageHandledToday: 124,
            baggageLostCases: 3,
            baggageTransferUpdates: 17,
            averageResolutionTime: 22
        },
        settings: {
            emailNotifications: true,
            pushNotifications: true,
            smsNotifications: false,
            dailyReportEmail: true
        }
    },
    {
        id: '2',
        email: 'test_user2@paperpod.com',
        password: 'Test@123',
        firstName: 'Test',
        lastName: 'User2',
        profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
        role: 'Handler',
        employeeId: 'AIR12346',
        location: 'Terminal 1, Chennai International Airport',
        workSummary: {
            baggageHandledToday: 85,
            baggageLostCases: 1,
            baggageTransferUpdates: 12,
            averageResolutionTime: 18
        },
        settings: {
            emailNotifications: true,
            pushNotifications: false,
            smsNotifications: true,
            dailyReportEmail: false
        }
    }
]; 