'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { Sector, Seat, CartItem, BestSeatCriteria } from './types';
import { createInitialSectors } from './seat-data';

interface SeatingState {
  sectors: Sector[];
  selectedSeats: CartItem[];
  selectedSector: Sector | null;
  isLoading: boolean;
  view: 'arena' | 'sector' | 'cart' | 'checkout';
}

interface SeatingContextType extends SeatingState {
  selectSeat: (seat: Seat, sectorName: string) => void;
  deselectSeat: (seatId: string) => void;
  clearSelection: () => void;
  setSelectedSector: (sector: Sector | null) => void;
  setView: (view: SeatingState['view']) => void;
  reserveSeats: (seatIds: string[]) => Promise<void>;
  handleFindBestSeats: (criteria: BestSeatCriteria, groupSize?: number) => Promise<void>;
  getTotalPrice: () => number;
  getSeatById: (seatId: string) => Seat | undefined;
  getSectorById: (sectorId: number) => Sector | undefined;
}

const SeatingContext = createContext<SeatingContextType | null>(null);

export function SeatingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SeatingState>({
    sectors: [],
    selectedSeats: [],
    selectedSector: null,
    isLoading: false,
    view: 'arena',
  });

  // Initialize sectors on mount
  useEffect(() => {
    const initialSectors = createInitialSectors();
    setState(prev => ({ ...prev, sectors: initialSectors }));
  }, []);

  /**
   * SUPABASE INTEGRATION HOOK
   * Replace this with your Supabase real-time subscription
   * to update seat status live when other users book seats.
   * 
   * Example implementation:
   * ```
   * useEffect(() => {
   *   const subscription = supabase
   *     .channel('seats')
   *     .on('postgres_changes', { event: '*', schema: 'public', table: 'seats' }, (payload) => {
   *       // Update local state based on real-time changes
   *       handleRealtimeUpdate(payload);
   *     })
   *     .subscribe();
   *   
   *   return () => subscription.unsubscribe();
   * }, []);
   * ```
   */
  const useLiveSeating = useCallback(() => {
    // TODO: Implement Supabase real-time subscription here
    // This function will be called to subscribe to live seat updates
    console.log('[v0] useLiveSeating: Ready for Supabase real-time subscription');
  }, []);

  // Call the hook to set up live seating (when implemented)
  useEffect(() => {
    useLiveSeating();
  }, [useLiveSeating]);

  const selectSeat = useCallback((seat: Seat, sectorName: string) => {
    if (seat.status !== 'available') return;

    setState(prev => {
      // Check if seat is already selected
      if (prev.selectedSeats.some(item => item.seat.id === seat.id)) {
        return prev;
      }

      // Update seat status in sectors
      const updatedSectors = prev.sectors.map(sector => ({
        ...sector,
        seats: sector.seats.map(s =>
          s.id === seat.id ? { ...s, status: 'selected' as const } : s
        ),
      }));

      // Update selectedSector if it matches
      const updatedSelectedSector = prev.selectedSector
        ? {
            ...prev.selectedSector,
            seats: prev.selectedSector.seats.map(s =>
              s.id === seat.id ? { ...s, status: 'selected' as const } : s
            ),
          }
        : null;

      return {
        ...prev,
        sectors: updatedSectors,
        selectedSector: updatedSelectedSector,
        selectedSeats: [...prev.selectedSeats, { seat: { ...seat, status: 'selected' }, sectorName }],
      };
    });
  }, []);

  const deselectSeat = useCallback((seatId: string) => {
    setState(prev => {
      // Update seat status back to available in sectors
      const updatedSectors = prev.sectors.map(sector => ({
        ...sector,
        seats: sector.seats.map(s =>
          s.id === seatId ? { ...s, status: 'available' as const } : s
        ),
        availableSeats: sector.seats.filter(s => 
          s.id === seatId ? true : s.status === 'available'
        ).length,
      }));

      // Update selectedSector if it matches
      const updatedSelectedSector = prev.selectedSector
        ? {
            ...prev.selectedSector,
            seats: prev.selectedSector.seats.map(s =>
              s.id === seatId ? { ...s, status: 'available' as const } : s
            ),
          }
        : null;

      return {
        ...prev,
        sectors: updatedSectors,
        selectedSector: updatedSelectedSector,
        selectedSeats: prev.selectedSeats.filter(item => item.seat.id !== seatId),
      };
    });
  }, []);

  const clearSelection = useCallback(() => {
    setState(prev => {
      const selectedIds = new Set(prev.selectedSeats.map(item => item.seat.id));
      
      const updatedSectors = prev.sectors.map(sector => ({
        ...sector,
        seats: sector.seats.map(s =>
          selectedIds.has(s.id) ? { ...s, status: 'available' as const } : s
        ),
      }));

      const updatedSelectedSector = prev.selectedSector
        ? {
            ...prev.selectedSector,
            seats: prev.selectedSector.seats.map(s =>
              selectedIds.has(s.id) ? { ...s, status: 'available' as const } : s
            ),
          }
        : null;

      return {
        ...prev,
        sectors: updatedSectors,
        selectedSector: updatedSelectedSector,
        selectedSeats: [],
      };
    });
  }, []);

  const setSelectedSector = useCallback((sector: Sector | null) => {
    setState(prev => ({ ...prev, selectedSector: sector, view: sector ? 'sector' : 'arena' }));
  }, []);

  const setView = useCallback((view: SeatingState['view']) => {
    setState(prev => ({ ...prev, view }));
  }, []);

  /**
   * SUPABASE INTEGRATION - Reserve Seats
   * 
   * This function currently updates local React state only.
   * Replace the implementation with Supabase mutation and row-locking logic.
   * 
   * Example implementation:
   * ```
   * const reserveSeats = async (seatIds: string[]) => {
   *   setState(prev => ({ ...prev, isLoading: true }));
   *   
   *   try {
   *     // Start a transaction with row locking
   *     const { data, error } = await supabase.rpc('reserve_seats', {
   *       seat_ids: seatIds,
   *       user_id: currentUser.id,
   *     });
   *     
   *     if (error) throw error;
   *     
   *     // Update local state on success
   *     // ... update sectors with booked status
   *   } catch (error) {
   *     // Handle error - seat might have been booked by someone else
   *     console.error('Failed to reserve seats:', error);
   *     throw error;
   *   } finally {
   *     setState(prev => ({ ...prev, isLoading: false }));
   *   }
   * };
   * ```
   */
  const reserveSeats = useCallback(async (seatIds: string[]) => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setState(prev => {
      const seatIdSet = new Set(seatIds);

      const updatedSectors = prev.sectors.map(sector => ({
        ...sector,
        seats: sector.seats.map(s =>
          seatIdSet.has(s.id) ? { ...s, status: 'booked' as const } : s
        ),
        availableSeats: sector.seats.filter(s => 
          seatIdSet.has(s.id) ? false : s.status === 'available'
        ).length,
      }));

      return {
        ...prev,
        sectors: updatedSectors,
        selectedSeats: [],
        isLoading: false,
        view: 'arena',
      };
    });

    console.log('[v0] reserveSeats: Seats reserved locally. Ready for Supabase integration.');
  }, []);

  /**
   * WEBASSEMBLY INTEGRATION - Best Seat Suggestion
   * 
   * This is a placeholder function for the "Best Seat Suggestion" feature.
   * The actual algorithm will be implemented in C++ and compiled to WebAssembly.
   * 
   * For now, this function selects a random available seat to demonstrate
   * the state change.
   * 
   * @param criteria - The search criteria: 'centered' | 'group' | 'value'
   * @param groupSize - Number of seats needed (for 'group' criteria)
   */
  const handleFindBestSeats = useCallback(async (criteria: BestSeatCriteria, groupSize: number = 1) => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate WebAssembly processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    setState(prev => {
      // Get all available seats
      const availableSeats: { seat: Seat; sectorName: string }[] = [];
      prev.sectors.forEach(sector => {
        sector.seats.forEach(seat => {
          if (seat.status === 'available') {
            availableSeats.push({ seat, sectorName: sector.name });
          }
        });
      });

      if (availableSeats.length === 0) {
        return { ...prev, isLoading: false };
      }

      // TODO: Replace with actual WebAssembly call
      // const wasmResult = await wasmModule.findBestSeats(criteria, groupSize, seatsData);
      
      // For now, select random available seat(s) as placeholder
      const seatsToSelect = Math.min(groupSize, availableSeats.length);
      const shuffled = [...availableSeats].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, seatsToSelect);

      // Update sectors with selected seats
      const selectedIds = new Set(selected.map(s => s.seat.id));
      const updatedSectors = prev.sectors.map(sector => ({
        ...sector,
        seats: sector.seats.map(s =>
          selectedIds.has(s.id) ? { ...s, status: 'selected' as const } : s
        ),
      }));

      const newSelectedSeats = selected.map(s => ({
        seat: { ...s.seat, status: 'selected' as const },
        sectorName: s.sectorName,
      }));

      console.log(`[v0] handleFindBestSeats: Found ${seatsToSelect} seat(s) using criteria: ${criteria}`);
      console.log('[v0] Ready for WebAssembly integration');

      return {
        ...prev,
        sectors: updatedSectors,
        selectedSeats: [...prev.selectedSeats, ...newSelectedSeats],
        isLoading: false,
      };
    });
  }, []);

  const getTotalPrice = useCallback(() => {
    return state.selectedSeats.reduce((total, item) => total + item.seat.price, 0);
  }, [state.selectedSeats]);

  const getSeatById = useCallback((seatId: string) => {
    for (const sector of state.sectors) {
      const seat = sector.seats.find(s => s.id === seatId);
      if (seat) return seat;
    }
    return undefined;
  }, [state.sectors]);

  const getSectorById = useCallback((sectorId: number) => {
    return state.sectors.find(s => s.id === sectorId);
  }, [state.sectors]);

  const value = useMemo(() => ({
    ...state,
    selectSeat,
    deselectSeat,
    clearSelection,
    setSelectedSector,
    setView,
    reserveSeats,
    handleFindBestSeats,
    getTotalPrice,
    getSeatById,
    getSectorById,
  }), [state, selectSeat, deselectSeat, clearSelection, setSelectedSector, setView, reserveSeats, handleFindBestSeats, getTotalPrice, getSeatById, getSectorById]);

  return (
    <SeatingContext.Provider value={value}>
      {children}
    </SeatingContext.Provider>
  );
}

export function useSeating() {
  const context = useContext(SeatingContext);
  if (!context) {
    throw new Error('useSeating must be used within a SeatingProvider');
  }
  return context;
}
