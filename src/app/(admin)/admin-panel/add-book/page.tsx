import type { Metadata } from "next";
import { AddBookForm } from "@/components/adminPanel/addBook/addBookForm/AddBookForm";

export const metadata: Metadata = {
    title: 'AddBook',
}

export default function HomePage() {

    return (
        <div>
            <AddBookForm/>
        </div>
    );
};