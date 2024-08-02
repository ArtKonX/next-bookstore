import { getRoleAndBalance } from "@/utils/apiUtils/apiRequests";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from './UserBalance.module.scss'

import IAccountInfo from "@/interfaces/account.interface";

export default function UserBalance() {

    const [infoAccount, setInfoAccount] = useState<IAccountInfo>();

    useEffect(() => {
        const fetchRoleAndBalance = async () => setInfoAccount(await getRoleAndBalance())
        if (fetchRoleAndBalance) fetchRoleAndBalance()
    }, []);

    return (
        <div className={styles['balance']}>
            {infoAccount?.role === 'admin' ? (<span className={styles['admin-balance']}>xxx руб.</span>) :
            <Link href={'/transactions'} className={styles['user-balance-link']}>{infoAccount?.balance.toFixed(2)} руб.</Link>}
        </div>
    )
}