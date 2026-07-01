import { useState, useRef, useCallback } from "react";

export function useMapTransform() {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const lastTouchDistance = useRef<number | null>(null);

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

  const handleMouseDown = (e: React.MouseEvent) => {
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

  return {
    scale,
    offset,
    containerRef,
    mapRef,
    handlers: {
      onWheel: handleWheel,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    resetTransform,
  };
}