import { useEffect } from "react";
import { useMapStore } from "../store/map.store";
import { useUserRole } from "../../../hooks/useUserRole";

export function useCampusMap() {
  const store = useMapStore();
  const { role, loading: roleLoading } = useUserRole();
  const canManage = role === "admin" || role === "moderator";

  useEffect(() => {
    store.loadPins();
  }, []);

  return {
    pins: store.pins,
    loading: store.loading,
    error: store.error,
    activePin: store.activePin,
    query: store.query,
    activeCategories: store.activeCategories,
    placingMode: store.placingMode,
    pendingCoords: store.pendingCoords,
    showForm: store.showForm,
    editingPin: store.editingPin,
    toast: store.toast,
    canManage,
    roleLoading,
    // Actions
    setActivePin: store.setActivePin,
    setQuery: store.setQuery,
    toggleCategory: store.toggleCategory,
    setActiveCategories: store.setActiveCategories,
    clearFilters: store.clearFilters,
    setPlacingMode: store.setPlacingMode,
    setPendingCoords: store.setPendingCoords,
    openForm: store.openForm,
    closeForm: store.closeForm,
    addPin: store.addPin,
    editPin: store.editPin,
    removePin: store.removePin,
    showToast: store.showToast,
    hideToast: store.hideToast,
    refresh: store.loadPins,
  };
}