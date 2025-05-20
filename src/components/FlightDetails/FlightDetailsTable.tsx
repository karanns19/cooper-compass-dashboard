import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'lucide-react';
import { FaPlane } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Flight {
  flightNumber: string;
  airline?: string;
  airport?: string;
  status: 'Scheduled' | 'Arrived' | 'Delayed' | 'Flights in Air';
  departureTime: string;
  arrivalTime: string;
  counterpartAirport: string;
  direction: 'Arrival' | 'Departure';
}

const dummyFlightsAirline: Flight[] = [
  {
    flightNumber: 'AA 100',
    airline: 'Air India',
    status: 'Scheduled',
    departureTime: '2025-05-04 08:30 UTC',
    arrivalTime: '2025-05-04 12:45 UTC',
    counterpartAirport: 'DEL (Delhi)',
    direction: 'Arrival',
  },
  {
    flightNumber: 'EK 501',
    airline: 'Emirates',
    status: 'Arrived',
    departureTime: '2025-05-04 10:15 UTC',
    arrivalTime: '2025-05-04 14:30 UTC',
    counterpartAirport: 'DXB (Dubai)',
    direction: 'Departure',
  },
  {
    flightNumber: 'BA 174',
    airline: 'British Airways',
    status: 'Delayed',
    departureTime: '2025-05-04 16:00 UTC',
    arrivalTime: '2025-05-04 20:25 UTC',
    counterpartAirport: 'FRA (Frankfurt)',
    direction: 'Arrival',
  },
  {
    flightNumber: 'QR 845',
    airline: 'Qatar Airways',
    status: 'Flights in Air',
    departureTime: '2025-05-04 05:50 UTC',
    arrivalTime: '2025-05-04 09:15 UTC',
    counterpartAirport: 'DOH (Doha)',
    direction: 'Arrival',
  },
  {
    flightNumber: 'LH 760',
    airline: 'Lufthansa',
    status: 'Flights in Air',
    departureTime: '2025-05-04 11:00 UTC',
    arrivalTime: '2025-05-04 19:30 UTC',
    counterpartAirport: 'LHR (London Heathrow)',
    direction: 'Departure',
  },
  {
    flightNumber: 'SQ 317',
    airline: 'Singapore Airlines',
    status: 'Delayed',
    departureTime: '2025-05-04 13:25 UTC',
    arrivalTime: '2025-05-04 17:40 UTC',
    counterpartAirport: 'SIN (Singapore)',
    direction: 'Departure',
  },
  {
    flightNumber: 'UA 101',
    airline: 'United Airlines',
    status: 'Arrived',
    departureTime: '2025-05-04 07:10 UTC',
    arrivalTime: '2025-05-04 11:55 UTC',
    counterpartAirport: 'EWR (Newark)',
    direction: 'Arrival',
  },
  {
    flightNumber: 'EK 502',
    airline: 'Emirates',
    status: 'Scheduled',
    departureTime: '2025-05-04 14:25 UTC',
    arrivalTime: '2025-05-04 16:35 UTC',
    counterpartAirport: 'MUM (Mumbai)',
    direction: 'Departure',
  },
];

const dummyFlightsAirport: Flight[] = [
  {
    flightNumber: 'BLR 101',
    airport: 'Bengaluru',
    status: 'Scheduled',
    departureTime: '2025-05-04 09:00 UTC',
    arrivalTime: '2025-05-04 13:00 UTC',
    counterpartAirport: 'DEL (Delhi)',
    direction: 'Arrival',
  },
  {
    flightNumber: 'BOM 202',
    airport: 'Mumbai',
    status: 'Arrived',
    departureTime: '2025-05-04 11:30 UTC',
    arrivalTime: '2025-05-04 15:45 UTC',
    counterpartAirport: 'HYD (Hyderabad)',
    direction: 'Departure',
  },
  {
    flightNumber: 'DEL 303',
    airport: 'Delhi',
    status: 'Delayed',
    departureTime: '2025-05-04 17:00 UTC',
    arrivalTime: '2025-05-04 21:25 UTC',
    counterpartAirport: 'CCU (Kolkata)',
    direction: 'Arrival',
  },
  {
    flightNumber: 'HYD 404',
    airport: 'Hyderabad',
    status: 'Flights in Air',
    departureTime: '2025-05-04 06:50 UTC',
    arrivalTime: '2025-05-04 10:15 UTC',
    counterpartAirport: 'BOM (Mumbai)',
    direction: 'Arrival',
  },
  {
    flightNumber: 'CCU 505',
    airport: 'Kolkata',
    status: 'Flights in Air',
    departureTime: '2025-05-04 12:00 UTC',
    arrivalTime: '2025-05-04 18:30 UTC',
    counterpartAirport: 'BLR (Bengaluru)',
    direction: 'Departure',
  },
  {
    flightNumber: 'BLR 606',
    airport: 'Bengaluru',
    status: 'Delayed',
    departureTime: '2025-05-04 14:25 UTC',
    arrivalTime: '2025-05-04 18:40 UTC',
    counterpartAirport: 'DEL (Delhi)',
    direction: 'Departure',
  },
  {
    flightNumber: 'BOM 707',
    airport: 'Mumbai',
    status: 'Arrived',
    departureTime: '2025-05-04 08:10 UTC',
    arrivalTime: '2025-05-04 12:55 UTC',
    counterpartAirport: 'HYD (Hyderabad)',
    direction: 'Arrival',
  },
  {
    flightNumber: 'DEL 808',
    airport: 'Delhi',
    status: 'Scheduled',
    departureTime: '2025-05-04 15:25 UTC',
    arrivalTime: '2025-05-04 17:35 UTC',
    counterpartAirport: 'CCU (Kolkata)',
    direction: 'Departure',
  },
];

