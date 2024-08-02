'use client';
import styles from './AuthorMenuContainer.module.scss'

import AuthorMenuLink from "./AuthorMenuLink/AuthorMenuLink";

import { getBooksData } from '@/utils/apiUtils/apiRequests';
import { useEffect, useState } from 'react';
import IBook from '@/interfaces/book.interface';
import { usePathname } from 'next/navigation';

const AuthorMenuContainer = () => {

    const [books, setBooks] = useState<IBook[]>();

    const pathname = usePathname();

    useEffect(() => {
        const fetchBooks = async () => {
            const booksData = await getBooksData();

            const uniqueAuthors = booksData.filter((book: IBook, index: number, self: IBook[]) =>
                index === self.findIndex(b => b.author === book.author)
            );

            const uniqueBooks = uniqueAuthors.map((book: IBook) => ({
                ...book,
                author: book.author
            }));
            setBooks(uniqueBooks);
        };
        fetchBooks();
    }, []);

    return (
        <div className={styles['author-sort']}>
            <h1 className={styles['author-sort__title']}>Автор:</h1>
            <ul className={styles['author-sort__list']}>
                {books?.map((book) => (<li key={book._id.toString()}><AuthorMenuLink href={`/home/${book.author}`} isActive={pathname.replaceAll('%20', '-') === `/home/${book.author}`}>
                    {(book.author).replaceAll('-', ' ')}
                </AuthorMenuLink></li>))}
            </ul>
        </div>
    );
};

export default AuthorMenuContainer;