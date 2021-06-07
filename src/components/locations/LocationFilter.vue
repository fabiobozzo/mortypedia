<template>
  <div class="box">
    <div class="columns is-mobile">
      <div class="column">
        <label class="label">Type</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="e.g. Planet"
            :value="filter.type"
            @input="debouncedApplyFilters"
            ref="typeInput"
          />
        </div>
      </div>
      <div class="column">
        <label class="label">Dimension</label>
        <div class="control">
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
