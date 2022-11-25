import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import logo1 from "../../../assets/images/code.jpg";
import AuthorCard from "../../../components/AuthorCard";
import PageMeta from "../../../components/RenderPageMeta";
import ScrollToTop from "../../../components/ScrollToTop";
import SingleViewEditor from "../../../components/SingleViewEditor";
import blogAPI from "../../../redux/api/blogAPI";
import queryKeys from "../../../redux/api/queryKeys";
import { getFromStorage } from "../../../utils";
import DeleteArticleModal from "./DeleteModal";
import "./styles.scss";

const SingleArticle = () => {
  const [singleArticle, setSingleArticle] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const queryClient = useQueryClient();
  const { slug } = useParams();

  const user = JSON.parse(getFromStorage("user"));

  const { error, isError, isLoading } = useQuery(
    [queryKeys.getOneArticle, slug],
    () => blogAPI.getOneArticle(slug),
    {
      onSuccess: (response) => {
        if (!response.error) {
          queryClient.setQueryData("singlePost", () => response?.data);
          setSingleArticle(response?.data);
        }
      },
    }
  );

  return (
    <div className="article-wrapper pt-3 pb-5">
      <PageMeta
        pageTitle={singleArticle?.articleTitle}
        contentDescription={singleArticle?.articleBody?.slice(0, 150)}
        canonicalLink={`/blog/${singleArticle?.slug}`}
      />
      <ScrollToTop />
      <div className="container">
        <div className="row mt-4 pb-5">
          <div className="col-lg-9">
            {isLoading && <div>Loading...</div>}
            {isError && <div>{error}</div>}
            <div className="single-article-wrapper">
              <div className="col-sm-12 col-md-12 col-lg-9 pb-3">
                <h1 className="article-card-title">
                  {singleArticle?.articleTitle}
                </h1>
              </div>

              <div className="pb-3">
                <AuthorCard article={singleArticle} />
              </div>

              <div className="col-sm-12 col-md-12 col-lg-9 pb-3">
                {!isLoading && !singleArticle?.articleImage ? (
                  <img src={logo1} alt="by pexel" />
                ) : (
                  <img
                    src={singleArticle?.articleImage}
                    alt=""
                    className="img-fluid"
                    loading="lazy"
                    title={singleArticle?.articleTitle}
                  />
                )}
              </div>
              <br />
              <div className="col-sm-12 col-md-12 col-lg-9 pb-3">
                {singleArticle?.articleBody && (
                  <SingleViewEditor
                    content={singleArticle?.articleBody}
                    className="single-view"
                  />
                )}
              </div>
            </div>
          </div>
          {user?.id ? (
            <div className="col-sm-12 col-md-12 col-lg-2">
              <div className="action-button-wrapper2">
                <button
                  className="btn btn-outline-success"
                  onClick={() =>
                    (window.location = `/blog/edit-article/${singleArticle?.slug}`)
                  }
                >
                  <FiEdit />
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => setModalShow(true)}
                >
                  <IoTrashOutline />
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <DeleteArticleModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          slug={singleArticle?.slug}
        />
      </div>
    </div>
  );
};

export default SingleArticle;
