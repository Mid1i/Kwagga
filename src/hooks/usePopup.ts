import { ref } from "vue";


export const usePopup = () => {
	/**
	 * Видно ли модальное окно или нет.
	 */
	const isActivePopup = ref<boolean>(false);

	/**
	 * Скрыть/открыть модальное окно.
	 * 
	 * @return {void}
	 */
	const togglePopup = (): void => { 
		isActivePopup.value = !isActivePopup.value;
	};


	return { 
		/**
		 * Видно ли модальное окно или нет.
		 */
		isActivePopup, 
		/**
		 * Скрыть/открыть модальное окно.
		 * 
		 * @return {void}
		 */
		togglePopup 
	};
}