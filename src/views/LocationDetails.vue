<template>
  <div>
    <div class="mb-4">
      <a v-if="showBackToLocations" @click.prevent="$router.back()">
        <i class="fas fa-arrow-left"></i> back to locations
      </a>
    </div>
    <div v-if="location">
      <div class="box content">
        <h1>{{ location.name }}</h1>
        <p>
          Type: <strong>{{ location.type }}</strong>
        </p>
        <p>
          Dimension: <strong>{{ location.dimension }}</strong>
        </p>
      </div>
      <div class="box" v-if="location.residents.length > 0">
        <div class="content">
          <h2>Residents</h2>
        </div>
        <div class="columns is-multiline is-mobile">
          <characters-showcase
            :characters="location.residents"
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
import repository from "@/repositories/locations.js";

import CharactersShowcase from "@/components/characters/CharactersShowcase.vue";

export default {
  props: ["id"],
  components: {
    CharactersShowcase,
  },
  data() {
    return {
      isLoading: false,
      location: null,
      showBackToLocations: false,
    };
  },
  methods: {
    async loadLocation() {
      try {
        this.isLoading = true;
        const response = await repository.fetchLocation(this.id);
        this.location = response.data.data.location;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.loadLocation();
  },
  beforeRouteEnter(_, from, next) {
    next((vm) => {
      vm.showBackToLocations = from && from.name === "locations";
    });
  },
};
</script>
