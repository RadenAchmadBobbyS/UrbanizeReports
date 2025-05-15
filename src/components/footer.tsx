import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#ec6f66] to-[#f3a183] bg-clip-text text-transparent">
                Urbanize
              </span>
            </h3>
            <p className="text-gray-600 mb-4">
              Platform yang memungkinkan warga kota untuk berperan aktif dalam mengidentifikasi dan menyelesaikan
              masalah di lingkungan mereka.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-[#ec6f66] transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#ec6f66] transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#ec6f66] transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#recent-reports" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
                  Laporan Terbaru
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
                  Fitur
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
                  Testimoni
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Layanan</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
                  Pelaporan Masalah
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
                  Voting Komunitas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
                  Solusi Kolaboratif
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
                  Peta Interaktif
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
                  Statistik Kota
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Kontak</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#ec6f66]" />
                <span className="text-gray-600">info@urbanize.id</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#ec6f66]" />
                <span className="text-gray-600">+62 21 1234 5678</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-[#ec6f66] mt-1" />
                <span className="text-gray-600">Jl. Sudirman No. 123, Jakarta Pusat, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Urbanize. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
