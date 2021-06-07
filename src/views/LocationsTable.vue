<template>
  <div>
    <location-filter></location-filter>
    <div class="has-text-centered" v-if="isLoading">
      <img alt="Loading... Please wait." src="../assets/loading.gif" />
    </div>
    <div v-if="!isLoading && locations.length > 0" class="is-hidden-mobile">
      <table
        class="table is-striped is-hoverable is-fullwidth"
        ref="locationsTable"
      >
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
      <paginator
        :currentPage="currentPage"
        :pagesCount="pagesCount"
        @pageChange="pageChanged"
      ></paginator>
    </div>
    <div v-if="!isLoading && locations.length > 0" class="is-hidden-tablet">
      coming soon...
    </div>
    <not-found v-if="!isLoading && locations.length === 0"></not-found>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import repository from "@/repositories/locations.js";

import LocationFilter from "@/components/locations/LocationFilter.vue";
import Paginator from "@/components/ui/Paginator.vue";
import NotFound from "@/components/ui/NotFound.vue";

export default {
  components: {
    LocationFilter,
    Paginator,
    NotFound,
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
      filter: "locations/filter",
    }),
  },
  watch: {
    filter() {
      this.currentPage = 1;
      this.pagesCount = 0;
      this.totalCount = 0;
      this.locations = [];
      this.loadLocations();
      this.scrollToTable();
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
        if (!response.data.data.locations) {
          return;
        }
        this.locations = response.data.data.locations.results;
        this.pagesCount = response.data.data.locations.info.pages;
        this.totalCount = response.data.data.locations.info.count;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    pageChanged(index) {
      this.currentPage = index;
      this.loadLocations();
      this.scrollToTable();
    },
    scrollToTable() {
      if (this.$refs.locationsTable) {
        window.scrollTo(0, this.$refs.locationsTable.offsetTop);
      }
    },
  },
  created() {
    this.loadLocations();
  },
};
</script>
