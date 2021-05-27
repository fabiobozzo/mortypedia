<template>
  <div>
    <character-filter></character-filter>
    <div class="columns is-multiline">
      <div
        v-for="c in characters"
        :key="c.id"
        class="column is-one-third-desktop is-half-tablet"
      >
        <character-card :character="c"></character-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import repository from "@/repositories/characters.js";

import CharacterCard from "@/components/characters/CharacterCard.vue";
import CharacterFilter from "@/components/characters/CharacterFilter.vue";

export default {
  components: {
    CharacterCard,
    CharacterFilter,
  },
  data() {
    return {
      characters: [],
    };
  },
  computed: {
    ...mapGetters({
      filter: "characters/filter",
    }),
  },
  watch: {
    filter() {
      this.loadCharacters();
    },
  },
  methods: {
    async loadCharacters() {
      this.characters = [];
      try {
        const response = await repository.fetchCharacters(1, this.filter);
        console.log(response.data.data);
        this.characters = response.data.data.characters.results;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
