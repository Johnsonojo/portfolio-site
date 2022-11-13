import moment from "moment";
import React from "react";
import pics from "../../assets/images/profile.jpeg";
import "./style.scss";

const AuthorCard = ({ article }) => {
  return (
    <div className="main-wrapper">
      <div className="profile-wrapper">
        <img className="profile-image" src={pics} alt="profile" />
        <div className="profile-detail">
          <div className="text-success profile-name">Johnson Ojo</div>
          <p className="last-updated">
            {moment(article?.updatedAt).format("LL")}{" "}
            <span className="mx-2">{article?.readTime}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;