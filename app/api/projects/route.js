import { NextResponse } from "next/server";
import { dbConnect } from '@/lib/db';
import Project from '@/app/schemas/Project';

export const GET = async (request) => {
    if (process.env.NODE_ENV === "production") return new NextResponse(null, { status: 404 });
    try {
        await dbConnect();
        const projects = await Project.find({}).lean();
        return new NextResponse(JSON.stringify(projects, null, 2), {
            status: 200,
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        return new NextResponse("Error in fetching projects " + error, { status: 500 });
    }
}