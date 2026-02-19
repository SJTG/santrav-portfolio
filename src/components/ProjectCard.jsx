export function ProjectCard({ project, calculateProgress }) {
  const progress = calculateProgress(project.modules);
  const isCompleted = progress === 100;
  const hasGithub = project.github && project.github.trim() !== '';
  
  return (
    <div className="project-card">
      <div className="img-container">
        <img src={project.image} alt={project.name} />
        <div className="progress-overlay">
          {isCompleted ? 'TERMINADO' : `${progress}%`}
        </div>
      </div>
      <div className="card-info">
        <div className="card-top">
          <h2>{project.name}</h2>
          {hasGithub ? (
            <a href={project.github} target="_blank" rel="noreferrer" className="gh-link">GITHUB</a>
          ) : (
            <span className="gh-link disabled">GITHUB</span>
          )}
        </div>
        <p>{project.description}</p>
        {project.modules && project.modules.length > 0 ? (
          <div className="module-row">
            {project.modules.map((m, i) => (
              <span key={i} className={`dot ${m.completed ? 'active' : ''}`}>
                {m.name}
              </span>
            ))}
          </div>
        ) : (
          <div className="module-row">
            <span className="dot active">PROYECTO TERMINADO</span>
          </div>
        )}
      </div>
    </div>
  );
}
