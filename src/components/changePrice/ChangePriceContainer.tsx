'use client';

import React from 'react';
import styles from './ChangePriceContainer.module.scss'
import ChangePriceForm from './changePriceForm/ChangePriceForm';

import { useEffect, useState } from 'react';


import { getBook, getRoleAndBalance } from '@/utils/apiUtils/apiRequests';
import IBook from '@/interfaces/book.interface';

import IAccountInfo from '@/interfaces/account.interface';

type Params = {
    slug: string;
};

export default function ChangePriceContainer({ params }: { params: Params }) {

    const [infoAccount, setInfoAccount] = useState<IAccountInfo | undefined>();

    const [book, setBook] = useState<IBook>();

    useEffect(() => {
        const fetchBook = async () => {
            const fetchedBook = await getBook(params);
            setBook(fetchedBook);
        };

        fetchBook();
    }, []);

    useEffect(() => {
        const fetchInfoAccount = async () => setInfoAccount(await getRoleAndBalance())
        if (fetchInfoAccount) fetchInfoAccount()
    }, []);

    if (infoAccount?.role != 'admin') return ( <h1 className='admin-panel-block'>Вы не админ(</h1> )

    if (!book) return <div>Loading...</div>;


    return (
        <div className={styles['container-change-price']}>
            <h1 className={styles['title-change-price']}>Цена:</h1>
            <ChangePriceForm book={book} />
        </div>
    );
}