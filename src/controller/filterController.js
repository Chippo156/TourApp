import axios from "../until/customize-axios";

export const getFilterDestination = async (city, param) => {
  try {
    if (city === "Other") {
      if (param) {
        const res = await axios(`/destinations/filter?${param}`);
        return res;
      } else {
        const res = await axios(`/destinations/filter?page=1&size=10`);
        return res;
      }
    }
    const res = await axios(
      `/destinations/filter?location=${city}${param ? `${param}` : ""}`
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getImageDestination = async (id) => {
  try {
    const res = await axios(`destination-images/destination/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
