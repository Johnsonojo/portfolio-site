import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import ArticleCard from "../../../components/ArticleCard";
import PageMeta from "../../../components/RenderPageMeta";
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
      <PageMeta
        pageTitle="Blog | Johnsonojo"
        contentDescription="Johnson Ojo's personal blog. This is a list of all my blog posts with respect to software development and other related topics."
        canonicalLink="/blog"
      />

      <div className="top-wrapper container mb-5">
        <div>
          <h1 className="fw-bold pt-5 pb-2">Johnson Ojo's blog posts</h1>
        </div>

        <div>
          <p className="lead">
            I write about web development and other related topics.
          </p>
        </div>
      </div>

      <div className="container">
        {allArticles?.length === 0 ? (
          <div className="row">
            <div className="text-center">
              <h2>Coming Soon</h2>
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
