import { useState } from "react";
import DataTable from "react-data-table-component";
import { Eye } from "lucide-react";
import { transferHubData, TransferHubItem } from "../../data/TransferHubData";
import { TransferHubModal } from "./TransferHubModal";

const getStatusChip = (status: TransferHubItem["status"]) => {
  switch (status) {
    case "Pending":
      return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">Pending</span>;
    case "Issue":
      return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">Issue</span>;
    case "Completed":
      return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">Completed</span>;
    default:
      return null;
  }
};

export const TransferHubTable = () => {
  const [selectedItem, setSelectedItem] = useState<TransferHubItem | null>(null);

  const columns = [
    {
      name: "From Flight",
      selector: (row: TransferHubItem) => row.fromFlight,
      sortable: true,
    },
    {
      name: "To Flight",
      selector: (row: TransferHubItem) => row.toFlight,
      sortable: true,
    },
    {
      name: "Baggage Tag",
      selector: (row: TransferHubItem) => row.baggageTag,
      sortable: true,
    },
    {
      name: "Last Update",
      selector: (row: TransferHubItem) => row.lastUpdate,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: TransferHubItem) => getStatusChip(row.status),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: TransferHubItem) => (
        <button
          onClick={() => setSelectedItem(row)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Eye size={20} />
        </button>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Transfer Hub</h2>
      <DataTable
        columns={columns}
        data={transferHubData}
        pagination
        highlightOnHover
        dense
        customStyles={{
          headRow: {
            style: {
              backgroundColor: "#fafafa",
              fontWeight: "bold",
            },
          },
          rows: {
            style: {
              minHeight: "60px",
            },
          },
        }}
      />
      {selectedItem && (
  <TransferHubModal
    item={selectedItem}
    onClose={() => setSelectedItem(null)}
  />
)}

    </div>
  );
};
