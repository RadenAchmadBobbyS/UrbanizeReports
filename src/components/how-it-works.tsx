import { ArrowRight } from "lucide-react"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">Cara Kerja</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Ikuti langkah-langkah sederhana ini untuk mulai berkontribusi dalam perbaikan kotamu.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md h-full">
              <div className="bg-gradient-to-r from-[#ec6f66] to-[#f3a183] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Laporkan Masalah</h3>
              <p className="text-gray-600">
                Identifikasi masalah di lingkunganmu dan laporkan dengan detail, foto, dan lokasi yang akurat.
              </p>
            </div>
            <ArrowRight className="hidden lg:block absolute top-1/2 -right-5 text-[#ec6f66] transform -translate-y-1/2" />
          </div>

          <div className="relative">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md h-full">
              <div className="bg-gradient-to-r from-[#ec6f66] to-[#f3a183] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Berikan Suara</h3>
              <p className="text-gray-600">
                Dukung laporan yang penting bagimu dengan memberikan suara untuk memprioritaskan penyelesaiannya.
              </p>
            </div>
            <ArrowRight className="hidden lg:block absolute top-1/2 -right-5 text-[#ec6f66] transform -translate-y-1/2" />
          </div>

          <div className="relative">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md h-full">
              <div className="bg-gradient-to-r from-[#ec6f66] to-[#f3a183] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Usulkan Solusi</h3>
              <p className="text-gray-600">
                Berikan ide atau solusi kreatif untuk mengatasi masalah yang telah dilaporkan.
              </p>
            </div>
            <ArrowRight className="hidden lg:block absolute top-1/2 -right-5 text-[#ec6f66] transform -translate-y-1/2" />
          </div>

          <div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md h-full">
              <div className="bg-gradient-to-r from-[#ec6f66] to-[#f3a183] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-2">Pantau Kemajuan</h3>
              <p className="text-gray-600">
                Ikuti perkembangan penyelesaian masalah dan dapatkan notifikasi saat ada pembaruan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
