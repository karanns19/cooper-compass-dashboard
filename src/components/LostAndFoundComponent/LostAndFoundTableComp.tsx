// components/LostAndFound/LostAndFoundTable.tsx

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DataTable from "react-data-table-component";
import { lostAndFoundData } from "../../data/LostAndFoundData";
import { lostAndFoundTheme } from "./LostAndFoundTheme";
import { statusColors } from "./LostAndFoundStatusColors";
import { LostItem } from "../../data/LostAndFoundData";
import { Trash2, Eye } from "lucide-react";
import LostAndFoundIcon from '../../assets/icons/LostAndFound.png'  
// Apply the custom theme
lostAndFoundTheme();

const statusOptions = ["All", "Found", "Reported", "Unclaimed", "Returned"];
const statusDotColors: Record<string, string> = {
  Found: "bg-green-400",
  Reported: "bg-yellow-400",
  Unclaimed: "bg-red-400",
  Returned: "bg-blue-400",
};

export default function LostAndFoundTable() {
  const [items, setItems] = useState<LostItem[]>(lostAndFoundData);
  const [selectedItem, setSelectedItem] = useState<LostItem | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<LostItem["status"]>("Found");
  const [remark, setRemark] = useState("");
  const [filterText, setFilterText] = useState("");
  const [status, setStatus] = useState("All");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Open item detail modal
  const openDetailModal = (item: LostItem) => {
    setSelectedItem(item);
  };

  // Close detail or update modal
  const closeDetailModal = () => {
    setSelectedItem(null);
    setIsUpdateModalOpen(false);
  };

  // Update item status
  const handleUpdateStatus = () => {
    if (!selectedItem) return;
    const updatedItems = items.map((item) =>
      item.id === selectedItem.id ? { ...item, status: newStatus } : item
    ) as LostItem[];
    setItems(updatedItems);
    closeDetailModal();
  };

  // Mark item as returned handler
  const handleMarkAsReturned = () => {
    if (!selectedItem) return;
    const updatedItems = items.map((item) =>
      item.id === selectedItem.id ? { ...item, status: "Returned" } : item
    ) as LostItem[];
    setItems(updatedItems);
    closeDetailModal();
  };

  // Filter items based on search input and status
  const filteredItems = items.filter(
    (item) =>
      (item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.flightNumber.toLowerCase().includes(filterText.toLowerCase()) ||
        item.status.toLowerCase().includes(filterText.toLowerCase())) &&
      (status === "All" || item.status === status)
  );

  // Columns for DataTable
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
      name: "Status",
      cell: (row: LostItem) => (
        <span className={`flex items-center gap-2 px-3 py-1 rounded-full font-medium text-xs ${statusColors[row.status]}`}
          style={{ minWidth: 90 }}
        >
          <span className={`w-2 h-2 rounded-full ${statusDotColors[row.status]}`}></span>
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
        <div className="flex gap-2">
          <button
            onClick={() => openDetailModal(row)}
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
          <img src={LostAndFoundIcon} alt="Lost and Found" className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#23223a]">Lost and Found</h1>
          <p className="text-gray-500 text-sm">Manage lost and found things</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="bg-[#432143] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold shadow hover:bg-[#321032]">
            Export <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 mt-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="font-semibold text-lg">Lost & Found</div>
          <div className="flex gap-2 items-center w-full md:w-auto justify-end">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-64 text-left"
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
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
          data={filteredItems}
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
      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex justify-end z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md h-full p-6 overflow-y-auto shadow-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#432143]">Lost Item Details</h2>
                <button onClick={closeDetailModal} className="text-gray-500 text-2xl">&times;</button>
              </div>

              {/* Item Details */}
              <div className="space-y-4 text-gray-700">
                <div><b>Flight Number:</b> {selectedItem.flightNumber}</div>
                <div><b>Baggage Tag:</b> {selectedItem.baggageTag}</div>
                <hr />
                <div><b>Item Description:</b> {selectedItem.description}</div>
                <div><b>Last Seen:</b> {selectedItem.lastLocation}</div>
                <div><b>Reported Date:</b> {selectedItem.reportedDate}</div>
                <div><b>Reference ID:</b> {selectedItem.referenceId}</div>
                <div><b>Current Status:</b> <span className={`px-3 py-1 rounded-full text-sm ${statusColors[selectedItem.status]}`}>{selectedItem.status}</span></div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-[50px]">
                <button
                  className="border border-[#432143] text-[#432143] font-semibold py-2 px-4 rounded-md w-1/2 hover:cursor-pointer"
                  onClick={handleMarkAsReturned}
                >
                  Mark as Returned
                </button>
                <button
                  className="bg-[#432143] text-white font-semibold py-2 px-4 rounded-md w-1/2 hover:cursor-pointer"
                  onClick={() => setIsUpdateModalOpen(true)}
                >
                  Update Status
                </button>
              </div>

              {/* Update Modal */}
              {isUpdateModalOpen && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-[#432143]">Update Status</h3>
                  <div className="space-y-4">
                    {/* Status Selector */}
                    <div>
                      <label className="block mb-1 text-sm">Status</label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as LostItem["status"])}
                        className="w-full border rounded-md p-2"
                      >
                        <option value="Found">Found</option>
                        <option value="Reported">Reported</option>
                        <option value="Unclaimed">Unclaimed</option>
                        <option value="Returned">Returned</option>
                      </select>
                    </div>

                    {/* Remark Field */}
                    <div>
                      <label className="block mb-1 text-sm">Remark</label>
                      <textarea
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="w-full border rounded-md p-2"
                        placeholder="Enter remark here..."
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Update Buttons */}
                  <div className="flex gap-4 mt-4">
                    <button
                      className="border border-[#432143] text-[#432143] font-semibold py-2 px-4 rounded-md w-1/2 hover:cursor-pointer"
                      onClick={closeDetailModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-[#432143] text-white font-semibold py-2 px-4 rounded-md w-1/2 hover:cursor-pointer"
                      onClick={handleUpdateStatus}
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
