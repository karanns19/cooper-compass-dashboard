import { AnimatePresence } from "framer-motion";
import { baggageData, BaggageItem } from "../../data/BaggageData";
import { useState } from "react";
import { BaggageModal } from "./BaggageModal";
import DataTable from "react-data-table-component";
import { Eye } from "lucide-react";

export const BaggageTable = () => {
  const [selectedItem, setSelectedItem] = useState<BaggageItem | null>(null);

  const columns = [
    {
      name: "Passenger Name",
      selector: (row: BaggageItem) => row.passengerName,
      sortable: true,
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
      name: "Baggage Tag",
      selector: (row: BaggageItem) => row.baggageTag,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: BaggageItem) => row.status,
      sortable: true,
      cell: (row: BaggageItem) => (
        <span className={`px-2 py-1 rounded-full text-white text-xs ${
          row.status === "Delivered"
            ? "bg-green-500"
            : row.status === "In Transit"
            ? "bg-blue-500"
            : "bg-red-500"
        }`}>
          {row.status}
        </span>
      ),
    },
    {
      name: "Last Location",
      selector: (row: BaggageItem) => row.lastLocation,
    },
    {
      name: "Action",
      cell: (row: BaggageItem) => (
        <button
          onClick={() => setSelectedItem(row)}
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <Eye size={18} />
        </button>
      ),
    },
  ];

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-[#432143] mb-4">Track Baggage</h2>
        <DataTable
          columns={columns}
          data={baggageData}
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