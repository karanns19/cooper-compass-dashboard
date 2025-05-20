/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from '../context/AuthContext';
import { baggageData } from '../data/BaggageData';
import { AlertStatus } from '../data/AlertsData';
import AirlineBarChart from '../components/ReportPageComponent/AirlineBarchart1Comp';
import { Eye, Trash2, ChevronDown } from 'lucide-react';
import { FaPlaneArrival, FaPlaneDeparture, FaPlane, FaClock, FaChartBar, FaSuitcaseRolling, FaSearch, FaBell, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertService } from '../services/AlertService';

const flightStatusCards = [
  {
    label: 'Arrived Flights',
    value: 12,
    update: 'Updates 1 hour ago',
    icon: <FaPlaneArrival size={24} className="text-[#7c3aed]" />,
    circle: 'bg-[#f3f0ff] text-[#7c3aed]',
    filter: 'Arrived',
  },
  {
    label: 'Scheduled Flights',
    value: 20,
    update: 'Updates 2 hour ago',
    icon: <FaPlaneDeparture size={24} className="text-[#22c55e]" />,
    circle: 'bg-[#f0fdf4] text-[#22c55e]',
    filter: 'Scheduled',
  },
  {
    label: 'Flights in air',
    value: 30,
    update: 'Updates 1 hour ago',
    icon: <FaPlane size={24} className="text-[#0ea5e9]" />,
    circle: 'bg-[#f0f9ff] text-[#0ea5e9]',
    filter: 'Flights in Air',
  },
  {
    label: 'Delayed Flights',
    value: 20,
    update: 'Updates 1 hour ago',
    icon: <FaClock size={24} className="text-[#eab308]" />,
    circle: 'bg-[#fef9c3] text-[#eab308]',
    filter: 'Delayed',
  }
];

const featureCards = [
  {
    label: 'Reports',
    desc: 'View daily and monthly baggage reports instantly.',
    icon: <FaChartBar size={32} className="text-[#60a5fa]" />,
    bg: 'bg-[#e0edff]',
    circle: 'bg-[#c7e0ff] border border-[#60a5fa] text-[#60a5fa]',
    to: '/reports',
  },
  {
    label: 'Track',
    desc: 'Track passenger baggage effortlessly all in one place.',
    icon: <FaSuitcaseRolling size={32} className="text-[#a78bfa]" />,
    bg: 'bg-[#f3e8ff]',
    circle: 'bg-[#e9d5ff] border border-[#a78bfa] text-[#a78bfa]',
    to: '/track-baggage',
  },
  {
    label: 'Lost & Found',
    desc: 'Get quick help from Lost & Found for missing baggage.',
    icon: <FaSearch size={32} className="text-[#818cf8]" />,
    bg: 'bg-[#e0e7ff]',
    circle: 'bg-[#c7d2fe] border border-[#818cf8] text-[#818cf8]',
    to: '/lost-and-found',
  },
  {
    label: 'Alerts',
    desc: 'Receive instant updates on your baggage status.',
    icon: <FaBell size={32} className="text-[#a3a33c]" />,
    bg: 'bg-[#fef9c3]',
    circle: 'bg-[#fef9c3] border border-[#a3a33c] text-[#a3a33c]',
    to: '/alerts',
  }
];

