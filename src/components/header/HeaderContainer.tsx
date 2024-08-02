'use client';

import HeaderLogo from './headerLogo/HeaderLogo';
import HeaderMenu from './headerMenu/HeaderMenu';
import HeaderAccount from './headerLogin/HeaderLogin';

import styles from './HeaderContainer.module.scss'

export default function HeaderContainer () {

    return (
        <div className={styles['container-header']}>
            <HeaderLogo/>
            <HeaderMenu/>
            <HeaderAccount/>
        </div>
    )
}