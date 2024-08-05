'use client'
import ReaderContainer from "@/components/reader/ReaderContainer";
import { getBook } from "@/utils/apiUtils/apiRequests";
import { useEffect, useState } from "react";

import IBook from "@/interfaces/book.interface";

type Params = {
    slug: string
}

export default function LibraryPage({ params }: {
    params: Params
}) {

    const [book, setBook] = useState<IBook>();

    useEffect(() => {
        const fetchBook = async () => {
            const fetchedBook = await getBook(params);
            setBook(fetchedBook);
        };

        fetchBook();
    }, []);

    if (!book) {
        return <div>Loading...</div>;
    }


    return (
        <ReaderContainer params={params} book={book} />
    )
}