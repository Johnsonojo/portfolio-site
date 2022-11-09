import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TipTap from "../../../components/TipTapEditor";
import blogAPI from "../../../redux/api/blogAPI";
import queryKeys from "../../../redux/api/queryKeys";
import "./styles.scss";

const EditArticle = () => {
  const [articleDetails, setArticleDetails] = useState({});

  const {
    register,
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const { slug } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const singleArticleDetail = useQuery(
    [queryKeys.getOneArticle, slug],
    async () => {
      const data = await blogAPI.getOneArticle(slug);
      queryClient.setQueryData("oneArticleDetails", () => data?.data);
      setArticleDetails(data?.data);
      return data?.data;
    }
  );
  const { isLoading } = singleArticleDetail;

  const mutation = useMutation(blogAPI.updateArticle, {
    onSuccess: (data) => {
      if (!data.error) {
        queryClient.setQueryData("updatedArticleDetails", () => data?.data);
        toast.success(data?.message);
        setTimeout(() => {
          navigate("/blog");
        }, 1000);
      }
    },
    onError: (data) => {
      toast.error(data?.response?.data?.message);
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("articleTitle", data.articleTitle);
    formData.append("articleBody", data.articleBody);
    formData.append("tags", data.tags);
    formData.append("file", data.file[0]);

    mutation.mutate({ slug, formData });
  };

  return (
    <div className="create-article">
      <div className="container-fluid col-sm-12 col-md-8">
        <h2 className="mb-4 pt-3 form-title">Edit article details</h2>
        <form className="form-container">
          <div className="form-group mb-4">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="articleTitle"
              defaultValue={articleDetails?.articleTitle}
              placeholder="Enter article title"
              {...register("articleTitle", { required: true })}
            />
            <label className="error-label">
              {errors.articleTitle?.type === "required" &&
                "Article title is required"}
            </label>
            <label className="error-label">
              {errors?.articleTitle?.message}
            </label>
          </div>
          <div className="form-group mb-4">
            <label className="form-label">Featured Image</label>
            <input
              type="file"
              className="form-control"
              id="file"
              {...register("file", { required: true })}
            />
            <label className="error-label">
              {errors.file?.type === "required" &&
                "Article featured image is required"}
            </label>
            <label className="error-label">{errors?.file?.message}</label>
          </div>

          <div className="form-group mb-4">
            <label className="form-label">Tags</label>
            <input
              type="text"
              className="form-control"
              id="tags"
              defaultValue={articleDetails?.tags
                ?.map((tag) => tag.name)
                .join(", ")}
              placeholder="Enter article tags"
              {...register("tags", { required: true })}
            />
            <label className="error-label">
              {errors.tags?.type === "required" && "Article tags are required"}
            </label>
            <label className="error-label">{errors?.tags?.message}</label>
          </div>
          <div className="form-group mb-4">
            <label className="form-label">Body</label>
            {!isLoading && (
              <div className="editor-wrapper">
                <Controller
                  name="articleBody"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <TipTap
                      onChange={onChange}
                      content={articleDetails?.articleBody}
                    />
                  )}
                  defaultValue=""
                  rules={{ required: true }}
                />
              </div>
            )}
            <label className="error-label">
              {errors?.articleBody?.type === "required" &&
                "Article body is required"}
            </label>
            <label className="error-label">
              {errors?.articleBody?.message}
            </label>
          </div>

          <button
            type="submit"
            disabled={!isDirty || !isValid}
            className="btn col-12 mt-4"
            onClick={handleSubmit(onSubmit)}
          >
            {mutation.isLoading ? "Please wait..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;
