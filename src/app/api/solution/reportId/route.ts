import { NextResponse } from "next/server";
import { SolutionModel } from "@/models/SolutionModel";
import { z } from "zod";

const schema = z.object({
  userId: z.string(),
  content: z.string(),
});

export async function POST(request: Request, { params }: { params: { reportId: string } }) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const data = {
    ...parsed.data,
    reportId: params.reportId,
  };
  const result = await SolutionModel.submit(data);
  return NextResponse.json({ message: "Solution submitted", insertedId: result.insertedId });
}
