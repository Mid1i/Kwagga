import { ref, Ref } from "vue";
import { defineStore } from "pinia";

import type { TypeThemes } from "@/types/TypeThemes";


export const useTheme = defineStore("theme", () => {
	/**
	 * Текущая тема приложения. По умолчанию - светлая.
	 * 
	 * @type {Ref<TypeThemes>}
	 */
	const theme: Ref<TypeThemes> = ref("light");


	/**
	 * Смена темы приложения.
	 * 
	 * @param {TypeThemes} appTheme - новая тема приложения. 
	 * @return {void}
	 */
	const switchTheme = (appTheme: TypeThemes):void => {
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
		 * @type {Ref<TypeThemes>}
		 */
		theme,
		/**
		 * Смена темы приложения.
		 * 
		 * @param {TypeThemes} appTheme - новая тема приложения. 
		 * @return {void}
		 */
		switchTheme,
		/**
		 * Начальная настройка темы при инициализации приложения.
		 */
		watchStorageTheme
	}
})