import { ref, Ref } from "vue";
import { defineStore } from "pinia";

import type { TypeTheme } from "@/types/TypeThemes";


export const useTheme = defineStore("theme", () => {
	/**
	 * Текущая тема приложения. По умолчанию - светлая.
	 * 
	 * @type {Ref<TypeTheme>}
	 */
	const theme: Ref<TypeTheme> = ref("light");


	/**
	 * Смена темы приложения.
	 * 
	 * @param {TypeTheme} appTheme - новая тема приложения.
	 */
	const switchTheme = (appTheme: TypeTheme):void => {
		document.documentElement.setAttribute("data-theme", appTheme);
		localStorage.setItem("theme", appTheme);
		theme.value = appTheme;
	};

	/**
	 * Начальная настройка темы при инициализации приложения.
	 */
	const watchStorageTheme = ():void => {
		const storageTheme = localStorage.getItem("theme");
		if (storageTheme === "dark" || storageTheme === "light") switchTheme(storageTheme);
	}


	return {
		/**
		 * Текущая тема приложения. По умолчанию - светлая.
		 * 
		 * @type {Ref<TypeTheme>}
		 */
		theme,
		/**
		 * Смена темы приложения.
		 * 
		 * @param {TypeTheme} appTheme - новая тема приложения.
		 */
		switchTheme,
		/**
		 * Начальная настройка темы при инициализации приложения.
		 */
		watchStorageTheme
	}
})