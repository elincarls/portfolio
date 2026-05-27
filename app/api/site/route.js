import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Site from "@/app/schemas/Site";

export const GET = async () => {
  try {
    await dbConnect();
    const site = await Site.findOne({}).lean();
    return NextResponse.json(site);
  } catch (error) {
    return new NextResponse("Error fetching site content: " + error, { status: 500 });
  }
};
