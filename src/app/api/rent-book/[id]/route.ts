import { NextRequest } from "next/server";
import connect from "@/db/mongpdb";
import { NextResponse } from "next/server";

import Rental from '@/models/Rental'

type Params = {
    id: string
}

export const GET = async (request: NextRequest, { params }: {params: Params}) => {
    const { id } = params;

    await connect();

    try {
        const rental = await Rental.find({bookId: id});

        if (!rental) {
            return new NextResponse("Rental not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(rental), { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};