export default function Home() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [alerts, setAlerts] = useState(AlertService.getInstance().getActiveAlerts());
  const statusOptions = ['All', 'Delivered', 'In Transit', 'Missing'];
  const navigate = useNavigate();
  const alertService = AlertService.getInstance();

  useEffect(() => {
    if (user) {
      // Subscribe to alert updates - fetch *all* active alerts when notified
      const unsubscribe = alertService.subscribe(() => {
        setAlerts(alertService.getActiveAlerts());
      });

      // Start background alerts - the service manages its own interval
      alertService.startBackgroundAlerts();

      return () => {
        unsubscribe();
        // Consider if stopping alerts on Home unmount is the desired behavior. 
        // If we stop here, alerts will stop generating when on other pages.
        // A better approach might be to only start/stop the simulator if no user is logged in,
        // or manage it at a higher level component.
        // For now, we'll keep it running once started if a user is logged in.
        // alertService.stopBackgroundAlerts();
      };
    } else {
       // Stop background alerts if user logs out while on Home page
       alertService.stopBackgroundAlerts();
    }
  }, [user, alertService]); // Added alertService to dependency array

  const filteredBaggage = baggageData.filter(b => {
    const matchesSearch =
      b.pnrNumber.toLowerCase().includes(search.toLowerCase()) ||
      b.flightNumber.toLowerCase().includes(search.toLowerCase()) ||
      b.baggageTag.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<string, string> = {
    Delivered: 'bg-green-100 text-green-700',
    'In Transit': 'bg-blue-100 text-blue-700',
    Missing: 'bg-red-100 text-red-700',
    active: 'bg-red-100 text-red-700',
    investigating: 'bg-yellow-100 text-yellow-700',
    resolved: 'bg-green-100 text-green-700',
    pending: 'bg-blue-100 text-blue-700'
  };

  // Simplify alert display to show recent alerts directly
  const recentAlertsToShow = alerts.slice(0, 10); // Display up to 10 most recent alerts

  return (
    <div className="bg-[#f7f8fa] min-h-screen p-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-[#23223a]">Welcome Back, {user ? user.firstName : 'User'}</h1>
        <p className="text-gray-500">Monitor, track, and manage baggage seamlessly.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 mb-8">
        {flightStatusCards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-2 min-w-[220px] cursor-pointer relative transition-shadow hover:shadow-md group"
            onClick={() => navigate('/flight-details', { state: { status: card.filter } })}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${card.circle}`}>{card.icon}</div>
              <span className="font-semibold text-lg text-[#23223a]">{card.label}</span>
            </div>
            <div className="border-b border-[#e5e7eb] my-2"></div>
            <div className="text-xl font-extrabold text-[#18181b] mb-1">{card.value} Flights</div>
            <div className="text-xs text-gray-400 font-medium">{card.update}</div>
            <FaArrowRight className="absolute bottom-7 right-4 text-gray-300 group-hover:text-[#432143] transition-colors" size={20} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {featureCards.map((card, i) => (
          <div
            key={i}
            className={`rounded-2xl flex flex-col items-center justify-center p-8 min-h-[200px] ${card.bg} cursor-pointer`}
            onClick={() => navigate(card.to)}
          >
            <div className={`flex items-center justify-center w-16 h-16 rounded-full mb-4 ${card.circle}`}>{card.icon}</div>
            <div className="font-bold text-xl text-[#23223a] mb-2 text-center">{card.label}</div>
            <div className="text-center text-base text-xs" style={{ color: card.icon.props.className?.includes('text-[#a3a33c]') ? '#a3a33c' : '#2563eb' }}>{card.desc}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="flex-1 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold text-lg">
              {user?.userType === 'airport' ? 'Airline vs Baggage Volume' : 'Airport vs Baggage Volume'}
            </div>
            <button className="px-3 py-1 border rounded-lg text-sm text-gray-600 flex items-center gap-1">View by Week <ChevronDown size={16} /></button>
          </div>
          <AirlineBarChart />
        </div>
        <div className="w-full lg:w-[350px] bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <div className="font-bold text-lg text-[#23223a]">Alerts</div>
          </div>
          <div className="flex gap-2 text-sm text-[#23223a] mb-2 font-medium">
            {[15,16,17,18,19,20,21].map((d,i) => (
              <div key={i} className={`flex flex-col items-center gap-1`}>
                <span className="text-xs text-[#6b7280]">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span>
                <span className={`w-7 h-7 flex items-center justify-center rounded-full ${d===19 ? 'bg-[#432143] text-white font-bold' : ''}`}>{d}</span>
              </div>
            ))}
          </div>
          <div className="max-h-[370px] overflow-y-auto pr-1">
            {recentAlertsToShow.map((alert, _i) => (
              <div
                key={alert.id}
                className="flex items-center bg-[#fafbfc] rounded-xl mb-2 p-3 gap-3 shadow-sm border-l-4 cursor-pointer"
                style={{ borderColor: alert.type==='security'?'#7c3aed':'#eab308' }}
                onClick={() => navigate('/alerts', { state: { alertId: alert.id } })}
              >
                <div className="flex-1">
                  <div className="font-bold text-[#23223a] text-sm mb-1">{alert.title}</div>
                  <div className="text-xs text-gray-500">{alert.description}</div>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap font-semibold">{alert.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="font-semibold text-lg">Track Baggage</div>
          <div className="flex gap-2 items-center w-full md:w-auto justify-end">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-64 text-left"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="relative">
              <button
                className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 text-left"
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                type="button"
                style={{ minWidth: 120 }}
              >
                {statusFilter === 'All' ? 'Status' : statusFilter}
                <ChevronDown className="h-4 w-4 ml-auto" />
              </button>
              {isStatusDropdownOpen && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 text-left">
                  {statusOptions.map(option => (
                    <button
                      key={option}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50"
                      onClick={() => {
                        setStatusFilter(option);
                        setIsStatusDropdownOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-[#f5f6f7] text-[#23223a]">
              <tr>
                <th className="p-3 font-semibold text-left"><input type="checkbox" /></th>
                <th className="p-3 font-semibold text-left">PNR Number</th>
                <th className="p-3 font-semibold text-left">Flight Number</th>
                <th className="p-3 font-semibold text-left">Baggage Tag Number</th>
                <th className="p-3 font-semibold text-left">Status</th>
                <th className="p-3 font-semibold text-left">Last Location</th>
                <th className="p-3 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBaggage.map((b, _i) => (
                <tr key={b.id} className="border-b hover:bg-[#f5f6f7]">
                  <td className="p-3"><input type="checkbox" /></td>
                  <td className="p-3">{b.pnrNumber}</td>
                  <td className="p-3">{b.flightNumber}</td>
                  <td className="p-3">{b.baggageTag}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full font-medium text-xs ${statusColors[b.status]}`}>{b.status}</span>
                  </td>
                  <td className="p-3">{b.lastLocation}</td>
                  <td className="p-3 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800"><Eye size={18} /></button>
                    <button className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}