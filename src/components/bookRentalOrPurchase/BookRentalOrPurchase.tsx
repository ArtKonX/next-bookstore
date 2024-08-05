import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useRouter } from 'next/navigation';

import styles from './BookRentalOrPurchase.module.scss'
import { getBook } from '@/utils/apiUtils/apiRequests';
import IBook from '@/interfaces/book.interface';

import isRentalPrice from '@/utils/isRentalPrice'

const BookRentalOrPurchase = ({ params, email, bookId }: { params: any, email: string | undefined | null, bookId: IBook }) => {

    const [rentalPeriod, setRentalPeriod] = useState('');
    const [book, setBook] = useState<IBook>();

    const router = useRouter()

    useEffect(() => {
        const fetchBook = async () => {
            const fetchedBook = await getBook(params);
            setBook(fetchedBook);
        };

        fetchBook();
    }, []);

    const handleRentBook = async () => {
        try {
            const response = await axios.post('/api/rent-book', {
                email,
                bookId: bookId._id,
                title: bookId.title,
                author: bookId.author,
                rentalPeriod,
            });

            if (response.status == 200) {
                router.push(`/library/${params.slug}`)
            }

        } catch (error: any) {
            console.error(error.response.data);
        }
    };

    const handleBuyBook = async () => {
        try {
            const response = await axios.post('/api/buy-book', {
                bookId: bookId._id,
                title: bookId.title,
                author: bookId.author,
            });

            if (response.status == 200) {
                router.push(`/library/${params.slug}`)
            }

        } catch (error: any) {
            console.error(error.response.data);
        }
    };

    return (
        <div className={styles['book-rental-or-purchase']}>
            <h1 className={styles['book-rental-or-purchase__title']}>Аренда или покупка книги:</h1>
            <div className={styles['book-rental-or-purchase__container']}>
                <div className={styles['rental-block']}>
                    <h2 className={styles['rental-block__title']}>Аренда:</h2>
                    <select
                        className={styles['rental-select']}
                        value={rentalPeriod}
                        onChange={(e) => setRentalPeriod(e.target.value)}
                    >
                        <option value="">Выберите срок аренды</option>
                        <option value="2 weeks">2 недели</option>
                        <option value="1 month">1 месяц</option>
                        <option value="3 months">3 месяц</option>
                    </select>
                    <span className={styles['price-rental']}>Цена для аренды: {isRentalPrice(rentalPeriod, book?.price) ? isRentalPrice(rentalPeriod, book?.price) + ' руб.' : 'Не выбрана аренда'}</span>
                    <button className={styles['rental-btn']} onClick={handleRentBook}>Арендовать</button>
                </div>

                <span className={styles['line']}></span>

                <div className={styles['purchase-block']}>
                    <h2 className={styles['purchase-block__title']}>Покупка:</h2>
                    <span className={styles['price-purchase']}>Цена покупки: {book?.price} руб.</span>
                    <button className={styles['purchase-btn']} onClick={handleBuyBook}>Купить</button>
                </div>
            </div>
        </div>
    );
};

export default BookRentalOrPurchase;