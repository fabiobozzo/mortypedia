import graphql from "@/graphql.js";

const fetchCharacters = async (page, filter) => {
  const filterProps = [];
  if (filter) {
    Object.keys(filter).forEach((key) => {
      if (filter[key] !== "") {
        filterProps.push(`${key}: "${filter[key]}"`);
      }
    });
  }
  const args = {
    page: page,
  };
  if (filterProps.length > 0) {
    args.filter = `{${filterProps.join(",")}}`;
  }
  return graphql(
    `query { 
      characters($args) { 
        info { 
          count 
          pages
        } 
        results { 
          id
          name 
          status
          species
          type
          gender
          image
        } 
      } 
    }`,
    args
  );
};

export default {
  fetchCharacters,
};
