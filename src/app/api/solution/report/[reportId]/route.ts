import { NextResponse } from "next/server";
import { SolutionModel } from "@/models/SolutionModel";
import { z } from "zod";

const schema = z.object({
  userId: z.string(),
  content: z.string(),
});

export async function GET(request: Request, context: { params: Promise<{ reportId: string }> }) {
  const { reportId } = await context.params;
  const solutions = await SolutionModel.findByReport(reportId);
  return NextResponse.json(solutions);
}

export async function POST(request: Request, context: { params: Promise<{ reportId: string }> }) {
  const { reportId } = await context.params;
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const data = {
    ...parsed.data,
    reportId,
  };
  const result = await SolutionModel.submit(data);
  return NextResponse.json({ message: "Solution submitted", insertedId: result.insertedId });
}