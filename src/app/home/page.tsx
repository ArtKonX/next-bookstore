'use client'

import BooksContainer from "@/components/books/BooksContainer";
import { useEffect, useState } from "react";
import IBook from "@/interfaces/book.interface";
import { getBooksData } from "@/utils/apiUtils/apiRequests";

export default function HomePage() {

    const [books, setBooks] = useState<IBook[]>();

    useEffect(() => {
        const fetchBooks = async () => setBooks(await getBooksData())
        if (fetchBooks) fetchBooks()
    }, []);

    if (!books) return <div>Loading...</div>;

    return (
        <BooksContainer books={books}/>
    );
};