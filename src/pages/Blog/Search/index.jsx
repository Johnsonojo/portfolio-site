import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import ArticleCard from "../../../components/ArticleCard";
import PageMeta from "../../../components/RenderPageMeta";
import queryKeys from "../../../redux/api/queryKeys";
import searchAPI from "../../../redux/api/searchAPI";
import tagAPI from "../../../redux/api/tagAPI";
import "./style.scss";

const SearchPage = () => {
  const [allArticlesByTag, setAllArticlesByTag] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tagName, setTagName] = useState("");
  const [displaySearch, setDisplaySearch] = useState(false);

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
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  const allAvailableTags = useQuery([queryKeys.getAllTags], tagAPI.getAllTags, {
    onSuccess: (response) => {
      if (!response.error) {
        queryClient.setQueryData("allAvailableTags", () => response?.data);
        setAllTags(response?.data);
      }
    },
  });

  const {
    error: tagError,
    isError: tagIsError,
    isLoading: tagIsLoading,
  } = allAvailableTags;

  const {
    error: tagSearchError,
    isError: tagSearchIsError,
    isLoading: tagSearchIsLoading,
    refetch: tagSearchRefetch,
  } = useQuery(
    ["searchedTag", tagName],
    () => tagAPI.searchByTag(tagName),

    {
      onSuccess: (response) => {
        if (!response.error) {
          queryClient.setQueryData("searchedTag", () => response?.data);
          setAllArticlesByTag(response?.data?.articles);
        }
      },
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleArticleSearch = async () => {
    setDisplaySearch(true);
    await refetch();
  };

  const handleTagSearch = async (tagName) => {
    setDisplaySearch(false);
    await tagSearchRefetch(tagName);
  };

  const renderArticlesSearchedByKeyword = () => {
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

  const renderAllTags = () => {
    return (
      <>
        {tagIsLoading && <h3 className="text-center">Loading...</h3>}
        {tagIsError && <div>{tagError}</div>}
        {allTags?.map((tag) => (
          <button
            key={tag?.tagId}
            onClick={() => {
              setTagName(tag?.name);
              setTimeout(() => {
                handleTagSearch(tag?.name);
              }, 1000);
            }}
          >
            <span>{tag?.name}</span>
          </button>
        ))}
      </>
    );
  };

  const renderArticlesSearchedByTag = () => {
    return (
      <div className="container">
        <h4 className="text-center mb-5">Articles tagged "{tagName}"</h4>
        <div className="row g-6 mt-2">
          {tagSearchIsLoading && <h3 className="text-center">Searching...</h3>}
          {allArticlesByTag?.map((article) => (
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={article?.id}>
              {tagSearchIsError && <div>{tagSearchError}</div>}
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="search-article">
      <PageMeta
        metalTitle="Search"
        metaName="description"
        metaContent="Search for contents in the blog using keywords"
      />
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
            onClick={() => handleArticleSearch()}
            type="button"
            id="search-button"
          >
            Search
          </button>
        </div>
        <div className="tag-wrapper">{renderAllTags()}</div>
      </div>

      {displaySearch && allArticles.length > 0
        ? renderArticlesSearchedByKeyword()
        : null}

      {!displaySearch && allArticlesByTag.length > 0
        ? renderArticlesSearchedByTag()
        : null}
    </div>
  );
};

export default SearchPage;
