import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import ArticleCard from "../../../components/ArticleCard";
import searchAPI from "../../../redux/api/searchAPI";
import "./style.scss";

const SearchPage = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient();
  const { error, isError, isLoading, refetch } = useQuery(
    ["searchedKeyword", searchTerm],
    () => searchAPI.searchKeyword(searchTerm),

    {
      onSuccess: (response) => {
        if (!response.error) {
          queryClient.setQueryData("searchedKeyword", () => response?.data);
          setAllArticles(response?.userArticlesResult);
        }
      },
      onError: (error) => {
        console.log(error);
      },
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleClick = async () => {
    await refetch();
  };

  const renderSearchArticles = () => {
    return (
      <div className="container">
        <div className="row g-6 mt-2">
          {isLoading && <h3 className="text-center">Searching...</h3>}
          {allArticles?.map((article) => (
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={article?.id}>
              {isError && <div>{error}</div>}
              <ArticleCard article={article} />
            </div>
          ))}
          {!isLoading && error && (
            <div className="row mt-3">
              <div className="text-center">
                <h4>No article found</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="search-article">
      <h1 className="text-center pt-3">Search Articles</h1>

      <div className="container col-sm-12 col-md-6 py-5">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter keyword"
            aria-label="Search"
            aria-describedby="search-button"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="col-sm-3"
            disabled={isLoading}
            onClick={() => handleClick()}
            type="button"
            id="search-button"
          >
            Search
          </button>
        </div>
      </div>

      {renderSearchArticles()}
    </div>
  );
};

export default SearchPage;
