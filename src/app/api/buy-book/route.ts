import { NextRequest } from "next/server";
import connect from "@/db/mongpdb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Book from "@/models/Book";
import User from '@/models/RegularUser'

import Purchase from '@/models/Purchase'
import { getServerSession } from "next-auth";

export const POST = async (request: NextRequest) => {
    const { bookId, title, author } = await request.json();

    const session = await getServerSession();

    await connect();

    const db = mongoose.connection.db;

    const collections = await db.listCollections().toArray();
    const purchaseCollectionName = 'purchases';
    const purchaseCollectionExists = collections.some((collection) => collection.name === purchaseCollectionName);

    if (!purchaseCollectionExists) {
        await db.createCollection(purchaseCollectionName);
        console.log(`Collection '${purchaseCollectionName}' created.`);
    }

    try {
        const book = await Book.findById(bookId);

        if (!book) {
            return new NextResponse('Book not found', { status: 404 });
        }

        const user = await User.findOne({ email: session?.user?.email });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        if (user.balance < book.price) {
            return new NextResponse('Insufficient balance', { status: 400 });
        }

        user.balance -= book.price;
        await user.save();

        const newPurchase = new Purchase({
            email: session?.user?.email,
            bookId,
            title,
            author,
            purchaseDate: new Date(),
            price: book.price
        });

        await newPurchase.save();

        return new NextResponse('Book purchased successfully', { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
}

export const GET = async (request: NextRequest) => {

    const session = await getServerSession();

    await connect();

    try {
        const purchases = await Purchase.find({ email: session?.user?.email });

        return new NextResponse(JSON.stringify(purchases), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};