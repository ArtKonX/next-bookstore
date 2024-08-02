'use client';

import Link from 'next/link';

import styles from './HeaderLogo.module.scss';
import { pacifico, russoOne } from '../../../styles/fonts-project/fonts';

export default function HeaderLogo() {

    return (
        <div className={styles['header-logo']}>
            <Link className={styles['header-logo__link']} href="/home" replace>
                <span className={`${pacifico.className} ${styles['logo-text']}`}>Book<span className={`${russoOne.className} ${styles['logo-text_color']}`}>Store</span></span>
            </Link>
        </div>
    )
}