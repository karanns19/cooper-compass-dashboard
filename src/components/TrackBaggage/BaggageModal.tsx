import { motion } from "framer-motion";
import { BaggageItem } from "../../data/BaggageData";
import { X } from "lucide-react";

interface BaggageModalProps {
  item: BaggageItem;
  onClose: () => void;
}

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "text-green-500";
    case "in progress":
      return "text-blue-500 animate-pulse";
    case "alert":
      return "text-red-500";
    case "delayed":
      return "text-orange-500";
    case "pending":
    default:
      return "text-gray-400";
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "✅";
    case "in progress":
      return "🔄";
    case "alert":
      return "⚠️";
    case "delayed":
      return "⏰";
    case "pending":
    default:
      return "⏳";
  }
};

export const BaggageModal = ({ item, onClose }: BaggageModalProps) => {
  if (!item) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween" }}
      className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Baggage Tracking Details</h2>
        <button onClick={onClose} className="hover:bg-gray-100 p-1 rounded-full">
          <X size={24} />
        </button>
      </div>

      {/* Baggage Info */}
      <div className="p-4 space-y-3 bg-gray-50">
        <div className="grid grid-cols-2 gap-2">
          <div><strong>Passenger:</strong> {item.passengerName}</div>
          <div><strong>PNR:</strong> {item.pnrNumber}</div>
          <div><strong>Flight:</strong> {item.flightNumber}</div>
          <div><strong>Bag Tag:</strong> {item.baggageTag}</div>
          <div><strong>Weight:</strong> {item.weight} kg</div>
          <div><strong>Status:</strong> {item.status}</div>
        </div>
        <div className="pt-2">
          <div className="flex items-center gap-2">
            <strong>Route:</strong>
            <span className="text-blue-600">{item.currentAirport} → {item.destinationAirport}</span>
          </div>
        </div>
        {item.transferDetails && (
          <div className="pt-2 border-t">
            <div className="font-semibold text-sm text-purple-600 mb-1">Transfer Information</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><strong>From Flight:</strong> {item.transferDetails.fromFlight}</div>
              <div><strong>To Flight:</strong> {item.transferDetails.toFlight}</div>
              <div><strong>Transfer Point:</strong> {item.transferDetails.transferPoint}</div>
            </div>
          </div>
        )}
      </div>

      {/* Timeline Events */}
      <div className="p-4">
        <h3 className="font-semibold mb-4">Tracking Timeline</h3>
        <div className="space-y-6">
        {item.trackingTimeline.map((event, idx) => (
          <div key={idx} className="flex items-start space-x-4">
            {/* Status Icon */}
            <div className={`text-2xl ${getStatusStyle(event.status)}`}>
              {getStatusIcon(event.status)}
            </div>

            {/* Event Details */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
              <p className="font-semibold">{event.title}</p>
                  <span className="text-xs text-gray-500">{event.time}</span>
                </div>
              {event.location && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-gray-500">Location:</span> {event.location}
                  </p>
              )}
                {event.details && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-gray-500">Details:</span> {event.details}
                  </p>
                )}
              </div>
            </div>
          ))}
          </div>
      </div>
    </motion.div>
  );
};


// import { BaggageItem } from "../../data/BaggageData";
// import { motion } from "framer-motion";

// interface BaggageModalProps {
//   item: BaggageItem | null;
//   onClose: () => void;
// }

// const getStatusStyle = (status: string) => {
//   switch (status.toLowerCase()) {
//     case "completed":
//       return "text-green-500";
//     case "on stage":
//       return "text-orange-500 animate-pulse";
//     case "canceled":
//       return "text-red-500";
//     case "pending":
//     default:
//       return "text-gray-400";
//   }
// };

// const getStatusIcon = (status: string) => {
//   switch (status.toLowerCase()) {
//     case "completed":
//       return "✅";
//     case "on stage":
//       return "🟠";
//     case "canceled":
//       return "❌";
//     case "pending":
//     default:
//       return "⏳";
//   }
// };

// export const BaggageModal = ({ item, onClose }: BaggageModalProps) => {
//   if (!item) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.8 }}
//         transition={{ duration: 0.3 }}
//         className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative"
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Baggage Tracking Timeline</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-600 hover:text-gray-900 text-2xl leading-none"
//           >
//             &times;
//           </button>
//         </div>

//         <div className="space-y-2">
//           <div><strong>PNR Number:</strong> {item.pnrNumber}</div>
//           <div><strong>Flight Number:</strong> {item.flightNumber}</div>
//           <div><strong>Baggage Tag:</strong> {item.baggageTag}</div>
//         </div>

//         <div className="mt-6 space-y-4">
//           {item.trackingTimeline.map((event, idx) => (
//             <div key={idx} className="flex items-start space-x-3">
//               <div className={`text-2xl ${getStatusStyle(event.status)}`}>
//                 {getStatusIcon(event.status)}
//               </div>
//               <div>
//                 <p className="font-semibold">{event.title}</p>
//                 {event.location && <p className="text-sm text-gray-500">{event.location}</p>}
//                 <p className="text-xs text-gray-400">{event.time}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };


// import { BaggageItem } from "../../data/BaggageData";
// import { motion } from "framer-motion";

// interface BaggageModalProps {
//   item: BaggageItem | null;
//   onClose: () => void;
// }

// export const BaggageModal = ({ item, onClose }: BaggageModalProps) => {
//   if (!item) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.8 }}
//         transition={{ duration: 0.3 }}
//         className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative"
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Baggage Tracking Timeline</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-600 hover:text-gray-900 text-2xl leading-none"
//           >
//             &times;
//           </button>
//         </div>

//         <div className="space-y-2">
//           <div><strong>PNR Number:</strong> {item.pnrNumber}</div>
//           <div><strong>Flight Number:</strong> {item.flightNumber}</div>
//           <div><strong>Baggage Tag:</strong> {item.baggageTag}</div>
//         </div>

//         <div className="mt-4 space-y-3">
//           {item.trackingTimeline.map((event, idx) => (
//             <div key={idx} className="flex items-start space-x-2">
//               <span className="text-green-500 mt-1">✔️</span>
//               <div>
//                 <p className="font-medium">{event.status}</p>
//                 {event.location && <p className="text-sm text-gray-500">{event.location}</p>}
//                 <p className="text-sm text-gray-400">{event.time}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };
