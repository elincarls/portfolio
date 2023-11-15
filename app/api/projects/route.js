import connectMongoDB from "../../../lib/mongodb"
import Project from "../../../models/project"
import { NextResponse } from "next/server"

export async function GET() {
    await connectMongoDB();
    const projects = await Project.find();
    return NextResponse.json({ projects });
}