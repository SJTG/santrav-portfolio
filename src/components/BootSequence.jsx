import { useState, useEffect, useRef } from 'react';
import { Cursor } from './Cursor';
import './BootSequence.css';

export function BootSequence({ onBootComplete }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [fadingOut, setFadingOut] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const stateRef = useRef({ lineIdx: 0, charIdx: 0 });

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = target.closest('a') || target.closest('button') || window.getComputedStyle(target).cursor === 'pointer';
      setIsPointer(!!isClickable);
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  const bootSequence = [
    { text: 'SANTRAV-BIOS (C) 1998 RELEASE 2.1S', delay: 100 },
    { text: 'CPU: GIGA-CORE PROCESSOR @ 3.4GHZ', delay: 150 },
    // Aumentamos el delay aquí a 1.5s para que se sienta la espera
    { text: 'CHECKING RAM: 65536KB OK', delay: 1000 }, 
    // Periféricos casi instantáneos (delay mínimo)
    { text: 'KEYBOARD............ DETECTED', delay: 10 },
    { text: 'MOUSE............... DETECTED', delay: 10 },
    { text: 'HARD DRIVE: SANTINO_HDD_01 (SATA)', delay: 100 },
    { text: 'CD-ROM: SANTINO_HDD/TRAY (ATAPI)', delay: 100 },
    { text: 'SYSTEM INTEGRITY................ [ PASS ]', delay: 150 },
    { text: 'STARTING REACT_OS 7.1...', delay: 300 },
    { text: 'C:/> WIN', delay: 400 },
    { text: 'WELCOME TO SANTRAV PROJECTS', delay: 50 }
  ];

  useEffect(() => {
    const processNext = () => {
      const { lineIdx, charIdx } = stateRef.current;
      
      if (lineIdx >= bootSequence.length) {
        setTimeout(() => setFadingOut(true), 1000);
        return;
      }

      const currentLine = bootSequence[lineIdx];

      if (charIdx < currentLine.text.length) {
        setDisplayedLines(prev => {
          const next = [...prev];
          if (next[lineIdx] === undefined) next[lineIdx] = "";
          next[lineIdx] += currentLine.text[charIdx];
          return next;
        });
        stateRef.current.charIdx++;
        
        // Velocidad de tipeo: 10ms para que se vea la progresión pero sea ágil
        setTimeout(processNext, 10); 
      } else {
        // IMPORTANTE: Al terminar el texto de la línea, esperamos su delay único
        // antes de reiniciar charIdx y pasar a la siguiente línea.
        stateRef.current.lineIdx++;
        stateRef.current.charIdx = 0;
        setTimeout(processNext, currentLine.delay);
      }
    };

    const initialTimer = setTimeout(processNext, 500);
    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (fadingOut) {
      setTimeout(() => onBootComplete(), 500);
    }
  }, [fadingOut, onBootComplete]);

  return (
    <div className={`boot-sequence ${fadingOut ? 'fade-out' : ''}`}>
      <Cursor isPointer={isPointer} />
      
      <div className="crt-overlay">
        <div className="scanlines"></div>
        <div className="rolling-bar"></div>
        <div className="screen-curve"></div>
      </div>
      
      <div className="inner-content">
        <div className="logo-header-minimal">
          <img src={`${import.meta.env.BASE_URL}Santrav-removebg-preview.png`} alt="SANTRAV" className="boot-logo-large" />
          <div className="bios-brand-container">
            <p className="bios-brand-text">SANTRAV-SOFTWARE & HARDWARE</p>
            <p className="bios-brand-sub">A COMPANY MADE BY ONE MAN WHO LOVES TECHNOLOGY :)</p>
          </div>
        </div>

        <div className="text-section">
          {displayedLines.map((line, idx) => (
            <div key={idx} className="boot-line">{line}</div>
          ))}
          {!fadingOut && <span className="cursor">_</span>}
        </div>
      </div>
    </div>
  );
}