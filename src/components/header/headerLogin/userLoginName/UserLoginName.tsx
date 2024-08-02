'use client'

import Link from 'next/link';
import { useSession } from "next-auth/react";
import styles from './UserLoginName.module.scss';

export default function UserLoginName() {
    const { data: session } = useSession();

    return (
        <div className={styles['user-block']}>
            <Link className={styles['user-block__link']} href={session ? "/account" : '/home'}>{session?.user?.name}</Link>
        </div>

    )
}
