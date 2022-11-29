import { useRef } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import profileImage from "../../assets/images/profile.jpeg";
import ProjectCard from "../../components/ProjectCard";
import PageMeta from "../../components/RenderPageMeta";
import ScrollToTop from "../../components/ScrollToTop";
import StackCard from "../../components/StackCard";
import { aboutMe } from "../../constants/homeData";
import { projectData } from "../../constants/projectData";
import { stackData } from "../../constants/stackData";
import "./style.scss";

const HomePage = () => {
  const projects = useRef(null);
  const techStack = useRef(null);

  const [text] = useTypewriter({
    loop: {},
    typeSpeed: 50,
    delaySpeed: 1500,
    words: aboutMe,
  });

  const {
    frontend,
    backend,
    deployment,
    testing,
    programmingLanguages,
    others,
  } = stackData;

  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className="main-wrapper">
      <PageMeta
        pageTitle="Portfolio | Johnson Ojo"
        contentDescription="Johnson Ojo's personal website. Here I write on technologies I'm passionate about and showcase my projects."
        canonicalLink="/"
      />
      <ScrollToTop />

      <div className="row top-wrapper">
        <div className="col-sm-12 col-md-9 hero">
          <div>
            <h1>🖐 Hi there, my name is</h1>
          </div>
          <div>
            <h2>Johnson Ojo</h2>
          </div>
          <div>
            <h3>
              <span> {" < "}</span> I am a{" "}
              <span>
                {text}
                <span>
                  <Cursor />
                </span>
                <span> {" /> "}</span>
              </span>
            </h3>
            <h4>And I am passionate about building things for the web.</h4>
          </div>

          <div className="link-wrapper py-3">
            <p onClick={() => scrollToSection(techStack)}>Tech stack</p>
            <p onClick={() => scrollToSection(projects)}>Projects</p>
            <p
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1mDsUHqy1xJEgcKnHzBjOTwRBS0UDpLYx/view?usp=share_link",
                  "_blank"
                )
              }
            >
              Resume
            </p>
          </div>
        </div>

        <div className="col-sm-12 col-md-3 profile-card mt-3">
          <div className="my-3">
            <img
              src={profileImage}
              alt="Johnson Ojo"
              className="rounded-circle mx-auto img-fluid"
              loading="lazy"
              title="Johnson Ojo"
              width="auto"
              height="auto"
            />
          </div>

          <div>
            <p>johnsonojo89@gmail.com</p>
          </div>
          <div className="icon-wrapper">
            <div>
              <FaGithub
                size={25}
                onClick={() =>
                  window.open("https://github.com/Johnsonojo", "_blank")
                }
              />
            </div>
            <div>
              <FaLinkedin
                size={25}
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/johnsonojo/",
                    "_blank"
                  )
                }
              />
            </div>
            <div>
              <FaTwitter
                size={25}
                onClick={() =>
                  window.open("https://twitter.com/Code_Init", "_blank")
                }
              />
            </div>
          </div>
        </div>
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
