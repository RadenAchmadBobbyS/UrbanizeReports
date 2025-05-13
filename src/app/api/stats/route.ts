import { NextResponse } from "next/server";
import { ReportModel } from "@/models/ReportModel";
import { VoteModel } from "@/models/VoteModel";
import { SolutionModel } from "@/models/SolutionModel";

export async function GET() {
  const reportCount = await ReportModel.collection().countDocuments();
  const voteCount = await VoteModel.collection().countDocuments();
  const solutionCount = await SolutionModel.collection().countDocuments();

  return NextResponse.json({ reportCount, voteCount, solutionCount });
}
