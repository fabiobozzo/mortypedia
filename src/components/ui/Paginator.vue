<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <ul class="pagination-list">
      <li v-for="i in pagesCount" :key="i">
        <a
          :class="{ 'pagination-link': true, 'is-current': i === currentPage }"
          :aria-label="'Go to page ' + i"
          :aria-current="i === currentPage ? 'page' : null"
          @click="toPage(i)"
        >
          {{ i }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    pagesCount: Number,
  },
  emits: ["pageChange"],
  methods: {
    toPage(index) {
      console.log("To page: " + index);
      this.$emit("pageChange", index);
    },
  },
};
</script>
