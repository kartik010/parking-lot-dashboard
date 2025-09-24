'use client';
import React, { useEffect, useState } from "react";
import { Clock, DollarSign } from "lucide-react";
import { ParkingSlot, TimeElapsed } from "../types";
import { calculateTimeElapsed, calculateBill, formatTime } from "../utils/parkingUtils";

interface Props {
  slot: ParkingSlot;
  onClose: () => void;
}

const SlotDetailsModal: React.FC<Props> = ({ slot, onClose }) => {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>(calculateTimeElapsed(slot.entryTime!));

  useEffect(() => {
    if (slot.entryTime) {
      const interval = setInterval(() => {
        setTimeElapsed(calculateTimeElapsed(slot.entryTime!));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [slot.entryTime]);

  const currentBill = slot.entryTime ? calculateBill(slot.entryTime) : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-4">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Slot {slot.id} Details</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-600">Registration Number</label>
            <div className="text-sm sm:text-lg font-semibold">{slot.registrationNumber}</div>
          </div>
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-600">Entry Time</label>
            <div className="text-xs sm:text-sm">{slot.entryTime ? formatTime(slot.entryTime) : 'N/A'}</div>
          </div>
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-600">Time Elapsed</label>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">{timeElapsed.hours}h {timeElapsed.minutes}m {timeElapsed.seconds}s</span>
            </div>
          </div>
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-600">Current Bill</label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              <span className="text-sm sm:text-lg font-semibold text-green-600">${currentBill}</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="w-full mt-4 sm:mt-6 bg-gray-300 text-gray-700 py-2 sm:py-2.5 px-4 rounded-lg hover:bg-gray-400 transition-colors text-sm sm:text-base font-medium">Close</button>
      </div>
    </div>
  );
};

export default SlotDetailsModal;
