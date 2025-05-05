/* eslint-disable @typescript-eslint/prefer-as-const */
import { useState } from 'react';
import { dummyData, BaggageData } from '../../data/TransferHubData.ts';
import DataTable, { TableColumn } from 'react-data-table-component';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';

export default function Page() {
  const [data, setData] = useState(dummyData);
  const [selectedRow, setSelectedRow] = useState<BaggageData | null>(null);
  const [statusUpdateVisible, setStatusUpdateVisible] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState<{ status: 'Pending' | 'Issue' | 'Completed'; remark: string }>({ status: 'Pending', remark: '' });

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Issue: 'bg-red-100 text-red-700',
    Completed: 'bg-green-100 text-green-700',
  };

  const handleStatusUpdate = () => {
    if (!selectedRow) return;

    const updatedData = data.map((item) =>
      item.id === selectedRow.id
        ? { ...item, status: statusUpdate.status, comments: statusUpdate.remark }
        : item
    );

    setData(updatedData);
    setSelectedRow(null); // Close modal
    setStatusUpdate({ status: 'Pending', remark: '' });
    setStatusUpdateVisible(false);
  };

  const handleMarkCompleted = () => {
    if (!selectedRow) return;

    const updatedData = data.map((item) =>
      item.id === selectedRow.id ? { ...item, status: 'Completed' as 'Completed' } : item
    );

    setData(updatedData);
    setSelectedRow(null); // Close modal
  };

  const columns: TableColumn<BaggageData>[] = [
    { name: 'From', selector: (row) => row.from },
    { name: 'To', selector: (row) => row.to },
    { name: 'Connecting Flight', selector: (row) => row.connectingFlight },
    { name: 'Transist Baggage', selector: (row) => row.baggageTag },
    { name: 'Arrival Time', selector: (row) => row.arrivalTime },
    {
      name: 'Status',
      cell: (row) => (
        <span className={`px-2 py-1 rounded-full text-sm ${statusColors[row.status]}`}>
          {row.status}
        </span>
      ),
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex justify-center items-center w-full h-full">
          <Eye
            className="cursor-pointer text-blue-500 hover:text-blue-700"
            onClick={() => {
              setSelectedRow(row);
              setStatusUpdate({ status: row.status, remark: row.comments || '' });
              setStatusUpdateVisible(false);
            }}
          />
        </div>
      ),
      width: '80px',
      center: true,
    },
    { name: 'Comments', selector: (row) => row.comments, grow: 2 },
  ];

  return (
    <div className=" p-6">
      <h2 className="text-2xl font-bold text-[#432143] mb-4">Transfer Hub</h2>
      <div className="w-full">
        <DataTable
          columns={columns}
          data={data}
          customStyles={{
            rows: { style: { minHeight: '64px' } },
            headCells: {
              style: {
                fontWeight: "600",
                fontSize: "13px",
                backgroundColor: "#f5f6f7",
                color: "#432143",
              },
            }
          }}
        />
      </div>

      <AnimatePresence>
        {selectedRow && (
          <motion.div
            key="modal"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white shadow-xl z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Baggage Info</h2>
              <button
                onClick={() => setSelectedRow(null)}
                className="text-gray-500 hover:text-black text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <p><strong>From:</strong> {selectedRow.from}</p>
              <p><strong>To:</strong> {selectedRow.to}</p>
              <p><strong>Connecting Flight Number:</strong> {selectedRow.connectingFlight}</p>
              <p><strong>Baggage ID:</strong> {selectedRow.baggageTag}</p>
              <p><strong>Arrival Time:</strong> {selectedRow.arrivalTime}</p>
              <p><strong>Status:</strong>{selectedRow.status}</p>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setStatusUpdateVisible((prev) => !prev)}
                className="bg-[#432143] text-white px-4 py-2 rounded"
              >
                Update Status
              </button>
              <button
                onClick={handleMarkCompleted}
                className="bg-white text-[#432143] border border-[#432143] px-4 py-2 rounded"
              >
                Mark as Completed
              </button>
            </div>

            {statusUpdateVisible && (
              <div className="mt-6 border-t pt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={statusUpdate.status}
                    onChange={(e) =>
                      setStatusUpdate({ ...statusUpdate, status: e.target.value as 'Pending' | 'Issue' | 'Completed' })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Select status</option>
                    <option value="Pending">Pending</option>
                    <option value="Issue">Issue</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Remark</label>
                  <textarea
                    value={statusUpdate.remark}
                    onChange={(e) =>
                      setStatusUpdate({ ...statusUpdate, remark: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows={3}
                    placeholder="Enter remark here..."
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setStatusUpdateVisible(false)}
                    className="px-4 py-2 border rounded text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStatusUpdate}
                    className="px-4 py-2 bg-[#432143] text-white rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}