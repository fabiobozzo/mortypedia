<template>
  <div class="card hoverable" @click="toDetails(character.id)">
    <div class="card-image">
      <figure class="image is-square">
        <img :src="character.image" :alt="character.name" />
      </figure>
      <span :class="statusTagClasses">{{
        character.status.toLowerCase()
      }}</span>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title">{{ character.name }}</p>
        </div>
      </div>
      <div class="content">
        <p v-if="character.type">
          Type: <strong>{{ character.type }}</strong>
        </p>
        <p>
          Species: <strong>{{ character.species }}</strong>
        </p>
        <p>
          Gender: <strong>{{ character.gender }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  computed: {
    statusTagClasses() {
      const classes = {
        tag: true,
      };
      if (this.character) {
        switch (this.character.status.toLowerCase()) {
          case "alive":
            classes["is-success"] = true;
            break;
          case "dead":
            classes["is-danger"] = true;
            break;
          case "unknown":
            classes["is-light"] = true;
            break;
        }
      }
      return classes;
    },
  },
  methods: {
    toDetails(id) {
      this.$router.push({ path: `/characters/${id}` });
    },
  },
};
</script>

<style scoped>
.card-image .tag {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
