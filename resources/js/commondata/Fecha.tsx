function getFecha(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export const Fecha = getFecha();
