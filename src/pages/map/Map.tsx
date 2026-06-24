import { useEffect, useRef, useState, useCallback } from "react";
import AppShell from "../../components/layout/AppShell";
import * as mapService from "../../services/mapService";
import type { MapPin as MapPinData, PinCategory } from "../../types/map";
import { useUserRole } from "../../hooks/useUserRole";
import {
  Search,
  X,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Camera,
  ExternalLink,
  Navigation,
  Building2,
  GraduationCap,
  DollarSign,
  Users,
  Heart,
  BookOpen,
  Utensils,
  Car,
  Info,
  Check,
  AlertCircle,
} from "lucide-react";

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORIES: {
  key: PinCategory;
  label: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
}[] = [
  {
    key: "registration",
    label: "Registration",
    icon: <BookOpen size={14} />,
    color: "#1E40AF",
    bg: "bg-blue-100 dark:bg-blue-900/40",
    border: "border-blue-300 dark:border-blue-700",
  },
  {
    key: "academics",
    label: "Academics",
    icon: <GraduationCap size={14} />,
    color: "#7C3AED",
    bg: "bg-purple-100 dark:bg-purple-900/40",
    border: "border-purple-300 dark:border-purple-700",
  },
  {
    key: "finance",
    label: "Finance",
    icon: <DollarSign size={14} />,
    color: "#059669",
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    border: "border-emerald-300 dark:border-emerald-700",
  },
  {
    key: "student_union",
    label: "Student Union",
    icon: <Users size={14} />,
    color: "#D97706",
    bg: "bg-amber-100 dark:bg-amber-900/40",
    border: "border-amber-300 dark:border-amber-700",
  },
  {
    key: "health",
    label: "Health",
    icon: <Heart size={14} />,
    color: "#DC2626",
    bg: "bg-red-100 dark:bg-red-900/40",
    border: "border-red-300 dark:border-red-700",
  },
  {
    key: "library",
    label: "Library",
    icon: <BookOpen size={14} />,
    color: "#0891B2",
    bg: "bg-cyan-100 dark:bg-cyan-900/40",
    border: "border-cyan-300 dark:border-cyan-700",
  },
  {
    key: "dining",
    label: "Dining",
    icon: <Utensils size={14} />,
    color: "#EA580C",
    bg: "bg-orange-100 dark:bg-orange-900/40",
    border: "border-orange-300 dark:border-orange-700",
  },
  {
    key: "transport",
    label: "Transport",
    icon: <Car size={14} />,
    color: "#4B5563",
    bg: "bg-gray-100 dark:bg-gray-800",
    border: "border-gray-300 dark:border-gray-600",
  },
  {
    key: "general",
    label: "General",
    icon: <Building2 size={14} />,
    color: "#6B7280",
    bg: "bg-slate-100 dark:bg-slate-800",
    border: "border-slate-300 dark:border-slate-600",
  },
];

function getCat(key: PinCategory) {
  return CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[CATEGORIES.length - 1];
}

// ─── Pin Marker component ─────────────────────────────────────────────────────

function PinMarker({
  pin,
  isActive,
  isFiltered,
  onClick,
}: {
  pin: MapPinData;
  isActive: boolean;
  isFiltered: boolean;
  onClick: () => void;
}) {
  const cat = getCat(pin.category);
  return (
    <button
      onClick={onClick}
      className="absolute group"
      style={{
        left: `${pin.x_percent}%`,
        top: `${pin.y_percent}%`,
        transform: "translate(-50%, -100%)",
        opacity: isFiltered ? 1 : 0.2,
        zIndex: isActive ? 30 : isFiltered ? 20 : 10,
        transition: "opacity 0.25s, transform 0.2s",
        pointerEvents: isFiltered ? "auto" : "none",
      }}
      aria-label={pin.title}
    >
      {isActive && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: cat.color, opacity: 0.3 }}
        />
      )}
      <span
        className="flex flex-col items-center"
        style={{ filter: isActive ? "drop-shadow(0 0 6px rgba(0,0,0,0.4))" : undefined }}
      >
        <span
          className="rounded-full p-1.5 shadow-md border-2 border-white"
          style={{ backgroundColor: cat.color }}
        >
          <MapPin size={13} color="white" fill="white" />
        </span>
        <span
          className="w-0.5 h-2 rounded-b-full"
          style={{ backgroundColor: cat.color }}
        />
      </span>
      <span
        className="
          absolute bottom-full left-1/2 -translate-x-1/2 mb-1
          bg-gray-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap
          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
          shadow-lg z-50
        "
      >
        {pin.title}
      </span>
    </button>
  );
}

