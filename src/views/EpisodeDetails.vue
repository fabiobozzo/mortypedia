<template>
  <div>
    <div class="mb-4">
      <a v-if="showBackToEpisodes" @click.prevent="$router.back()">
        <i class="fas fa-arrow-left"></i> back to episodes
      </a>
    </div>
    <div v-if="episode">
      <div class="box content">
        <h1>{{ episode.episode }}</h1>
        <p>
          Title: <strong>{{ episode.name }}</strong>
        </p>
        <p>
          Air Date: <strong>{{ episode.air_date }}</strong>
        </p>
      </div>
      <div class="box" v-if="episode.characters.length > 0">
        <div class="content">
          <h2>Characters</h2>
        </div>
        <div class="columns is-multiline is-mobile">
          <characters-showcase
            :characters="episode.characters"
          ></characters-showcase>
        </div>
      </div>
    </div>
    <div class="has-text-centered" v-if="isLoading">
      <img alt="Loading... Please wait." src="../assets/loading.gif" />
    </div>
  </div>
</template>

<script>
import repository from "@/repositories/episodes.js";

import CharactersShowcase from "@/components/characters/CharactersShowcase.vue";

export default {
  props: ["id"],
  components: {
    CharactersShowcase,
  },
  data() {
    return {
      isLoading: false,
      episode: null,
      showBackToEpisodes: false,
    };
  },
  methods: {
    async loadEpisode() {
      try {
        this.isLoading = true;
        const response = await repository.fetchEpisode(this.id);
        this.episode = response.data.data.episode;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.loadEpisode();
  },
  beforeRouteEnter(_, from, next) {
    next((vm) => {
      vm.showBackToEpisodes = from && from.name === "episodes";
    });
  },
};
</script>
