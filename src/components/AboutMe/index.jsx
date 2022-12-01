import { Cursor, useTypewriter } from "react-simple-typewriter";
import { homeData } from "../../constants/homeData";
import { openLinkInNewTab } from "../../utils";
import "./style.scss";

const { aboutMe, resumeLink } = homeData;

const AboutMe = ({ techStack, projects }) => {
  const [text] = useTypewriter({
    loop: {},
    typeSpeed: 50,
    delaySpeed: 1500,
    words: aboutMe,
  });

  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className="col-sm-12 col-md-9 about-me">
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
        <p onClick={() => openLinkInNewTab(resumeLink)}>Resume</p>
      </div>
    </div>
  );
};

export default AboutMe;
