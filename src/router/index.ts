import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";


declare module "vue-router" {
	interface RouteMeta {
		titleHtml: string, 
		title: String   
	}
}


const routes = [
	{
		path: "/",
		component: () => import("@/pages/Main.vue"),
		meta: {
			titleHtml: "KWAGGA | Админ-панель",
			title: "Главная"
		}
	},
	{
		path: "/users",
		component: () => import("@/pages/Users.vue"),
		meta: {
			titleHtml: "KWAGGA | Пользователи",
			title: "Пользователи"
		}
	},
	{
		path: "/space",
		component: () => import("@/pages/Space.vue"),
		meta: {
			titleHtml: "KWAGGA | Коворкинг",
			title: "Коворкинг"
		}
	},
	{
		path: "/analytics",
		component: () => import("@/pages/Analytics.vue"),
		meta: {
			titleHtml: "KWAGGA | Аналитика",
			title: "Аналитика"
		}
	},
	{
		path: "/bookings",
		component: () => import("@/pages/Bookings.vue"),
		meta: {
			titleHtml: "KWAGGA | Брони",
			title: "Брони"
		}
	},
];


export const router = createRouter({
	history: createWebHistory(),
	routes
});


router.afterEach(to => nextTick(() => document.title = to.meta.titleHtml));
