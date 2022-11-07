import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TipTap from "../../../components/TipTapEditor";
import blogAPI from "../../../redux/api/blogAPI";
import "./create.scss";

const CreateArticle = () => {
  const {
    register,
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(blogAPI.createArticle, {
    onSuccess: (data) => {
      if (!data.error) {
        queryClient.setQueryData("createdArticleDetails", () => data?.data);
        toast.success(data?.message);
        navigate("/blog");
      }
    },
    onError: (data) => {
      toast.error(data?.response?.data?.message);
    },
  });

  const onSubmit = (data) => {
    const articleDetails = data;
    mutation.mutate({ articleDetails });
  };

  return (
    <div className="create-article">
      <div className="container-fluid col-sm-12 col-md-8">
        <h3 className="mb-4">Create an article</h3>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-4">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="articleTitle"
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
            <label className="form-label">Body</label>

            <Controller
              name="articleBody"
              control={control}
              render={({ field: { onChange } }) => (
                <TipTap onChange={onChange} content="" />
              )}
              defaultValue=""
              rules={{ required: true }}
            />
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
          >
            {mutation.isLoading ? "Please wait..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;