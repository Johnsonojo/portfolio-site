import axiosPrivate from "../axiosMethods/axiosPrivate";

const blogAPI = {};

blogAPI.createArticle = async ({ articleDetails }) => {
  try {
    const response = await axiosPrivate.post("article", articleDetails);
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

blogAPI.getAllArticles = async () => {
  try {
    const response = await axiosPrivate.get("article");
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

blogAPI.getOneArticle = async (articleId) => {
  try {
    const response = await axiosPrivate.get(`article/${articleId}`);
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

blogAPI.updateArticle = async ({ articleId, articleDetails }) => {
  try {
    const response = await axiosPrivate.put(
      `article/${articleId}`,
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
    const response = await axiosPrivate.delete(`article/${articleId}`);
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export default blogAPI;
