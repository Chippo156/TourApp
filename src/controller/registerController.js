import axios from "../until/customize-axios";

export let registerUser = async (username, password, email, phone) => {
  try {
    const response = await axios.post("/users/registration", {
      username: username,
      password: password,
      email: email,
      phone: phone,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
