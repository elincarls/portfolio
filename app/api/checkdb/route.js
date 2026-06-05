import { dbConnect } from '@/lib/db';
import { NextResponse } from "next/server";

export async function GET() {
    if (process.env.NODE_ENV === "production") return new NextResponse(null, { status: 404 });
    try {
      await dbConnect();
      return new NextResponse("connected to MongoDB Atlas", { status: 200 });
    } catch (error) {
      return new NextResponse(`connection failed: ${error.message}`, { status: 500 });
    }
  }
