<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half has-text-centered is-offset-one-quarter">
          <img class="logo" alt="Vue logo" src="./assets/logo.png" />
          <h2 class="schwifty">Characters Book</h2>
        </div>
      </div>
      <nav-bar></nav-bar>
      <div class="is-divider"></div>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.fullPath"></component>
        </keep-alive>
      </router-view>
    </div>
  </section>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>Mortypedia</strong> by
        <a href="https://github.com/fabiobozzo">Fabio Bozzo</a>.
      </p>
      <p>
        The source code is licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
      </p>
      <p>
        The website content is licensed
        <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          >CC BY NC SA 4.0</a
        >.
      </p>
    </div>
  </footer>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>

<style>
@font-face {
  font-family: "Get Schwifty";
  src: url("./assets/schwifty.woff2") format("woff2"),
    url("./assets/schwifty.woff") format("woff"),
    url("./assets/schwifty.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
.schwifty {
  font-family: "Get Schwifty";
  font-weight: normal;
  font-style: normal;
}
.hoverable {
  cursor: pointer;
}
.hoverable:hover {
  box-shadow: rgba(255, 255, 100, 0.8) 0px 5px 5px,
    rgba(255, 255, 100, 0.65) 0px -5px 5px, rgba(255, 255, 100, 0.6) 0px 5px 5px,
    rgba(255, 255, 100, 0.7) 0px 5px 5px, rgba(255, 255, 100, 0.5) 0px -5px 5px;
}
</style>

<style scoped>
.logo {
  max-height: 8rem;
}
.route-transition-enter-from,
.route-transition-leave-from {
  opacity: 0;
}

.route-transition-enter-active {
  transition: opacity 1s ease-out;
}

.route-transition-enter-to,
.route-transition-leave-to {
  opacity: 1;
}
</style>
