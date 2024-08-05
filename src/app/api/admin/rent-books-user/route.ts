import { NextRequest } from "next/server";
import connect from "@/db/mongpdb";
import { NextResponse } from "next/server";

import Rental from '@/models/Rental'

export const GET = async (request: NextRequest) => {

    await connect();

    try {
        const purchases = await Rental.find();

        return new NextResponse(JSON.stringify(purchases), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};