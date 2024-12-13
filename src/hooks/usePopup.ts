import { ref } from "vue";


export const usePopup = () => {
	/**
	 * Видно ли модальное окно или нет.
	 */
	const isActivePopup = ref<boolean>(false);

	/**
	 * Скрыть/открыть модальное окно.
	 */
	const togglePopup = (): void => { 
		isActivePopup.value = !isActivePopup.value;
	};


	return {
		isActivePopup,
		togglePopup 
	};
}