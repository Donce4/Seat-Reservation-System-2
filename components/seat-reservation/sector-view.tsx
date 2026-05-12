'use client';

import { useSeating } from '@/lib/seating-context';
import { Seat } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { ArrowLeft } from 'lucide-react';

function SeatIcon({ seat, onClick }: { seat: Seat; onClick: () => void }) {
  const getColor = () => {
    switch (seat.status) {
      case 'available': return 'text-[#4ade80] hover:text-[#22c55e]';
      case 'selected': return 'text-[#3b82f6]';
      case 'booked': return 'text-[#9ca3af]';
    }
  };

  const isClickable = seat.status === 'available' || seat.status === 'selected';

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            disabled={!isClickable}
            className={`w-8 h-8 ${getColor()} transition-colors ${isClickable ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed'}`}
            aria-label={`Eilė ${seat.row}, Vieta ${seat.seatNumber}, ${seat.status === 'available' ? 'Laisva' : seat.status === 'selected' ? 'Pasirinkta' : 'Užimta'}, €${seat.price}`}
          >
            {/* Chair SVG icon */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M4 18v3h3v-3h10v3h3v-3h1a1 1 0 0 0 1-1V8a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v9a1 1 0 0 0 1 1h1zm1-9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8H5V9z"/>
              <path d="M7 11h10v4H7z"/>
            </svg>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-center">
            <p className="font-bold">Eilė {seat.row}, Vieta {seat.seatNumber}</p>
            <p>Kaina: €{seat.price}</p>
            <p className="capitalize">
              {seat.status === 'available' ? 'Laisva' : seat.status === 'selected' ? 'Pasirinkta' : 'Užimta'}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function SectorView() {
  const { selectedSector, setSelectedSector, selectSeat, deselectSeat } = useSeating();

  if (!selectedSector) return null;

  // Group seats by row
  const seatsByRow: Record<number, Seat[]> = {};
  selectedSector.seats.forEach(seat => {
    if (!seatsByRow[seat.row]) {
      seatsByRow[seat.row] = [];
    }
    seatsByRow[seat.row].push(seat);
  });

  // Sort seats within each row by seat number
  Object.values(seatsByRow).forEach(row => {
    row.sort((a, b) => a.seatNumber - b.seatNumber);
  });

  const rows = Object.keys(seatsByRow).map(Number).sort((a, b) => a - b);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'available') {
      selectSeat(seat, selectedSector.name);
    } else if (seat.status === 'selected') {
      deselectSeat(seat.id);
    }
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-2xl border-2 border-border p-4">
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSelectedSector(null)}
          aria-label="Grįžti atgal"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-xl font-bold">Sektorius {selectedSector.name}</h2>
          <p className="text-sm text-muted-foreground">
            Laisva: {selectedSector.availableSeats} / {selectedSector.totalSeats} · €{selectedSector.price}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#4ade80]" />
          <span>Laisva</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#3b82f6]" />
          <span>Pasirinkta</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#9ca3af]" />
          <span>Užimta</span>
        </div>
      </div>

      {/* Seats grid */}
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border-2 border-border min-h-[200px]">
          {rows.map(rowNum => (
            <div key={rowNum} className="flex items-center gap-1">
              <span className="w-8 text-xs text-muted-foreground text-right mr-2">
                {rowNum}
              </span>
              {seatsByRow[rowNum].map(seat => (
                <SeatIcon
                  key={seat.id}
                  seat={seat}
                  onClick={() => handleSeatClick(seat)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stage/Court indicator */}
      <div className="mt-4 text-center">
        <div className="inline-block px-8 py-2 bg-[#f5a623] rounded-lg text-[#8B6914] font-bold">
          SCENA / AIKŠTĖ
        </div>
      </div>
    </div>
  );
}
