'use client'
import axios from 'axios';
import styles from './ReaderContainer.module.scss'

import IBook from '@/interfaces/book.interface';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRent } from '@/utils/apiUtils/apiRequests';

import IRental from '@/interfaces/rental.interface';

const ReaderContainer = ({ params, book }: { params: any, book: IBook }) => {

    let fileContent;

    const [rental, setRental] = useState<IRental[]>()

    const route = useRouter()

    useEffect(() => {
        const fetchRent = async () => setRental(await getRent(params))
        if (fetchRent) fetchRent()
    }, []);


    try {
        fileContent = book.fileBook ? decodeURIComponent(escape(atob(book.fileBook))) : '';
    } catch (error) {
        console.error('Error decoding file content:', error);
        fileContent = 'Error loading file content';
    }

    if (rental) {
        const handleDelateRentalsBook = async () => {

            const currentDate = new Date();

            const dateObject = new Date(rental[0]?.endDate).getTime();

            if (currentDate.getTime() > dateObject) {
                const response = await axios.delete('../api/rent-book', { data: { _id: rental[0]._id } });
                if (response.status === 200) {
                    route.push('/home')
                    console.log("The lease period is over, the book has been removed from the leased")
                }
            }
        }
        handleDelateRentalsBook()
    }

    return (
        <div className={styles['reader-block']}>
            <h2 className={styles['reader-block__title']}>{book.title}</h2>
            <p className={styles['reader-block__author']}>Автор - {book.author.replace('-', ' ')}</p>
            <pre className={styles['reader-block__content']}>{fileContent}</pre>
        </div>
    );
};

export default ReaderContainer;
