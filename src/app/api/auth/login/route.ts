import { NextResponse } from "next/server";
import { UserModel } from "@/models/UserModel";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const user = await UserModel.login(parsed.data.email);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const valid = await bcrypt.compare(parsed.data.password, user.password);
  if (!valid) return NextResponse.json({ error: "Wrong password" }, { status: 401 });

  const token = jwt.sign({ _id: user._id.toString(), email: user.email }, JWT_SECRET, { expiresIn: "7d" });

  return NextResponse.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
}
