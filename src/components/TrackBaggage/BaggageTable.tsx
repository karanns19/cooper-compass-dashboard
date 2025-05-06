import { AnimatePresence } from "framer-motion";
import { baggageData, BaggageItem } from "../../data/BaggageData";
import { useState } from "react";
import { BaggageModal } from "./BaggageModal";
import DataTable from "react-data-table-component";
import { Eye } from "lucide-react";
import { Trash2 } from "lucide-react";
import BaggageIcon from '../../assets/icons/track baggage.png'

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  "In Transit": "bg-blue-100 text-blue-700",
  Missing: "bg-red-100 text-red-700",
};
const statusDotColors: Record<string, string> = {
  Delivered: "bg-green-400",
  "In Transit": "bg-blue-400",
  Missing: "bg-red-400",
};

export const BaggageTable = () => {
  const [selectedItem, setSelectedItem] = useState<BaggageItem | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const statusOptions = ["All", "Delivered", "In Transit", "Missing"];

  const filteredData = baggageData.filter((row) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      row.passengerName.toLowerCase().includes(searchLower) ||
      row.pnrNumber.toLowerCase().includes(searchLower) ||
      row.flightNumber.toLowerCase().includes(searchLower) ||
      row.baggageTag.toLowerCase().includes(searchLower);
    const matchesStatus = status === "All" || row.status === status;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      name: <input type="checkbox" className="accent-[#432143]" />,
      cell: () => <input type="checkbox" className="accent-[#432143]" />,
      width: "56px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "PNR Number",
      selector: (row: BaggageItem) => row.pnrNumber,
      sortable: true,
    },
    {
      name: "Flight Number",
      selector: (row: BaggageItem) => row.flightNumber,
      sortable: true,
    },
    {
      name: "Baggage Tag Number",
      selector: (row: BaggageItem) => row.baggageTag,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: BaggageItem) => row.status,
      sortable: true,
      cell: (row: BaggageItem) => (
        <span className={`flex items-center gap-2 px-3 py-1 rounded-full font-medium text-xs ${statusColors[row.status]}`}
          style={{ minWidth: 90 }}
        >
          <span className={`w-2 h-2 rounded-full ${statusDotColors[row.status]}`}></span>
          {row.status}
        </span>
      ),
    },
    {
      name: "Last Location",
      selector: (row: BaggageItem) => row.lastLocation,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: BaggageItem) => (
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedItem(row)}
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
            title="View"
          >
            <Eye size={18} />
          </button>
          <button
            className="text-red-500 hover:text-red-700 cursor-pointer"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-white rounded-xl p-4 shadow flex items-center justify-center">
          <img src={BaggageIcon} alt="Baggage" className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#23223a]">Track Baggage</h1>
          <p className="text-gray-500 text-sm">Track baggage status</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="bg-[#432143] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold shadow hover:bg-[#321032]">
            Export <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 mt-4">
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
                {status === 'All' ? 'Status' : status}
                <svg className="h-4 w-4 ml-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
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
            rows: { style: { minHeight: '56px', backgroundColor: '#fff' } },
            headCells: {
              style: {
                fontWeight: '600',
                fontSize: '15px',
                backgroundColor: '#faf7fb',
                color: '#432143',
                borderBottom: '1px solid #f3e8ff',
              },
            },
            cells: {
              style: {
                fontSize: '15px',
                color: '#23223a',
                borderBottom: '1px solid #f3f4f6',
              },
            },
          }}
        />
      </div>
      <AnimatePresence>
        {selectedItem && (
          <BaggageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BaggageTable;


// import { AnimatePresence } from "framer-motion";
// import { baggageData, BaggageItem } from "../../data/BaggageData";
// import { useState } from "react";
// import { BaggageModal } from "./BaggageModal";
// import DataTable from "react-data-table-component";
// import { Eye } from "lucide-react";

// export const BaggageTable = () => {
//   const [selectedItem, setSelectedItem] = useState<BaggageItem | null>(null);

//   const columns = [
//     {
//       name: "Passenger Name",
//       selector: (row: BaggageItem) => row.passengerName,
//       sortable: true,
//     },
//     {
//       name: "PNR Number",
//       selector: (row: BaggageItem) => row.pnrNumber,
//     },
//     {
//       name: "Flight Number",
//       selector: (row: BaggageItem) => row.flightNumber,
//     },
//     {
//       name: "Baggage Tag",
//       selector: (row: BaggageItem) => row.baggageTag,
//     },
//     {
//       name: "Status",
//       selector: (row: BaggageItem) => row.status,
//       cell: (row: BaggageItem) => (
//         <span className={`px-2 py-1 rounded-full text-white text-xs ${
//           row.status === "Delivered"
//             ? "bg-green-500"
//             : row.status === "In Transit"
//             ? "bg-blue-500"
//             : "bg-red-500"
//         }`}>
//           {row.status}
//         </span>
//       ),
//     },
//     {
//       name: "Last Location",
//       selector: (row: BaggageItem) => row.lastLocation,
//     },
//     {
//       name: "Action",
//       cell: (row: BaggageItem) => (
//         <button
//           onClick={() => setSelectedItem(row)}
//           className="text-blue-600 hover:text-blue-800 cursor-pointer"
//         >
//           <Eye size={18} />
//         </button>
//       ),
//     },
//   ];

//   return (
//     <div className="p-6">
//       <DataTable
//         title="Track Baggage"
//         columns={columns}
//         data={baggageData}
//         pagination
//         highlightOnHover
//         responsive
//       />
//       <AnimatePresence>
//         {selectedItem && (
//           <BaggageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default BaggageTable;