'use client';
import React, { useEffect, useState } from "react";
import { Car, Clock, MapPin } from "lucide-react";
import { ParkingSlot, TimeElapsed } from "../types";
import { calculateTimeElapsed } from "../utils/parkingUtils";

interface Props {
  slot: ParkingSlot;
  onAssign: (slotId: number) => void;
  onView: (slot: ParkingSlot) => void;
}

const ParkingSlotComponent: React.FC<Props> = ({ slot, onAssign, onView }) => {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>({ hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 });

  useEffect(() => {
    if (slot.occupied && slot.entryTime) {
      const updateTime = () => setTimeElapsed(calculateTimeElapsed(slot.entryTime!));
      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }
  }, [slot.occupied, slot.entryTime]);

  if (slot.occupied) {
    return (
      <div className="bg-red-100 border-2 border-red-300 rounded-lg p-2 sm:p-4 cursor-pointer hover:bg-red-200 transition-colors min-h-[80px] sm:min-h-[100px]" onClick={() => onView(slot)}>
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <Car className="h-3 w-3 sm:h-5 sm:w-5 text-red-600" />
          <span className="text-xs sm:text-sm font-semibold text-red-800">#{slot.id}</span>
        </div>
        <div className="text-xs text-red-700 space-y-1">
          <div className="font-medium truncate text-[10px] sm:text-xs">{slot.registrationNumber}</div>
          <div className="flex items-center gap-1">
            <Clock className="h-2 w-2 sm:h-3 sm:w-3" />
            <span className="text-[9px] sm:text-xs">{timeElapsed.hours}h {timeElapsed.minutes}m</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-100 border-2 border-green-300 rounded-lg p-2 sm:p-4 cursor-pointer hover:bg-green-200 transition-colors flex items-center justify-center min-h-[80px] sm:min-h-[100px]" onClick={() => onAssign(slot.id)}>
      <div className="text-center">
        <MapPin className="h-4 w-4 sm:h-6 sm:w-6 text-green-600 mx-auto mb-1" />
        <span className="text-xs sm:text-sm font-semibold text-green-800">#{slot.id}</span>
        <div className="text-[10px] sm:text-xs text-green-600">Available</div>
      </div>
    </div>
  );
};

export default ParkingSlotComponent;
