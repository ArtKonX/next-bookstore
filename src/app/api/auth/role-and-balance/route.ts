import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connect from "@/db/mongpdb"

import Admin from "@/models/AdminUser";
import User from "@/models/RegularUser";
import { getServerSession } from "next-auth";


export const GET = async (request: NextRequest) => {
    const session = await getServerSession();

    await connect();

    try {
        const email = session?.user?.email;

        const admin = await Admin.findOne({ email: email });
        const user = await User.findOne({ email: email });

        if (admin) {
            return new NextResponse(JSON.stringify({role: admin.role, balance: admin.balance}), { status: 200 });
        }

        if (user) {
            return new NextResponse(JSON.stringify({role: user.role, balance: user.balance}), { status: 200 });
        }
    }

    catch (err: any) {
        return new NextResponse(err, { status: 500 });
    }
};