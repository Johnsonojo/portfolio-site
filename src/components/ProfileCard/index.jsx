import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import profileImage from "../../assets/images/profile.jpeg";
import { profileUrls } from "../../constants/profileCardData";
import { openLinkInNewTab } from "../../utils";
import "./style.scss";

const { github, linkedin, twitter, codeMentor, codeMentorBadge } = profileUrls;

const ProfileCard = () => {
  return (
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
          <FaGithub size={25} onClick={() => openLinkInNewTab(github)} />
        </div>
        <div>
          <FaLinkedin size={25} onClick={() => openLinkInNewTab(linkedin)} />
        </div>
        <div>
          <FaTwitter size={25} onClick={() => openLinkInNewTab(twitter)} />
        </div>
      </div>

      <div className="code-mentor-badge">
        <img
          src={codeMentorBadge}
          alt="Codementor badge"
          onClick={() => openLinkInNewTab(codeMentor)}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
