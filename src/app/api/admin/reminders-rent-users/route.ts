import User from '@/models/RegularUser'
import connect from "@/db/mongpdb";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    await connect();

    try {
      const { email, reminders } = await request.json();

      const listRemindersRent = await User.findOneAndUpdate(
        { email: email },
        { $push: { listRemindersRent: reminders } },
        { new: true }
      );

      await listRemindersRent.save();

      return new NextResponse("Reminders added successfully", { status: 200 });
    } catch (err: any) {
      return new NextResponse(err.message, { status: 500 });
    }
  };