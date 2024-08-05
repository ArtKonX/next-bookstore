import Book from "@/models/Book";
import connect from "@/db/mongpdb";
import mongoose, { Types } from "mongoose";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {

    await connect();

    try {

        const books = await Book.find({isHidden: false});

        if (!books) {
            return new NextResponse("Books not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(books), { status: 200 });


    } catch (err: any) {
        return new NextResponse(err.message, { status: 500 });
    }
};

export const DELETE = async (request: NextRequest) => {
    const { _id } = await request.json();

    await connect();

    try {
        const books = await Book.findByIdAndDelete(new Types.ObjectId(_id));

        if (!books) {
            return new NextResponse("Book not found", { status: 404 });
        }

        return new NextResponse("Book deleted successfully", { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};