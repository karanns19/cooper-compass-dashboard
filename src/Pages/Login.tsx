/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/logo.png';
import loginImage from "../assets/login/loginImage.png";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // Add state variables for new backend fields
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userType, setUserType] = useState('airport'); // Default to 'airport'
    const [gender, setGender] = useState('M'); // Default to 'M'

    const navigate = useNavigate();
    const { login, signup } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const success = await login(email, password, userType as 'airport' | 'airline');
                if (success) {
                    navigate('/home');
                } else {
                    setError('Invalid email or password');
                }
            } else {
                if (!firstName || !lastName || !phoneNumber || !userType || !gender) {
                    setError('Please fill in all required fields');
                    return;
                }

                const success = await signup({
                    email,
                    password,
                    firstName,
                    lastName,
                    phoneNumber,
                    userType: userType as 'airport' | 'airline', // Cast to expected union type
                    gender: gender as 'M' | 'F', // Cast to expected union type
                });

                if (success) {
                    navigate('/home');
                } else {
                    setError('Email already exists');
                }
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="h-screen flex overflow-hidden">
            <div className="hidden lg:flex lg:w-1/2 bg-gray-50 p-12 flex-col h-full">
                <div className="flex items-center gap-2 mb-12">
                    <img src={Logo} alt="Paper Pod Logo" className="h-10 w-10" />
                    <span className="text-2xl font-semibold">Paper Pod</span>
                </div>
                
                <div className="flex-1 flex flex-col mt-20 justify-start items-center">
                    <div className="max-w-md text-center">
                        <img src={loginImage} alt="Login Image" className="w-full h-auto" />
                        <h1 className="text-3xl font-bold mb-4 mt-12">
                            Make Baggage Management Easy and Smart
                        </h1>
                        <p className="text-gray-600">
                            Stay updated on baggage transfers, track real-time status,
                            and ensure efficient handling with our all-in-one dashboard.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white h-full">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-2">
                        {isLogin ? 'Welcome Back To Paper Pod!' : 'Create Your Account'}
                    </h2>
                    <p className="text-gray-600 mb-8">
                        {isLogin ? 'Sign in to your account' : 'Sign up for a new account'}
                    </p>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isLogin && (
                            <div>
                                <label className="block text-sm font-medium mb-1">User Type</label>
                                <select
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded-lg"
                                >
                                    <option value="airport">Airport</option>
                                    <option value="airline">Airline</option>
                                </select>
                            </div>
                        )}
                        {!isLogin && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">First Name</label>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="w-full p-2 border border-gray-200 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-full p-2 border border-gray-200 rounded-lg"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">User Type</label>
                                    <select
                                        value={userType}
                                        onChange={(e) => setUserType(e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg"
                                    >
                                        <option value="airport">Airport</option>
                                        <option value="airline">Airline</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Gender</label>
                                    <select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="w-full p-2 border border-gray-200 rounded-lg"
                                    >
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border border-gray-200 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border border-gray-200 rounded-lg"
                            />
                        </div>

                        {isLogin && (
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="mr-2"
                                    />
                                    <span className="text-sm">Remember Me</span>
                                </label>
                                <button type="button" className="text-sm text-indigo-600">
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-[#432143] text-white rounded-lg hover:bg-[#532153]"
                        >
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>

                        {isLogin ? (
                            <div className="text-center">
                                <span className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setIsLogin(false)}
                                        className="text-indigo-600"
                                    >
                                        Sign up
                                    </button>
                                </span>
                            </div>
                        ) : (
                            <div className="text-center">
                                <span className="text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setIsLogin(true)}
                                        className="text-indigo-600"
                                    >
                                        Login
                                    </button>
                                </span>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
} 