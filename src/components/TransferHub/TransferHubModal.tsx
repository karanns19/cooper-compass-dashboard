import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransferHubItem } from "../../data/TransferHubData";

interface TransferHubModalProps {
  item: TransferHubItem;
  onClose: () => void;
}

export const TransferHubModal = ({ item, onClose }: TransferHubModalProps) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [newStatus, setNewStatus] = useState(item.status);
  const [remark, setRemark] = useState("");

  // Mark as Read (example logic: set status to "Read")
  const handleMarkAsRead = () => {
    console.log("Marked as Read:", item.baggageTag);
    onClose();
  };

  // Update status (example logic)
  const handleUpdate = () => {
    console.log("Updated Status:", newStatus, "Remark:", remark);
    onClose();
  };

  return (
    <AnimatePresence>
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
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#432143]">Transfer Hub Details</h2>
            <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
          </div>

          {/* Modal Body */}
          <div className="space-y-4 text-gray-700">
            <div><b>From Flight:</b> {item.fromFlight}</div>
            <div><b>To Flight:</b> {item.toFlight}</div>
            <div><b>Baggage Tag:</b> {item.baggageTag}</div>
            <hr />
            <div><b>Last Update:</b> {item.lastUpdate}</div>
            <div><b>Current Status:</b> {item.status}</div>
          </div>

          {/* Action Buttons */}
          {!isUpdateMode && (
            <div className="flex gap-4 mt-[70px]">
              <button
                className="border border-[#432143] text-[#432143] font-semibold py-2 px-4 rounded-md w-1/2"
                onClick={handleMarkAsRead}
              >
                Mark as Read
              </button>
              <button
                className="bg-[#432143] text-white font-semibold py-2 px-4 rounded-md w-1/2"
                onClick={() => setIsUpdateMode(true)}
              >
                Update Baggage
              </button>
            </div>
          )}

          {/* Update Mode UI */}
          {isUpdateMode && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-[#432143]">Update Baggage Status</h3>
              <div className="space-y-4">
                {/* Status Selector */}
                <div>
                  <label className="block mb-1 text-sm">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as "Pending" | "Issue" | "Completed")}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="In Transit">In Transit</option>
                    <option value="Transferred">Transferred</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                {/* Remark Textarea */}
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
                  className="border border-[#432143] text-[#432143] font-semibold py-2 px-4 rounded-md w-1/2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#432143] text-white font-semibold py-2 px-4 rounded-md w-1/2"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// import { motion, AnimatePresence } from "framer-motion";
// import { TransferHubItem } from "../../data/TransferHubData";
// import { X } from "lucide-react";

// interface TransferHubModalProps {
//   item: TransferHubItem;
//   onClose: () => void;
// }

// export const TransferHubModal = ({ item, onClose }: TransferHubModalProps) => {
//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose} // Close when clicking outside
//       >
//         <motion.div
//           className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg relative"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.8, opacity: 0 }}
//           onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
//         >
//           {/* Close button */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//           >
//             <X size={20} />
//           </button>

//           {/* Modal Content */}
//           <h2 className="text-xl font-semibold mb-4 text-center">Baggage Details</h2>

//           <div className="space-y-3 text-sm">
//             <div className="flex justify-between">
//               <span className="text-gray-500">From Flight:</span>
//               <span className="font-medium">{item.fromFlight}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-500">To Flight:</span>
//               <span className="font-medium">{item.toFlight}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-500">Baggage Tag:</span>
//               <span className="font-medium">{item.baggageTag}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-500">Last Update:</span>
//               <span className="font-medium">{item.lastUpdate}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-500">Status:</span>
//               <span className="font-medium">{item.status}</span>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };
