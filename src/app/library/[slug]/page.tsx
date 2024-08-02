'use client'
import ReaderContainer from "@/components/reader/ReaderContainer";
import { getBooksData } from "@/utils/apiUtils/apiRequests";
import { useEffect, useState } from "react";

import IBook from "@/interfaces/book.interface";

export async function getStaticPaths() {
    const response = await getBooksData();
    const books = response.data;

    const paths = books.map((book: IBook) => ({
        params: { slug: book?._id.toString() },
    }));

    return {
        paths,
        fallback: false,
    };
}

type Params = {
    slug: string
}

export default function LibraryPage({ params }: {
    params: Params
}) {

    const [books, setBooks] = useState<IBook[]>([]);

    const bookOnly = books.find((book: IBook) => book._id.toString() === params.slug);

    useEffect(() => {
        const books = async () => setBooks(await getBooksData())
        if (books) books()
    }, []);

    if (!bookOnly) {
        return <div>Loading...</div>;
    }


    return (
        <ReaderContainer params={params} book={bookOnly} />
    )
}