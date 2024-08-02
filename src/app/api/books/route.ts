import Book from "@/models/Book";
import connect from "@/db/mongpdb";
import mongoose, { Types } from "mongoose";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb',
        },
    },
};


export const POST = async (request: NextRequest) => {
    const { author, title, catagory, yearOfWriting, fileBook, price } = await request.json();

    await connect();

    const db = mongoose.connection.db;

    const collections = await db.listCollections().toArray();
    const collectionName = 'books';
    const collectionExists = collections.some((collection) => collection.name === collectionName);


    if (!collectionExists) {
        await db.createCollection(collectionName);
        console.log(`Collection '${collectionName}' created.`);
    }

    try {
        const newBook = new Book({
            author,
            title,
            catagory,
            yearOfWriting,
            price,
            fileBook
        });

        await newBook.save();

        return new NextResponse('Book added successfully', { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};


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