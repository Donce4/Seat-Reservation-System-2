'use client';

import { useState } from 'react';
import { useSeating } from '@/lib/seating-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';

export function CheckoutForm() {
  const { selectedSeats, getTotalPrice, setView, reserveSeats, isLoading } = useSeating();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const totalPrice = getTotalPrice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reserve the seats
    const seatIds = selectedSeats.map(item => item.seat.id);
    await reserveSeats(seatIds);
    
    // Show success (in a real app, this would redirect to a confirmation page)
    // alert('Užsakymas sėkmingai pateiktas!'); 
    // Pastaba: alert jau yra iškviečiamas seating-context faile, todėl čia jo nebereikia, 
    // kitaip gausi du iššokančius langus.
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {/* Left side - Forms */}
      <div className="space-y-6">
        {/* Back button */}
        <Button
          variant="outline"
          onClick={() => setView('arena')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Grįžti atgal
        </Button>

        {/* Delivery info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">PRISTATYMO DUOMENYS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">El. paštas</Label>
              <Input
                id="email"
                type="email"
                placeholder="El. paštas"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Tel.</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Tel."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Order summary */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Užsakymo santrauka</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedSeats.map((item) => (
              <div
                key={item.seat.id}
                className="bg-secondary rounded-xl border-2 border-border p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="text-foreground">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                      <path d="M4 18v3h3v-3h10v3h3v-3h1a1 1 0 0 0 1-1V8a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v9a1 1 0 0 0 1 1h1zm1-9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8H5V9z"/>
                      <path d="M7 11h10v4H7z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">SEKTORIUS: {item.sectorName}</p>
                    <p>EILĖ: {item.seat.row}</p>
                    <p>VIETA: {item.seat.seatNumber}</p>
                  </div>
                </div>
                <div className="text-right mt-2 pt-2 border-t border-border">
                  <p className="text-xl font-bold text-primary">{item.seat.price} €</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-2xl font-bold">Galutinė suma: {totalPrice} €</p>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading || !email || !phone}
            size="lg"
            className="w-full text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Apdorojama...
              </>
            ) : (
              'APMOKĖTI UŽSAKYMĄ'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}