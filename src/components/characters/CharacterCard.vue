<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-square">
        <img :src="character.image" :alt="character.name" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ character.name }}</p>
          <p class="subtitle is-6">
            <span :class="statusTagClasses">{{
              character.status.toLowerCase()
            }}</span>
          </p>
        </div>
      </div>
      <div class="content">
        <p>
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
      const classes = { tag: true };
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
};
</script>
