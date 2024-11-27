import axios from "../until/customize-axios";


export const handleGetDestination = async () => {
  try {
    const response = await axios.get(`/destinations?page=1&size=10`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
