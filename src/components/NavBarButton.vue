<template>
  <div>
    <p class="heading">{{ title }}</p>
    <p class="title">
      <router-link :to="'/' + type"
        ><img :alt="title" :src="imgUrl"
      /></router-link>
    </p>
  </div>
</template>

<script>
export default {
  props: ["imgUrl", "title", "type"],
};
</script>

<style scoped>
a {
  display: inline-block;
  cursor: pointer;
  background: transparent;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
a.active {
  border: 2px solid #444;
}
a:hover {
  box-shadow: rgba(255, 255, 100, 0.8) 0px 24px 25px,
    rgba(255, 255, 100, 0.65) 0px -12px 20px,
    rgba(255, 255, 100, 0.6) 0px 4px 6px, rgba(255, 255, 100, 0.7) 0px 12px 13px,
    rgba(255, 255, 100, 0.5) 0px -3px 5px;
}
img {
  max-width: 10vw;
  max-height: 10vw;
}
</style>
