'use client'

import BooksContainer from "@/components/books/BooksContainer";
import AdminPanelActionsContainer from "./adminPanelActions/AdminPanelActions";
import { useEffect, useState } from "react";
import { getRoleAndBalance } from "@/utils/apiUtils/apiRequests";

import IAccountInfo from "@/interfaces/account.interface";

export default function AdminPanelContainer() {

    const [infoAccount, setInfoAccount] = useState<IAccountInfo>();

    useEffect(() => {
        const fetchInfoAccount = async () => setInfoAccount(await getRoleAndBalance())
        if (fetchInfoAccount) fetchInfoAccount()
    }, []);

    if (infoAccount?.role != 'admin') return ( <h1 className='admin-panel-block'>Вы не админ(</h1> )

    return (
        <div className='admin-panel'>
            <AdminPanelActionsContainer />
            <BooksContainer />
        </div>
    )
}
