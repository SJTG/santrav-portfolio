import { useState, useEffect } from 'react';
import './GithubContributions.css';

export function GithubContributions() {
  const [contributionsData, setContributionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchGithubData() {
      try {
        // Fetch contributions calendar from public API
        const contribRes = await fetch('https://github-contributions-api.jogruber.de/v4/SJTG?y=last');
        if (contribRes.ok) {
          const data = await contribRes.json();
          if (isMounted) setContributionsData(data);
        }
      } catch (err) {
        console.warn('Could not fetch live GitHub data, using fallback', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchGithubData();
    return () => { isMounted = false; };
  }, []);

  // Format month labels for calendar columns
  const getMonths = () => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const currentMonth = new Date().getMonth();
    const result = [];
    for (let i = 11; i >= 0; i--) {
      const idx = (currentMonth - i + 12) % 12;
      result.push(months[idx]);
    }
    return result;
  };

  // Group flat days into weeks
  const days = contributionsData?.contributions || [];
  const totalContributions = contributionsData?.total
    ? Object.values(contributionsData.total).reduce((a, b) => a + b, 0)
    : 173;

  return (
    <section id="github" className="github-section">
      <div className="paper-card github-card">
        <div className="github-header">
          <div className="github-title-block">
            <span className="section-eyebrow">Actividad de código</span>
            <h2 className="github-title">Actividad y Contribuciones</h2>
            <p className="github-subtitle">
              Historial de commits y aportes de código en GitHub.
            </p>
          </div>

          <a 
            href="https://github.com/SJTG" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="github-main-button"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>Ver perfil en GitHub</span>
            <span className="arrow-external">↗</span>
          </a>
        </div>

        {/* Contribution Summary Stats */}
        <div className="github-stats-row">
          <div className="git-stat">
            <span className="git-stat-num">{totalContributions}</span>
            <span className="git-stat-label">Contribuciones registradas</span>
          </div>
          <div className="git-stat">
            <span className="git-stat-num">
              {contributionsData?.total?.['2026'] || contributionsData?.total?.[new Date().getFullYear()] || '120'}
            </span>
            <span className="git-stat-label">En el último ciclo</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="heatmap-container">
          <div className="heatmap-legend-months">
            {getMonths().map((m, i) => (
              <span key={i} className="heatmap-month-label">{m}</span>
            ))}
          </div>

          {loading ? (
            <div className="heatmap-skeleton">
              <span>Cargando datos de GitHub...</span>
            </div>
          ) : (
            <div className="heatmap-grid-scroll">
              <div className="heatmap-grid">
                {days.slice(-371).map((d, i) => (
                  <div
                    key={i}
                    className={`heatmap-cell level-${d.level}`}
                    title={`${d.count} contribuciones el ${d.date}`}
                    onMouseEnter={() => setSelectedDay(d)}
                    onMouseLeave={() => setSelectedDay(null)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tooltip detail bar */}
          <div className="heatmap-footer">
            <div className="heatmap-tooltip-info">
              {selectedDay ? (
                <span>
                  <strong>{selectedDay.count} {selectedDay.count === 1 ? 'contribución' : 'contribuciones'}</strong> el {selectedDay.date}
                </span>
              ) : (
                <span className="hint-text">Pasa el cursor sobre un bloque para ver detalles del día</span>
              )}
            </div>

            <div className="heatmap-scale">
              <span className="scale-text">Menos</span>
              <span className="scale-box level-0"></span>
              <span className="scale-box level-1"></span>
              <span className="scale-box level-2"></span>
              <span className="scale-box level-3"></span>
              <span className="scale-box level-4"></span>
              <span className="scale-text">Más</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
