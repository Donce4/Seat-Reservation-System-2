'use client';

import { eventInfo } from '@/lib/seat-data';
import { Calendar, Clock, MapPin } from 'lucide-react';

export function EventHeader() {
  return (
    <header className="bg-card border-b-2 border-border py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{eventInfo.name}</h1>
          {eventInfo.description && (
            <p className="text-muted-foreground">{eventInfo.description}</p>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{new Date(eventInfo.date).toLocaleDateString('lt-LT', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{eventInfo.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{eventInfo.venue}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
