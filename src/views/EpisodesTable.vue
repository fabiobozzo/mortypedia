<template>
  <div>
    <episode-filter></episode-filter>
    <div class="has-text-centered" v-if="isLoading">
      <img alt="Loading... Please wait." src="../assets/loading.gif" />
    </div>
    <div
      v-if="!isLoading && episodes.length > 0"
      class="is-hidden-mobile"
      ref="episodesTable"
    >
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Air Date</th>
            <th>Characters</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in episodes" :key="e.id">
            <td>
              <router-link :to="'/episodes/' + e.id">{{
                e.episode
              }}</router-link>
            </td>
            <td>
              {{ e.name }}
            </td>
            <td>
              {{ e.air_date }}
            </td>
            <td>
              {{ e.characters.length || 0 }}
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
    <div
      v-if="!isLoading && episodes.length > 0"
      class="is-hidden-tablet"
      ref="episodesTable"
    >
      <div class="card mb-3" v-for="e in episodes" :key="e.id">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">
                <router-link :to="'/episodes/' + e.id">
                  {{ e.episode }}
                </router-link>
              </p>
              <p class="subtitle is-6">
                <strong>{{ e.name }}</strong>
              </p>
            </div>
          </div>
          <div class="content">
            <p>
              Air Date: <strong>{{ e.air_date }}</strong>
            </p>
            <p>
              Characters: <strong>{{ e.characters.length || 0 }}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
    <not-found v-if="!isLoading && episodes.length === 0"></not-found>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import repository from "@/repositories/episodes.js";

import EpisodeFilter from "@/components/episodes/EpisodeFilter.vue";
import Paginator from "@/components/ui/Paginator.vue";
import NotFound from "@/components/ui/NotFound.vue";

export default {
  components: {
    EpisodeFilter,
    Paginator,
    NotFound,
  },
  data() {
    return {
      episodes: [],
      currentPage: 1,
      pagesCount: 0,
      totalCount: 0,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      filter: "episodes/filter",
    }),
  },
  watch: {
    filter() {
      this.currentPage = 1;
      this.pagesCount = 0;
      this.totalCount = 0;
      this.episodes = [];
      this.loadEpisodes();
      this.scrollToTable();
    },
  },
  methods: {
    async loadEpisodes() {
      try {
        this.isLoading = true;
        const filter =
          this.filter.season !== ""
            ? { episode: "S0" + this.filter.season + "E" }
            : {};
        const response = await repository.fetchEpisodes(
          this.currentPage,
          filter
        );
        if (!response.data.data.episodes) {
          return;
        }
        this.episodes = response.data.data.episodes.results;
        this.pagesCount = response.data.data.episodes.info.pages;
        this.totalCount = response.data.data.episodes.info.count;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    pageChanged(index) {
      this.currentPage = index;
      this.loadEpisodes();
      this.scrollToTable();
    },
    scrollToTable() {
      if (this.$refs.episodesTable) {
        window.scrollTo(0, this.$refs.episodesTable.offsetTop);
      }
    },
  },
  created() {
    this.loadEpisodes();
  },
};
</script>
