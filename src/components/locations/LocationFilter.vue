<template>
  <div class="box">
    <div class="columns is-mobile">
      <div class="column">
        <input
          class="input"
          type="text"
          placeholder="e.g. Planet"
          :value="filter.type"
          @input="debouncedApplyFilters"
          ref="typeInput"
        />
      </div>
      <div class="column">
        <input
          class="input"
          type="text"
          placeholder="e.g. C-137"
          :value="filter.dimension"
          @input="debouncedApplyFilters"
          ref="dimensionInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import debounce from "lodash/debounce";

export default {
  data() {
    return {
      debouncedApplyFilters: debounce(this.applyFilters, 800),
    };
  },
  computed: {
    ...mapGetters({
      filter: "locations/filter",
    }),
  },
  methods: {
    ...mapActions("locations", ["setFilter"]),
    applyFilters() {
      const locationType = this.$refs.typeInput.value.replace(/['"]+/g, "");
      const locationDimension = this.$refs.dimensionInput.value.replace(
        /['"]+/g,
        ""
      );
      this.setFilter({
        type: locationType,
        dimension: locationDimension,
      });
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
.expand-filters-enter-from,
.expand-filters-leave-from {
  max-height: 0;
}
.expand-filters-enter-active {
  transition: max-height 0.5s linear;
}
.expand-filters-enter-to,
.expand-filters-leave-to {
  max-height: 1000px;
}
.panel,
.panel-block {
  overflow: hidden;
}
</style>
