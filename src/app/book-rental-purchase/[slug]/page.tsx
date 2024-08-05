'use client'

import React, { useState, useEffect, useRef } from 'react';
import { signOut, useSession } from "next-auth/react";

import { getBooksData } from '@/utils/apiUtils/apiRequests';

import BookRentalOrPurchase from '@/components/bookRentalOrPurchase/BookRentalOrPurchase';

import IBook from '@/interfaces/book.interface';

type Params = {
    slug: string
}

export default function BookRentalOrPurchasePage({ params }: {
    params: Params
}) {

    const [books, setBooks] = useState<IBook[]>([]);
    const { data: session } = useSession();

    const bookOnly = books.find((book: IBook) => book._id.toString() === params.slug);


    useEffect(() => {
        const books = async () => setBooks(await getBooksData())
        if (books) books()
    }, []);


    if (!bookOnly) {
        return <div>Loading...</div>;
    }

    return (
        <BookRentalOrPurchase params={params} email={session?.user?.email} bookId={bookOnly} />
    );
}