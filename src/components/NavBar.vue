<template>
  <div class="box">
    <div class="columns is-mobile">
      <div class="column has-text-centered">
        <nav-bar-button
          :imgUrl="require(`@/assets/rick.png`)"
          title="Characters"
          type="characters"
        ></nav-bar-button>
      </div>
      <div class="column has-text-centered">
        <nav-bar-button
          :imgUrl="require(`@/assets/portal-gun.png`)"
          title="Episodes"
          type="episodes"
        ></nav-bar-button>
      </div>
      <div class="column has-text-centered">
        <nav-bar-button
          :imgUrl="require(`@/assets/planet.png`)"
          title="Locations"
          type="locations"
        ></nav-bar-button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarButton from "./NavBarButton.vue";

export default {
  components: { NavBarButton },
};
</script>
