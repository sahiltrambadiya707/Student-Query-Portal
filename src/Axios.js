import axios from "axios";

const axiosIntance = axios.create({
  baseURL:
    "https://student-query-portal-server.herokuapp.com/" ||
    "http://localhost:3030/",
});

export default axiosIntance;
