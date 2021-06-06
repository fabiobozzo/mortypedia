import { createRouter, createWebHistory } from "vue-router";
import CharactersList from "@/views/CharactersList.vue";
import CharacterDetails from "@/views/CharacterDetails.vue";
import EpisodesTable from "@/views/EpisodesTable.vue";
import LocationsTable from "@/views/LocationsTable.vue";

const routes = [
  { path: "/", redirect: "/characters" },
  {
    path: "/characters/:id",
    name: "character",
    component: CharacterDetails,
    props: true,
  },
  {
    path: "/characters",
    name: "characters",
    component: CharactersList,
  },
  {
    path: "/episodes/:id",
    name: "episode",
    component: EpisodesTable,
  },
  {
    path: "/episodes",
    name: "episodes",
    component: EpisodesTable,
  },
  {
    path: "/locations/:id",
    name: "locations",
    component: LocationsTable,
  },
  {
    path: "/locations",
    name: "location",
    component: LocationsTable,
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

router.beforeEach(function (to, from, next) {
  // console.log("Global router.beforeEach", to, from);
  next();
});

export default router;
