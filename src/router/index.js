import { createRouter, createWebHashHistory } from "vue-router";
import CharactersList from "@/views/CharactersList.vue";

const routes = [
    {
        path: "/",
        name: "Characters",
        component: CharactersList,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
