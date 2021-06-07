import graphql from "@/graphql.js";

const fetchLocations = async (page, filter) => {
  const args = {
    page: page,
  };
  const argFilter = graphql.filterToGraphqlArgs(filter);
  if (argFilter) {
    args.filter = argFilter;
  }
  return graphql.post(
    `query { 
      locations($args) { 
        info { 
          count 
          pages
        } 
        results { 
          id
          name
          type
          dimension
          residents {
            id
          }
        } 
      } 
    }`,
    args
  );
};

const fetchLocation = async (id) => {
  return graphql.post(
    `query { 
      location(id:$id) { 
        id
        name
        type
        dimension
        residents {
          id
          name
          image
        }
      } 
    }`.replace("$id", id)
  );
};

export default {
  fetchLocations,
  fetchLocation,
};
