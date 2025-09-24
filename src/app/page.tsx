'use client';

import React, { useState, useEffect } from 'react';
import { Car, Clock, DollarSign, MapPin, Receipt, Home, Calculator } from 'lucide-react';
import ParkingLayout from '../components/ParkingLayout';
import BillingPage from '../components/BillingPage';
import { ParkingSlot } from '../types'; // move your interfaces to a types.ts file

const Page: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'parking' | 'billing'>('parking');
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  useEffect(() => {
    const savedSlots = localStorage?.getItem('parkingSlots');
    const savedRevenue = localStorage?.getItem('totalRevenue');

    if (savedSlots) {
      const parsedSlots: ParkingSlot[] = JSON.parse(savedSlots);
      setSlots(parsedSlots.length === 24 ? parsedSlots : Array.from({ length: 24 }, (_, i) => ({ id: i+1, occupied: false, registrationNumber: null, entryTime: null })));
    } else {
      setSlots(Array.from({ length: 24 }, (_, i) => ({ id: i+1, occupied: false, registrationNumber: null, entryTime: null })));
    }

    if (savedRevenue) setTotalRevenue(parseFloat(savedRevenue));
  }, []);

  useEffect(() => {
    localStorage.setItem('parkingSlots', JSON.stringify(slots));
    localStorage.setItem('totalRevenue', totalRevenue.toString());
  }, [slots, totalRevenue]);

  const handleAssignCar = (slotId: number, registrationNumber: string): void => {
    setSlots(prev => prev.map(slot => slot.id === slotId ? { ...slot, occupied: true, registrationNumber, entryTime: new Date().toISOString() } : slot));
  };

  const handleCloseParkingSlot = (slotId: number, amount: number): void => {
    setSlots(prev => prev.map(slot => slot.id === slotId ? { ...slot, occupied: false, registrationNumber: null, entryTime: null } : slot));
    setTotalRevenue(prev => prev + amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex justify-between h-14 sm:h-16">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Parking Lot Admin</h1>
            <div className="flex space-x-2 sm:space-x-4">
              <button onClick={() => setCurrentPage('parking')} className={`flex items-center px-2 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${currentPage === 'parking' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'}`}>
                <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Parking Layout</span>
              </button>
              <button onClick={() => setCurrentPage('billing')} className={`flex items-center px-2 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${currentPage === 'billing' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'}`}>
                <Calculator className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Billing</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pb-4 sm:pb-0">
        {currentPage === 'parking' ? (
          <ParkingLayout slots={slots} onAssignCar={handleAssignCar} totalRevenue={totalRevenue} onViewSlot={() => {}} />
        ) : (
          <BillingPage slots={slots} onCloseParkingSlot={handleCloseParkingSlot} />
        )}
      </main>
    </div>
  );
};

export default Page;
