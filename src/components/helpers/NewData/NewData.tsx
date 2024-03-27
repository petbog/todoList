import React from 'react';
export const formatDate = (date?: any): string => {
    const currentDate = date ? new Date(date) : new Date();

    return currentDate.toISOString();
};

// export const formattedDateDeadline = (string: string) => {
//     const date = new Date(string);
//     return `${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} ${date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' }).split('.').join('.')}`;

// }
export const formattedDateDeadline = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes} ${day}.${month}.${year}`;
}