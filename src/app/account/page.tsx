import AccountContainer from '@/components/account/AccountContainer';

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Account',
}

export default function AccountPage() {
    return (
        <div>
            <AccountContainer />
        </div>
    )
}