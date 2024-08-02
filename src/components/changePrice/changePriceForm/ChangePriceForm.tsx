'use client';

import React, { useState } from 'react';
import { dmSerifDisplay400, roboto } from '@/styles/fonts-project/fonts';
import styles from './ChangePriceForm.module.scss';

import { putBookPrice } from '@/utils/apiUtils/apiRequests';

import IBook from '@/interfaces/book.interface';

const ChangePriceForm = ({ book }: { book: IBook }) => {
    const [price, setPrice] = useState(Number(book.price));
    const [id, setId] = useState(book._id);

    return (

        <div className={styles['change-price']}>
            <form className={`${dmSerifDisplay400.className} ${styles.form}`} onSubmit={(e) => { [putBookPrice({ id, price }), e.preventDefault()] }}>
                <div className={styles['form__input-block']}>
                    <label className={styles['label-title']}>Цена:</label>
                    <input
                        className={`${roboto.className} ${styles.input}`}
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </div>
                <button className={styles['btn-submit']} type="submit">
                    Поменять цену
                </button>
            </form>
        </div>


    );
};

export default ChangePriceForm;