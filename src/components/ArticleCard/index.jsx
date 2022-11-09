import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import codePics from "../../assets/images/code.jpg";
import "./style.scss";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="article-card h-100"
      onClick={() => navigate(`/blog/${article?.slug}`)}
    >
      <Card.Img
        variant="top"
        src={article?.articleImage || codePics}
        alt={article?.articleImage}
        className="article-image img-fluid"
      />
      <Card.Body className="px-3">
        <Card.Title className="article-card-title">
          {article?.articleTitle}
        </Card.Title>

        <div className="tags pb-2">
          {article?.tags?.map((tag) => (
            <span className="tag-badge px-2 py-1" key={tag.id}>
              {tag.name}
            </span>
          ))}
        </div>
        <div className="pb-2 read-more">Read More</div>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;
