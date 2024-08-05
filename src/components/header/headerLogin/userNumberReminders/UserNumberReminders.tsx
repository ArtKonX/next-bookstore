import { useEffect, useState } from 'react';
import styles from './UserNumberReminders.module.scss'
import { getRemindersUserData } from '@/utils/apiUtils/apiRequests';
import IRental from '@/interfaces/rental.interface';
import Link from 'next/link';

const UserNumberReminders = () => {

    const [reminders, setUserNumberReminders] = useState<IRental>();

    useEffect(() => {
        const fetchReminders = async () => setUserNumberReminders(await getRemindersUserData())
        if (fetchReminders) fetchReminders()
    }, []);

    if (!reminders) return (<></>)

    if (reminders?.listRemindersRent.length >= 1) {
        return (
            <div className={styles['user-number-reminders-block']}>
                <Link href={'/reminders'} className={styles['user-number-reminders']}>
                    {reminders && reminders.listRemindersRent.length}
                </Link>
            </div>
        )
    }
}

export default UserNumberReminders