'use client'

import IRental from '@/interfaces/rental.interface';
import styles from './UserRemindersContainer.module.scss'
import { useEffect, useState } from 'react';
import { getRemindersUserData } from '@/utils/apiUtils/apiRequests';

const UserRemindersContainer = () => {

    const [reminders, setUserNumberReminders] = useState<IRental>();

    useEffect(() => {
        const fetchReminders = async () => setUserNumberReminders(await getRemindersUserData())
        if (fetchReminders) fetchReminders()
    }, []);

    return (
        <div className={styles['user-reminders-container']}>
            <h1 className={styles['user-reminders-title']}>Все нанпоминания об окончании срока аренды:</h1>
            <ul className={styles['user-reminders-list']}>
                {reminders && reminders?.listRemindersRent.length >= 1 ? reminders?.listRemindersRent.map((reminder) => (<li key={reminder} className={styles['reminders']}>Админ - {reminder}</li>)) : <li className={styles['reminders']}>У вас нет напоминаний об окончании срока аренды)</li>}
            </ul>
        </div>
    )
}

export default UserRemindersContainer