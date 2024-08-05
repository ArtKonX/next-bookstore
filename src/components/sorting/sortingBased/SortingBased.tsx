import { useEffect, useState } from "react";

import BookContainer from "@/components/book/BookContainer";

import styles from './SortingBased.module.scss'

import { getBooksData } from "@/utils/apiUtils/apiRequests";
import IBook from "@/interfaces/book.interface";


type Params = {
    slug: string
}

const SortingBased = ({ params }: { params: Params }) => {

    const [books, setBooks] = useState<IBook[]>();

    useEffect(() => {
        const fetchBooks = async () => setBooks(await getBooksData())
        if (fetchBooks) fetchBooks()
    }, []);

    const filterSortCatagory = books?.filter(book => book.catagory.replaceAll('%', '-') === params.slug.replaceAll('%', '-'))

    const filterSortYearOfWriting = books?.filter(book => book.yearOfWriting === Number(params.slug))
    const filterSortAuthor = books?.filter(book => book.author.replaceAll(' ', '-') === params.slug.replaceAll('%', '-'))

    if (!filterSortCatagory || !filterSortYearOfWriting || !filterSortAuthor) return <h1>Loading...</h1>;

    return (
        <div className={styles['container-sort-books']}>
            <div className={`${styles['sort-books']}`}>
                <h1 className={styles['sort-books__title']}>Сортировка на основе: {params.slug.replaceAll('-', ' ')}</h1>
                <ul className={styles['sort-books__block']}>
                    {filterSortCatagory?.length >= 1 ? (
                        filterSortCatagory.map((book: any) => (
                            <li key={book._id}><BookContainer book={book} /></li>
                        ))
                    ) : (filterSortYearOfWriting?.length >= 1 ? (
                        filterSortYearOfWriting.map((book: any) => (
                            <li key={book._id}><BookContainer book={book} /></li>
                        ))
                    ) : (filterSortAuthor?.length >= 1 ? (
                        filterSortAuthor.map((book: any) => (
                            <li key={book._id}><BookContainer book={book} /></li>
                        ))
                    ) : (
                        <li className={styles['sort-books__no-books']}>{'Нет книг по этой категории('}</li>
                    )))}
                </ul>
            </div>
        </div>
    )
}

export default SortingBased