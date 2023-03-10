import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const register = (username, email, password, authority) => {
  return axios.post(API_URL + "signup", {
    username: username,
    email: email,
    password: password,
    authority: authority
  })
  .then((response) => {
    if (response.data.username) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username: username,
      password: password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "logout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;