export interface ParkingSlot {
  id: number;
  occupied: boolean;
  registrationNumber: string | null;
  entryTime: string | null;
}

export interface TimeElapsed {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export interface ReceiptData {
  slotNumber: number;
  registrationNumber: string;
  entryTime: string;
  exitTime: string;
  totalAmount: number;
  timeElapsed: TimeElapsed;
}
