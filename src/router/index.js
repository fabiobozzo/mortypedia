import { createRouter, createWebHistory } from "vue-router";
import CharactersList from "@/views/CharactersList.vue";
import EpisodesTable from "@/views/EpisodesTable.vue";
import LocationsTable from "@/views/LocationsTable.vue";

const routes = [
  { path: "/", redirect: "/characters" },
  {
    path: "/characters",
    name: "characters",
    component: CharactersList,
  },
  {
    path: "/episodes",
    name: "episodes",
    component: EpisodesTable,
  },
  {
    path: "/locations",
    name: "locations",
    component: LocationsTable,
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes: routes,
});

router.beforeEach(function (to, from, next) {
  console.log("Global router.beforeEach", to, from);
  next();
});

export default router;
