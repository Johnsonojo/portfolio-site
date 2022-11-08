import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useQuery, useQueryClient } from "react-query";
import ArticleCard from "../../../components/ArticleCard";
import blogAPI from "../../../redux/api/blogAPI";
import queryKeys from "../../../redux/api/queryKeys";
import "./style.scss";

const AllBlog = () => {
  const [allArticles, setAllArticles] = useState([]);

  const queryClient = useQueryClient();

  const allBlogArticles = useQuery(
    [queryKeys.getAllArticles],
    blogAPI.getAllArticles,
    {
      onSuccess: (response) => {
        if (!response.error) {
          queryClient.setQueryData(
            "allBlogArticles",
            () => response?.data.paginatedUserArticles
          );
          setAllArticles(response?.data.paginatedUserArticles);
        }
      },
    }
  );
  const { error, isError, isLoading } = allBlogArticles;

  return (
    <div className="articles-wrapper">
      <h2 className="text-center fw-bold py-5">Blog Posts</h2>

      <Container>
        {allArticles?.length === 0 ? (
          <Row>
            <div className="text-center">
              <h3>Available shortly</h3>
            </div>
          </Row>
        ) : (
          <Row xs={1} md={2} className="g-6">
            {allArticles?.map((article) => (
              <Col xs={12} md={6} lg={4} key={article?.id} className="mb-4">
                {isLoading && <div>Loading...</div>}
                {isError && <div>{error}</div>}
                <ArticleCard article={article} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default AllBlog;
