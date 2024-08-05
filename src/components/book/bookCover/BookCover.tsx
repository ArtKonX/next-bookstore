import styles from './BookCover.module.scss'
import Link from 'next/link';

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { differenceInDays } from 'date-fns';

import IBookSingle from '@/interfaces/book.interface'

import IRental from '@/interfaces/rental.interface';
import IPurchase from '@/interfaces/purchase.interface';
import { useSession } from "next-auth/react";

import { AccountContext } from '@/providers/accountContext/AccountContext';


const BookCover = ({ book }: { book: IBookSingle }) => {

    const infoAccount = useContext(AccountContext);

    const [payment, setPayment] = useState<IPurchase[]>();

    const [rentals, setRentals] = useState<IRental[]>();

    const { data: session } = useSession();

    const handleRentBook = async () => {

        const response = await axios.get('../api/buy-book');

        setPayment(response.data)
    }

    useEffect(() => {
        handleRentBook()

    }, []);

    const handleRentalsBook = async () => {

        const response = await axios.get('../api/rent-book');

        setRentals(response.data)
    }

    useEffect(() => {
        handleRentalsBook()

    }, []);

    const isBookPurchased = payment?.some(elem => elem.bookId === book._id);
    const displayPrice = isBookPurchased ? 'куплена' : book.price.toString();

    const isBookRentals = rentals?.some(elem => elem.bookId === book._id);

    const displayRentalsDuration = isBookRentals ? (
        rentals?.filter(rental => rental.bookId === book._id).map(rental => {
            const daysRemaining = differenceInDays(rental.endDate, new Date());
            return daysRemaining >= 0 ? `${daysRemaining} дней осталось` : `${book.price} руб.`;
        })
    ) : (
        `${book.price} руб.`
    );

    return (
        <div className={styles['book-cover']}>

            <Link href={(isBookRentals || isBookPurchased) || (infoAccount?.role === 'admin') ? `/library/${book._id}` : session?.user ? `/book-rental-purchase/${book._id}`: '/home'}>
                <h2 className={styles['book-cover__title']}>{book.title}</h2>
                <p className={styles['book-cover__author']}>{book.author.replaceAll('-', ' ')}</p>
            </Link>
            <p className={styles['book-cover__price']}>{isBookPurchased ? displayPrice : displayRentalsDuration}</p>
            {infoAccount?.role === 'admin' && <p className={styles['book-cover__hidden']}>Скрытая: {book.isHidden.toString()}</p>}
        </div>
    );
};

export default BookCover;