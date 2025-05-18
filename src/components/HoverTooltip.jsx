'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function HoverTooltip({ content, children, maxWidth = 400 }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState('top'); 
  const tooltipRef = useRef();
  const triggerRef = useRef();
  const showTimeout = useRef();

  useEffect(() => {
    if (!visible) return;

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const triggerRect = triggerRef.current.getBoundingClientRect();

    if (triggerRect.bottom + tooltipRect.height + 8 > window.innerHeight) {
      setPosition('top');
    } else {
      setPosition('bottom');
    }
  }, [visible]);

  // Clear timeout on unmount to avoid leaks
  useEffect(() => {
    return () => clearTimeout(showTimeout.current);
  }, []);

  const handleMouseEnter = () => {

    // Show tooltip after 500ms hover delay
    showTimeout.current = setTimeout(() => {
      setVisible(true);
    }, 500);
  };

  const handleMouseLeave = () => {

    // Cancel show timer if leaving before 500ms
    clearTimeout(showTimeout.current);
    setVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={triggerRef}
    >
      {children}

      {visible && (
        <div
          ref={tooltipRef}
          style={{ maxWidth: maxWidth }}
          className={`
            absolute left-1/2 transform -translate-x-1/2
            bg-white text-gray-800 text-xs rounded px-3 py-2 whitespace-normal
            z-50
            ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}
            select-none pointer-events-none
            shadow-lg
          `}
        >
          {content}
        </div>
      )}
    </div>
  );
}
