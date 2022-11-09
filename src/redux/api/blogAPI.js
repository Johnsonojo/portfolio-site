import axiosPrivate from "../axiosMethods/axiosPrivate";
import axiosPrivateMultipart from "../axiosMethods/axiosPrivateMultipart";

const blogAPI = {};

blogAPI.createArticle = async (formData) => {
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

blogAPI.getOneArticle = async (slug) => {
  try {
    const response = await axiosPrivate.get(`articles/${slug}`);
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

blogAPI.updateArticle = async ({ slug, articleDetails }) => {
  try {
    const response = await axiosPrivate.put(`articles/${slug}`, articleDetails);
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

blogAPI.deleteArticle = async (slug) => {
  try {
    const response = await axiosPrivate.delete(`articles/${slug}`);
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export default blogAPI;
