import { useState, useRef, useCallback } from "react";

export function useMapZoom() {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // ----- Mouse / Touch drag state -----
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const dragStartOffset = useRef({ x: 0, y: 0 });
  const movedDistance = useRef(0); // to distinguish click from drag

  // ----- Pinch state -----
  const lastTouchDistance = useRef<number | null>(null);
  const pinchStartScale = useRef(1);
  const pinchStartOffset = useRef({ x: 0, y: 0 });
  const pinchCenter = useRef({ x: 0, y: 0 });

  // ----- Common helpers -----
  const resetTransform = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  // ----- Mouse / Wheel -----
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
    // Update offset – drag movement is in screen pixels, so offset grows directly
    setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // ----- Touch handlers (pan + pinch) -----
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault(); // <-- add this line
    if (e.touches.length === 1) {
      // Single finger → drag
      const touch = e.touches[0];
      isDragging.current = true;
      lastPos.current = { x: touch.clientX, y: touch.clientY };
      dragStartOffset.current = { x: offset.x, y: offset.y };
      movedDistance.current = 0;
    } else if (e.touches.length === 2) {
      // Two fingers → pinch
      isDragging.current = false; // cancel any single drag
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

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault(); // prevent page scroll
    if (e.touches.length === 1 && isDragging.current) {
      // Pan
      const touch = e.touches[0];
      const dx = touch.clientX - lastPos.current.x;
      const dy = touch.clientY - lastPos.current.y;
      lastPos.current = { x: touch.clientX, y: touch.clientY };
      movedDistance.current += Math.abs(dx) + Math.abs(dy);
      setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    } else if (e.touches.length === 2 && lastTouchDistance.current !== null) {
      // Pinch
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.sqrt(dx * dx + dy * dy);
      const scaleFactor = newDist / lastTouchDistance.current;
      const newScale = Math.min(Math.max(pinchStartScale.current * scaleFactor, 0.5), 3);

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = pinchCenter.current.x - rect.left;
      const centerY = pinchCenter.current.y - rect.top;
      // Image point under pinch center in old coordinates
      const imgX = (centerX - pinchStartOffset.current.x) / pinchStartScale.current;
      const imgY = (centerY - pinchStartOffset.current.y) / pinchStartScale.current;
      const newOffsetX = centerX - imgX * newScale;
      const newOffsetY = centerY - imgY * newScale;

      setScale(newScale);
      setOffset({ x: newOffsetX, y: newOffsetY });
      lastTouchDistance.current = newDist;
    }
  }, [isDragging, scale, offset]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      isDragging.current = false;
      lastTouchDistance.current = null;
    } else if (e.touches.length === 1) {
      // Switch from pinch to single drag
      const touch = e.touches[0];
      isDragging.current = true;
      lastPos.current = { x: touch.clientX, y: touch.clientY };
      dragStartOffset.current = { x: offset.x, y: offset.y };
      movedDistance.current = 0;
      lastTouchDistance.current = null;
    }
  }, [offset]);

  // Combined handlers object to spread on the container div
  const handlers = {
    onWheel: handleWheel,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseUp,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };

  return {
    scale,
    offset,
    setScale,
    setOffset,
    containerRef,
    handlers,
    resetTransform,
    movedDistance, // can be used to decide if a click was a drag or a tap
  };
}
