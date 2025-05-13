import { NextResponse } from "next/server";
import { ReportModel } from "@/models/ReportModel";
import { z } from "zod";
import { ObjectId } from "mongodb";

const schema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(["infrastruktur", "kebersihan", "keamanan", "sosial", "lainnya"]), // Batasi nilai category
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string().optional(), 
  }),
  mediaUrls: z.array(z.string()).optional(), 
});

export async function GET() {
  const reports = await ReportModel.findAll();
  return NextResponse.json(reports);
}

export async function POST(request: Request) {


}