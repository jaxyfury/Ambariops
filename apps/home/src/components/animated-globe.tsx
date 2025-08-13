
'use client';

export function AnimatedGlobe() {
  return (
    <div className="globe-container">
      <div className="globe">
        <div className="globe-sphere" />
        <div className="globe-outer-shadow" />
        <div className="globe-worldmap">
          <div className="globe-worldmap-back" />
          <div className="globe-worldmap-front" />
        </div>
        <div className="globe-inner-shadow" />
        {/* Add orbiting dots */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={`orbit orbit-${i + 1}`}>
            <div className="dot" />
          </div>
        ))}
      </div>
    </div>
  );
}
