'use client'

import { getRoleAndBalance } from '@/utils/apiUtils/apiRequests';
import { FC, ReactNode, useEffect, useState } from 'react'

import { AccountContext } from './accountContext/AccountContext';

import IAccountInfo from '@/interfaces/account.interface';

type providerProps = {
    children: ReactNode,
}

const AccountProvider: FC<providerProps> = ({
    children }) => {

    const [infoAccount, setInfoAccount] = useState<IAccountInfo>();

    useEffect(() => {
        const fetchInfoAccount = async () => {
            setInfoAccount(await getRoleAndBalance());
        };

        const interval = setInterval(fetchInfoAccount, 1500);

        return () => clearInterval(interval);
    }, []);

    return (<AccountContext.Provider value={infoAccount}>{children}</AccountContext.Provider>)
}

export default AccountProvider;