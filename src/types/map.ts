import type { Database } from "./database.types";

export type MapPin = Database["public"]["Tables"]["map_pins"]["Row"];
export type PinCategory = Database["public"]["Enums"]["pin_category"];