import Book from "@/models/Book";
import connect from "@/db/mongpdb";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {

    await connect();

    try {

        const books = await Book.find();

        if (!books) {
            return new NextResponse("Books not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(books), { status: 200 });


    } catch (err: any) {
        return new NextResponse(err.message, { status: 500 });
    }
};