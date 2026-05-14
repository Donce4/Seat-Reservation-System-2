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
    <div className="absolute top-4 left-4 bg-card border-2 border-border rounded-xl p-3 text-sm z-50">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-4 h-4 rounded-full bg-[#4ade80]" />
        <span>Daug laisvų vietų</span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-4 h-4 rounded-full bg-[#facc15]" />
        <span>Laisvų vietų mažėja</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-[#f87171]" />
        <span>Mažai laisvų vietų</span>
      </div>
    </div>
  );
}

export function ArenaMap() {
  const { sectors } = useSeating();
  return (
    <div className="w-full h-screen bg-card flex flex-col items-center justify-center overflow-hidden">
      <Legend />
      
      {/* Arena oval container - LARGER & CENTERED */}
      <div className="relative w-[95%] h-[95%] border-4 border-foreground rounded-[50%] bg-gradient-to-br from-yellow-50 to-white/90 shadow-2xl">
        {/* Court in center */}
        <div 
          className="absolute bg-[#f5a623] rounded-lg flex items-center justify-center z-10 shadow-lg"
          style={{
            left: '22%',
            top: '32%',
            width: '56%',
            height: '36%',
          }}
        >
          <span className="text-5xl font-bold text-[#8B6914]">Court</span>
        </div>
        
        {/* Sector blocks */}
        {sectors.map((sector) => (
          <SectorBlock key={sector.id} sector={sector} />
        ))}
      </div>
    </div>
  );
}
