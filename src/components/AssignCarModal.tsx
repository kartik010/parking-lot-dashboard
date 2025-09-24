'use client';
import React, { useState } from "react";

interface Props {
  slotId: number;
  onAssign: (slotId: number, registrationNumber: string) => void;
  onClose: () => void;
}

const AssignCarModal: React.FC<Props> = ({ slotId, onAssign, onClose }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');

  const handleSubmit = () => {
    if (registrationNumber.trim()) {
      onAssign(slotId, registrationNumber.trim().toUpperCase());
      setRegistrationNumber('');
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-4">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Assign Car to Slot {slotId}</h3>
        <input
          type="text"
          placeholder="Enter Registration Number"
          value={registrationNumber}
          onChange={e => setRegistrationNumber(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          autoFocus
        />
        <div className="flex gap-2 sm:gap-3">
          <button onClick={handleSubmit} className="flex-1 bg-blue-500 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base font-medium">Assign Car</button>
          <button onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg hover:bg-gray-400 transition-colors text-sm sm:text-base font-medium">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AssignCarModal;
