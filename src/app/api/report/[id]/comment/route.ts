import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ReportModel } from "@/models/ReportModel";
import jwt from "jsonwebtoken";
import { UserModel } from "@/models/UserModel";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  // Ambil token dari cookie
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  if (!tokenCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let userData;
  try {
    userData = jwt.verify(tokenCookie.value, JWT_SECRET) as { _id: string; email: string };
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const user = await UserModel.findById(userData._id);

  const body = await request.json();
  if (!body.comment || typeof body.comment !== "string") {
    return NextResponse.json({ error: "Invalid comment" }, { status: 400 });
  }

  // Buat objek komentar
  const comment = {
    id: crypto.randomUUID(),
    user: {
      name: user?.name || "",
      username: user?.email || "",
      avatar: user?.avatarUrl || "",
    },
    comment: body.comment,
    date: new Date().toISOString(),
    likes: 0,
  };

  await ReportModel.addComment(params.id, comment);

  return NextResponse.json({ message: "Comment added", comment });
}