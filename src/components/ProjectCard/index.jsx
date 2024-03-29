import "./style.scss";

const ProjectCard = ({ project }) => {
  return (
    <div className="card h-100 project-card">
      <img
        className="card-img-top"
        src={project?.imageUrl}
        alt={project?.name}
        loading="lazy"
        title={project?.name}
        width="auto"
        height="auto"
      />

      <div className="card-body">
        <h3 className="card-title py-2 text-center">{project?.name}</h3>
        <p className="card-text">{project?.description}</p>

        <div>
          <div className="tech my-4">
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

            {project?.hasFrontend ? (
              <button
                className="btn"
                onClick={() => {
                  window.open(project?.website, "_blank");
                }}
              >
                Website
              </button>
            ) : null}
            {/* <button
            className="btn"
            onClick={() => {
              window.open(project?.website, "_blank");
            }}
          >
            {project?.hasFrontend ? "Website" : "API Docs"}
          </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
