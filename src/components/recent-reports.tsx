"use client";
import { JSX, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  MapPin,
  Clock,
  ThumbsUp,
  MessageSquare,
  AlertTriangle,
  Droplet,
  RouteIcon as Road,
  Trash2,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const categoryIcons: Record<string, JSX.Element> = {
  infrastruktur: <Road className="h-5 w-5 text-orange-800" />,
  sosial: <Droplet className="h-5 w-5 text-blue-800" />,
  kebersihan: <Trash2 className="h-5 w-5 text-green-800" />,
  keamanan: <AlertTriangle className="h-5 w-5 text-red-800" />,
};

const categoryColors: Record<string, string> = {
  Infrastruktur: "bg-orange-100 text-orange-800",
  Bencana: "bg-blue-100 text-blue-800",
  Kebersihan: "bg-green-100 text-green-800",
  Keamanan: "bg-red-100 text-red-800",
};

const statusColors: Record<string, string> = {
  Dilaporkan: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Menunggu Verifikasi": "bg-purple-100 text-purple-800 border-purple-200",
  "Dalam Proses": "bg-blue-100 text-blue-800 border-blue-200",
  Selesai: "bg-green-100 text-green-800 border-green-200",
};

export default function RecentReports() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/report");
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();

        // Urutkan laporan berdasarkan tanggal terbaru
        const sortedReports = data.sort(
          (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setReports(sortedReports);
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
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section id="recent-reports" className="py-16 bg-gradient-to-r from-[#ec6f66] to-[#f3a183] shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold sm:text-3xl text-white pl-10">Laporan Terbaru</h2>
          <Link href="/reports" className="text-[#fdfdfd] hover:text-[#3e3e3e] font-medium flex items-center pr-10">
            Lihat Semua
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white rounded-xl overflow-hidden shadow-2xl hover:shadow-orange-900 transition-all border border-gray-100"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-2/5 relative">
                  <Link href={`/reports/${report._id}`}>
                    <div className="aspect-square md:h-full overflow-hidden">
                      <img
                        src={report.mediaUrls?.[0]}
                        alt={report.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {report.mediaUrls?.length > 1 && (
                      <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                        +{report.mediaUrls.length - 1} foto
                      </div>
                    )}
                  </Link>
                </div>

                {/* Content Section */}
                <div className="md:w-3/5 p-4 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`${categoryColors[report.category] || "bg-gray-100 text-gray-800"} border-0 font-normal`}>
                      <span className="flex items-center gap-1">
                        {categoryIcons[report.category] || <AlertTriangle className="h-5 w-5 text-gray-800" />}
                        {report.category}
                      </span>
                    </Badge>
                    <Badge className={`${statusColors[report.status] || "bg-gray-100 text-gray-800"} border font-normal`}>
                      {report.status}
                    </Badge>
                  </div>

                  <Link href={`/reports/${report._id}`} className="group">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#ec6f66] transition-colors">
                      {report.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{report.description}</p>

                  <div className="flex items-center text-gray-500 text-xs mb-2">
                    <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="line-clamp-1">{report.location?.address || "Lokasi tidak tersedia"}</span>
                  </div>

                  <div className="flex items-center text-gray-500 text-xs mb-3">
                    <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span>
                      {new Date(report.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={report.reporter?.avatar} alt={report.reporter?.name} />
                        <AvatarFallback>{report.reporter?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600">{report.reporter?.name || "Anonim"}</span>
                    </div>

                    <div className="flex items-center gap-4">
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

                  <Link
                    href={`/reports/${report._id}`}
                    className="mt-3 text-[#ec6f66] hover:text-[#f3a183] text-sm flex items-center"
                  >
                    Lihat Detail
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/reports/create">
              <Button className="bg-gradient-to-r from-[#ec6f66] to-[#f3a183] text-white hover:opacity-90 hover:shadow-orange-900 hover:cursor-pointer  ">
                Laporkan Masalah Baru
              </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}