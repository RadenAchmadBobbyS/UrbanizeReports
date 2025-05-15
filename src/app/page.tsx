import { Button } from "@/components/ui/button"
import { ChevronRight, MapPin, Vote, Users, LineChart, Bell, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FeatureCard from "@/components/feature-card"
import HowItWorks from "@/components/how-it-works"
import Testimonials from "@/components/testimonials"
import RecentReports from "@/components/recent-reports"
import TypedHeading from "@/components/typed-heading"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pl-25">
        <div className="absolute inset-0 opacity-90 z-0"></div>
        <div
          className="absolute inset-0 z-0 opacity-10 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center "
          style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
        ></div>

        <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:flex lg:h-[85vh] lg:items-center lg:px-8">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl text-white">
              <TypedHeading />
            </h1>

            <p className="mt-4 max-w-lg mx-auto lg:mx-0 text-black sm:text-xl">
              Platform yang memungkinkan kamu untuk berperan aktif dalam mengidentifikasi dan menyelesaikan masalah di
              lingkungan sekitarmu.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-white text-[#ec6f66] hover:bg-gray-100 font-semibold border-2 shadow-2xl">
                Mulai Sekarang
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-[#ec6f66] hover:bg-gray-100 font-semibold border-2 shadow-2xl"
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/2">
            <img src="/Globalization.gif" alt="Platform Preview" />
          </div>
        </div>
        <div className="flex flex-row gap-30 items-center justify-center mb-7">
          <p>
            <img src="/Questions.gif" alt="image" />
          </p>
          <p>
            <img src="/Paper map.gif" alt="image" />
          </p>
          <p>
            <img src="/Connected world.gif" alt="image" />
          </p>
          <p>
            <img src="/Team goals.gif" alt="image" />
          </p>
          <p>
            <img src="/Mobile Marketing.gif" alt="image" />
          </p>
        </div>
      </section>

      {/* Recent Reports Section */}
      <RecentReports />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">Fitur Utama</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Platform kami menyediakan berbagai fitur untuk memudahkan kamu dalam melaporkan dan menyelesaikan masalah
              di kotamu.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<MapPin className="h-10 w-10 text-[#ec6f66]" />}
              title="Pelaporan Masalah"
              description="Laporkan masalah di kotamu dengan mudah menggunakan formulir pelaporan dengan lokasi GPS dan foto pendukung."
            />

            <FeatureCard
              icon={<Vote className="h-10 w-10 text-[#ec6f66]" />}
              title="Voting dan Prioritas"
              description="Berikan suara pada laporan masalah yang paling penting atau mendesak bagi kamu dan komunitasmu."
            />

            <FeatureCard
              icon={<Users className="h-10 w-10 text-[#ec6f66]" />}
              title="Solusi Komunitas"
              description="Ajukan solusi atau ide untuk mengatasi masalah dan berkolaborasi dengan pengguna lain."
            />

            <FeatureCard
              icon={<CheckCircle className="h-10 w-10 text-[#ec6f66]" />}
              title="Monitoring dan Update"
              description="Pantau status penyelesaian masalah secara transparan dengan pembaruan real-time."
            />

            <FeatureCard
              icon={<LineChart className="h-10 w-10 text-[#ec6f66]" />}
              title="Peta Interaktif"
              description="Lihat peta interaktif kota dengan tanda masalah yang dilaporkan dan statistik analitik."
            />

            <FeatureCard
              icon={<Bell className="h-10 w-10 text-[#ec6f66]" />}
              title="Notifikasi"
              description="Dapatkan pemberitahuan saat masalah yang kamu laporkan mendapatkan perhatian atau ada solusi baru."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#ec6f66] to-[#f3a183]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl text-white">Bergabunglah Sekarang</h2>
          <p className="mt-4 text-white max-w-2xl mx-auto">
            Jadilah bagian dari perubahan positif di kotamu. Bersama-sama, kita dapat menciptakan lingkungan yang lebih
            baik untuk semua.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="bg-white text-[#ec6f66] hover:bg-gray-100 font-semibold">
              Daftar Sekarang
            </Button>

            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Hubungi Kami
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
