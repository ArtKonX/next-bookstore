'use client'

import { useEffect, useState } from "react";
import axios from 'axios';
import { roboto, dmSerifDisplay400 } from '@/styles/fonts-project/fonts';
import styles from './AddBalanceContainer.module.scss'
import { getRoleAndBalance } from "@/utils/apiUtils/apiRequests";

import IAccountInfo from '@/interfaces/account.interface';

export default function AddBalanceContainer() {

    const [balance, setBalance] = useState<number>(0);

    const [infoAccount, setInfoAccount] = useState<IAccountInfo>();

    async function handleSubmit() {
        try {
            const response = await axios.post('../api/add-balance', { amount: Number(balance) });
            console.log('Balance updated:', response.data);
            setBalance(0);
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating balance:', error);
        }
    }

    useEffect(() => {
        const fetchInfoAccount = async () => setInfoAccount(await getRoleAndBalance())
        if (fetchInfoAccount) fetchInfoAccount()
    }, []);

    if (infoAccount?.role == 'admin') return ( <h1 className='admin-add-balance'>Вы админ вам не нужно пополнять(</h1> )

    return (
        <div className={styles['add-balance']}>
            <form className={`${dmSerifDisplay400.className} ${styles.form}`} onSubmit={(e) => { [handleSubmit(), e.preventDefault()] }}>

                <div className={styles['form__input-block']}>
                    <label className={styles['label-title']}>Пополнить счёт:</label>
                    <input className={`${roboto.className} ${styles.input}`} type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} />
                </div>

                <button className={styles['form__btn-submit']} type='submit'>
                    Пополнить баланс
                </button>
            </form>
        </div>
    )
}