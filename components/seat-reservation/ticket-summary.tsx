'use client';

import { useSeating } from '@/lib/seating-context';
import { getTicketSummaries } from '@/lib/seat-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TicketSummary() {
  const { sectors } = useSeating();
  const summaries = getTicketSummaries(sectors);

  // Sort by sector name
  const sortedSummaries = [...summaries].sort((a, b) => {
    const numA = parseInt(a.sectorName);
    const numB = parseInt(b.sectorName);
    return numA - numB;
  });

  const getBackgroundColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high': return 'bg-[#4ade80]';
      case 'medium': return 'bg-[#facc15]';
      case 'low': return 'bg-[#f87171]';
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl border-b-2 border-border pb-2">Bilietai:</CardTitle>
        <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground pt-2">
          <span>Sektorius:</span>
          <span className="text-center">Laisva:</span>
          <span className="text-right">Kaina:</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {sortedSummaries.map((summary, index) => (
          <div
            key={`${summary.sectorName}-${index}`}
            className={`${getBackgroundColor(summary.level)} rounded-full px-4 py-2 grid grid-cols-3 items-center text-sm font-bold`}
          >
            <span>{summary.sectorName}</span>
            <span className="text-center">{summary.available}</span>
            <span className="text-right">€{summary.price}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
