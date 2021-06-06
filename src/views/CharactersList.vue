<template>
  <div>
    <character-filter></character-filter>
    <div
      class="columns is-multiline"
      ref="charactersContainer"
      v-if="characters.length > 0"
    >
      <div
        v-for="c in characters"
        :key="c.id"
        class="column is-one-quarter-desktop is-one-third-tablet"
      >
        <character-card :character="c"></character-card>
      </div>
    </div>
    <div class="has-text-centered">
      <button
        class="button is-large"
        v-if="!isLoading && hasNextPage"
        @click="loadNextPage"
      >
        LOAD MORE
      </button>
      <img
        alt="Loading... Please wait."
        src="../assets/loading.gif"
        v-if="isLoading"
      />
    </div>
    <not-found v-if="!isLoading && characters.length === 0"></not-found>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import repository from "@/repositories/characters.js";

import CharacterCard from "@/components/characters/CharacterCard.vue";
import CharacterFilter from "@/components/characters/CharacterFilter.vue";
import NotFound from "@/components/ui/NotFound.vue";

export default {
  components: {
    CharacterCard,
    CharacterFilter,
    NotFound,
  },
  data() {
    return {
      characters: [],
      currentPage: 1,
      isLoading: false,
      hasNextPage: false,
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
      this.hasNextPage = false;
      this.characters = [];
      this.loadCharacters();
      if (this.$refs.charactersContainer) {
        window.scrollTo(0, this.$refs.charactersContainer.offsetTop);
      }
    },
  },
  methods: {
    async loadCharacters() {
      try {
        this.isLoading = true;
        const response = await repository.fetchCharacters(
          this.currentPage,
          this.filter
        );
        this.characters.push(...response.data.data.characters.results);
        this.hasNextPage = response.data.data.characters.info.next !== null;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    loadNextPage() {
      this.currentPage++;
      this.loadCharacters();
    },
  },
  created() {
    this.loadCharacters();
  },
};
</script>

<style scoped>
h2 {
  font-size: 2rem;
}
</style>
