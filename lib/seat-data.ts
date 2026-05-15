import { Sector, Seat, EventInfo } from './types';

// Generate seats for a sector
function generateSeats(sectorId: number, rows: number, seatsPerRow: number, price: number, bookedPercentage: number = 0.3): Seat[] {
  const seats: Seat[] = [];
  
  for (let row = 1; row <= rows; row++) {
    for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
      const isBooked = Math.random() < bookedPercentage;
      seats.push({
        id: `${sectorId}-${row}-${seatNum}`,
        sectorId,
        row,
        seatNumber: seatNum,
        price,
        status: isBooked ? 'booked' : 'available',
      });
    }
  }
  
  return seats;
}

// Calculate availability level based on available seats percentage
export function getAvailabilityLevel(availableSeats: number, totalSeats: number): 'high' | 'medium' | 'low' {
  const percentage = availableSeats / totalSeats;
  if (percentage > 0.5) return 'high';
  if (percentage > 0.2) return 'medium';
  return 'low';
}

// Initial sectors data matching the design - positions are relative to arena oval
// The court is centered at roughly 35-65% horizontally and 35-65% vertically
export function createInitialSectors(): Sector[] {
  const sectorsConfig = [
    // === LOWER TIER (100 Level) - Inner Ring ===
    
    // Bottom Side (Main TV View - 111 to 114 are center)
    { id: 111, name: '111', price: 120, position: { x: 42, y: 68, width: 7, height: 8 }, rows: 12, seatsPerRow: 14, bookedPct: 0.8 },
    { id: 112, name: '112', price: 150, position: { x: 50, y: 68, width: 7, height: 8 }, rows: 12, seatsPerRow: 14, bookedPct: 0.9 },
    { id: 113, name: '113', price: 120, position: { x: 58, y: 68, width: 7, height: 8 }, rows: 12, seatsPerRow: 14, bookedPct: 0.7 },
    
    // Top Side (Opposite Bench - 130 to 133 are center)
    { id: 131, name: '131', price: 120, position: { x: 42, y: 24, width: 7, height: 8 }, rows: 12, seatsPerRow: 14, bookedPct: 0.6 },
    { id: 132, name: '132', price: 150, position: { x: 50, y: 24, width: 7, height: 8 }, rows: 12, seatsPerRow: 14, bookedPct: 0.85 },
    { id: 133, name: '133', price: 120, position: { x: 58, y: 24, width: 7, height: 8 }, rows: 12, seatsPerRow: 14, bookedPct: 0.5 },

    // Left End (Behind the basket - Green White Boys side)
    { id: 121, name: '121', price: 45, position: { x: 15, y: 42, width: 8, height: 7 }, rows: 15, seatsPerRow: 12, bookedPct: 0.9 },
    { id: 122, name: '122', price: 40, position: { x: 15, y: 50, width: 8, height: 7 }, rows: 15, seatsPerRow: 12, bookedPct: 0.95 },
    { id: 123, name: '123', price: 45, position: { x: 15, y: 58, width: 8, height: 7 }, rows: 15, seatsPerRow: 12, bookedPct: 0.8 },

    // Right End (Behind the basket)
    { id: 102, name: '102', price: 45, position: { x: 85, y: 42, width: 8, height: 7 }, rows: 15, seatsPerRow: 12, bookedPct: 0.4 },
    { id: 103, name: '103', price: 40, position: { x: 85, y: 50, width: 8, height: 7 }, rows: 15, seatsPerRow: 12, bookedPct: 0.3 },
    { id: 104, name: '104', price: 45, position: { x: 85, y: 58, width: 8, height: 7 }, rows: 15, seatsPerRow: 12, bookedPct: 0.4 },

    // === UPPER TIER (300 Level) - Outer Ring ===
    
    // Top Edge (Cheaper seats)
    { id: 338, name: '338', price: 25, position: { x: 35, y: 5, width: 6, height: 10 }, rows: 10, seatsPerRow: 20, bookedPct: 0.2 },
    { id: 339, name: '339', price: 30, position: { x: 42, y: 5, width: 6, height: 10 }, rows: 10, seatsPerRow: 20, bookedPct: 0.4 },
    { id: 340, name: '340', price: 35, position: { x: 50, y: 5, width: 6, height: 10 }, rows: 10, seatsPerRow: 20, bookedPct: 0.6 },
    { id: 341, name: '341', price: 30, position: { x: 58, y: 5, width: 6, height: 10 }, rows: 10, seatsPerRow: 20, bookedPct: 0.4 },
    { id: 342, name: '342', price: 25, position: { x: 65, y: 5, width: 6, height: 10 }, rows: 10, seatsPerRow: 20, bookedPct: 0.2 },

    // Bottom Edge
    { id: 308, name: '308', price: 25, position: { x: 35, y: 85, width: 6, height: 10 }, rows: 10, seatsPerRow: 20, bookedPct: 0.1 },
    { id: 309, name: '309', price: 30, position: { x: 42, y: 85, width: 6, height: 10 }, rows: 10, seatsPerRow: 20, bookedPct: 0.3 },
    { id: 310, name: '310', price: 35, position: { x: 50, y: 85, width: 6, height: 10 }, rows: 10, seatsPerRow: 20, bookedPct: 0.5 },
    { id: 311, name: '311', price: 30, position: { x: 58, y: 85, width: 6, height: 10 }, rows: 10, seatsPerRow: 20, bookedPct: 0.3 },
    { id: 312, name: '312', price: 25, position: { x: 65, y: 85, width: 6, height: 10 }, rows: 10, seatsPerRow: 20, bookedPct: 0.1 },

    // Corners (Examples)
    { id: 118, name: '118', price: 70, position: { x: 22, y: 75, width: 7, height: 7 }, rows: 12, seatsPerRow: 10, bookedPct: 0.6 },
    { id: 108, name: '108', price: 70, position: { x: 78, y: 75, width: 7, height: 7 }, rows: 12, seatsPerRow: 10, bookedPct: 0.5 },
    { id: 126, name: '126', price: 70, position: { x: 22, y: 25, width: 7, height: 7 }, rows: 12, seatsPerRow: 10, bookedPct: 0.4 },
    { id: 136, name: '136', price: 70, position: { x: 78, y: 25, width: 7, height: 7 }, rows: 12, seatsPerRow: 10, bookedPct: 0.3 },
  ];

  return sectorsConfig.map(config => {
    const seats = generateSeats(config.id, config.rows, config.seatsPerRow, config.price, config.bookedPct);
    const availableSeats = seats.filter(s => s.status === 'available').length;
    
    return {
      id: config.id,
      name: config.name,
      price: config.price,
      totalSeats: seats.length,
      availableSeats,
      position: config.position,
      shape: 'rectangle' as const,
      seats,
    };
  });
}

// Event info
export const eventInfo: EventInfo = {
  id: '1',
  name: 'Krepšinio rungtynės',
  date: '2026-05-08',
  time: '20:00',
  venue: 'Žalgirio Arena',
  description: 'Eurolygos ketvirtfinalis — Žalgiris vs Fenerbahçe',
}

// Ticket summary for sidebar
export interface TicketSummary {
  sectorName: string;
  available: number;
  price: number;
  level: 'high' | 'medium' | 'low';
}

export function getTicketSummaries(sectors: Sector[]): TicketSummary[] {
  // Group by sector name and aggregate
  const grouped = sectors.reduce((acc, sector) => {
    const key = sector.name;
    if (!acc[key]) {
      acc[key] = {
        sectorName: sector.name,
        available: 0,
        price: sector.price,
        totalSeats: 0,
      };
    }
    acc[key].available += sector.availableSeats;
    acc[key].totalSeats += sector.totalSeats;
    return acc;
  }, {} as Record<string, { sectorName: string; available: number; price: number; totalSeats: number }>);

  return Object.values(grouped).map(g => ({
    sectorName: g.sectorName,
    available: g.available,
    price: g.price,
    level: getAvailabilityLevel(g.available, g.totalSeats),
  }));
}
