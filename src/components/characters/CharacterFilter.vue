<template>
  <nav class="panel">
    <p class="panel-heading filters-opener" @click="toggleFilters">
      <span class="icon">
        <i
          :class="{
            fas: true,
            'fa-chevron-right': !showFilters,
            'fa-chevron-down': showFilters,
          }"
        ></i>
      </span>
      <span class="link">Search</span>
    </p>
    <div class="panel-block" v-show="showFilters">
      <div class="fieldset">
        <div class="columns is-multiline">
          <div class="column is-half field">
            <label class="label">Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="e.g. Rick Sanchez"
                :value="filter.name"
                ref="nameInput"
              />
            </div>
          </div>
          <div class="column is-half field">
            <label class="label">Species</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="e.g. Human"
                :value="filter.species"
                ref="speciesInput"
              />
            </div>
          </div>
          <div class="column is-half field">
            <label class="label">Status</label>
            <div class="control select is-fullwidth">
              <select :value="filter.status" ref="statusSelect">
                <option value="">Any</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>
          <div class="column is-half field">
            <label class="label">Gender</label>
            <div class="control select is-fullwidth">
              <select :value="filter.gender" ref="genderSelect">
                <option value="">Any</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="genderless">Gender-less</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>
          <div class="column is-half field">
            <button
              class="button is-link is-light is-fullwidth"
              @click="resetFilters"
            >
              Reset
            </button>
          </div>
          <div class="column is-half field">
            <button
              class="button is-link is-fullwidth"
              @click.prevent="applyFilters"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      filtersOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      filter: "characters/filter",
    }),
    showFilters() {
      return (
        this.filtersOpen ||
        this.filter.name.trim() !== "" ||
        this.filter.species.trim() !== "" ||
        this.filter.status !== "" ||
        this.filter.gender !== ""
      );
    },
  },
  methods: {
    ...mapActions("characters", ["setFilter"]),
    toggleFilters() {
      this.filtersOpen = !this.filtersOpen;
    },
    applyFilters() {
      const name = this.$refs.nameInput.value;
      const species = this.$refs.speciesInput.value;
      const status = this.$refs.statusSelect.value;
      const gender = this.$refs.genderSelect.value;
      this.setFilter({
        name: name,
        species: species,
        status: status,
        gender: gender,
      });
    },
    resetFilters() {
      this.setFilter({});
      this.filtersOpen = false;
    },
  },
};
</script>

<style scoped>
.fieldset {
  width: 100%;
}
.filters-opener {
  cursor: pointer;
}
.link:hover {
  text-decoration: underline;
}
</style>
