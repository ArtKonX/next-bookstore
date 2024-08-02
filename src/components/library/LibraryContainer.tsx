'use client'

import styles from './LibraryContainer.module.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getBooksData, getRoleAndBalance } from '@/utils/apiUtils/apiRequests';
import { dmSerifDisplay400 } from '@/styles/fonts-project/fonts';

import BookContainer from "../book/BookContainer";

import IPurchase from '@/interfaces/purchase.interface';

import IRental from '@/interfaces/rental.interface';

import IBook from '@/interfaces/book.interface';

import IAccountInfo from '@/interfaces/account.interface';

const LibraryContainer = () => {

    const [payment, setPayment] = useState<IPurchase[]>([]);

    const [rentals, setRentals] = useState<IRental[]>([]);

    const [books, setBooks] = useState<IBook[]>();

    const [infoAccount, setInfoAccount] = useState<IAccountInfo>();

    const handlePaymentBook = async () => {

        const response = await axios.get('../api/buy-book');

        setPayment(response.data)
    }

    useEffect(() => {
        handlePaymentBook()

    }, []);


    const handleRentalsBook = async () => {

        const response = await axios.get('../api/rent-book');

        setRentals(response.data)
    }

    useEffect(() => {
        handleRentalsBook()

    }, []);


    useEffect(() => {
        const fetchBooks = async () => setBooks(await getBooksData())
        if (fetchBooks) fetchBooks()
    }, []);

    useEffect(() => {
        const fetchInfoAccount = async () => setInfoAccount(await getRoleAndBalance())
        if (fetchInfoAccount) fetchInfoAccount()
    }, []);


    const listRentals = rentals?.map(elem => elem.bookId)
    const listPayment = payment?.map(elem => elem.bookId)


    const filterPurchasedBooks = books?.filter(book => (listPayment?.includes(book._id) || listRentals?.includes(book._id)))

    if (infoAccount?.role == 'admin') return <h1 className={styles['book__title']}>Вы админ у вас есть доступ к любой книге)</h1>;

    if (!filterPurchasedBooks) return <div>Loading...</div>;

    return (
        <div className={styles['container-books']}>
            <div className={`${dmSerifDisplay400.className} ${styles['books']}`}>
                <h1 className={styles['book__title']}>Все купленные книги:</h1>

                <ul className={styles['book__block']}>
                    {filterPurchasedBooks.length >= 1 ? filterPurchasedBooks?.map(book => (<li key={book._id.toString()} className={styles['book']}><BookContainer book={book} /></li>)) : <li className={styles['no-books']}>Нет купленных книг</li>}
                </ul>
            </div>
        </div>
    )
}

export default LibraryContainer