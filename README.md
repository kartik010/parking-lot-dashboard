# Parking Lot Admin Dashboard

A web-based **Parking Lot Management System** built with **React, TypeScript, and TailwindCSS**.  
This app allows admins to manage parking slots, assign cars, track parking duration, and generate billing receipts.

---

## Features

- **Parking Layout**
  - View 24 parking slots in a responsive grid
  - Track **available** and **occupied** slots
  - Real-time **time elapsed** for parked vehicles
  - Assign cars to available slots

- **Slot Details**
  - View car details, entry time, and parking duration
  - See the current billing amount for the slot

- **Billing & Receipt**
  - Search car by registration number
  - Generate receipt with entry time, exit time, duration, and total amount
  - Close parking slot and update total revenue

- **Revenue Tracking**
  - Displays **total revenue** collected in real-time

- **Persistent Data**
  - Parking slots and revenue saved in **localStorage** for session persistence

---

## Technologies Used

- **React 18** with **TypeScript**
- **TailwindCSS** for responsive styling
- **Lucide React** icons for visuals
- **LocalStorage** for saving slot data & revenue

---

## Project Structure

- `src/app/page.tsx` – Main App component
- `src/components/` – Modular components
  - `ParkingSlotComponent.tsx`
  - `ParkingLayout.tsx`
  - `AssignCarModal.tsx`
  - `SlotDetailsModal.tsx`
  - `BillingPage.tsx`

---

## Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation
```bash
git clone https://github.com/kartik010/parking-lot-dashboard.git
cd parking-lot-dashboard
npm install
