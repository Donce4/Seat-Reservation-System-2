export type SeatStatus = 'available' | 'booked' | 'selected';

export interface Seat {
  id: string;
  sectorId: number;
  row: number;
  seatNumber: number;
  price: number;
  status: SeatStatus;
}

export interface Sector {
  id: number;
  name: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  position: SectorPosition;
  shape: 'rectangle' | 'triangle' | 'trapezoid';
  seats: Seat[];
}

export interface SectorPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
}

export interface EventInfo {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  description?: string;
}

export interface CartItem {
  seat: Seat;
  sectorName: string;
}

export interface CheckoutData {
  email: string;
  phone: string;
  paymentMethod: 'credit_card' | 'bank_transfer';
  cardNumber?: string;
  cardDetails?: string;
}

export type BestSeatCriteria = 'centered' | 'group' | 'value';
