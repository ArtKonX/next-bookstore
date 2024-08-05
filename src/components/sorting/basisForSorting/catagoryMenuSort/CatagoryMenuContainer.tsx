'use client';
import styles from './CatagoryMenuContainer.module.scss'

import CatagoryMenuLink from "./catagoryMenuLink/CatagoryMenuLink";

import { getBooksData } from '@/utils/apiUtils/apiRequests';
import { useEffect, useState } from 'react';
import IBook from '@/interfaces/book.interface';
import { usePathname } from 'next/navigation';

const CatagoryMenu = () => {

    const [books, setBooks] = useState<IBook[]>();

    const pathname = usePathname();

    useEffect(() => {
        const fetchBooks = async () => {
            const booksData = await getBooksData();

            const uniqueAuthors = booksData.filter((book: IBook, index: number, self: IBook[]) =>
                index === self.findIndex(b => b.catagory === book.catagory)
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
        <div className={styles['catagory']}>
            <h1 className={styles['catagory__title']}>Категория:</h1>
            {(books?.length >= 1) ?
            (<ul className={styles['catagory__list']}>
                {books?.map((book) => (<li key={book._id.toString()}><CatagoryMenuLink href={`/home/${book.catagory}`} isActive={pathname.replaceAll('%20', '-') === `/home/${book.catagory}`}>
                    {book.catagory.replaceAll('-', ' ')}
                </CatagoryMenuLink></li>))}
            </ul>) : <span className={styles['no-year-sort']}>Книги не добавлены</span>}
        </div>
    )
};

export default CatagoryMenu;