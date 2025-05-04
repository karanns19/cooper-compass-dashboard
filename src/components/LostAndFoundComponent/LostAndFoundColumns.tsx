// components/LostAndFound/lostAndFoundColumns.ts

import { Eye } from "lucide-react";
import { LostItem } from "../../data/LostAndFoundData";
import { statusColors } from "./LostAndFoundStatusColors";

// Define table columns separately
export const getLostAndFoundColumns = (openDetailModal: (item: LostItem) => void) => [
  {
    name: "Item Image",
    cell: (row: LostItem) => (
      <img src={row.image} alt={row.name} className="w-10 h-10 rounded object-cover" />
    ),
    sortable: false,
    grow: 0.5,
  },
  {
    name: "Item Name",
    selector: (row: LostItem) => row.name,
    sortable: true,
  },
  {
    name: "Flight Number",
    selector: (row: LostItem) => row.flightNumber,
    sortable: true,
  },
  {
    name: "Baggage Tag Number",
    selector: (row: LostItem) => row.baggageTag,
    sortable: true,
  },
  {
    name: "Status",
    cell: (row: LostItem) => (
      <span className={`px-3 py-1 rounded-full text-sm ${statusColors[row.status]}`}>
        {row.status}
      </span>
    ),
    sortable: true,
  },
  {
    name: "Last Location",
    selector: (row: LostItem) => row.lastLocation,
    sortable: false,
  },
  {
    name: "Action",
    cell: (row: LostItem) => (
      <button
        onClick={() => openDetailModal(row)}
        className="text-blue-500 hover:text-blue-700 focus:outline-none cursor-pointer"
      >
        <Eye size={18} />
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
