import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connect from "@/db/mongpdb"

import User from "@/models/RegularUser";
import { getServerSession } from "next-auth";


export const GET = async (request: NextRequest) => {
    const session = await getServerSession();

    await connect();

    try {
        const email = session?.user?.email;

        const user = await User.findOne({ email: email });

        if (user) {
            return new NextResponse(JSON.stringify({listRemindersRent: user.listRemindersRent}), { status: 200 });
        }
    }

    catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};