

import { useEffect } from "react";
import { Search, X, Plus } from "lucide-react";

import { useSearchParams } from "react-router-dom";

import AppShell from "../../components/layout/AppShell";
import { useCampusMap } from "../../features/map/hooks/useCampusMap";
import { CampusMap } from "../../features/map/components/CampusMap";
import { PinForm } from "../../features/map/components/PinForm";
import { QuickActions } from "../../features/map/components/QuickActions";
import { CategoryFilter } from "../../features/map/components/CategoryFilter";
import type { PinFormData } from "../../features/map/components/PinForm";
import type { MapPin } from "../../types/map";
import { useGeolocation } from "../../features/map/hooks/useGeolocation";

const FIRST_DAY_PIN_IDS = [
  "b1a2c3d4-e5f6-7890-abcd-ef1234567890",
  "c2b3d4e5-f6a7-8901-bcde-f12345678901",
  "d3c4e5f6-a7b8-9012-cdef-123456789012",
  "e4d5f6a7-b8c9-0123-defa-234567890123",
  "f5e6a7b8-c9d0-1234-efab-345678901234",
];



export default function CampusMapPage() {
  const {
    query,
    setQuery,
    openForm,
    closeForm,
    addPin,
    editPin,
    removePin,
    showToast,
    canManage,
    editingPin,
    pendingCoords,
    showForm,
    setPlacingMode,
    pins,
    setActivePin,
  } = useCampusMap();


  const [searchParams] = useSearchParams();
  const geo = useGeolocation();

  // Deep link: open pin from URL ?pin=<id>
  useEffect(() => {
    const pinId = searchParams.get("pin");
    if (!pinId) return;
    const pin = pins.find((p) => p.id === pinId);
    if (pin) setActivePin(pin);
  }, [searchParams, pins, setActivePin]);

  // When the user finishes placing a pin, the store will have pendingCoords and showForm = true

  // (usePinPlacement calls openForm() which sets showForm true). So no extra useEffect needed.

  const handleSave = async (data: PinFormData) => {
    try {
      if (editingPin) {
        await editPin(editingPin.id, data);
        showToast("Location updated", "ok");
      } else {
        await addPin(data);
        showToast("Location added", "ok");
      }
      closeForm();
    } catch {
      showToast("Failed to save location", "err");
    }
  };

  const handleRequestPlace = () => {
    // Enter placing mode: close form, enable map click
    closeForm(); // hide form
    setPlacingMode(true); // map will now interpret clicks as placement
  };

  const handleEdit = (pin: MapPin) => {
    openForm(pin);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this location from the map?")) return;
    try {
      await removePin(id);
      showToast("Location removed", "ok");
    } catch {
      showToast("Failed to delete location", "err");
    }
  };

  return (
    <AppShell>
      <div className="flex flex-col h-full relative" style={{ minHeight: "100dvh" }}>
        {/* Header */}
        {/* Walkthrough / sharing / suggestions UI are shown on top of the map drawer */}

        <div className="px-4 pt-4 pb-2 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 z-20">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Campus Map</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Find any office or service on campus</p>
            </div>
            {canManage && (
              <button
                onClick={() => openForm()}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-sm transition-all"
              >
                <Plus size={14} />
                Add Location
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a place, office, or service…"
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>

          <QuickActions />
        </div>

        {/* Category filters */}
        <div className="px-4 py-2 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
          <CategoryFilter />
        </div>

        {/* Map */}
        <CampusMap
          canManage={canManage}
          onEditPin={handleEdit}
          onDeletePin={handleDelete}
          userPosition={geo.lat && geo.lng ? { lat: geo.lat, lng: geo.lng } : null}
        />


        {/* PinForm drawer */}
        {showForm && (
          <PinForm
            initial={
              editingPin
                ? {
                    title: editingPin.title,
                    description: editingPin.description,
                    category: editingPin.category,
                    floor: editingPin.floor ?? "",
                    hours: editingPin.hours ?? "",
                    contact: editingPin.contact ?? "",
                    x_percent: editingPin.x_percent,
                    y_percent: editingPin.y_percent,
                    photos: editingPin.photos ?? [],
                  }
                : undefined
            }
            pendingCoords={pendingCoords}
            onSave={handleSave}
            onCancel={closeForm}
            onRequestPlace={handleRequestPlace}
          />
        )}
      </div>
    </AppShell>
  );
}