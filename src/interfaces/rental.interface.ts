export default interface IRental {
    _id: object,
    email: string,
    bookId: object,
    rentalDuration: number,
    rentalPrice: number,
    startDate: Date,
    title: string,
    author: string,
    listRemindersRent: [],
    endDate: Date
}