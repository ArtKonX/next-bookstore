import Book from "@/models/Book";
import connect from "@/db/mongpdb";
import mongoose, { Types } from "mongoose";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    const { author, title, catagory, yearOfWriting, fileBook, price, isHidden } = await request.json();

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
            fileBook,
            isHidden
        });

        await newBook.save();

        return new NextResponse('Book added successfully', { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};