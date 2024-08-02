import type { Metadata } from "next";
import BooksContainer from "@/components/books/BooksContainer";

export const metadata: Metadata = {
    title: 'BookStore',
}

export default function HomePage() {

    return (
        <div>
            <BooksContainer/>
        </div>
    );
};