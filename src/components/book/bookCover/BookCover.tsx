import styles from './BookCover.module.scss'
import Link from 'next/link';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getRoleAndBalance } from '@/utils/apiUtils/apiRequests';
import { differenceInDays } from 'date-fns';

import IBookSingle from '@/interfaces/book.interface'

import IRental from '@/interfaces/rental.interface';
import IPurchase from '@/interfaces/purchase.interface';
import { useSession } from "next-auth/react";

import IAccountInfo from "@/interfaces/account.interface";


const BookCover = ({ book }: { book: IBookSingle }) => {

    const [infoAccount, setInfoAccount] = useState<IAccountInfo>();

    const [payment, setPayment] = useState<IPurchase[]>();

    const [rentals, setRentals] = useState<IRental[]>();

    const { data: session } = useSession();

    useEffect(() => {
        const fetchPosts = async () => setInfoAccount(await getRoleAndBalance())
        if (fetchPosts) fetchPosts()
    }, []);

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
            {infoAccount?.role === 'user' && (<p className={styles['book-cover__price']}>{isBookPurchased ? displayPrice : displayRentalsDuration}</p>)}
        </div>
    );
};

export default BookCover;