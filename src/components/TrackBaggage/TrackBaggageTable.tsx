import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FiEye } from 'react-icons/fi';
// import { BsPinAngleFill } from 'react-icons/bs'; // New pin icon
import baggageData from '../../data/TrackBaggageData.json';
import BaggageTimeline from './BaggageTimeline';

interface BaggageRow {
  passengerName: string;
  pnrNumber: string;
  flightNumber: string;
  baggageTag: string;
  status: string;
  lastLocation: string;
}

const TrackBaggageTable: React.FC = () => {
  const [selectedBaggage, setSelectedBaggage] = useState<BaggageRow | null>(null);
  const [pinnedRow, setPinnedRow] = useState<BaggageRow | null>(null);

  const statusBadge = (status: string) => {
    const base = 'px-2 py-1 rounded-full text-xs font-semibold';
    switch (status) {
      case 'Delivered':
        return <span className={`${base} bg-green-100 text-green-700`}>{status}</span>;
      case 'In Transit':
        return <span className={`${base} bg-blue-100 text-blue-700`}>{status}</span>;
      case 'Missing':
        return <span className={`${base} bg-red-100 text-red-700`}>{status}</span>;
      default:
        return <span className={`${base} bg-gray-100 text-gray-700`}>{status}</span>;
    }
  };

  const handlePinRow = (row: BaggageRow) => {
    if (pinnedRow?.pnrNumber === row.pnrNumber) {
      setPinnedRow(null); // Unpin if the same row is clicked again
    } else {
      setPinnedRow(row);
    }
  };

  const columns: TableColumn<BaggageRow>[] = [
    {
      name: 'PNR',
      selector: (row) => row.pnrNumber,
      sortable: true,
    },
    {
      name: 'Flight',
      selector: (row) => row.flightNumber,
      sortable: true,
    },
    {
      name: 'Baggage Tag',
      selector: (row) => row.baggageTag,
      sortable: true,
    },
    {
      name: 'Status',
      cell: (row) => statusBadge(row.status),
      sortable: true,
    },
    {
      name: 'Last Location',
      selector: (row) => row.lastLocation,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex gap-3">
          <button
            className="text-blue-500 cursor-pointer"
            onClick={() => setSelectedBaggage(row)}
          >
            <FiEye size={18} />
          </button>
          <button
            className={`text-yellow-500 ${pinnedRow?.pnrNumber === row.pnrNumber ? 'font-bold' : ''}`}
            onClick={() => handlePinRow(row)}
          >
            {/* <BsPinAngleFill size={18} /> */}
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

//   const customRowStyles = (row: BaggageRow): { style?: React.CSSProperties } => {
//     if (pinnedRow?.pnrNumber === row.pnrNumber) {
//       return {
//         style: {
//           backgroundColor: '#FEF9C3', // Tailwind Yellow-100 equivalent
//         },
//       };
//     }
//     return {};
//   };

  // Arrange pinned row at the top
  const finalData = baggageData;

  return (
    <div className="p-2 bg-white rounded-xl shadow-md relative min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Track Baggage</h2>
      <DataTable
        columns={columns}
        data={finalData}
        pagination
        highlightOnHover
        selectableRows
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
      {selectedBaggage && (
        <BaggageTimeline
          baggage={selectedBaggage}
          onClose={() => setSelectedBaggage(null)}
        />
      )}
    </div>
  );
};

export default TrackBaggageTable;