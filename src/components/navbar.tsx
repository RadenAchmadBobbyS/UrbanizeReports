"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <span className="bg-gradient-to-r from-[#ec6f66] to-[#f3a183] bg-clip-text text-transparent">Urbanize</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#recent-reports" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
            Laporan Terbaru
          </Link>
          <Link href="#features" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
            Fitur
          </Link>
          <Link href="#how-it-works" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
            Cara Kerja
          </Link>
          <Link href="#testimonials" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
            Testimoni
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-gray-600 hover:text-[#ec6f66] hover:bg-gray-100 hover:cursor-pointer">
            Masuk
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-gradient-to-r from-[#ec6f66] to-[#f3a183] text-white hover:opacity-90 hover:cursor-pointer">Daftar</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600 hover:text-[#ec6f66]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 shadow-md">
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            <Link
              href="#recent-reports"
              className="text-gray-600 hover:text-[#ec6f66] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Laporan Terbaru
            </Link>
            <Link
              href="#features"
              className="text-gray-600 hover:text-[#ec6f66] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Fitur
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-600 hover:text-[#ec6f66] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Cara Kerja
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-600 hover:text-[#ec6f66] transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimoni
            </Link>
              <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-600 hover:text-[#ec6f66] hover:bg-gray-100 px-4 py-2 rounded transition-colors">
                Masuk
              </Link>
              <Link href="/auth/register" className="bg-gradient-to-r from-[#ec6f66] to-[#f3a183] text-white hover:opacity-90 px-4 py-2 rounded transition-colors">
                Daftar
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
