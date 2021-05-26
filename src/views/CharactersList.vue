<template>
  <div>
    <character-filter></character-filter>
    <div class="columns is-multiline">
      <div class="column is-one-third-desktop is-half-tablet">
        <character-card></character-card>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <character-card></character-card>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <character-card></character-card>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <character-card></character-card>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <character-card></character-card>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <character-card></character-card>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <character-card></character-card>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <character-card></character-card>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <character-card></character-card>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <character-card></character-card>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <character-card></character-card>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <character-card></character-card>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <character-card></character-card>
      </div>
      <div class="column is-one-third-desktop is-half-tablet">
        <character-card></character-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
    loadCharacters() {
      this.characters = [];
      console.log("loadCharacters");
    },
  },
};
</script>
