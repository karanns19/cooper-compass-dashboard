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
    password?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    userType: 'airport' | 'airline';
    gender: 'M' | 'F';
    profileImage: string;
    workSummary: WorkSummary;
    settings: UserSettings;
}

// Dummy test users
export const testUsers: User[] = [
    // Airport Staff
    {
        id: '1',
        email: 'test_airport@paperpod.com',
        password: 'Airport@123',
        firstName: 'Test',
        lastName: 'Airport',
        phoneNumber: '1234567890',
        userType: 'airport',
        gender: 'M',
        profileImage: 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg',
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
    // Airline Staff
    {
        id: '2',
        email: 'test_airline@paperpod.com',
        password: 'Airline@123',
        firstName: 'Test',
        lastName: 'Airline',
        phoneNumber: '0987654321',
        userType: 'airline',
        gender: 'F',
        profileImage: 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg',
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