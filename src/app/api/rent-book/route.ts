import { NextRequest } from "next/server";
import connect from "@/db/mongpdb";
import { NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import Book from "@/models/Book";
import User from '@/models/RegularUser'

import Rental from '@/models/Rental'
import { getServerSession } from "next-auth";

export const POST = async (request: NextRequest) => {
    const { email, title, author, bookId, rentalPeriod } = await request.json();

    const session = await getServerSession();



    await connect();

    const db = mongoose.connection.db;

    const collections = await db.listCollections().toArray();
    const rentalCollectionName = 'rentals';
    const rentalCollectionExists = collections.some((collection) => collection.name === rentalCollectionName);

    if (!rentalCollectionExists) {
        await db.createCollection(rentalCollectionName);
        console.log(`Collection '${rentalCollectionName}' created.`);
    }

    try {
        const book = await Book.findById(bookId);

        if (!book) {
            return new NextResponse('Book not found', { status: 404 });
        }


        let rentalDuration: number;
        let rentalPrice: number;

        switch (rentalPeriod) {
            case '2 weeks':
                rentalDuration = 14;
                rentalPrice = book.price * 0.1;
                break;
            case '1 month':
                rentalDuration = 30;
                rentalPrice = book.price * 0.2;
                break;
            case '3 months':
                rentalDuration = 90;
                rentalPrice = book.price * 0.5;
                break;
            default:
                return new NextResponse('Invalid rental period', { status: 400 });
        }

        const newRental = new Rental({
            email,
            bookId,
            title,
            author,
            rentalDuration,
            rentalPrice,
            startDate: new Date(),
            endDate: new Date(Date.now() + rentalDuration * 24 * 60 * 60 * 1000),
            isActive: true
        });

        const user = await User.findOne({ email: session?.user?.email });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        if (user.balance < newRental.rentalPrice) {
            return new NextResponse('Insufficient balance', { status: 400 });
        }

        user.balance -= newRental.rentalPrice;
        await user.save();

        await newRental.save();

        return new NextResponse('Book rented successfully', { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
}

export const GET = async (request: NextRequest) => {

    const session = await getServerSession();

    await connect();

    try {
        const purchases = await Rental.find({ email: session?.user?.email });

        return new NextResponse(JSON.stringify(purchases), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};


export const DELETE = async (request: NextRequest) => {
    const { _id } = await request.json();

    await connect();

    try {
        const rental = await Rental.findByIdAndDelete(new Types.ObjectId(_id));

        if (!rental) {
            return new NextResponse("Rental not found", { status: 404 });
        }

        return new NextResponse("Book deleted successfully", { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};