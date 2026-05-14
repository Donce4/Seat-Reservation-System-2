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
    <div className="absolute top-4 left-4 bg-card border-2 border-border rounded-xl p-3 text-sm">
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
    /* 1. Pridedame max-width ir mx-auto pagrindiniam konteineriui */
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      
      {/* 2. Naudojame aspect-ratio, kad arena visada išlaikytų formą */}
      <div className="relative aspect-[16/10] w-full bg-slate-50/50 rounded-[40px] border border-border shadow-inner overflow-hidden">
        
        {/* Legend - Padarome ją subtilesnę */}
        <div className="absolute top-6 left-6 z-20 hidden md:block">
          <Legend />
        </div>
        
        {/* Arena oval container */}
        <div className="relative w-full h-full flex items-center justify-center p-8 md:p-12">
          
          {/* Pagrindinis arenos kontūras su šešėliu ir geresne spalva */}
          <div className="relative w-full h-full border-[6px] border-slate-800 rounded-[120px] bg-white shadow-2xl overflow-hidden">
            
            {/* Krepšinio aikštelė (Court) - Pridėjome medžio tekstūros pojūtį */}
            <div 
              className="absolute bg-[#f3e5ab] border-2 border-[#d4a373] rounded-sm flex items-center justify-center z-10 shadow-sm"
              style={{
                left: '25%',
                top: '30%',
                width: '50%',
                height: '40%',
              }}
            >
              <div className="absolute inset-2 border border-[#d4a373]/30 flex items-center justify-center">
                 <span className="text-sm font-black tracking-widest text-[#d4a373] uppercase opacity-50">
                   Main Court
                 </span>
              </div>
            </div>
            
            {/* Sektoriai */}
            <div className="absolute inset-0 z-20">
              {sectors.map((sector) => (
                <SectorBlock key={sector.id} sector={sector} />
              ))}
            </div>

            {/* Subtilus vidinis spindesys */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 to-black/5" />
          </div>
        </div>
      </div>
      
      {/* Mobilioji legenda (matoma tik mažuose ekranuose) */}
      <div className="mt-4 md:hidden">
        <Legend />
      </div>
    </div>
  );
}