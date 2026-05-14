'use client';

import { useSeating } from '@/lib/seating-context';
import { Sector } from '@/lib/types';
import { getAvailabilityLevel } from '@/lib/seat-data';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

function SectorBlock({ sector }: { sector: Sector }) {
  const { setSelectedSector } = useSeating();
  const level = getAvailabilityLevel(sector.availableSeats, sector.totalSeats);

  const getColor = () => {
    switch (level) {
      case 'high': return 'bg-[#4ade80] hover:bg-[#22c55e]';
      case 'medium': return 'bg-[#facc15] hover:bg-[#eab308]';
      case 'low': return 'bg-[#f87171] hover:bg-[#ef4444]';
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setSelectedSector(sector)}
            className={`absolute ${getColor()} border border-border/50 rounded text-xs font-bold text-foreground flex items-center justify-center transition-all hover:scale-105 hover:z-10 cursor-pointer`}
            style={{
              left: `${sector.position.x}%`,
              top: `${sector.position.y}%`,
              width: `${sector.position.width}%`,
              height: `${sector.position.height}%`,
            }}
            aria-label={`Sektorius ${sector.name}, ${sector.availableSeats} laisvų vietų, €${sector.price}`}
          >
            {sector.name}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-center">
            <p className="font-bold">Sektorius {sector.name}</p>
            <p>Laisva: {sector.availableSeats} / {sector.totalSeats}</p>
            <p>Kaina: €{sector.price}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function Legend() {
  return (
    <div className="bg-card border-2 border-border rounded-xl p-3 text-sm w-fit">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-4 h-4 rounded-full bg-[#4ade80] shrink-0" />
        <span>Daug laisvų vietų</span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-4 h-4 rounded-full bg-[#facc15] shrink-0" />
        <span>Laisvų vietų mažėja</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-[#f87171] shrink-0" />
        <span>Mažai laisvų vietų</span>
      </div>
    </div>
  );
}

export function ArenaMap() {
  const { sectors } = useSeating();

  return (
    <div className="relative w-full h-full bg-card rounded-2xl border-2 border-border flex flex-col p-4 gap-3">
      {/* Legend at top */}
      <div className="shrink-0">
        <Legend />
      </div>

      {/* Arena area — fills remaining height */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        {/* Outer oval — fixed aspect ratio so it always looks oval */}
        <div
          className="relative w-full"
          style={{ paddingBottom: '62%' /* ~16:10 oval ratio */ }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {/* The oval border */}
            <div className="relative w-full h-full border-[3px] border-foreground rounded-[50%] bg-white/80 overflow-hidden">

              {/* Court centered */}
              <div
                className="absolute bg-[#f5c842] rounded-lg flex items-center justify-center z-10 shadow-sm"
                style={{
                  left: '23%',
                  top: '28%',
                  width: '54%',
                  height: '44%',
                }}
              >
                <span className="text-xl font-bold text-[#8B6914] tracking-wide">Court</span>
              </div>

              {/* Sector blocks — positioned relative to oval */}
              {sectors.map((sector) => (
                <SectorBlock key={sector.id} sector={sector} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}