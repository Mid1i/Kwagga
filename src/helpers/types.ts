/**
 * Проверка на тип объекта. На вход подаётся тип, на принадлежание к которому идёт проверка.
 * 
 * @param {any[]} obj - Массив объектов. 
 * @param {keyof T} field - Ключ для проверки. 
 * @return {obj is T[]} - Возвращает принаджелит ли объект к данному типу или нет. 
 */
export const isInstanceOf = <T>(obj: any[], field: keyof T): obj is T[] => obj[0][field] !== undefined;