// ─── Detail Drawer ────────────────────────────────────────────────────────────

function PinDrawer({
  pin,
  onClose,
  canManage,
  onEdit,
  onDelete,
}: {
  pin: MapPinData;
  onClose: () => void;
  canManage: boolean;
  onEdit: (pin: MapPinData) => void;
  onDelete: (id: string) => void;
}) {
  const cat = getCat(pin.category);
  const [photoIdx, setPhotoIdx] = useState(0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <span
          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cat.bg} ${cat.border}`}
          style={{ color: cat.color }}
        >
          {cat.icon}
          {cat.label}
        </span>
        <div className="flex items-center gap-2">
          {canManage && (
            <>
              <button
                onClick={() => onEdit(pin)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
                aria-label="Edit location"
              >
                <Pencil size={15} />
              </button>
              <button
                onClick={() => onDelete(pin.id)}
                className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"
                aria-label="Delete location"
              >
                <Trash2 size={15} />
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
            aria-label="Close details"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1 leading-tight">
        {pin.title}
      </h2>

      {pin.photos && pin.photos.length > 0 ? (
        <div className="relative rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800" style={{ height: 160 }}>
          <img
            src={pin.photos[photoIdx]}
            alt={`${pin.title} photo ${photoIdx + 1}`}
            className="w-full h-full object-cover"
          />
          {pin.photos.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
              {pin.photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPhotoIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === photoIdx ? "bg-white scale-125" : "bg-white/50"
                  }`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center gap-1 mb-3" style={{ height: 100 }}>
          <Camera size={22} className="text-slate-300 dark:text-slate-600" />
          <span className="text-xs text-slate-400 dark:text-slate-500">No photos yet</span>
        </div>
      )}

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
        {pin.description}
      </p>

      <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
        {pin.floor && (
          <div className="flex items-start gap-2">
            <Navigation size={13} className="mt-0.5 shrink-0" />
            <span>{pin.floor}</span>
          </div>
        )}
        {pin.hours && (
          <div className="flex items-start gap-2">
            <Info size={13} className="mt-0.5 shrink-0" />
            <span>{pin.hours}</span>
          </div>
        )}
        {pin.contact && (
          <div className="flex items-start gap-2">
            <ExternalLink size={13} className="mt-0.5 shrink-0" />
            <a href={`mailto:${pin.contact}`} className="text-blue-600 dark:text-blue-400 underline">
              {pin.contact}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Pin Form (add/edit) ──────────────────────────────────────────────────────

interface PinFormData {
  title: string;
  description: string;
  category: PinCategory;
  floor: string | undefined;
  hours: string | undefined;
  contact: string | undefined;
  x_percent: number;
  y_percent: number;
  photos: string[];
}

function PinForm({
  initial,
  onSave,
  onCancel,
  placingMode,
  onRequestPlace,
}: {
  initial?: Partial<PinFormData>;
  onSave: (data: PinFormData) => void;
  onCancel: () => void;
  placingMode: boolean;
  onRequestPlace: () => void;
}) {
  const [form, setForm] = useState<PinFormData>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    category: initial?.category ?? "general",
    floor: initial?.floor ?? "",
    hours: initial?.hours ?? "",
    contact: initial?.contact ?? "",
    x_percent: initial?.x_percent ?? 50,
    y_percent: initial?.y_percent ?? 50,
    photos: initial?.photos ?? [],
  });

  const set = (k: keyof PinFormData, v: any) =>
    setForm((f) => ({ ...f, [k]: v }));

  const valid = form.title.trim() && form.description.trim();

  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          {initial?.title ? "Edit Location" : "Add New Location"}
        </h3>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
          aria-label="Close form"
        >
          <X size={16} className="text-slate-500" />
        </button>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
          Pin Position
        </label>
        <button
          onClick={onRequestPlace}
          className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all text-left ${
            placingMode
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-blue-400"
          }`}
        >
          <MapPin size={15} />
          <span className="text-xs">
            {placingMode
              ? "Click on the map to place the pin…"
              : `Position set (${Math.round(form.x_percent)}%, ${Math.round(form.y_percent)}%) — tap to reposition`}
          </span>
        </button>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
          Location Name *
        </label>
        <input
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Academic Registrar's Office"
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
          Category *
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => set("category", c.key)}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                form.category === c.key
                  ? `${c.bg} ${c.border} font-semibold`
                  : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
              }`}
              style={{ color: form.category === c.key ? c.color : undefined }}
            >
              {c.icon}
              <span className="truncate">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
          Description *
        </label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="What happens here? What should freshers bring? Any tips?"
          rows={3}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {(["floor", "hours", "contact"] as const).map((key) => (
        <div key={key}>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            {key === "floor" ? "Floor / Building" : key === "hours" ? "Opening Hours" : "Contact / Email"}
          </label>
          <input
            value={form[key]}
            onChange={(e) => set(key, e.target.value)}
            placeholder={
              key === "floor"
                ? "e.g. Ground Floor, Admin Block A"
                : key === "hours"
                ? "e.g. Mon–Fri 08:00–17:00"
                : "e.g. office@university.ac.zm"
            }
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      <div>
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
          Photo URLs (comma-separated)
        </label>
        <input
          value={form.photos.join(", ")}
          onChange={(e) =>
            set(
              "photos",
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
          placeholder="https://... , https://..."
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-slate-400 mt-1">
          Add landmark photos so freshers can recognise the building.
        </p>
      </div>

      <button
        onClick={() => valid && onSave(form)}
        disabled={!valid}
        className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${
          valid
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
        }`}
      >
        {initial?.title ? "Save Changes" : "Add Location"}
      </button>
    </div>
  );
}

// ─── Main CampusMapPage ───────────────────────────────────────────────────────

export default function CampusMapPage() {
  // ✅ Proper role check – no 'as any'
  const { role, loading: roleLoading } = useUserRole();
  const canManage = role === "admin" || role === "moderator";

  // Data
  const [pins, setPins] = useState<MapPinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI
  const [activePin, setActivePin] = useState<MapPinData | null>(null);
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<PinCategory>>(
    new Set()
  );
  const [showForm, setShowForm] = useState(false);
  const [editingPin, setEditingPin] = useState<MapPinData | null>(null);
  const [placingMode, setPlacingMode] = useState(false);
  const [pendingCoords, setPendingCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(
    null
  );

  // Zoom & Pan state
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Fetch pins on mount ────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await mapService.fetchAllPins();
        setPins(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load map pins.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── Filter logic ────────────────────────────────────────────────────────────
  const filteredPins = pins.filter((p) => {
    const matchCat =
      activeCategories.size === 0 || activeCategories.has(p.category);
    const q = query.toLowerCase();
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      getCat(p.category).label.toLowerCase().includes(q);
    return matchCat && matchQ;
  });
  const filteredIds = new Set(filteredPins.map((p) => p.id));

  function toggleCategory(key: PinCategory) {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    setActivePin(null);
  }

  // ── Zoom & Pan Handlers ─────────────────────────────────────────────────────

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const imgPointX = (mouseX - offset.x) / scale;
      const imgPointY = (mouseY - offset.y) / scale;

      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newScale = Math.min(Math.max(scale + delta, 0.5), 3);

      const newOffsetX = mouseX - imgPointX * newScale;
      const newOffsetY = mouseY - imgPointY * newScale;

      setScale(newScale);
      setOffset({ x: newOffsetX, y: newOffsetY });
    },
    [scale, offset]
  );

  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (placingMode) return;
    if ((e.target as HTMLElement).closest("button, a")) return;

    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const lastTouchDistance = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDistance.current = Math.sqrt(dx * dx + dy * dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDistance.current !== null) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.sqrt(dx * dx + dy * dy);
      const scaleFactor = newDist / lastTouchDistance.current;

      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mouseX = midX - rect.left;
      const mouseY = midY - rect.top;
      const imgPointX = (mouseX - offset.x) / scale;
      const imgPointY = (mouseY - offset.y) / scale;

      const newScale = Math.min(Math.max(scale * scaleFactor, 0.5), 3);
      const newOffsetX = mouseX - imgPointX * newScale;
      const newOffsetY = mouseY - imgPointY * newScale;

      setScale(newScale);
      setOffset({ x: newOffsetX, y: newOffsetY });
      lastTouchDistance.current = newDist;
    }
  };

  const handleTouchEnd = () => {
    lastTouchDistance.current = null;
  };

  const resetTransform = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  // ── Map click for placing pins ─────────────────────────────────────────────
  function handleMapClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!placingMode || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xImg = (e.clientX - rect.left - offset.x) / scale;
    const yImg = (e.clientY - rect.top - offset.y) / scale;
    const xPercent = (xImg / rect.width) * 100;
    const yPercent = (yImg / rect.height) * 100;
    setPendingCoords({ x: xPercent, y: yPercent });
    setPlacingMode(false);
  }

  // ── Save pin (API call) ────────────────────────────────────────────────────
  function showToast(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSavePin(data: PinFormData) {
    const coords = pendingCoords ??
      (editingPin
        ? { x: editingPin.x_percent, y: editingPin.y_percent }
        : { x: 50, y: 50 });

    try {
      if (editingPin) {
        const updated = await mapService.updatePin({
          id: editingPin.id,
          title: data.title,
          description: data.description,
          category: data.category,
          x_percent: coords.x,
          y_percent: coords.y,
          photos: data.photos,
          floor: data.floor,
          hours: data.hours,
          contact: data.contact,
        });
        setPins((prev) => prev.map((p) => (p.id === editingPin.id ? updated : p)));
        if (activePin?.id === editingPin.id) setActivePin(updated);
        showToast("Location updated");
      } else {
        const created = await mapService.createPin({
          title: data.title,
          description: data.description,
          category: data.category,
          x_percent: coords.x,
          y_percent: coords.y,
          photos: data.photos,
          floor: data.floor,
          hours: data.hours,
          contact: data.contact,
        });
        setPins((prev) => [created, ...prev]);
        showToast("Location added");
      }
    } catch (err: any) {
      console.error(err);
      showToast("Failed to save location. Check permissions.", "err");
      return;
    }

    setShowForm(false);
    setEditingPin(null);
    setPendingCoords(null);
  }

  async function handleDeletePin(id: string) {
    if (!confirm("Remove this location from the map?")) return;
    try {
      await mapService.deletePin(id);
      setPins((prev) => prev.filter((p) => p.id !== id));
      if (activePin?.id === id) setActivePin(null);
      showToast("Location removed");
    } catch (err: any) {
      console.error(err);
      showToast("Failed to delete location.", "err");
    }
  }

  function openAdd() {
    setEditingPin(null);
    setPendingCoords(null);
    setShowForm(true);
    setActivePin(null);
    resetTransform();
  }

  function openEdit(pin: MapPinData) {
    setEditingPin(pin);
    setPendingCoords({ x: pin.x_percent, y: pin.y_percent });
    setShowForm(true);
    setActivePin(null);
  }

  // ── Quick‑access fresher buttons ─────────────────────────────────────────
  const QUICK = [
    { label: "How to Register", category: "registration" as PinCategory },
    { label: "Pay My Fees", category: "finance" as PinCategory },
    { label: "Get SU Card", category: "student_union" as PinCategory },
    { label: "Find Health Clinic", category: "health" as PinCategory },
    { label: "Library Access", category: "library" as PinCategory },
  ];

  function handleQuick(category: PinCategory) {
    setQuery("");
    setActiveCategories(new Set([category]));
    setActivePin(null);
    const first = pins.find((p) => p.category === category);
    if (first) setActivePin(first);
  }

  return (
    <AppShell>
      <div className="flex flex-col h-full relative" style={{ minHeight: "100dvh" }}>
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="px-4 pt-4 pb-2 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 z-20">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                Campus Map
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Find any office or service on campus
              </p>
            </div>
            {/* Show Add Location only when role is loaded and user can manage */}
            {!roleLoading && canManage && (
              <button
                onClick={openAdd}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-sm transition-all"
              >
                <Plus size={14} />
                Add Location
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveCategories(new Set());
                setActivePin(null);
              }}
              placeholder="Search for a place, office, or service…"
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick‑access fresher buttons */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {QUICK.map((q) => {
              const cat = getCat(q.category);
              const active = activeCategories.has(q.category) && activeCategories.size === 1;
              return (
                <button
                  key={q.label}
                  onClick={() => handleQuick(q.category)}
                  className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 ${
                    active
                      ? `${cat.bg} ${cat.border}`
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                  style={{ color: active ? cat.color : undefined }}
                >
                  {cat.icon}
                  {q.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Category filter strip ────────────────────────────────────────── */}
        <div className="px-4 py-2 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 z-20">
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => {
                setActiveCategories(new Set());
                setQuery("");
                setActivePin(null);
              }}
              className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                activeCategories.size === 0 && !query
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => {
              const active = activeCategories.has(cat.key);
              return (
                <button
                  key={cat.key}
                  onClick={() => toggleCategory(cat.key)}
                  className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                    active
                      ? `${cat.bg} ${cat.border}`
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                  }`}
                  style={{ color: active ? cat.color : undefined }}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Search results list ──────────────────────────────────────────── */}
        {query && filteredPins.length > 0 && !activePin && (
          <div className="absolute left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-lg z-30 max-h-52 overflow-y-auto"
            style={{ top: "calc(var(--header-h, 220px))" }}
          >
            {filteredPins.map((p) => {
              const cat = getCat(p.category);
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setActivePin(p);
                    setQuery("");
                  }}
                  className="w-full flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
                >
                  <span
                    className="mt-0.5 p-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color + "22" }}
                  >
                    <MapPin size={13} style={{ color: cat.color }} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                      {p.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {p.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Map area with zoom/pan ─────────────────────────────────────────── */}
        <div className="flex-1 relative overflow-hidden bg-slate-100 dark:bg-slate-900">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/50 dark:bg-slate-950/50">
              <p className="text-sm text-slate-500">Loading map…</p>
            </div>
          )}
          {error && !loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <p className="text-sm text-red-500 mb-2">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs text-blue-600 underline"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Zoom controls – added aria-labels */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
            <button
              onClick={() => {
                const newScale = Math.min(scale + 0.2, 3);
                setScale(newScale);
              }}
              className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-white"
              aria-label="Zoom in"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={() => {
                const newScale = Math.max(scale - 0.2, 0.5);
                setScale(newScale);
              }}
              className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-white"
              aria-label="Zoom out"
            >
              <span className="text-lg font-bold leading-none">−</span>
            </button>
            <button
              onClick={resetTransform}
              className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow flex items-center justify-center text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-white"
              aria-label="Reset view"
            >
              <Navigation size={14} />
            </button>
          </div>

          <div
            ref={containerRef}
            className="absolute inset-0"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={mapRef}
              className="absolute top-0 left-0 w-full h-full origin-top-left"
              style={{
                transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
                transition: placingMode ? "none" : "transform 0.1s ease-out",
                cursor: placingMode ? "crosshair" : isDragging.current ? "grabbing" : "grab",
              }}
              onClick={handleMapClick}
            >
              <img
                src={`${import.meta.env.BASE_URL}campus-map.png`}
                alt="Campus map"
                className="w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
              />

              <div className="absolute inset-0">
                {pins.map((pin) => (
                  <PinMarker
                    key={pin.id}
                    pin={pin}
                    isActive={activePin?.id === pin.id}
                    isFiltered={filteredIds.has(pin.id)}
                    onClick={() => setActivePin(activePin?.id === pin.id ? null : pin)}
                  />
                ))}
              </div>
            </div>

            {placingMode && (
              <div className="absolute inset-x-0 top-3 flex justify-center pointer-events-none z-40">
                <div className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <MapPin size={13} />
                  Tap anywhere on the map to place the pin
                </div>
              </div>
            )}
          </div>

          <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700 z-10">
            {filteredPins.length} / {pins.length} locations
          </div>
        </div>

        {/* ── Pin detail drawer ────────────────────────────────────────────── */}
        <div
          className={`
            absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900
            rounded-t-3xl shadow-2xl border-t border-slate-200 dark:border-slate-700
            transition-transform duration-300 z-40 overflow-y-auto
          `}
          style={{
            transform: activePin ? "translateY(0)" : "translateY(110%)",
            maxHeight: "60vh",
            padding: "20px 16px 32px",
          }}
        >
          <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-4" />
          {activePin && (
            <PinDrawer
              pin={activePin}
              onClose={() => setActivePin(null)}
              canManage={canManage}
              onEdit={openEdit}
              onDelete={handleDeletePin}
            />
          )}
        </div>

        {/* ── Form drawer ────────────────────────────────────────────────────── */}
        <div
          className={`
            absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900
            rounded-t-3xl shadow-2xl border-t border-slate-200 dark:border-slate-700
            transition-transform duration-300 z-50 overflow-y-auto
          `}
          style={{
            transform: showForm ? "translateY(0)" : "translateY(110%)",
            maxHeight: "90vh",
            padding: "20px 16px 48px",
          }}
        >
          <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-4" />
          {showForm && (
            <PinForm
              initial={editingPin ? { ...editingPin, floor: editingPin.floor ?? undefined, hours: editingPin.hours ?? undefined, contact: editingPin.contact ?? undefined, photos: editingPin.photos ?? undefined } : undefined}
              onSave={handleSavePin}
              onCancel={() => {
                setShowForm(false);
                setEditingPin(null);
                setPendingCoords(null);
                setPlacingMode(false);
              }}
              placingMode={placingMode}
              onRequestPlace={() => {
                setPlacingMode(true);
                setShowForm(false);
              }}
            />
          )}
        </div>

        {/* ── Toast ─────────────────────────────────────────────────────────── */}
        {toast && (
          <div
            className={`
              absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2
              text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl z-[60]
              transition-all duration-300
              ${toast.type === "ok" ? "bg-emerald-600" : "bg-red-600"}
            `}
          >
            {toast.type === "ok" ? <Check size={13} /> : <AlertCircle size={13} />}
            {toast.msg}
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </AppShell>
  );
}
