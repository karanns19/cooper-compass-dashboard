// components/LostAndFound/LostAndFoundTable.tsx

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DataTable from "react-data-table-component";
import { lostAndFoundData } from "../../data/LostAndFoundData";
import { lostAndFoundTheme } from "./LostAndFoundTheme";
import { getLostAndFoundColumns } from "./LostAndFoundColumns";
import { statusColors } from "./LostAndFoundStatusColors";
import { LostItem } from "../../data/LostAndFoundData";

// Apply the custom theme
lostAndFoundTheme();

export default function LostAndFoundTable() {
  const [items, setItems] = useState<LostItem[]>(lostAndFoundData);
  const [selectedItem, setSelectedItem] = useState<LostItem | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<LostItem["status"]>("Found");
  const [remark, setRemark] = useState("");
  const [filterText, setFilterText] = useState("");

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
  

  // Filter items based on search input
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.flightNumber.toLowerCase().includes(filterText.toLowerCase()) ||
      item.status.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#432143] mb-4">Lost & Found</h1>

      {/* Search Bar */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search Item / Flight / Status"
          className="border border-gray-300 rounded px-3 py-2 text-sm w-80"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      {/* Data Table */}
      <DataTable
        columns={getLostAndFoundColumns(openDetailModal)}
        data={filteredItems}
        theme="custom"
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
