
'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { cn } from '@amberops/lib';
import '../styles/preloader.css';

export function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preloaderRef.current) {
        anime({
            targets: '.preloader-container',
            keyframes: [
                {rotateZ: 30},
                {rotateZ: 60},
                {rotateZ: 90},
                {rotateZ: 120},
                {rotateZ: 150},
                {rotateZ: 180},
            ],
            duration: 9000,
            loop: true,
            easing: 'linear'
        });

        anime({
            targets: ['.side-odd .left', '.side-odd .right'],
            keyframes: [
                {width: '80px'},
                {width: '40px'}
            ],
            duration: 3000,
            loop: true,
            easing: 'easeInOutSine'
        });

        anime({
            targets: ['.side-even .left', '.side-even .right'],
            keyframes: [
                {width: '40px'},
                {width: '80px'}
            ],
            duration: 3000,
            loop: true,
            easing: 'easeInOutSine'
        });
    }
  }, []);

  return (
    <div ref={preloaderRef} className="preloader-body" data-testid="preloader">
      <div className="preloader-container">
        <div className="side side-odd">
          <div className="left" />
          <div className="right" />
        </div>
        <div className="side side-even">
          <div className="left" />
          <div className="right" />
        </div>
        <div className="side side-odd">
          <div className="left" />
          <div className="right" />
        </div>
        <div className="side side-even">
          <div className="left" />
          <div className="right" />
        </div>
        <div className="side side-odd">
          <div className="left" />
          <div className="right" />
        </div>
        <div className="side side-even">
          <div className="left" />
          <div className="right" />
        </div>
      </div>
    </div>
  );
}
