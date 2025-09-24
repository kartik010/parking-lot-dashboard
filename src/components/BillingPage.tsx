'use client';
import React, { useState } from "react";
import { ParkingSlot, ReceiptData } from "../types";
import { calculateTimeElapsed, calculateBill, formatTime } from "../utils/parkingUtils";

interface Props {
  slots: ParkingSlot[];
  onCloseParkingSlot: (slotId: number, amount: number) => void;
}

const BillingPage: React.FC<Props> = ({ slots, onCloseParkingSlot }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [error, setError] = useState('');

  const handleGenerateReceipt = () => {
    if (!registrationNumber.trim()) {
      setError('Please enter a registration number');
      setReceipt(null);
      return;
    }

    const slot = slots.find(s => s.occupied && s.registrationNumber?.toLowerCase() === registrationNumber.trim().toLowerCase());
    if (!slot || !slot.entryTime) {
      setError('Car not found');
      setReceipt(null);
      return;
    }

    const exitTime = new Date();
    const bill = calculateBill(slot.entryTime, exitTime.toISOString());
    const timeElapsed = calculateTimeElapsed(slot.entryTime);

    setReceipt({
      slotNumber: slot.id,
      registrationNumber: slot.registrationNumber!,
      entryTime: slot.entryTime,
      exitTime: exitTime.toISOString(),
      totalAmount: bill,
      timeElapsed,
    });
    setError('');
  };

  const handleCloseParking = () => {
    if (receipt) {
      onCloseParkingSlot(receipt.slotNumber, receipt.totalAmount);
      setReceipt(null);
      setRegistrationNumber('');
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Billing & Receipt</h2>

      <input type="text" placeholder="Enter Registration Number" value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-2" />
      <button onClick={handleGenerateReceipt} className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">Generate Receipt</button>
      {error && <div className="text-red-600 mt-2">{error}</div>}

      {receipt && (
        <div className="bg-gray-50 p-4 rounded shadow space-y-2 mt-4">
          <div><strong>Slot:</strong> {receipt.slotNumber}</div>
          <div><strong>Registration:</strong> {receipt.registrationNumber}</div>
          <div><strong>Entry:</strong> {formatTime(receipt.entryTime)}</div>
          <div><strong>Exit:</strong> {formatTime(receipt.exitTime)}</div>
          <div><strong>Time Elapsed:</strong> {receipt.timeElapsed.hours}h {receipt.timeElapsed.minutes}m {receipt.timeElapsed.seconds}s</div>
          <div><strong>Total Bill:</strong> ${receipt.totalAmount}</div>
          <button onClick={handleCloseParking} className="mt-2 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">Close Parking</button>
        </div>
      )}
    </div>
  );
};

export default BillingPage;
