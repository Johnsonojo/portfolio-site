import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import logo1 from "../../../assets/images/code.jpg";
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

  const fetchOneArticle = useQuery(
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
  const { error, isError, isLoading } = fetchOneArticle;

  return (
    <div className="article-wrapper pt-3 pb-5">
      <Container>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-10">
            {isLoading && <div>Loading...</div>}
            {isError && <div>{error}</div>}
            <div className="single-article-wrapper container">
              <div className="pb-5">
                <h1 className="article-card-title">
                  {singleArticle?.articleTitle}
                </h1>
              </div>

              <div className="pb-3">
                {!isLoading && !singleArticle?.articleImage ? (
                  <img src={logo1} alt="by pexel" />
                ) : (
                  <img
                    src={singleArticle?.articleImage}
                    alt=""
                    className="img-fluid"
                  />
                )}
              </div>
              <br />
              <div>
                <section
                  className="col-sm-12 col-md-12 col-lg-8"
                  dangerouslySetInnerHTML={{
                    __html: singleArticle?.articleBody,
                  }}
                />
              </div>
            </div>
          </div>
          {user?.id ? (
            <div className="col-sm-12 col-md-12 col-lg-2">
              <div className="action-button-wrapper2">
                <Button
                  variant="outline-success"
                  onClick={() =>
                    (window.location = `/blog/edit-article/${singleArticle?.slug}`)
                  }
                >
                  <FiEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => setModalShow(true)}
                >
                  <IoTrashOutline />
                </Button>
              </div>
            </div>
          ) : null}
        </div>
        <DeleteArticleModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          slug={singleArticle?.slug}
        />
      </Container>
    </div>
  );
};

export default SingleArticle;
