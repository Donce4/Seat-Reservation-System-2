import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createInitialSectors } from '@/lib/seat-data';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    // Generate the mock data using your existing function
    const sectors = createInitialSectors();
    const allSeats = [];

    // Flatten the nested data into a single array for the database
    for (const sector of sectors) {
      for (const seat of sector.seats) {
        allSeats.push({
          id: seat.id,
          sector_id: sector.id,
          row_num: seat.row,
          seat_num: seat.seatNumber,
          price: seat.price,
          status: seat.status,
        });
      }
    }

    // Supabase can handle large inserts, but breaking it into chunks is safer
    // We will insert 1000 seats at a time
    for (let i = 0; i < allSeats.length; i += 1000) {
      const chunk = allSeats.slice(i, i + 1000);
      const { error } = await supabase.from('seats').insert(chunk);
      
      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${allSeats.length} seats into Supabase!` 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}