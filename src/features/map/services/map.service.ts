import { supabase } from "../../../lib/supabase";
import type { MapPin, PinCategory } from "../../../types/map";

export async function fetchAllPins(): Promise<MapPin[]> {
  const { data, error } = await supabase
    .from("map_pins")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as MapPin[];
}

export interface CreateMapPinParams {
  title: string;
  description: string;
  category: PinCategory;
  x_percent: number;
  y_percent: number;
  photos?: string[];
  floor?: string;
  hours?: string;
  contact?: string;
}

export async function createPin(params: CreateMapPinParams): Promise<MapPin> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;
  const { data, error } = await supabase
    .from("map_pins")
    .insert({
      title: params.title,
      description: params.description,
      category: params.category,
      x_percent: params.x_percent,
      y_percent: params.y_percent,
      photos: params.photos ?? [],
      floor: params.floor,
      hours: params.hours,
      contact: params.contact,
      created_by: userId,
      review_status: "published",
      is_verified: true,
    })
    .select()
    .single();
  if (error) throw error;
  return data as MapPin;
}

export async function suggestPin(params: CreateMapPinParams): Promise<MapPin> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;
  if (!userId) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("map_pins")
    .insert({
      title: params.title,
      description: params.description,
      category: params.category,
      x_percent: params.x_percent,
      y_percent: params.y_percent,
      photos: params.photos ?? [],
      floor: params.floor,
      hours: params.hours,
      contact: params.contact,
      created_by: userId,
      review_status: "pending",
      is_verified: false,
    })
    .select()
    .single();
  if (error) throw error;
  return data as MapPin;
}

export interface UpdateMapPinParams extends Partial<CreateMapPinParams> {
  id: string;
}

export async function updatePin(params: UpdateMapPinParams): Promise<MapPin> {
  const { id, ...rest } = params;
  const { data, error } = await supabase.from("map_pins").update({ ...rest }).eq("id", id).select().single();
  if (error) throw error;
  return data as MapPin;
}

export async function deletePin(id: string): Promise<void> {
  const { error } = await supabase.from("map_pins").delete().eq("id", id);
  if (error) throw error;
}

// ─── Moderation ────────────────────────────────────────────────────────────
export type PendingMapPin = MapPin & { suggester_username?: string | null };

export async function fetchPendingPins(): Promise<PendingMapPin[]> {
  const { data, error } = await supabase
    .from("map_pins")
    .select(`*, profiles:created_by (username)`)
    .eq("review_status", "pending")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((p: any) => ({
    ...p,
    suggester_username: p.profiles?.username ?? null,
  }));
}

export async function approvePin(pinId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("approve_pin", { p_pin_id: pinId });
  if (error) {
    console.warn("Failed to approve pin", error);
    return false;
  }
  return Boolean(data);
}

export async function rejectPin(pinId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("reject_pin", { p_pin_id: pinId });
  if (error) {
    console.warn("Failed to reject pin", error);
    return false;
  }
  return Boolean(data);
}