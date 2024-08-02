'use client';

import React, { useState, useEffect } from 'react';
import BookContainer from '@/components/book/BookContainer';
import styles from './BooksContainer.module.scss';
import { dmSerifDisplay400 } from '@/styles/fonts-project/fonts';

import { getBooksData } from '@/utils/apiUtils/apiRequests';
import IBook from '@/interfaces/book.interface';

const BooksContainer = () => {

    const [books, setBooks] = useState<IBook[]>();

    useEffect(() => {
        const fetchBooks = async () => setBooks(await getBooksData())
        if (fetchBooks) fetchBooks()
    }, []);

    if (!books) return <div>Loading...</div>;

    return (
        <div className={styles['books-container']}>
            <div className={`${dmSerifDisplay400.className} ${styles['books']}`}>
                <h1 className={styles['books__title']}>Все книги:</h1>

                <ul className={styles['books__list']}>
                    {books.length >= 1 ? (
                        books.map((book: any) => (
                            <li className={styles['book']} key={book._id}><BookContainer book={book} /></li>
                        ))
                    ) : (
                        <li className={styles['books__no-books']}>{'Нет книг('}</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default BooksContainer;