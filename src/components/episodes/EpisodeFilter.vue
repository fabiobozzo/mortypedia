<template>
  <div class="box">
    <div class="columns is-multiline">
      <div
        class="column is-one-quarter has-text-centered"
        v-for="s in seasons"
        :key="s"
      >
        <button
          class="button"
          @click="setSeasonFilter(s === filter.season ? '' : s)"
        >
          <span class="icon is-small" v-if="s === filter.season">
            <i class="fas fa-check"></i>
          </span>
          Season &nbsp;<strong>{{ s }}</strong>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      seasons: 4,
    };
  },
  computed: {
    ...mapGetters({
      filter: "episodes/filter",
    }),
  },
  methods: {
    ...mapActions("episodes", ["setFilter"]),
    setSeasonFilter(season) {
      this.setFilter({
        season: season,
      });
    },
  },
};
</script>
