import { useState, useRef, useCallback, useEffect } from "react";

export function useMapZoom() {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // ----- Mouse / Touch drag state -----
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const dragStartOffset = useRef({ x: 0, y: 0 });
  const movedDistance = useRef(0); // distinguish click from drag

  // ----- Pinch state -----
  const lastTouchDistance = useRef<number | null>(null);
  const pinchStartScale = useRef(1);
  const pinchStartOffset = useRef({ x: 0, y: 0 });
  const pinchCenter = useRef({ x: 0, y: 0 });

  // ----- Reset -----
  const resetTransform = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  // ----- Wheel -----
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      e.preventDefault();
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const imgX = (mouseX - offset.x) / scale;
      const imgY = (mouseY - offset.y) / scale;
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newScale = Math.min(Math.max(scale + delta, 0.5), 3);
      const newOffsetX = mouseX - imgX * newScale;
      const newOffsetY = mouseY - imgY * newScale;
      setScale(newScale);
      setOffset({ x: newOffsetX, y: newOffsetY });
    },
    [scale, offset]
  );

  // ----- Mouse drag -----
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    dragStartOffset.current = { x: offset.x, y: offset.y };
    movedDistance.current = 0;
    e.preventDefault();
  }, [offset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    movedDistance.current += Math.abs(dx) + Math.abs(dy);
    setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // ----- Touch helpers (pan + pinch) -----
  const touchStartHandler = useCallback((e: TouchEvent) => {
    e.preventDefault(); // now allowed because we attached as non‑passive
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      isDragging.current = true;
      lastPos.current = { x: touch.clientX, y: touch.clientY };
      dragStartOffset.current = { x: offset.x, y: offset.y };
      movedDistance.current = 0;
    } else if (e.touches.length === 2) {
      isDragging.current = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDistance.current = Math.sqrt(dx * dx + dy * dy);
      pinchStartScale.current = scale;
      pinchStartOffset.current = { x: offset.x, y: offset.y };
      pinchCenter.current = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };
    }
  }, [scale, offset]);

  const touchMoveHandler = useCallback((e: TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && isDragging.current) {
      const touch = e.touches[0];
      const dx = touch.clientX - lastPos.current.x;
      const dy = touch.clientY - lastPos.current.y;
      lastPos.current = { x: touch.clientX, y: touch.clientY };
      movedDistance.current += Math.abs(dx) + Math.abs(dy);
      setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    } else if (e.touches.length === 2 && lastTouchDistance.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.sqrt(dx * dx + dy * dy);
      const scaleFactor = newDist / lastTouchDistance.current;
      const newScale = Math.min(Math.max(pinchStartScale.current * scaleFactor, 0.5), 3);

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = pinchCenter.current.x - rect.left;
      const centerY = pinchCenter.current.y - rect.top;
      const imgX = (centerX - pinchStartOffset.current.x) / pinchStartScale.current;
      const imgY = (centerY - pinchStartOffset.current.y) / pinchStartScale.current;
      const newOffsetX = centerX - imgX * newScale;
      const newOffsetY = centerY - imgY * newScale;

      setScale(newScale);
      setOffset({ x: newOffsetX, y: newOffsetY });
      lastTouchDistance.current = newDist;
    }
  }, [isDragging, scale, offset]);

  const touchEndHandler = useCallback((e: TouchEvent) => {
    if (e.touches.length === 0) {
      isDragging.current = false;
      lastTouchDistance.current = null;
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      isDragging.current = true;
      lastPos.current = { x: touch.clientX, y: touch.clientY };
      dragStartOffset.current = { x: offset.x, y: offset.y };
      movedDistance.current = 0;
      lastTouchDistance.current = null;
    }
  }, [offset]);

  // Attach native non‑passive touch listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("touchstart", touchStartHandler, { passive: false });
    container.addEventListener("touchmove", touchMoveHandler, { passive: false });
    container.addEventListener("touchend", touchEndHandler);
    container.addEventListener("touchcancel", touchEndHandler);
    return () => {
      container.removeEventListener("touchstart", touchStartHandler);
      container.removeEventListener("touchmove", touchMoveHandler);
      container.removeEventListener("touchend", touchEndHandler);
      container.removeEventListener("touchcancel", touchEndHandler);
    };
  }, [touchStartHandler, touchMoveHandler, touchEndHandler]);

  // Synthetic handlers for mouse and wheel (still via React)
  const handlers = {
    onWheel: handleWheel,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseUp,
    // No onTouchStart/onTouchMove – handled natively above
  };

  return {
    scale,
    offset,
    setScale,
    setOffset,
    containerRef,
    handlers,
    resetTransform,
    movedDistance,
  };
}