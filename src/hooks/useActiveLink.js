'use client';

import { usePathname } from 'next/navigation';

export default function useActiveLink(href) {
    const pathname = usePathname();
    return pathname === href;
}