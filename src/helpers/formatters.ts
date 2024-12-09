import type { TypeDadataInformation } from "@/types/TypeDadata";

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

/**
 * Форматирование адреса в формат "Страна, округ, город, дом, квартира".
 * 
 * @param {TypeDadataInformation} suggest - Объект с сервиса Dadata, содержащий всю информацию об адресе. 
 * @return {string} Возвращает адрес в формате "Страна, округ, город, дом, квартира".
 */
export const formatAddress = (suggest: TypeDadataInformation): string => {
	const address = {
		country: suggest.data.country ?? "",
		region: suggest.data.region_with_type ?? "",
		city: suggest.data.city_with_type ?? "",
		street: suggest.data.street_with_type ?? "",
		house: suggest.data.house ? `д ${suggest.data.house}` : "",
		flat: suggest.data.flat ? `кв ${suggest.data.flat}` : ""
	};


	return Object.values(address).filter(Boolean).join(", ");
};