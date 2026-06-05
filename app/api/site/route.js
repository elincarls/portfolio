import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Site from "@/app/schemas/Site";

export const GET = async () => {
  if (process.env.NODE_ENV === "production") return new NextResponse(null, { status: 404 });
  try {
    await dbConnect();
    const site = await Site.findOne({}).lean();
    return new NextResponse(JSON.stringify(site, null, 2), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new NextResponse("Error fetching site content: " + error, { status: 500 });
  }
};
