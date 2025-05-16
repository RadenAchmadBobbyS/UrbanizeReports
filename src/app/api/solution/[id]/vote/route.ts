import { SolutionModel } from "@/models/SolutionModel";
import { NextResponse } from "next/server";


export async function POST(request: Request, context: { params: Promise<{ id: string }>}) {
    const { id } = await context.params
    await SolutionModel.upvoteSolution(id);
    return NextResponse.json({ message: "Upvoted"});
}