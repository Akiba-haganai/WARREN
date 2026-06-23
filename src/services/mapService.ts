import { supabase } from "../lib/supabase";
import type { MapPin, PinCategory } from "../types/map";

// ─── Fetch all pins ───────────────────────────────────────────────────────────
export async function fetchAllPins(): Promise<MapPin[]> {
  const { data, error } = await supabase
    .from("map_pins")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch map pins:", error);
    throw error;
  }

  return data as MapPin[];
}

// ─── Create a new pin ────────────────────────────────────────────────────────
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
  // Get current user id from auth
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
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to create map pin:", error);
    throw error;
  }

  return data as MapPin;
}

// ─── Update a pin ─────────────────────────────────────────────────────────────
export interface UpdateMapPinParams extends Partial<CreateMapPinParams> {
  id: string;
}

export async function updatePin(params: UpdateMapPinParams): Promise<MapPin> {
  const { id, ...rest } = params;

  const { data, error } = await supabase
    .from("map_pins")
    .update({
      ...rest,
      photos: rest.photos, // will be string[] or undefined
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Failed to update map pin:", error);
    throw error;
  }

  return data as MapPin;
}

// ─── Delete a pin ─────────────────────────────────────────────────────────────
export async function deletePin(id: string): Promise<void> {
  const { error } = await supabase.from("map_pins").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete map pin:", error);
    throw error;
  }
}