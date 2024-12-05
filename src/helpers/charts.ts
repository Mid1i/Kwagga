import type { TypeWeekDay } from "@/types/TypeWeekDays";


/**
 * Получение дней недели для графика.
 * 
 * @return {TypeWeekDaus[]} Возвращает массив дней для подписи оси графика. 
 */
export const getWeekLabels = (): TypeWeekDay[] => {
	let date = new Date();
	let days: TypeWeekDay[] = [];

	for (let i = 0; i < 6; i++) {
		const WEEK_DAYS: Record<string, TypeWeekDay> = {
			0: "Вс",
			1: "Пн",
			2: "Вт",
			3: "Ср",
			4: "Чт",
			5: "Пт",
			6: "Сб"
		};
		
		days.push(WEEK_DAYS[date.getDay()]);
		date.setDate(date.getDate() - 1);
	}

	return days;
};