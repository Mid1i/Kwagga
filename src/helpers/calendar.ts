/**
 * Получить номер дня недели, где
 * 0 - понедельник,
 * 6 - воскресенье.
 * 
 * @param {Date} date - Текущая дата. 
 * @return {number} Номер дня недели.
 */
export const getWeekDayNumber = (date: Date): number => {
	const day = date.getDay();
	return day === 0 ? 6 : day - 1;
}