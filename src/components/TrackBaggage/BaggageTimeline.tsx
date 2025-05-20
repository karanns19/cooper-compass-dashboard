import React from 'react';
import { FiX } from 'react-icons/fi';
import { BaggageItem } from '../../data/BaggageData';

interface TimelineProps {
  baggage: BaggageItem;
  onClose: () => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-500";
    case "in progress":
      return "bg-blue-500 animate-pulse";
    case "alert":
      return "bg-red-500";
    case "delayed":
      return "bg-orange-500";
    case "pending":
    default:
      return "bg-gray-400";
  }
};

const BaggageTimeline: React.FC<TimelineProps> = ({ baggage, onClose }) => {
  return (
    <div className="fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg p-6 overflow-y-auto z-50">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Baggage Tracking Timeline</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 hover:cursor-pointer cursor-pointer">
          <FiX size={20} />
        </button>
      </div>

      {/* Baggage Info */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div><strong>Passenger:</strong> {baggage.passengerName}</div>
          <div><strong>PNR:</strong> {baggage.pnrNumber}</div>
          <div><strong>Flight:</strong> {baggage.flightNumber}</div>
          <div><strong>Bag Tag:</strong> {baggage.baggageTag}</div>
          <div><strong>Weight:</strong> {baggage.weight} kg</div>
          <div><strong>Status:</strong> {baggage.status}</div>
        </div>
        <div className="pt-2">
          <div className="flex items-center gap-2">
            <strong>Route:</strong>
            <span className="text-blue-600">{baggage.currentAirport} → {baggage.destinationAirport}</span>
          </div>
        </div>
        {baggage.transferDetails && (
          <div className="pt-2 border-t">
            <div className="font-semibold text-sm text-purple-600 mb-1">Transfer Information</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><strong>From Flight:</strong> {baggage.transferDetails.fromFlight}</div>
              <div><strong>To Flight:</strong> {baggage.transferDetails.toFlight}</div>
              <div><strong>Transfer Point:</strong> {baggage.transferDetails.transferPoint}</div>
            </div>
          </div>
        )}
      </div>

      {/* Timeline */}
        <div className="mt-6 space-y-6">
        {baggage.trackingTimeline.map((event, index) => (
            <div key={index} className="flex items-start gap-3">
            <div className={`w-4 h-4 ${getStatusColor(event.status)} rounded-full mt-1`}></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{event.title}</p>
                <span className="text-sm text-gray-500">{event.time}</span>
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
  );
};

export default BaggageTimeline;
