import graphql from "@/graphql.js";

const fetchEpisodes = async (page, filter) => {
  const args = {
    page: page,
  };
  const argFilter = graphql.filterToGraphqlArgs(filter);
  if (argFilter) {
    args.filter = argFilter;
  }
  return graphql.post(
    `query { 
      episodes($args) { 
        info { 
          count 
          pages
        } 
        results { 
          id
          name
          air_date
          episode
          characters {
            id
          }
        } 
      } 
    }`,
    args
  );
};

const fetchEpisode = async (id) => {
  return graphql.post(
    `query { 
      episode(id:$id) { 
        id
        name
        air_date
        episode
        characters {
          id
          name
          image
        }
      } 
    }`.replace("$id", id)
  );
};

export default {
  fetchEpisodes,
  fetchEpisode,
};
