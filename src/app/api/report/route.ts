import { NextResponse } from "next/server";
import { ReportModel } from "@/models/ReportModel";
import { z } from "zod";
import { ReportType, Status } from "@/types/types";
import { cookies } from "next/headers";
import Jwt  from "jsonwebtoken";
import { UserModel } from "@/models/UserModel";
import { uploadToCloudinary } from "@/lib/cloudinary";

const schema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(["infrastruktur", "kebersihan", "keamanan", "sosial", "lainnya"]), // Batasi nilai category
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string().optional(),
  }),
  mediaUrls: z.array(z.string()).optional(),
  status: z.enum(["Dilaporkan", "Menunggu Verifikasi", "Dalam Proses", "Selesai"]), // Tambahkan properti status
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const exclude = searchParams.get("exclude");

  let filter: any = {};
  if (category) filter.category = category;
  if (exclude) filter._id = { $ne: exclude };

  const reports = await ReportModel.findAll(filter);
  return NextResponse.json(reports);
}

const JWT_SECRET = process.env.JWT_SECRET || "secret";




export async function POST(request: Request) {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  if (!tokenCookie) return NextResponse.json({ message: "Unauthorize", status: 401});

  let userData: { _id: string; email: string };

  try {
    userData = Jwt.verify(tokenCookie.value, JWT_SECRET) as { _id: string; email: string };
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const user = await UserModel.findById(userData._id);

  if (!user) return NextResponse.json({ error: "User not found"}, { status: 404 })

  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const validStatuses: Status[] = [
    Status.DILAPORKAN,
    Status.MENUNGGU_VERIFIKASI,
    Status.DALAM_PROSES,
    Status.SELESAI,
  ];

  if (!validStatuses.includes(parsed.data.status as Status)) {
    return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
  }

  let uploadedUrls: string[] = [];

  if (parsed.data.mediaUrls && parsed.data.mediaUrls.length > 0) {
    for (const base64 of parsed.data.mediaUrls) {
      const uploadedUrl = await uploadToCloudinary(base64, "urban-reports");
      uploadedUrls.push(uploadedUrl);
    }
  }

  const reportData: ReportType = {
    ...parsed.data,
    mediaUrls: uploadedUrls,
    userId: user?._id.toString(),
    reporter: {
      name: user?.name || "",
      avatar: user?.avatarUrl || "",
      username: user?.email || "",
    },
    status: parsed.data.status as Status, // Pastikan tipe sesuai
    voteCount: 0,
    commentCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    recentComments: [],
  };

  const result = await ReportModel.create(reportData);
  return NextResponse.json({ message: "Report created", insertedId: result.insertedId });
}