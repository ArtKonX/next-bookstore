import Book from "@/models/Book";
import connect from "@/db/mongpdb";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Types } from "mongoose";

type Params = {
    id: string
}

export const GET = async (request: NextRequest, { params }: {params: Params}) => {
    const { id } = params;

    await connect();

    try {
        const book = await Book.findById(new Types.ObjectId(id));

        if (!book) {
            return new NextResponse("Book not found", { status: 404 });
        }
        
        return new NextResponse(JSON.stringify(book), { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};