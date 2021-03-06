import graphql from "@/graphql.js";

const fetchCharacters = async (page, filter) => {
  const args = {
    page: page,
  };
  const argFilter = graphql.filterToGraphqlArgs(filter);
  if (argFilter) {
    args.filter = argFilter;
  }
  return graphql.post(
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
  return graphql.post(
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

export default {
  fetchCharacters,
  fetchCharacter,
};
