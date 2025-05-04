import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { motion } from 'framer-motion';

interface Detail {
  from: string;
  to: string;
  destination: string;
  lastUpdated: string;
  location: string;
}

interface Props {
  data: {
    details: Detail[];
  };
}

const detailColumns: TableColumn<Detail>[] = [
  { name: 'From', selector: (row) => row.from, sortable: false },
  { name: 'To', selector: (row) => row.to, sortable: false },
  { name: 'Destination', selector: (row) => row.destination, sortable: false },
  { name: 'Last Updated', selector: (row) => row.lastUpdated, sortable: false },
  { name: 'Location', selector: (row) => row.location, sortable: false },
];

const ExpandedRow: React.FC<Props> = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    className="bg-gray-100 p-4 ml-6 rounded-lg"
  >
    <DataTable
      title="Baggage Transfer Details"
      columns={detailColumns}
      data={data.details}
      dense
      noHeader
      customStyles={{
        rows: {
          style: {
            minHeight: '40px',
          },
        },
        headCells: {
          style: {
            fontSize: '12px',
            backgroundColor: '#f3f4f6',
          },
        },
        cells: {
          style: {
            fontSize: '13px',
          },
        },
      }}
    />
  </motion.div>
);

export default ExpandedRow;
