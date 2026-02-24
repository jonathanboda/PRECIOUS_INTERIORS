"use client";

import { createContext, useContext, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

interface RealtimeContextValue {
  isConnected: boolean;
}

const RealtimeContext = createContext<RealtimeContextValue>({
  isConnected: false,
});

export function useRealtime() {
  return useContext(RealtimeContext);
}

// Tables to subscribe to for real-time updates
const REALTIME_TABLES = [
  "projects",
  "services",
  "testimonials",
  "process_steps",
  "videos",
  "site_content",
] as const;

interface RealtimeProviderProps {
  children: React.ReactNode;
}

export function RealtimeProvider({ children }: RealtimeProviderProps) {
  const router = useRouter();
  const channelRef = useRef<RealtimeChannel | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced refresh to avoid multiple rapid refreshes
  const debouncedRefresh = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      router.refresh();
    }, 500);
  }, [router]);

  useEffect(() => {
    let channel: RealtimeChannel | null = null;

    try {
      const supabase = createClient();

      // Create a single channel for all table subscriptions
      channel = supabase.channel("db-changes");

      // Subscribe to changes on all tables
      REALTIME_TABLES.forEach((table) => {
        channel!.on(
          "postgres_changes",
          {
            event: "*", // Listen to INSERT, UPDATE, DELETE
            schema: "public",
            table: table,
          },
          (payload) => {
            if (process.env.NODE_ENV === "development") {
              console.log(`[Realtime] Change detected in ${table}:`, payload.eventType);
            }
            debouncedRefresh();
          }
        );
      });

      // Subscribe to the channel (fail silently if Realtime is not enabled)
      channel.subscribe((status) => {
        if (status === "SUBSCRIBED" && process.env.NODE_ENV === "development") {
          console.log("[Realtime] Connected to database changes");
        }
        // Silently handle errors - Realtime is optional
        // The app will still work, just without live updates
      });

      channelRef.current = channel;
    } catch {
      // Silently fail - Realtime is optional
    }

    // Cleanup on unmount
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (channelRef.current) {
        try {
          const supabase = createClient();
          supabase.removeChannel(channelRef.current);
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, [debouncedRefresh]);

  return (
    <RealtimeContext.Provider value={{ isConnected: true }}>
      {children}
    </RealtimeContext.Provider>
  );
}
