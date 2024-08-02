'use client';

import Link from 'next/link';
import { dmSerifDisplay400 } from '@/styles/fonts-project/fonts';
import styles from './MenuLink.module.scss';

type MenuLinkProps = {
    href: string;
    isActive: boolean;
    children: React.ReactNode;
}

export default function MenuLink({ href, isActive, children }: MenuLinkProps) {
    return (
        <div>
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