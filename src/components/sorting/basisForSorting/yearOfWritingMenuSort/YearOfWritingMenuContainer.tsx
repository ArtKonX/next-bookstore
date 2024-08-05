'use client';
import styles from './YearOfWritingMenuContainer.module.scss'

import YearOfWritingMenuLink from "./yearOfWritingMenuLink/YearOfWritingMenuLink";

import { getBooksData } from '@/utils/apiUtils/apiRequests';
import { useEffect, useState } from 'react';
import IBook from '@/interfaces/book.interface';
import { usePathname } from 'next/navigation';

const yearOfWritingContainer = () => {

    const [books, setBooks] = useState<IBook[]>();

    const pathname = usePathname();

    useEffect(() => {
        const fetchBooks = async () => {
            const booksData = await getBooksData();

            const uniqueAuthors = booksData.filter((book: IBook, index: number, self: IBook[]) =>
                index === self.findIndex(b => b.yearOfWriting === book.yearOfWriting)
            );

            const uniqueBooks = uniqueAuthors.map((book: IBook) => ({
                ...book,
                author: book.catagory.replaceAll('-', ' ')
            }));
            setBooks(uniqueBooks);
        };
        fetchBooks();
    }, []);

    if (!books) return <h1>Loading...</h1>;

    return (
        <div className={styles['year-sort']}>
            <h1 className={styles['year-sort__title']}>Год:</h1>

            {(books.length >= 1) ?
            (<ul className={styles['year-sort__list']}>
                {books?.map((book) => (<li key={book._id.toString()}><YearOfWritingMenuLink href={`/home/${book.yearOfWriting}`} isActive={pathname === `/home/${book.yearOfWriting}`}>
                    {book.yearOfWriting}
                </YearOfWritingMenuLink></li>))}
            </ul>) : <span className={styles['no-year-sort']}>Книги не добавлены</span>}
        </div>
    );
};

export default yearOfWritingContainer;