'use client'

import BooksContainer from "@/components/books/BooksContainer";
import AdminPanelActionsContainer from "./adminPanelActions/AdminPanelActions";
import { useContext, useEffect, useState } from "react";

import styles from './AdminPanelContainer.module.scss'

import { AccountContext } from "@/providers/accountContext/AccountContext";
import { getAllBooksData } from "@/utils/apiUtils/apiRequests";
import IBook from "@/interfaces/book.interface";

export default function AdminPanelContainer() {

    const infoAccount = useContext(AccountContext);

    const [books, setBooks] = useState<IBook[]>();

    useEffect(() => {
        const fetchBooks = async () => setBooks(await getAllBooksData())
        if (fetchBooks) fetchBooks()
    }, []);

    if (!books) return <div>Loading...</div>;


    if (infoAccount?.role != 'admin') return ( <h1 className='admin-panel-block'>Вы не админ(</h1> )

    return (
        <div className={styles['admin-panel']}>
            <AdminPanelActionsContainer />
            <BooksContainer books={books}/>
        </div>
    )
}
