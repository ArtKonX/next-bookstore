'use client'

import { differenceInDays } from 'date-fns';
import styles from './AdminRemindersUsersBtn.module.scss'
import { useEffect, useState } from 'react';
import { addReminders, getAllRentsData } from '@/utils/apiUtils/apiRequests';

import IRental from '@/interfaces/rental.interface';


export default function AddRemindersusersContainer() {

    const [rentsData, setRentsData] = useState<IRental[]>();

    useEffect(() => {
        const fetchInfoAccount = async () => setRentsData(await getAllRentsData())
        if (fetchInfoAccount) fetchInfoAccount()
    }, []);

    const listReminders: any = []

    if (rentsData) rentsData.filter((rent) => differenceInDays(rent.endDate, new Date()) <= 3).map((rent) => listReminders.push({ email: rent.email, reminders: `У вас заканчивается срок аренды книги ${rent.title} автора ${rent.author}` }))

    function handleSubmit() {
        try {
            listReminders?.map((data: any) => addReminders(data))
        } catch (error) {
            console.error('Error add reminders users:', error);
        }
    }


    return (
        <div className={styles['reminders-users-btn-block']}>
            <button className={styles['reminders-users-btn']} onClick={handleSubmit}>Напомнить пользователям об окончании аренды</button>
        </div>
    )
}