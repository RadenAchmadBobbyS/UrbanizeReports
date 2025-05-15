import { NextResponse } from "next/server";
import { ReportModel } from "@/models/ReportModel";
import { z } from "zod";
import { ReportType, Status } from "@/types/types";

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

export async function GET() {
  const reports = await ReportModel.findAll();
  return NextResponse.json(reports);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const validStatuses: Status[] = ["Dilaporkan", "Menunggu Verifikasi", "Dalam Proses", "Selesai"];

  if (!validStatuses.includes(parsed.data.status as Status)) {
    return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
  }

  const reportData: ReportType = {
    ...parsed.data,
    status: parsed.data.status as Status, // Pastikan tipe sesuai
    createdBy: parsed.data.userId,
    voteCount: 0,
    commentCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    recentComments: [],
  };

  const result = await ReportModel.create(reportData);
  return NextResponse.json({ message: "Report created", insertedId: result.insertedId });
}