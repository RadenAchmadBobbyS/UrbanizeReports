"use client";
import { JSX, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import {
  MapPin,
  Clock,
  ThumbsUp,
  MessageSquare,
  Search,
  Filter,
  AlertTriangle,
  Droplet,
  RouteIcon as Road,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Category, ReportType, Status } from "@/types/types";

const categoryIcons: Record<Category, JSX.Element> = {
  infrastruktur: <Road className="h-5 w-5 text-orange-800" />,
  kebersihan: <Droplet className="h-5 w-5 text-green-800" />,
  keamanan: <AlertTriangle className="h-5 w-5 text-red-800" />,
  sosial: <MessageSquare className="h-5 w-5 text-blue-800" />,
  lainnya: <AlertTriangle className="h-5 w-5 text-gray-800" />,
};

const categoryColors: Record<Category, string> = {
  infrastruktur: "bg-orange-100 text-orange-800",
  kebersihan: "bg-green-100 text-green-800",
  keamanan: "bg-red-100 text-red-800",
  sosial: "bg-blue-100 text-blue-800",
  lainnya: "bg-gray-100 text-gray-800",
};

const statusColors: Record<Status, string> = {
  Dilaporkan: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Menunggu Verifikasi": "bg-purple-100 text-purple-800 border-purple-200",
  "Dalam Proses": "bg-blue-100 text-blue-800 border-blue-200",
  Selesai: "bg-green-100 text-green-800 border-green-200",
};

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/report");
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src="/Globalization.gif" width={200} height={200}/>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pb-16">
        <div className="bg-gradient-to-r from-[#ec6f66] to-[#f3a183] text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Laporan Masalah</h1>
            <p className="max-w-2xl mb-6">
              Lihat semua laporan masalah yang telah disampaikan oleh warga. Dukung laporan yang menurutmu penting untuk
              segera ditangani.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari laporan..."
                  className="pl-10 bg-white/90 border-transparent focus:bg-white text-gray-800"
                />
              </div>
              <div className="flex gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] bg-white/90 border-transparent focus:bg-white text-gray-800">
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="infrastruktur">Infrastruktur</SelectItem>
                    <SelectItem value="kebersihan">Kebersihan</SelectItem>
                    <SelectItem value="keamanan">Keamanan</SelectItem>
                    <SelectItem value="sosial">Sosial</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] bg-white/90 border-transparent focus:bg-white text-gray-800">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="Dilaporkan">Dilaporkan</SelectItem>
                    <SelectItem value="Menunggu Verifikasi">Menunggu Verifikasi</SelectItem>
                    <SelectItem value="Dalam Proses">Dalam Proses</SelectItem>
                    <SelectItem value="Selesai">Selesai</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="bg-white/90 border-transparent hover:bg-white text-gray-800">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {reports.map((report) => (
              <Link href={`/reports/${report._id}`} key={report._id?.toString()}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 h-full flex flex-col">
                  <div className="relative">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={report.mediaUrls?.[0]}
                        alt={report.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className={`${categoryColors[report.category]} border-0 font-normal`}>
                        <span className="flex items-center gap-1">
                          {categoryIcons[report.category]}
                          {report.category}
                        </span>
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className={`${statusColors[report.status]} border font-normal`}>
                        {report.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{report.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{report.description}</p>

                    <div className="flex items-center text-gray-500 text-xs mb-2">
                      <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="line-clamp-1">{report.location?.address || "Lokasi tidak tersedia"}</span>
                    </div>

                    <div className="flex items-center text-gray-500 text-xs mb-3">
                      <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span>{new Date(report.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={report.reporter?.avatar} alt={report.reporter?.name} />
                          <AvatarFallback>{report.reporter?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600">{report.reporter?.username || "Anonim"}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="flex items-center text-gray-500 text-xs">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {report.voteCount || 0}
                        </span>
                        <span className="flex items-center text-gray-500 text-xs">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {report.commentCount || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}