import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { UserModel } from "@/models/UserModel";
import { SolutionModel } from "@/models/SolutionModel";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function POST(request: Request, context: { params: Promise<{ id: string }>}) {
    const { id } = await context.params;
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");
    if (!tokenCookie) return NextResponse.json({ message: "Unauthorized", status: 401 });

    let userData: { _id: string; email: string };
    try {
        userData = jwt.verify(tokenCookie.value, JWT_SECRET) as { _id: string; email: string };
    } catch {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await UserModel.findById(userData._id);

    const body = await request.json();
    if(!body.text || typeof body.text !== "string") return NextResponse.json({ message: "Invalid comment", status: 401 })
    
    await SolutionModel.comment(id, {
        userId: userData._id,
        text: body.text,
        name: user?.name || "",
        avatar: user?.avatarUrl || "",
    });

    return NextResponse.json({ message: "Comment added" })
}