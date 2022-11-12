import axiosPrivate from "../axiosMethods/axiosPrivate";

const tagAPI = {};

tagAPI.getAllTags = async () => {
  try {
    const response = await axiosPrivate.get("tags");
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

tagAPI.searchByTag = async (tagName) => {
  try {
    const response = await axiosPrivate.get(`tags/articles/${tagName}`);
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export default tagAPI;
