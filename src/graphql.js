import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

const graphql = async (query, args) => {
  if (args) {
    query = query.replace(
      "$args",
      Object.keys(args)
        .map((key) => `${key}: ${args[key]}`)
        .join(",")
    );
  }
  return axiosInstance.post("/graphql", {
    query: query,
  });
};

export default graphql;
