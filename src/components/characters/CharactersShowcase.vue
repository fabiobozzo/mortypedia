<template>
  <div
    class="column is-narrow"
    v-for="character in characters"
    :key="character.id"
  >
    <router-link :to="'/characters/' + character.id">
      <figure class="image is-96x96 hoverable">
        <img
          class="is-rounded"
          :src="character.image"
          :alt="character.name"
          :title="character.name"
        />
      </figure>
    </router-link>
  </div>
</template>

<script>
export default {
  props: { characters: Array },
};
</script>
