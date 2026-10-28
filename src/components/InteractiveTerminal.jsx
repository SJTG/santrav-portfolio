import { useState, useRef, useEffect } from 'react';
import './InteractiveTerminal.css';

export function InteractiveTerminal({ isOpen, onClose, onThemeChange }) {
  const [history, setHistory] = useState([
    { type: 'system', text: '✦ SANTINO CONSOLE v2.6.0 [Interactive Shell]' },
    { type: 'system', text: 'Escribe "help" para ver los comandos disponibles.' },
    { type: 'system', text: 'Tip: Prueba "projects", "skills", "theme purple", o "easteregg".' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = inputVal.trim().toLowerCase();
    const parts = cmd.split(' ');
    const primary = parts[0];
    const arg = parts[1];

    const newHistory = [...history, { type: 'user', text: `$ ${inputVal}` }];

    switch (primary) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `Comandos disponibles:
  • help           - Muestra esta lista de comandos
  • bio            - Resumen profesional de Santino
  • projects       - Lista los proyectos destacados
  • skills         - Muestra el arsenal técnico
  • contact        - Enlaces de contacto y redes
  • theme <nombre> - Cambia el tema (cyan, purple, emerald, rose)
  • matrix         - Efecto digital
  • clear          - Limpia la consola
  • exit           - Cierra la consola`
        });
        break;

      case 'bio':
        newHistory.push({
          type: 'response',
          text: `Santino Joaquin Travasso Garnier:
  • Licenciatura en Gestión de Tecnologías de la Información.
  • Especialista en transformar requerimientos de negocio en arquitecturas escalables.
  • Experiencia en desarrollo web moderno, mobile (React Native/Expo) y desarrollo de videojuegos (Godot Engine).
  • Filosofía: El código no es el fin, sino el medio para aportar valor real.`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'response',
          text: `Proyectos activos:
  1. GRAVITAS      - Marketing digital e inteligencia para estudios jurídicos.
  2. GYM TRACKER   - Suite de seguimiento de fuerza y rutinas de alta intensidad.
  3. DEMETER       - Videojuego 3D en Godot de restauración ecológica.
  4. RITMO FIT     - Gestión mobile universitaria de membresías y entrenamientos.
  5. PORTFOLIO 26  - Arquitectura moderna interactiva con Canvas y Glassmorphism.`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'response',
          text: `Tecnologías destacadas:
  [Frontend] : React, JavaScript (ES6+), HTML5, CSS3 Moderno, Vite
  [Backend]  : Java, SQL Relacional, MongoDB, Redis, Cassandra, Neo4j
  [Mobile]   : React Native, Expo, Android Studio
  [Creative] : Godot Engine 4, Blender 3D, Photoshop`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'response',
          text: `Canales de contacto:
  • LinkedIn: linkedin.com/in/santino-travasso-garnier-0144572b9/
  • GitHub  : github.com/SJTG
  • Ubicación: Buenos Aires, Argentina`
        });
        break;

      case 'theme':
        if (['cyan', 'purple', 'emerald', 'rose'].includes(arg)) {
          if (onThemeChange) onThemeChange(arg);
          newHistory.push({
            type: 'response',
            text: `✓ Tema cambiado a: ${arg.toUpperCase()}`
          });
        } else {
          newHistory.push({
            type: 'error',
            text: `Uso: theme <cyan | purple | emerald | rose>`
          });
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      case 'easteregg':
      case 'matrix':
        newHistory.push({
          type: 'matrix',
          text: `01010011 01000001 01001110 01010100 01001001 01001110 01001111\n"El código cobra vida cuando resuelve lo imposible." 🚀`
        });
        break;

      case '':
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `Comando no reconocido: "${inputVal}". Escribe "help" para ver opciones.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-window" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-red" onClick={onClose} title="Cerrar"></span>
            <span className="dot dot-yellow" title="Minimizar"></span>
            <span className="dot dot-green" title="Maximizar"></span>
          </div>
          <span className="terminal-title">santino@dev-station: ~/portfolio</span>
          <button className="terminal-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="terminal-body">
          {history.map((item, idx) => (
            <div key={idx} className={`term-line term-${item.type}`}>
              {item.text}
            </div>
          ))}
          <div className="term-input-row">
            <span className="term-prompt">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              className="term-input"
              autoFocus
              spellCheck="false"
              placeholder="Escribe un comando (ej: help)..."
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
