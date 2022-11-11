import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../../../components/ArticleCard";
import blogAPI from "../../../redux/api/blogAPI";
import queryKeys from "../../../redux/api/queryKeys";
import "./style.scss";

const AllBlog = () => {
  const [allArticles, setAllArticles] = useState([]);
  const navigate = useNavigate();
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
      <div className="top-wrapper container">
        <div>
          <h2 className="fw-bold py-5">Blog Posts</h2>
        </div>
        <button onClick={() => navigate("/blog/search")}>Search</button>
      </div>

      <div className="container">
        {allArticles?.length === 0 ? (
          <div className="row">
            <div className="text-center">
              <h3>Available shortly</h3>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {allArticles?.map((article) => (
              <div className="col mb-4" key={article?.id}>
                {isLoading && <div>Loading...</div>}
                {isError && <div>{error}</div>}
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlog;
