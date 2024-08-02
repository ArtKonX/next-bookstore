import Admin from "@/models/AdminUser";
import connect from "@/db/mongpdb"
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

export const POST = async (request: NextRequest) => {
    const { name, email, password, balance = 'xxx' } = await request.json();

    await connect();

    const db = mongoose.connection.db;


    const collections = await db.listCollections().toArray();
    const collectionName = 'admins';
    const collectionExists = collections.some((collection) => collection.name === collectionName);


    if (!collectionExists) {
        await db.createCollection(collectionName);
        console.log(`Collection '${collectionName}' created.`);
    }

    const existingUser = await Admin.findOne({ email });

    if (existingUser) {
        return new NextResponse("Email is already in use", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new Admin({
        name,
        email,
        password: hashedPassword,
        balance,
        role: 'admin',
    });

    try {

        await newUser.save();
        return new NextResponse("Admin is registered", { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, {
            status: 500,
        });
    }
};