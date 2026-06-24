import { supabase } from "../lib/supabase";
import type { Database } from "../types/database.types";

type Event = Database["public"]["Tables"]["events"]["Row"];
type EventInsert = Database["public"]["Tables"]["events"]["Insert"];
type EventUpdate = Database["public"]["Tables"]["events"]["Update"];

export async function fetchEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });
  if (error) throw error;
  return data as Event[];
}

export async function createEvent(event: EventInsert): Promise<Event> {
  const { data, error } = await supabase
    .from("events")
    .insert(event)
    .select()
    .single();
  if (error) throw error;
  return data as Event;
}

export async function updateEvent(id: string, updates: EventUpdate): Promise<Event> {
  const { data, error } = await supabase
    .from("events")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Event;
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
}

export async function toggleReminder(eventId: string, userId: string): Promise<boolean> {
  const { data: existing } = await supabase
    .from("event_reminders")
    .select("id")
    .eq("event_id", eventId)
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) {
    await supabase.from("event_reminders").delete().eq("id", existing.id);
    return false; // now not reminded
  } else {
    await supabase.from("event_reminders").insert({ event_id: eventId, user_id: userId });
    return true; // now reminded
  }
}

export async function getReminderStatus(eventId: string, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from("event_reminders")
    .select("id")
    .eq("event_id", eventId)
    .eq("user_id", userId)
    .maybeSingle();
  return !!data;
}