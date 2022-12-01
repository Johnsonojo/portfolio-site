import { useRef } from "react";
import AboutMe from "../../components/AboutMe";
import ProfileCard from "../../components/ProfileCard";
import ProjectCard from "../../components/ProjectCard";
import PageMeta from "../../components/RenderPageMeta";
import ScrollToTop from "../../components/ScrollToTop";
import StackCard from "../../components/StackCard";
import { projectData } from "../../constants/projectData";
import { stackData } from "../../constants/stackData";
import "./style.scss";

const HomePage = () => {
  const techStack = useRef(null);
  const projects = useRef(null);

  const {
    frontend,
    backend,
    deployment,
    testing,
    programmingLanguages,
    others,
  } = stackData;

  return (
    <div className="main-wrapper">
      <PageMeta
        pageTitle="Portfolio | Johnson Ojo"
        contentDescription="Johnson Ojo's personal website. Here I write on technologies I'm passionate about and showcase my projects."
        canonicalLink="/"
      />
      <ScrollToTop />

      <div className="row top-wrapper">
        <AboutMe techStack={techStack} projects={projects} />
        <ProfileCard />
      </div>

      <div className="container my-5 section" ref={techStack}>
        <h2>Tech Stack</h2>
        <h3>Here are some of the technologies I have experience using:</h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 tech-stack">
          <div className="mb-3">
            <StackCard stackList={frontend} title="Frontend" />
          </div>

          <div className="mb-3">
            <StackCard stackList={backend} title="Backend" />
          </div>

          <div className="mb-3">
            <StackCard stackList={deployment} title="Deployment" />
          </div>

          <div className="mb-3">
            <StackCard stackList={testing} title="Testing" />
          </div>

          <div className="mb-3">
            <StackCard stackList={programmingLanguages} title="Languages" />
          </div>

          <div className="mb-3">
            <StackCard stackList={others} title="Others" />
          </div>
        </div>
      </div>
      <div className="container my-5 section" ref={projects}>
        <h2 className="pb-2">Projects</h2>
        <h3>Here are some noteworthy projects I have worked on:</h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {projectData?.map((project) => (
            <div className="col mb-4" key={project?.id}>
              <ProjectCard key={project.id} project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
