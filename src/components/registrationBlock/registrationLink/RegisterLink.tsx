'use client'

import styles from './RegisterLink.module.scss';
import Link from 'next/link';

const RegisterLink = ({ text, href }: {text: string, href: string}) => (
    <div className={styles['link-block']}>
        <Link className={styles['link-block__link']} href={href}>
            {text}
        </Link>
    </div>
);

export default RegisterLink;