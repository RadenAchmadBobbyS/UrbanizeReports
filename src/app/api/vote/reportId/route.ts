import { NextResponse } from "next/server";
import { VoteModel } from "@/models/VoteModel";

export async function GET(_: Request, { params }: { params: { reportId: string } }) {
  const voteData = await VoteModel.collection().find({ reportId: params.reportId }).toArray();
  return NextResponse.json({ voteCount: voteData.length });
}

export async function POST(request: Request, { params }: { params: { reportId: string } }) {
  const { userId } = await request.json();
  try {
    await VoteModel.castVote(userId, params.reportId);
    return NextResponse.json({ message: "Vote recorded" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
