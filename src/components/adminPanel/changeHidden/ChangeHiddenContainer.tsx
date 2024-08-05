'use client';

import React, { useContext } from 'react';
import styles from './ChangeHiddenContainer.module.scss'
import ChangeSelectHidden from './changeSelectHidden/SelectIsHiddent';

import { useEffect, useState } from 'react';


import { getBook } from '@/utils/apiUtils/apiRequests';
import IBook from '@/interfaces/book.interface';

import { AccountContext } from '@/providers/accountContext/AccountContext';

type Params = {
    slug: string;
};

export default function ChangeSelectHiddenContainer({ params }: { params: Params }) {

    const infoAccount = useContext(AccountContext);

    const [book, setBook] = useState<IBook>();

    useEffect(() => {
        const fetchBook = async () => {
            const fetchedBook = await getBook(params);
            setBook(fetchedBook);
        };

        fetchBook();
    }, []);

    if (infoAccount?.role != 'admin') return ( <h1 className='admin-panel-block'>Вы не админ(</h1> )

    if (!book) return <div>Loading...</div>;


    return (
        <div className={styles['container-change-hidden']}>
            <h1 className={styles['title-change-hidden']}>Изменить доступность:</h1>
            <ChangeSelectHidden book={book} />
        </div>
    );
}