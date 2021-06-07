<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <ul class="pagination-list">
      <li>
        <a
          :class="{ 'pagination-link': true, 'is-current': 1 === currentPage }"
          :aria-label="'Go to page 1'"
          :aria-current="1 === currentPage ? 'page' : null"
          @click="toPage(1)"
        >
          1
        </a>
      </li>
      <li v-if="currentPage >= 4 && pagesCount >= 6">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-for="i in pagesCount" :key="i">
        <a
          :class="{ 'pagination-link': true, 'is-current': i === currentPage }"
          :aria-label="'Go to page ' + i"
          :aria-current="i === currentPage ? 'page' : null"
          @click="toPage(i)"
          v-if="
            i !== 1 &&
            i !== pagesCount &&
            i <= currentPage + 1 &&
            i >= currentPage - 1
          "
        >
          {{ i }}
        </a>
      </li>
      <li v-if="currentPage <= pagesCount - 3 && pagesCount >= 6">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-if="pagesCount > 1">
        <a
          :class="{
            'pagination-link': true,
            'is-current': pagesCount === currentPage,
          }"
          :aria-label="'Go to page ' + pagesCount"
          :aria-current="pagesCount === currentPage ? 'page' : null"
          @click="toPage(pagesCount)"
        >
          {{ pagesCount }}
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
      this.$emit("pageChange", index);
    },
  },
};
</script>