const statusColors: Record<Flight['status'], string> = {
  'Scheduled': 'bg-green-100 text-green-700',
  'Arrived': 'bg-purple-100 text-purple-700',
  'Delayed': 'bg-orange-100 text-orange-700',
  'Flights in Air': 'bg-blue-100 text-blue-700',
};

const statusDotColors: Record<Flight['status'], string> = {
  'Scheduled': 'bg-green-400',
  'Arrived': 'bg-purple-400',
  'Delayed': 'bg-orange-400',
  'Flights in Air': 'bg-blue-400',
};

export default function FlightDetailsTable() {
  const location = useLocation();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(location.state?.status || 'All');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const statusOptions = ['All', 'Scheduled', 'Arrived', 'Delayed', 'Flights in Air'];

  useEffect(() => {
    if (location.state?.status) {
      setStatus(location.state.status);
    }
  }, [location.state]);

  const data = user?.userType === 'airport' ? dummyFlightsAirline : dummyFlightsAirport;

  const filteredData = data.filter(f => {
    const matchesSearch =
      (f.flightNumber.toLowerCase().includes(search.toLowerCase()) ||
      (f.airline && f.airline.toLowerCase().includes(search.toLowerCase())) ||
      (f.airport && f.airport.toLowerCase().includes(search.toLowerCase())) ||
      f.counterpartAirport.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = status === 'All' || f.status === status;
    return matchesSearch && matchesStatus;
  });

  const columns = user?.userType === 'airport'
    ? [
      {
        name: 'Flight Number',
        selector: (row: Flight) => row.flightNumber,
        sortable: true,
      },
      {
        name: 'Airline',
        selector: (row: Flight) => row.airline || '',
        sortable: true,
      },
      {
        name: 'Status',
        selector: (row: Flight) => row.status,
        sortable: true,
        cell: (row: Flight) => (
          <span className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status]}`}
            style={{ minWidth: 90 }}
          >
            <span className={`w-2 h-2 rounded-full ${statusDotColors[row.status]}`}></span>
            {row.status}
          </span>
        ),
      },
      {
        name: 'Departure Time',
        selector: (row: Flight) => row.departureTime,
        sortable: true,
      },
      {
        name: 'Arrival Time',
        selector: (row: Flight) => row.arrivalTime,
        sortable: true,
      },
      {
        name: 'Counterpart Airport',
        selector: (row: Flight) => row.counterpartAirport,
        sortable: true,
      },
      {
        name: 'Direction',
        selector: (row: Flight) => row.direction,
        sortable: true,
      },
    ]
    : [
      {
        name: 'Flight Number',
        selector: (row: Flight) => row.flightNumber,
        sortable: true,
      },
      {
        name: 'Airport',
        selector: (row: Flight) => row.airport || '',
        sortable: true,
      },
      {
        name: 'Status',
        selector: (row: Flight) => row.status,
        sortable: true,
        cell: (row: Flight) => (
          <span className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${statusColors[row.status]}`}
            style={{ minWidth: 90 }}
          >
            <span className={`w-2 h-2 rounded-full ${statusDotColors[row.status]}`}></span>
            {row.status}
          </span>
        ),
      },
      {
        name: 'Departure Time',
        selector: (row: Flight) => row.departureTime,
        sortable: true,
      },
      {
        name: 'Arrival Time',
        selector: (row: Flight) => row.arrivalTime,
        sortable: true,
      },
      {
        name: 'Counterpart Airport',
        selector: (row: Flight) => row.counterpartAirport,
        sortable: true,
      },
      {
        name: 'Direction',
        selector: (row: Flight) => row.direction,
        sortable: true,
      },
    ];

  return (
    <div className="p-6">
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white rounded-xl p-4 shadow flex items-center justify-center">
            <FaPlane className="text-2xl text-[#23223a] transform rotate-270" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#23223a]">Flight Details</h1>
            <p className="text-gray-500 text-sm">Live Flights, Clear & Quick.</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 mt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold text-lg">Track Flight</div>
          <div className="flex gap-2 w-full md:w-auto justify-end">
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
                {status === 'All' ? 'Status' : status}
                <ChevronDown className="h-4 w-4 ml-auto" />
              </button>
              {isStatusDropdownOpen && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 text-left">
                  {statusOptions.map(option => (
                    <button
                      key={option}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50"
                      onClick={() => {
                        setStatus(option);
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
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          customStyles={{
            rows: { style: { backgroundColor: "#ffffff" } },
            headCells: {
              style: {
                fontWeight: "600",
                fontSize: "14px",
                backgroundColor: "#f5f6f7",
                color: "#432143",
              },
            },
          }}
        />
      </div>
    </div>
  );
} 