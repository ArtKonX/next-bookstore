import Link from "next/link";
import { useContext } from "react";

import styles from './UserBalance.module.scss'
import { AccountContext } from "@/providers/accountContext/AccountContext";

export default function UserBalance() {

    const infoAccount = useContext(AccountContext);

    return (
        <div className={styles['balance']}>
            {infoAccount?.role === 'admin' ? (<span className={styles['admin-balance']}>xxx руб.</span>) :
            <Link href={'/transactions'} className={styles['user-balance-link']}>{infoAccount?.balance.toFixed(2)} руб.</Link>}
        </div>
    )
}