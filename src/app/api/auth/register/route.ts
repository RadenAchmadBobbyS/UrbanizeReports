import { NextResponse } from "next/server";
import { UserModel } from "@/models/UserModel";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const hashed = await bcrypt.hash(parsed.data.password, 10);

  const userData = {
    _id: new ObjectId(), // Tambahkan properti _id
    name: parsed.data.name,
    email: parsed.data.email,
    password: hashed,
    role: "user" as const, // Pastikan tipe role sesuai dengan "user" | "admin"
    createdAt: new Date(), // Properti default
    updatedAt: new Date(), // Properti default
  };

  const result = await UserModel.register(userData);

  return NextResponse.json({ message: "Register success", userId: result.insertedId });
}