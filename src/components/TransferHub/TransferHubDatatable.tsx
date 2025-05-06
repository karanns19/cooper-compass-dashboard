/* eslint-disable @typescript-eslint/prefer-as-const */
import { useState } from 'react';
import { dummyData, BaggageData } from '../../data/TransferHubData.ts';
import DataTable, { TableColumn } from 'react-data-table-component';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trash2 } from 'lucide-react';
import TransferHubIcon from '../../assets/icons/transferHubIcon.png'

export default function Page() {
  const [data, setData] = useState(dummyData);
  const [selectedRow, setSelectedRow] = useState<BaggageData | null>(null);
  const [statusUpdateVisible, setStatusUpdateVisible] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState<{ status: 'Pending' | 'Issue' | 'Completed'; remark: string }>({ status: 'Pending', remark: '' });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const statusOptions = ["All", "Pending", "Issue", "Completed"];

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Issue: 'bg-red-100 text-red-700',
    Completed: 'bg-green-100 text-green-700',
  };
  const statusDotColors = {
    Pending: 'bg-yellow-400',
    Issue: 'bg-red-400',
    Completed: 'bg-green-400',
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

  const filteredData = data.filter((row) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      row.from.toLowerCase().includes(searchLower) ||
      row.to.toLowerCase().includes(searchLower) ||
      row.connectingFlight.toLowerCase().includes(searchLower) ||
      row.baggageTag.toLowerCase().includes(searchLower);
    const matchesStatus = status === "All" || row.status === status;
    return matchesSearch && matchesStatus;
  });

  const columns: TableColumn<BaggageData>[] = [
    {
      name: <input type="checkbox" className="accent-[#432143]" />,
      cell: () => <input type="checkbox" className="accent-[#432143]" />,
      width: "56px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    { name: 'From Flight', selector: (row) => row.from, sortable: true },
    { name: 'To Flight', selector: (row) => row.to, sortable: true },
    { name: 'Baggage Tag', selector: (row) => row.baggageTag, sortable: true },
    { name: 'Last Update', selector: (row) => row.arrivalTime, sortable: true },
    {
      name: 'Status',
      cell: (row) => (
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
      name: 'Action',
      cell: (row) => (
        <div className="flex gap-2 justify-center items-center w-full h-full">
          <button
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
            title="View"
            onClick={() => {
              setSelectedRow(row);
              setStatusUpdate({ status: row.status, remark: row.comments || '' });
              setStatusUpdateVisible(false);
            }}
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
      width: '80px',
      center: true,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-white rounded-xl p-4 shadow flex items-center justify-center">
          <img src={TransferHubIcon} alt="Transfer Hub" className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#23223a]">Transfer Hub</h1>
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
          <div className="font-semibold text-lg">Transfer Hub</div>
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