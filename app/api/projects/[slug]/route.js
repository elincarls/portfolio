import { NextResponse } from "next/server";
import { dbConnect } from '@/lib/db';
import Project from '@/app/schemas/Project';

export const GET = async (request, context) => {
    if (process.env.NODE_ENV === "production") return new NextResponse(null, { status: 404 });
    try {
        const { slug } = await context.params;
        await dbConnect();
        const project = await Project.findOne({ slug }).lean();
        return new NextResponse(JSON.stringify(project, null, 2), {
            status: 200,
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        return new NextResponse("Error in fetching project " + error, { status: 500 });
    }
}
