import connectMongoDB from "../../../../lib/mongodb"
import Project from "../../../../models/project"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const project = await Project.findOne({ _id: Object(id) });
  return NextResponse.json({ project }, { status: 200 });
}