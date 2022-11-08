import axiosPrivate from "../axiosMethods/axiosPrivate";
import axiosPrivateMultipart from "../axiosMethods/axiosPrivateMultipart";

const blogAPI = {};

blogAPI.createArticle = async (formData) => {
  console.log("formData", formData);

  try {
    const response = await axiosPrivateMultipart.post("articles", formData);
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

blogAPI.getAllArticles = async () => {
  try {
    const response = await axiosPrivate.get("articles");
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

blogAPI.getOneArticle = async (articleId) => {
  try {
    const response = await axiosPrivate.get(`articles/${articleId}`);
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

blogAPI.updateArticle = async ({ articleId, articleDetails }) => {
  try {
    const response = await axiosPrivate.put(
      `articles/${articleId}`,
      articleDetails
    );
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

blogAPI.deleteArticle = async (articleId) => {
  try {
    const response = await axiosPrivate.delete(`articles/${articleId}`);
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export default blogAPI;
