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
		path: "/coworking",
		component: () => import("@/pages/Coworking.vue"),
		meta: {
			titleHtml: "KWAGGA | Коворкинг",
			title: "Коворкинг"
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
