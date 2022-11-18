import { useRef } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import PageMeta from "../../components/RenderPageMeta";
import ScrollToTop from "../../components/ScrollToTop";
import StackCard from "../../components/StackCard";
import { stackData } from "../../constants/stackData";
import "./style.scss";

const HomePage = () => {
  const projects = useRef(null);
  const contact = useRef(null);
  const techStack = useRef(null);

  const [text] = useTypewriter({
    loop: {},
    typeSpeed: 50,
    // delaySpeed: 1000,
    // cursor: "|",
    words: ["Software Developer", "Content Writer", "Blockchain Enthusiast"],
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
        metalTitle="Portfolio | Johnsonojo"
        metaName="description"
        metaContent="Johnson Ojo's personal website"
      />
      <ScrollToTop />

      <div className="hero">
        <div>
          <h5>🖐 Hi, my name is</h5>
        </div>
        <div>
          <h1>Johnson Ojo</h1>
        </div>
        <div>
          <h2>
            <span> {" < "}</span> I am a{" "}
            <span>
              {text}
              <span>
                <Cursor />
              </span>
              <span> {" /> "}</span>
            </span>
          </h2>
          <h3>And I am passionate about building things for the web.</h3>
        </div>
        <div className="link-wrapper">
          <p onClick={() => scrollToSection(techStack)}>Tech stack</p>
          <p onClick={() => scrollToSection(projects)}>Projects</p>
          <p onClick={() => scrollToSection(contact)}>Contact</p>
        </div>
      </div>

      <div className="container my-5 section" ref={techStack}>
        <h1>Tech Stack</h1>
        <h5>Here are some of the technologies I have experience using:</h5>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 tech-stack">
          <div>
            <StackCard stackList={frontend} title="Frontend" />
          </div>

          <div>
            <StackCard stackList={backend} title="Backend" />
          </div>

          <div>
            <StackCard stackList={deployment} title="Deployment" />
          </div>

          <div>
            <StackCard stackList={testing} title="Testing" />
          </div>

          <div>
            <StackCard stackList={programmingLanguages} title="Languages" />
          </div>

          <div>
            <StackCard stackList={others} title="Others" />
          </div>
        </div>
      </div>
      <div className="container my-5 section" ref={projects}>
        <h1>Projects</h1>
      </div>
      <div className="container my-5 section" ref={contact}>
        <h1>Contact</h1>
      </div>
    </div>
  );
};

export default HomePage;
