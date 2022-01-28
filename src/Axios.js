import axios from "axios";

const axiosIntance = axios.create({
  // baseURL: "http://localhost:3030/",
  baseURL: "https://student-query-portal-server.herokuapp.com/",
});

export default axiosIntance;
