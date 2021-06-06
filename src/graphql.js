import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

const post = async (query, args) => {
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

const filterToGraphqlArgs = (filter) => {
  const filterProps = [];
  if (filter) {
    Object.keys(filter).forEach((key) => {
      if (filter[key] !== "") {
        filterProps.push(`${key}: "${filter[key]}"`);
      }
    });
  }
  if (filterProps.length > 0) {
    return `{${filterProps.join(",")}}`;
  }
  return null;
};

export default {
  post,
  filterToGraphqlArgs,
};
