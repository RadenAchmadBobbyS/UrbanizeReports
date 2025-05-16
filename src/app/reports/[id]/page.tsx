"use client"

import React, { useState, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
  MapPin,
  Clock,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  ChevronLeft,
  Send,
  ImageIcon,
  Smile,
  Eye,
  Flag,
  X,
  ChevronRight,
  ChevronLeftIcon,
  Speech,
  Lightbulb,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CommentType, ReportType } from "@/types/types"
import SolutionModal from "@/components/solution-modal"
import Cookies from "js-cookie"

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // HARUS PALING ATAS
  const { id } = use(params);

  const [report, setReport] = useState<ReportType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // State untuk galeri gambar
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [similarReports, setSimilarReports] = useState<ReportType[]>([])
  const [loadingSimilar, setLoadingSimilar] = useState(false)

  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [user, setUser] = useState<any>(null)

    useEffect(() => {
    const userCookie = Cookies.get("userData")
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie)
        setUser(userData)
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  // Status color mapping
  const statusColors = {
    Dilaporkan: "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Menunggu Verifikasi": "bg-purple-100 text-purple-800 border-purple-200",
    "Dalam Proses": "bg-blue-100 text-blue-800 border-blue-200",
    Selesai: "bg-green-100 text-green-800 border-green-200",
  }

  // Fetch report detail from API
  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`http://localhost:3000/api/report/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Laporan tidak ditemukan")
        const data = await res.json()
        if (data.createdAt) data.createdAt = new Date(data.createdAt)
        setReport(data)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  // Fetch similar reports from API
  useEffect(() => {
    if (!report) return
    setLoadingSimilar(true)
    fetch(`http://localhost:3000/api/report?category=${encodeURIComponent(report.category)}&exclude=${report._id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Gagal memuat laporan serupa")
        const data = await res.json()
        setSimilarReports(data)
      })
      .catch(() => setSimilarReports([]))
      .finally(() => setLoadingSimilar(false))
  }, [report])

  // Gallery navigation functions
  const openGallery = (index: number) => {
    setCurrentImageIndex(index)
    setIsGalleryOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
    document.body.style.overflow = "auto"
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (report?.mediaUrls?.length || 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + (report?.mediaUrls?.length || 1)) % (report?.mediaUrls?.length || 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isGalleryOpen) {
      if (e.key === "ArrowRight") nextImage()
      else if (e.key === "ArrowLeft") prevImage()
      else if (e.key === "Escape") closeGallery()
    }
  }

  // Loading & error states
  if (loading) return <div className="p-8 text-center">Memuat laporan...</div>
  if (error || !report) return <div className="p-8 text-center text-red-500">{error || "Laporan tidak ditemukan"}</div>


  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pb-16" onKeyDown={handleKeyDown} tabIndex={0}>
        {/* Back button */}
        <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
          <div className="container mx-auto px-4 py-3">
            <Link href="/" className="text-gray-600 hover:text-[#ec6f66] flex items-center text-sm font-medium">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Report header */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-2xl font-bold mb-2">{report.title}</h1>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge className={`border-0 font-normal`}>
                          <span className="flex items-center gap-1">
                            {report.category}
                          </span>
                        </Badge>
                        <Badge
                          className={`${statusColors[report.status as keyof typeof statusColors]} border font-normal`}
                        >
                          {report.status}
                        </Badge>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {report.createdAt
                            ? new Date(report.createdAt).toLocaleDateString()
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 px-3">
                        <Share2 className="h-4 w-4 mr-1" />
                        Bagikan
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-3">
                        <Bookmark className="h-4 w-4 mr-1" />
                        Simpan
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{report.description}</p>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{report.location?.address}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <Button className="bg-gradient-to-r from-[#ec6f66] to-[#f3a183] text-white hover:opacity-90 hover:cursor-pointer">
                      <ThumbsUp className="h-4 w-4" />
                      Dukung ({report.voteCount})
                    </Button>
                    <Button className="bg-gradient-to-r from-[#2d77b8] to-[#5edae1] text-white hover:opacity-90 hover:cursor-pointer">
                      <MessageSquare className="h-4 w-4" />
                      Komentar ({report.commentCount || 0})
                    </Button>
                    
                    {/* Solution modal */}
                    <Button 
                      className="bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white hover:opacity-90 hover:cursor-pointer"
                      onClick={() => setShowSolutionModal(true)}      
                    >
                      <Lightbulb className="h-4 w-4" />
                      Ajukan Solusi
                    </Button>

                    <SolutionModal
                      open={showSolutionModal}
                      onClose={() => setShowSolutionModal(false)}
                      reportId={id}
                      userId={user._id}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={report.reporter?.avatar} alt={report.reporter?.name || ""} />
                      <AvatarFallback>{report.reporter?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{report.reporter?.name || "WOW"}</p>
                      <p className="text-xs text-gray-500">{report.reporter?.username}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image gallery */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-bold mb-4">Galeri Foto</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(report.mediaUrls || []).map((image: string, index: number) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => openGallery(index)}
                      >
                        <img
                          src={image}
                          alt={`Foto ${index + 1} dari ${report.title}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comments section */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-bold mb-4">Komentar ({report.commentCount})</h2>

                  {/* Comment input */}
                  <div className="flex gap-3 mb-6">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/Hello-pana.png" alt="Your Avatar" />
                      <AvatarFallback>YA</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 relative">
                      <Input placeholder="Tulis komentar..." className="pr-24 bg-gray-50 border-gray-200" />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                          <Smile className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          className="h-8 w-8 bg-gradient-to-r from-[#ec6f66] to-[#f3a183] text-white hover:opacity-90"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Comments list */}
                  <div className="space-y-4">
                    {(report.recentComments || []).map((comment: CommentType) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <span className="font-medium text-sm">{comment.user.name}</span>
                                <span className="text-xs text-gray-500 ml-2">{comment.user.username}</span>
                              </div>
                              <span className="text-xs text-gray-500">{comment.date}</span>
                            </div>
                            <p className="text-sm text-gray-700">{comment.comment}</p>
                          </div>
                          <div className="flex items-center gap-4 mt-1 ml-1">
                            <button className="text-xs text-gray-500 hover:text-[#ec6f66] flex items-center">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              Suka ({comment.likes})
                            </button>
                            <button className="text-xs text-gray-500 hover:text-[#ec6f66] flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Balas
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {report.commentCount > (report.recentComments?.length || 0) && (
                    <Button variant="outline" className="w-full mt-6">
                      Lihat Semua Komentar
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Report stats */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-bold mb-4">Statistik Laporan</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-gray-100">
                      <CardContent className="p-4 flex flex-col items-center">
                        <ThumbsUp className="h-5 w-5 text-[#ec6f66] mb-1" />
                        <span className="text-2xl font-bold">{report.voteCount}</span>
                        <span className="text-xs text-gray-500">Dukungan</span>
                      </CardContent>
                    </Card>
                    <Card className="border-gray-100">
                      <CardContent className="p-4 flex flex-col items-center">
                        <MessageSquare className="h-5 w-5 text-[#ec6f66] mb-1" />
                        <span className="text-2xl font-bold">{report.commentCount}</span>
                        <span className="text-xs text-gray-500">Komentar</span>
                      </CardContent>
                    </Card>
                    <Card className="border-gray-100">
                      <CardContent className="p-4 flex flex-col items-center">
                        <Eye className="h-5 w-5 text-[#ec6f66] mb-1" />
                        <span className="text-2xl font-bold">342</span>
                        <span className="text-xs text-gray-500">Dilihat</span>
                      </CardContent>
                    </Card>
                    <Card className="border-gray-100">
                      <CardContent className="p-4 flex flex-col items-center">
                        <Share2 className="h-5 w-5 text-[#ec6f66] mb-1" />
                        <span className="text-2xl font-bold">28</span>
                        <span className="text-xs text-gray-500">Dibagikan</span>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Progress timeline */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-bold mb-4">Status Penanganan</h2>
                  <div className="relative pl-6 border-l-2 border-gray-200">
                    <div className="mb-6 relative">
                      <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-[#ec6f66] border-4 border-white"></div>
                      <div>
                        <h3 className="text-sm font-medium">Dilaporkan</h3>
                        <p className="text-xs text-gray-500">2 hari yang lalu</p>
                        <p className="text-sm mt-1">Laporan telah diterima dan sedang menunggu verifikasi.</p>
                      </div>
                    </div>
                    <div className="mb-6 relative">
                      <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-[#ec6f66] border-4 border-white"></div>
                      <div>
                        <h3 className="text-sm font-medium">Diverifikasi</h3>
                        <p className="text-xs text-gray-500">1 hari yang lalu</p>
                        <p className="text-sm mt-1">Laporan telah diverifikasi dan diteruskan ke pihak terkait.</p>
                      </div>
                    </div>
                    <div className="mb-6 relative">
                      <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-[#ec6f66] border-4 border-white"></div>
                      <div>
                        <h3 className="text-sm font-medium">Dalam Proses</h3>
                        <p className="text-xs text-gray-500">5 jam yang lalu</p>
                        <p className="text-sm mt-1">Tim teknis sedang menangani masalah yang dilaporkan.</p>
                      </div>
                    </div>
                    <div className="relative opacity-50">
                      <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-gray-300 border-4 border-white"></div>
                      <div>
                        <h3 className="text-sm font-medium">Selesai</h3>
                        <p className="text-xs text-gray-500">Menunggu</p>
                        <p className="text-sm mt-1">Masalah telah diselesaikan dan laporan ditutup.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Similar reports */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-bold mb-4">Laporan Serupa</h2>
                  <div className="space-y-4">
                    {loadingSimilar && <div>Memuat laporan serupa...</div>}
                    {!loadingSimilar && similarReports.length === 0 && <div className="text-gray-400 text-sm">Tidak ada laporan serupa.</div>}
                    {similarReports.slice(0, 2).map((similarReport: ReportType) => (
                      <Link href={`/reports/${similarReport._id}`} key={similarReport._id?.toString()}>
                        <div className="flex gap-3 group mb-3">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={similarReport.mediaUrls?.[0]}
                              alt={similarReport.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#ec6f66] transition-colors">
                              {similarReport.title}
                            </h3>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span className="line-clamp-1">{similarReport.location.address}</span>
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-gray-500 flex items-center">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {similarReport.voteCount}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                {similarReport.commentCount}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="p-6">
                  <Button className="w-full bg-gradient-to-r from-[#ec6f66] to-[#f3a183] text-white hover:opacity-90 mb-3">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Dukung Laporan Ini
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Flag className="h-4 w-4 mr-2" />
                    Laporkan Masalah
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fullscreen Image Gallery */}
        {isGalleryOpen && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close button */}
              <button
                onClick={closeGallery}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                aria-label="Close gallery"
              >
                <X className="h-8 w-8" />
              </button>

              {/* Image counter */}
              <div className="absolute top-4 left-4 text-white text-sm">
                {currentImageIndex + 1} / {report.mediaUrls?.length || 0}
              </div>

              {/* Main image */}
              <div className="w-full h-full flex items-center justify-center p-4 md:p-10">
                <img
                  src={report.mediaUrls?.[currentImageIndex]}
                  alt={`Foto ${currentImageIndex + 1} dari ${report.title}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Navigation buttons */}
              {report.mediaUrls && report.mediaUrls.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 md:left-6 text-white hover:text-gray-300 p-2 rounded-full bg-black/30 hover:bg-black/50"
                    aria-label="Previous image"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 md:right-6 text-white hover:text-gray-300 p-2 rounded-full bg-black/30 hover:bg-black/50"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Thumbnails at bottom */}
              <div className="absolute bottom-4 left-0 right-0">
                <div className="flex justify-center px-4 overflow-x-auto hide-scrollbar">
                  {(report.mediaUrls || []).map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                        currentImageIndex === index ? "border-[#ec6f66]" : "border-transparent opacity-60"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}