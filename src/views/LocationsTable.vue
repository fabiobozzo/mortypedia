<template>
  <div>
    <!-- <location-filter></location-filter> -->
    <div class="has-text-centered" v-if="isLoading">
      <img alt="Loading... Please wait." src="../assets/loading.gif" />
    </div>
    <table class="table is-striped is-hoverable is-fullwidth" v-else>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Dimension</th>
          <th>Residents</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="l in locations" :key="l.id">
          <td>
            <router-link :to="'/locations/' + l.id">{{ l.name }}</router-link>
          </td>
          <td>
            {{ l.type }}
          </td>
          <td>
            {{ l.dimension }}
          </td>
          <td>
            {{ l.residents.length || 0 }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- TODO: pagination -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import repository from "@/repositories/locations.js";

// import LocationFilter from "@/components/locations/LocationFilter.vue";

export default {
  components: {
    // LocationsFilter,
  },
  data() {
    return {
      locations: [],
      currentPage: 1,
      pagesCount: 0,
      totalCount: 0,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      filter: "characters/filter",
    }),
  },
  watch: {
    filter() {
      this.currentPage = 1;
      this.pagesCount = 0;
      this.totalCount = 0;
      this.locations = [];
      this.loadLocations();
    },
  },
  methods: {
    async loadLocations() {
      try {
        this.isLoading = true;
        const response = await repository.fetchLocations(
          this.currentPage,
          this.filter
        );
        this.locations.push(...response.data.data.locations.results);
        this.pagesCount = response.data.data.characters.info.pages !== null;
        this.totalCount = response.data.data.characters.info.count !== null;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    // loadNextPage() {
    //   this.currentPage++;
    //   this.loadLocations();
    // },
  },
  created() {
    this.loadLocations();
  },
};
</script>
