import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">Apa Kata Mereka</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Dengarkan pengalaman dari warga yang telah menggunakan platform kami untuk membuat perubahan di kota mereka.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white border-gray-100 shadow-lg rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Budi Santoso" />
                  <AvatarFallback>BS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Budi Santoso</p>
                  <p className="text-sm text-gray-500">Warga Jakarta Selatan</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Berkat platform ini, jalan rusak di depan rumah saya yang sudah bertahun-tahun tidak diperbaiki
                akhirnya mendapat perhatian pemerintah. Proses pelaporannya sangat mudah!"
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-lg rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Siti Rahayu" />
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Siti Rahayu</p>
                  <p className="text-sm text-gray-500">Warga Bandung</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Saya senang bisa berkontribusi dengan memberikan ide untuk mengatasi masalah sampah di lingkungan kami.
                Sekarang kami memiliki sistem pengelolaan sampah yang lebih baik."
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-lg rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Ahmad Hidayat" />
                  <AvatarFallback>AH</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Ahmad Hidayat</p>
                  <p className="text-sm text-gray-500">Warga Surabaya</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Platform ini memberikan transparansi yang luar biasa. Saya bisa melihat status penyelesaian masalah dan
                mendapatkan notifikasi saat ada pembaruan. Sangat membantu!"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
