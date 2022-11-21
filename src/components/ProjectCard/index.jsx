import "./style.scss";

const ProjectCard = ({ project }) => {
  return (
    <div className="card h-100 project-card">
      <img
        className="card-img-top"
        src={project?.imageUrl}
        alt={project?.name}
      />

      <div className="card-body">
        <h4 className="card-title">{project?.name}</h4>
        <p className="card-text">{project?.description}</p>

        <div className="tech my-2">
          {project?.techStack?.map((tech) => (
            <span className="tech-badge py-1" key={tech.id}>
              {tech?.name}
            </span>
          ))}
        </div>

        <div className="button-wrapper">
          <button
            className="btn"
            onClick={() => {
              window.open(project?.github, "_blank");
            }}
          >
            Github
          </button>
          <button
            className="btn"
            onClick={() => {
              window.open(project?.website, "_blank");
            }}
          >
            {project?.hasFrontend ? "Website" : "API Docs"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
