/**
 * Конвертирование строковой даты в обычную.
 * 
 * @param {string} dateString - Строка с датой в формате "ДД.ММ.ГГГГ".
 * @return {Date} Возращает дату в формате Date.
 */
export const convertToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('.').map(Number);
  return new Date(year, month - 1, day);
}
