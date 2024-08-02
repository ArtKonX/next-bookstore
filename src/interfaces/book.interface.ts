export default interface IBook {
    _id: object,
    author: string,
    title: string,
    catagory: string,
    yearOfWriting: number,
    price: number,
    fileBook: string,
}

export default interface IBookData {
    books: IBook[]
}

export default interface IBookSingle {
    book: IBook
}