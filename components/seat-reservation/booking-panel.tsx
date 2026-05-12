'use client';

import { useSeating } from '@/lib/seating-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart } from 'lucide-react';

function SeatCard({ sectorName, row, seatNumber, price, onRemove }: {
  sectorName: string;
  row: number;
  seatNumber: number;
  price: number;
  onRemove: () => void;
}) {
  return (
    <div className="bg-secondary rounded-xl border-2 border-border p-4 flex items-center gap-4">
      {/* Seat icon */}
      <div className="text-foreground">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
          <path d="M4 18v3h3v-3h10v3h3v-3h1a1 1 0 0 0 1-1V8a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v9a1 1 0 0 0 1 1h1zm1-9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8H5V9z"/>
          <path d="M7 11h10v4H7z"/>
        </svg>
      </div>
      
      <div className="flex-1">
        <p className="font-bold text-lg">SEKTORIUS: {sectorName}</p>
        <p className="font-bold">EILĖ: {row}</p>
        <p className="font-bold">VIETA: {seatNumber}</p>
      </div>
      
      <div className="text-right">
        <p className="text-2xl font-bold">{price} €</p>
        <button
          onClick={onRemove}
          className="text-destructive hover:text-destructive/80 transition-colors mt-2"
          aria-label="Pašalinti"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export function BookingPanel() {
  const { selectedSeats, deselectSeat, getTotalPrice, setView, isLoading } = useSeating();
  const totalPrice = getTotalPrice();

  if (selectedSeats.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            Pasirinkite vietas iš arenos plano
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Pasirinktos vietos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {selectedSeats.map((item) => (
            <SeatCard
              key={item.seat.id}
              sectorName={item.sectorName}
              row={item.seat.row}
              seatNumber={item.seat.seatNumber}
              price={item.seat.price}
              onRemove={() => deselectSeat(item.seat.id)}
            />
          ))}
        </div>

        <div className="border-t-2 border-border pt-4 space-y-2">
          <div className="flex justify-between text-lg">
            <span className="font-bold">Viso prekių:</span>
            <span className="font-bold">{selectedSeats.length}</span>
          </div>
          <div className="flex justify-between text-xl">
            <span className="font-bold">Bendra kaina:</span>
            <span className="font-bold">{totalPrice} €</span>
          </div>
        </div>

        <Button
          onClick={() => setView('checkout')}
          disabled={isLoading}
          size="lg"
          className="w-full text-lg"
        >
          TĘSTI PIRKIMĄ
        </Button>
      </CardContent>
    </Card>
  );
}
