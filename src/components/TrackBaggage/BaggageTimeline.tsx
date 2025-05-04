import React from 'react';
import { FiX } from 'react-icons/fi';

interface TimelineProps {
  baggage: {
    passengerName: string;
    pnrNumber: string;
    flightNumber: string;
    baggageTag: string;
    status: string;
    lastLocation: string;
  };
  onClose: () => void;
}

const BaggageTimeline: React.FC<TimelineProps> = ({ baggage, onClose }) => {
  const timelineSteps = [
    { label: 'Checked in at Airport', time: '7:30 AM' },
    { label: `Loaded on Flight ${baggage.flightNumber}`, time: '8:15 AM' },
    { label: 'In Transit', time: '9:30 AM' },
    { label: `Arrived at ${baggage.lastLocation}`, time: '11:00 AM' },
    { label: 'Placed on Baggage Belt 5', time: '11:15 AM' },
    { label: 'Picked Up by Passenger', time: '11:30 AM' },
  ];

  return (
    <div className="fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg p-6 overflow-y-auto z-50">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Baggage Tracking Timeline</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 hover:cursor-pointer cursor-pointer">
          <FiX size={20} />
        </button>
      </div>
      <div className="space-y-4">
        <div className="text-sm">
          <p><strong>PNR:</strong> {baggage.pnrNumber}</p>
          <p><strong>Flight:</strong> {baggage.flightNumber}</p>
          <p><strong>Baggage Tag:</strong> {baggage.baggageTag}</p>
        </div>
        <div className="mt-6 space-y-6">
          {timelineSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-4 h-4 bg-green-500 rounded-full mt-1"></div>
              <div>
                <p className="font-medium">{step.label}</p>
                <p className="text-sm text-gray-500">{step.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BaggageTimeline;
