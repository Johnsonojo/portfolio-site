import axiosPrivate from "../axiosMethods/axiosPrivate";

const searchAPI = {};

searchAPI.searchKeyword = async (keyword) => {
  try {
    const response = await axiosPrivate.get(`search/keyword/${keyword}`);
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
};

export default searchAPI;
