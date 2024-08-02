'use client'

import styles from './LoginLink.module.scss';
import Link from 'next/link';

const LoginLink = ({ text, href }: { text: string, href: string }) => (
    <div className={styles['login-link-container']}>
        <Link className={styles.link} href={href}>
            {text}
        </Link>
    </div>
);

export default LoginLink;