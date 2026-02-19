import { useState, useEffect } from 'react';

export function Cursor({ isPointer }) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es dispositivo móvil
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isMobileDevice || hasTouchSupport);
    };

    checkIfMobile();
    
    // Escuchar cambios de tamaño de pantalla para detectar rotación o cambios de orientación
    window.addEventListener('resize', checkIfMobile);
    window.addEventListener('orientationchange', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      window.removeEventListener('orientationchange', checkIfMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return; // No mover el cursor en dispositivos móviles
    
    const moveCursor = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isMobile]);

  // Ocultar cursor completamente en móviles
  if (isMobile) {
    return null;
  }

  return (
    <div 
      className={`magic-cursor-container ${isPointer ? 'is-clicking' : ''}`}
      style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
    >
      <div className="cursor-default"></div>
      <div className="cursor-pointer"></div>
    </div>
  );
}
