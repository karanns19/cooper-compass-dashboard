import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

function Modal({ open, onClose, title, children }: { open: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl cursor-pointer">&times;</button>
        <div className="text-lg font-semibold mb-4">{title}</div>
        <div>{children}</div>
      </div>
    </div>
  );
}

type ToggleProps = { checked: boolean; onChange: (val: boolean) => void };
function Toggle({ checked, onChange }: ToggleProps) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${checked ? 'bg-[#432143]' : 'bg-gray-300'}`}
            style={{ minWidth: 44 }}
            aria-pressed={checked}
        >
            <span
                className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ${checked ? 'translate-x-5' : ''}`}
            />
        </button>
    );
}

export default function Profile() {
    const { user, updateUser, updatePassword, updateSettings, logout } = useAuth();
    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editForm, setEditForm] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        location: user?.location || '',
    });
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [settings, setSettings] = useState(user?.settings || {
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        dailyReportEmail: true,
    });

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({
            firstName: editForm.firstName,
            lastName: editForm.lastName,
            location: editForm.location,
        });
        setShowEdit(false);
        setSuccess('Profile updated successfully');
        setTimeout(() => setSuccess(''), 3000);
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setError('New passwords do not match');
            return;
        }
        const success = await updatePassword(passwordForm.oldPassword, passwordForm.newPassword);
        if (success) {
            setShowPassword(false);
            setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
            setSuccess('Password updated successfully');
            setTimeout(() => setSuccess(''), 3000);
        } else {
            setError('Current password is incorrect');
        }
    };

    const handleSettingChange = (setting: keyof typeof settings, value: boolean) => {
        const newSettings = {
            ...settings,
            [setting]: value,
        };
        setSettings(newSettings);
        updateSettings(newSettings);
        setSuccess('Settings updated successfully');
        setTimeout(() => setSuccess(''), 3000);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        navigate('/');
        return null;
    }

    return (
        <div className="min-h-screen bg-[#f7f8fa] p-6">
            <div className="flex flex-col items-start">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white rounded-xl p-4 shadow flex items-center justify-center">
                        <FaUserCircle className="text-2xl text-[#23223a]" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-[#23223a]">Profile</h1>
                        <p className="text-gray-500 text-sm">Manage your profile</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow">

            <div className="flex flex-col items-start mb-8">
                <div className="flex items-center p-6 gap-6 w-fit">
                    <img
                        src={user.profileImage}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-20 h-20 rounded-full object-cover border"
                    />
                    <div>
                        <div className="text-lg font-semibold">{user.firstName} {user.lastName}</div>
                        <div className="text-gray-500">Baggage Handling {user.role}</div>
                        <div className="text-gray-400 text-sm mt-1">{user.employeeId}</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow p-8 flex-1 min-w-[320px]">
                    <div className="font-bold text-xl mb-4">Personal Information</div>
                    <div className="border-t pt-6 space-y-6">
                        <div className="text-gray-400 text-lg font-semibold">Name: <span className="text-black font-normal">{user.firstName} {user.lastName}</span></div>
                        <div className="text-gray-400 text-lg font-semibold">Employee ID: <span className="text-black font-normal">{user.employeeId}</span></div>
                        <div className="text-gray-400 text-lg font-semibold">Role: <span className="text-black font-normal">{user.role}</span></div>
                        <div className="text-gray-400 text-lg font-semibold">Location: <span className="text-black font-normal">{user.location}</span></div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow p-8 flex-1 min-w-[320px]">
                    <div className="font-bold text-xl mb-4">Work Summary</div>
                    <div className="border-t pt-6 space-y-6">
                        <div className="text-gray-400 text-lg font-semibold">Baggage Handled Today: <span className="text-black font-normal">{user.workSummary.baggageHandledToday} Bags</span></div>
                        <div className="text-gray-400 text-lg font-semibold">Baggage Lost Cases: <span className="text-black font-normal">{user.workSummary.baggageLostCases} Cases</span></div>
                        <div className="text-gray-400 text-lg font-semibold">Baggage Transfer Updates: <span className="text-black font-normal">{user.workSummary.baggageTransferUpdates} Transfers</span></div>
                        <div className="text-gray-400 text-lg font-semibold">Average Resolution Time: <span className="text-black font-normal">{user.workSummary.averageResolutionTime} Minutes</span></div>
                    </div>
                </div>
            </div>

            <div className="p-8 mt-8">
                <div className="font-bold text-xl mb-4">Settings</div>
                <div className="flex flex-col gap-2 text-[#222]">
                    <button className="text-left py-1 px-1 rounded transition focus:outline-none cursor-pointer" style={{ fontWeight: 500 }} onClick={() => setShowEdit(true)}>Edit Profile</button>
                    <button className="text-left py-1 px-1 rounded transition focus:outline-none cursor-pointer" style={{ fontWeight: 500 }} onClick={() => setShowPassword(true)}>Change Password</button>
                    <button className="text-left py-1 px-1 rounded transition focus:outline-none cursor-pointer" style={{ fontWeight: 500 }} onClick={() => setShowNotifications(true)}>Notification Settings</button>
                    <button className="text-left py-1 px-1 rounded transition focus:outline-none text-red-500 cursor-pointer" style={{ fontWeight: 500 }} onClick={handleLogout}>Logout</button>
                </div>
            </div>
            </div>

            {showEdit && (
                <Modal open={showEdit} onClose={() => setShowEdit(false)} title="Edit Profile">
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">First Name</label>
                            <input
                                type="text"
                                value={editForm.firstName}
                                onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Last Name</label>
                            <input
                                type="text"
                                value={editForm.lastName}
                                onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input
                                type="text"
                                value={editForm.location}
                                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-lg"
                            />
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button type="submit" className="px-4 py-2 bg-[#432143] text-white rounded-lg hover:bg-[#532153] cursor-pointer">Save</button>
                            <button type="button" className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => setShowEdit(false)}>Cancel</button>
                        </div>
                    </form>
                </Modal>
            )}

            {showPassword && (
                <Modal open={showPassword} onClose={() => setShowPassword(false)} title="Change Password">
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Current Password</label>
                            <input
                                type="password"
                                value={passwordForm.oldPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">New Password</label>
                            <input
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-lg"
                            />
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button type="submit" className="px-4 py-2 bg-[#432143] text-white rounded-lg hover:bg-[#532153] cursor-pointer">Update</button>
                            <button type="button" className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => setShowPassword(false)}>Cancel</button>
                        </div>
                    </form>
                </Modal>
            )}

            {showNotifications && (
                <Modal open={showNotifications} onClose={() => setShowNotifications(false)} title="Notification Settings">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between text-lg font-medium">
                            <span>Email Notifications</span>
                            <Toggle checked={settings.emailNotifications} onChange={(val: boolean) => handleSettingChange('emailNotifications', val)} />
                        </div>
                        <div className="flex items-center justify-between text-lg font-medium">
                            <span>Push Notifications</span>
                            <Toggle checked={settings.pushNotifications} onChange={(val: boolean) => handleSettingChange('pushNotifications', val)} />
                        </div>
                        <div className="flex items-center justify-between text-lg font-medium">
                            <span>SMS Notifications</span>
                            <Toggle checked={settings.smsNotifications} onChange={(val: boolean) => handleSettingChange('smsNotifications', val)} />
                        </div>
                        <div className="flex items-center justify-between text-lg font-medium">
                            <span>Daily Report Email</span>
                            <Toggle checked={settings.dailyReportEmail} onChange={(val: boolean) => handleSettingChange('dailyReportEmail', val)} />
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button type="button" className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => setShowNotifications(false)}>Close</button>
                        </div>
                    </div>
                </Modal>
            )}

            {success && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-50 text-green-600 px-6 py-3 rounded-lg shadow-lg z-50">
                    {success}
                </div>
            )}
            {error && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-50 text-red-500 px-6 py-3 rounded-lg shadow-lg z-50">
                    {error}
                </div>
            )}
        </div>
    );
}