import graphql from "@/graphql.js";

const fetchCharacters = async (page, filter) => {
  const args = {
    page: page,
  };
  const argFilter = filterToGraphqlArgs(filter);
  if (argFilter) {
    args.filter = argFilter;
  }
  return graphql(
    `query { 
      characters($args) { 
        info { 
          count 
          pages
          next
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

const fetchCharacter = async (id) => {
  return graphql(
    `query { 
      character(id:$id) { 
        id
        name 
        status
        species
        type
        gender
        image
        created
        origin {
          id
          name
        }
        location {
          id
          name
        }
        episode {
          id
          name
          episode
        }
      } 
    }`.replace("$id", id)
  );
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
  fetchCharacters,
  fetchCharacter,
};