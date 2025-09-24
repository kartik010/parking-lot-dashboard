'use client';
import React, { useState } from "react";
import { ParkingSlot } from "../types";
import ParkingSlotComponent from "./ParkingSlot";
import AssignCarModal from "./AssignCarModal";
import SlotDetailsModal from "./SlotDetailsModal";

interface Props {
  slots: ParkingSlot[];
  onAssignCar: (slotId: number, registrationNumber: string) => void;
  totalRevenue: number;
  onViewSlot: (slot: ParkingSlot) => void;
}

const ParkingLayout: React.FC<Props> = ({ slots, onAssignCar, totalRevenue }) => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [showSlotDetails, setShowSlotDetails] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);

  const handleAssignClick = (slotId: number) => {
    setSelectedSlotId(slotId);
    setShowAssignModal(true);
  };

  const handleViewSlot = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
    setShowSlotDetails(true);
  };

  const occupiedSlots = slots.filter(s => s.occupied).length;
  const availableSlots = slots.length - occupiedSlots;

  return (
    <div className="p-3 sm:p-6">
      {/* Summary Cards */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Parking Lot Management</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              Total Slots
            </div>
            <div className="text-lg sm:text-2xl font-bold text-blue-600">{slots.length}</div>
          </div>
          <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              Available
            </div>
            <div className="text-lg sm:text-2xl font-bold text-green-600">{availableSlots}</div>
          </div>
          <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              Occupied
            </div>
            <div className="text-lg sm:text-2xl font-bold text-red-600">{occupiedSlots}</div>
          </div>
          <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              Revenue
            </div>
            <div className="text-xl sm:text-3xl font-bold text-yellow-600">${totalRevenue}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {slots.map(slot => (
          <ParkingSlotComponent key={slot.id} slot={slot} onAssign={handleAssignClick} onView={handleViewSlot} />
        ))}
      </div>

      {showAssignModal && selectedSlotId && (
        <AssignCarModal slotId={selectedSlotId} onAssign={onAssignCar} onClose={() => setShowAssignModal(false)} />
      )}

      {showSlotDetails && selectedSlot && (
        <SlotDetailsModal slot={selectedSlot} onClose={() => setShowSlotDetails(false)} />
      )}
    </div>
  );
};

export default ParkingLayout;
