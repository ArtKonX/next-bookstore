'use client';

import Link from 'next/link';
import { dmSerifDisplay400 } from '@/styles/fonts-project/fonts';
import styles from './CatagoryMenuLink.module.scss';

interface MenuLinkProps {
    href: string;
    isActive: boolean;
    children: React.ReactNode;
}

export default function CatagoryMenuLink({ href, isActive, children }: MenuLinkProps) {
    return (
        <div className={styles['catagory-link-menu']}>
            <Link
                href={href}
                className={`${dmSerifDisplay400.className} ${isActive ? styles.menu__link_active : styles.menu__link
                    }`}
            >
                {children}
            </Link>
        </div>

    );
}