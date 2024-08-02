import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/mongpdb";
import { getServerSession } from "next-auth";
import User from "@/models/RegularUser";

export const POST = async (request: NextRequest) => {
  try {
    await connect();

    const session = await getServerSession();

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { amount } = await request.json();

    if (typeof amount !== "number" || amount <= 0) {
      return new NextResponse("Invalid amount", { status: 400 });
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    user.balance += amount;
    await user.save();

    return new NextResponse(
      JSON.stringify({ message: "Balance updated successfully", balance: user.balance }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
};