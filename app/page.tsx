import { SeatingProvider } from '@/lib/seating-context';
import { SeatReservation } from '@/components/seat-reservation/seat-reservation';

export default function Home() {
  return (
    <SeatingProvider>
      <SeatReservation />
    </SeatingProvider>
  );
}
