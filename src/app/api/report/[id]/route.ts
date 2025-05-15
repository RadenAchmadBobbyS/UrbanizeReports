import { NextResponse } from "next/server";
import { ReportModel } from "@/models/ReportModel";
import { ObjectId } from "mongodb";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
      const { id } = await context.params; 
      const report = await ReportModel.findById(id);
      if (!report) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(report);
  } catch (error) {
      console.log(error)
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const updated = await ReportModel.updateStatus(params.id, body.status);
  return NextResponse.json({ message: "Updated", updated });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const result = await ReportModel.collection().deleteOne({ _id: new ObjectId(params.id) });
  return NextResponse.json({ message: "Deleted", deletedCount: result.deletedCount });
}
