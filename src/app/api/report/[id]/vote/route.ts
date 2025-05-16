import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ReportModel } from "@/models/ReportModel";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  // Ambil user dari cookie
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
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

  // Tambah vote (like)
  await ReportModel.voteCount(params.id);

  return NextResponse.json({ message: "Voted", userId });
}