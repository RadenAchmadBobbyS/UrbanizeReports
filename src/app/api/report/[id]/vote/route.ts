import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ReportModel } from "@/models/ReportModel";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  // Ambil user dari cookie
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("userData");
  if (!userCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let userId: string | undefined;
  try {
    const userData = JSON.parse(userCookie.value);
    userId = userData._id || userData.id;
  } catch {
    userId = userCookie.value;
  }

  if (!userId) {
    return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  const report = await ReportModel.findById(id);
  if (!report) return NextResponse.json({ error: "Report not found"}, { status: 404 });

  // Cek apakah user sudah pernah vote
  if (report.voters && report.voters.includes(userId)) {
    return NextResponse.json({ error: "Already voted" }, { status: 400 });
  }

  // Tambah vote dan user ke voters
  await ReportModel.voteCount(id, userId);

  return NextResponse.json({ message: "Voted", userId });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }>}) {
  const { id } = await context.params;
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("userData");

  if (!userCookie) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let userId: string | undefined;
  try {
    const userData = JSON.parse(userCookie.value);
    userId = userData._id || userData.id;
  } catch (error) {
    userId = userCookie.value;
  }

  if (!userId) return NextResponse.json({ error: "Invalid User" }, { status: 400 });

  const report = await ReportModel.findById(id);
  if (!report) return NextResponse.json({ error: "Report not found"}, { status: 404 });

  if (!report.voters || !report.voters.includes(userId)) return NextResponse.json({ error: "You haven't voted yet"}, { status: 400 });

  await ReportModel.unvoteCount(id, userId);

  return NextResponse.json({ message: "Unvoted", userId });
}