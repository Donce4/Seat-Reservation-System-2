'use client';

import { useState } from 'react';
import { useSeating } from '@/lib/seating-context';
import { BestSeatCriteria } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2 } from 'lucide-react';

export function BestSeatFinder() {
  const { handleFindBestSeats, isLoading } = useSeating();
  const [criteria, setCriteria] = useState<BestSeatCriteria>('centered');
  const [groupSize, setGroupSize] = useState('1');

  const handleFindSeats = async () => {
    await handleFindBestSeats(criteria, parseInt(groupSize));
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Geriausio vietos paieška
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Paieškos kriterijai:</Label>
          <RadioGroup
            value={criteria}
            onValueChange={(value) => setCriteria(value as BestSeatCriteria)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="centered" id="centered" />
              <Label htmlFor="centered" className="font-normal cursor-pointer">
                Geriausiai matoma (centro)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="group" id="group" />
              <Label htmlFor="group" className="font-normal cursor-pointer">
                Grupei (šalia vienas kito)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="value" id="value" />
              <Label htmlFor="value" className="font-normal cursor-pointer">
                Geriausias kainos ir kokybės santykis
              </Label>
            </div>
          </RadioGroup>
        </div>

        {criteria === 'group' && (
          <div className="space-y-2">
            <Label htmlFor="group-size" className="text-sm font-medium">
              Vietų skaičius:
            </Label>
            <Select value={groupSize} onValueChange={setGroupSize}>
              <SelectTrigger id="group-size">
                <SelectValue placeholder="Pasirinkite skaičių" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'vieta' : num < 5 ? 'vietos' : 'vietų'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button
          onClick={handleFindSeats}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Ieškoma...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Rasti vietas
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          * Optimizuota WebAssembly technologija
        </p>
      </CardContent>
    </Card>
  );
}
