import { addLeadingZeros } from "@/helpers/words";


/**
 * Получение названия месяца по его номеру.
 * 
 * @param {number} month - Номер месяца. 
 * @return {string} - Возвращает название месяца. 
 */
export const formatMonth = (month: number): string => {
	const months: Record<number, string> = {
		0: "Январь",
		1: "Февраль",
		2: "Март",
		3: "Апрель",
		4: "Май",
		5: "Июнь",
		6: "Июль",
		7: "Август",
		8: "Сентябрь",
		9: "Октябрь",
		10: "Ноябрь",
		11: "Декабрь",
	}

	return months[month];
};

/**
 * Форматирование даты в формат "ДД.ММ.ГГГГ".
 * 
 * @param {Date} date - Дата для форматирования. 
 * @return {string} Возвращает дату в формате "ДД.ММ.ГГГГ". 
 */
export const formatDate = (date: Date): string => `${addLeadingZeros(date.getDate())}.${addLeadingZeros(date.getMonth() + 1)}.${addLeadingZeros(date.getFullYear())}`;