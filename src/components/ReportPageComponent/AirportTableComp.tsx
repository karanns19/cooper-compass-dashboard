import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import data from '../../data/ReportTableData.json';

interface FlightDataRow {
  flightNumber: string;
  from: string;
  to: string;
  totalCheckInBaggage?: number;
  totalLoadedBaggage?: number;
  missedBaggageDeparture?: number;
  totalUnloadedBaggage?: number;
  totalCheckOutBaggage?: number;
  missedBaggageArrival?: number;
  time: string;
  date: string;
}

const ReportDataTable: React.FC = () => {
  const [flightType, setFlightType] = useState<'departure' | 'arrival'>('departure');
  const [filterText, setFilterText] = useState('');

  const filteredData = data
  .filter((item) => item.flightType === flightType)
  .filter((item) =>
    item.flightNumber.toLowerCase().includes(filterText.toLowerCase()) ||
    item.from.toLowerCase().includes(filterText.toLowerCase()) ||
    item.to.toLowerCase().includes(filterText.toLowerCase())
  );


  const departureColumns: TableColumn<FlightDataRow>[] = [
    { name: 'Flight', selector: (row) => row.flightNumber, sortable: true },
    { name: 'From', selector: (row) => row.from, sortable: true },
    { name: 'To', selector: (row) => row.to, sortable: true },
    { name: 'Check-In', selector: (row) => row.totalCheckInBaggage?.toString() || '-', sortable: true },
    { name: 'Loaded', selector: (row) => row.totalLoadedBaggage?.toString() || '-', sortable: true },
    { name: 'Missed', selector: (row) => row.missedBaggageDeparture?.toString() || '-', sortable: true },
    { name: 'Time', selector: (row) => row.time, sortable: true },
    { name: 'Date', selector: (row) => row.date, sortable: true },
  ];

  const arrivalColumns: TableColumn<FlightDataRow>[] = [
    { name: 'Flight', selector: (row) => row.flightNumber, sortable: true },
    { name: 'From', selector: (row) => row.from, sortable: true },
    { name: 'To', selector: (row) => row.to, sortable: true },
    { name: 'Unloaded', selector: (row) => row.totalUnloadedBaggage?.toString() || '-', sortable: true },
    { name: 'Check-Out', selector: (row) => row.totalCheckOutBaggage?.toString() || '-', sortable: true },
    { name: 'Missed', selector: (row) => row.missedBaggageArrival?.toString() || '-', sortable: true },
    { name: 'Time', selector: (row) => row.time, sortable: true },
    { name: 'Date', selector: (row) => row.date, sortable: true },
  ];

  return (
    <div className="mt-6 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-md">

        <h3 className='text-center font-semibold text-lg'>Baggage Summary</h3>
        
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFlightType('departure')}
              className={`px-4 py-2 rounded-lg text-sm ${
                flightType === 'departure' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Departure
            </button>
            <button
              onClick={() => setFlightType('arrival')}
              className={`px-4 py-2 rounded-lg text-sm ${
                flightType === 'arrival' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Arrival
            </button>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search Flight/From/To"
              className="border rounded-lg px-4 py-2 w-full md:w-64"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            {/* <CSVLink
              data={filteredData}
              filename={`Flight_Report_${flightType}.csv`}
              className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 text-sm"
            >
              <FiDownload className="mr-1" /> Export
            </CSVLink> */}
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={flightType === 'departure' ? departureColumns : arrivalColumns}
          data={filteredData}
          pagination
        //   selectableRows
          highlightOnHover
          pointerOnHover
          responsive
          striped
          customStyles={{
            rows: { style: { minHeight: '55px' } },
            headCells: { style: { backgroundColor: '#f9fafb', fontWeight: '600' } },
          }}
        />
      </div>
    </div>
  );
};

export default ReportDataTable;
