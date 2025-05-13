import { NextResponse } from "next/server";
import { SolutionModel } from "@/models/SolutionModel";

export async function GET() {
  const data = await SolutionModel.collection().find().toArray();
  return NextResponse.json(data);
}
