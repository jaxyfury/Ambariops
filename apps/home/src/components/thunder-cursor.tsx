'use client';

import { useState, useEffect } from 'react';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', setFromEvent);

    return () => {
      window.removeEventListener('mousemove', setFromEvent);
    };
  }, []);

  return position;
};

export function ThunderCursor() {
  const { x, y } = useMousePosition();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div
      className="thunder-cursor-container"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
    >
      <div className="thunder-cursor-dot" />
      <div className="thunder-cursor-trail" />
      <div className="thunder-cursor-sparks">
        <div className="spark" />
        <div className="spark" />
        <div className="spark" />
        <div className="spark" />
      </div>
    </div>
  );
}
