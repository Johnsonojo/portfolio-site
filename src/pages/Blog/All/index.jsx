import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ArticleCard from "../../../components/ArticleCard";
import { blogData } from "./blogData";
import "./style.scss";

const AllBlog = () => {
  const [allArticles, setAllArticles] = useState([...blogData]);

  const { error, isError, isLoading } = allArticles;

  return (
    <div className="articles-wrapper">
      <h2 className="text-center fw-bold py-5">Blog Posts</h2>

      <Container>
        {allArticles?.length === 0 ? (
          <Row>
            <div className="text-center">
              <h3>Coming soon...</h3>
            </div>
          </Row>
        ) : (
          <Row xs={1} md={2} className="g-6">
            {allArticles?.map((post) => (
              <Col xs={12} md={6} lg={4} key={post?.id} className="mb-4">
                {/* {isLoading && <div>Loading...</div>}
                {isError && <div>{error}</div>} */}
                <ArticleCard article={post} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default AllBlog;
