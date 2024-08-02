'use client';

import MenuLink from './menuLink/MenuLink';
import useActiveLink from '@/hooks/useActiveLink'
import { dmSerifDisplay400 } from '@/styles/fonts-project/fonts';
import styles from './HeaderMenu.module.scss';
import { useEffect, useState } from 'react';
import { getRoleAndBalance } from '@/utils/apiUtils/apiRequests';

import IAccountInfo from "@/interfaces/account.interface";

export default function HeaderMenu() {


    const [infoAccount, setInfoAccount] = useState<IAccountInfo>()

    useEffect(() => {
        const fetchRoleAndBalance = async () => setInfoAccount(await getRoleAndBalance())
        if (fetchRoleAndBalance) fetchRoleAndBalance()
    }, []);

    const isHomeActive = useActiveLink('/home');
    const isAdminActive = useActiveLink('/admin-panel');
    const isLibraryActive = useActiveLink('/library');
    const isAboutUsActive = useActiveLink('/about-us');

    return (
        <div>
            <nav className={styles.navigation}>
                <ul className={`${dmSerifDisplay400.className} ${styles.menu}`}>
                    <li>
                        <MenuLink href="/home" isActive={isHomeActive}>
                            Книги
                        </MenuLink>
                    </li>
                    {infoAccount?.role === 'admin' && (
                        <li>
                            <MenuLink href="/admin-panel" isActive={isAdminActive}>
                                Admin panel
                            </MenuLink>
                        </li>
                    )}
                    {(infoAccount?.role === 'user') && (
                        <li>
                            <MenuLink href="/library" isActive={isLibraryActive}>
                                Библиотека
                            </MenuLink>
                        </li>
                    )}
                    <li>
                        <MenuLink href="/about-us" isActive={isAboutUsActive}>
                            О нас
                        </MenuLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}