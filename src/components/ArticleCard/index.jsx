import React from "react";
import { useNavigate } from "react-router-dom";
import codePics from "../../assets/images/code.jpg";
import "./style.scss";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card article-card h-100"
      onClick={() => navigate(`/blog/${article?.slug}`)}
    >
      <img
        className="card-img-top"
        src={article?.articleImage || codePics}
        alt={article?.articleImage}
        loading="lazy"
        title={article?.articleTitle}
      />
      <div className="card-body px-3">
        <h2 className="card-title article-card-title">
          {article?.articleTitle}
        </h2>

        <div>
          <div className="tags my-2">
            {article?.tags?.map((tag) => (
              <span className="tag-badge px-2 py-1" key={tag.id}>
                {tag.name}
              </span>
            ))}
          </div>
          <div className="py-2 read-more">Read More</div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
