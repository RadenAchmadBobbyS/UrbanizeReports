"use client"

import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

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

  const handleLogout = () => {
    Cookies.remove("userData")
    setUser(null)
    router.push("/") // atau bisa router.refresh()
  }

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
          <Link href="/reports" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
            Laporan Terbaru
          </Link>
          <Link href="#fitur" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
            Fitur
          </Link>
          <Link href="#how-it-works" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
            Cara Kerja
          </Link>
          <Link href="#testimonials" className="text-gray-600 hover:text-[#ec6f66] transition-colors">
            Testimoni
          </Link>
        </nav>

        {/* Auth / User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-600 hover:text-[#ec6f66] hover:bg-gray-100 hover:cursor-pointer">
                  Masuk
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-[#ec6f66] to-[#f3a183] text-white hover:opacity-90 hover:cursor-pointer">Daftar</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/reports/create">
                <Button className="bg-gradient-to-r from-[#ec6f66] to-[#f3a183] text-white hover:opacity-90 hover:cursor-pointer">Laporkan</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="w-10 h-10  ">
                      <img
                      src="/Hello-pana.png"
                      alt="User Avatar"
                      width={80}
                      height={80}
                      className="rounded-full hover:cursor-pointer bg-[#f3a183] hover:bg-[#ec6f66]"
                      />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled className="capitalize">{user.name}</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-[#ec6f66]">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
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
            <Link href="/reports" className="text-gray-600 hover:text-[#ec6f66]" onClick={() => setIsMenuOpen(false)}>
              Laporan Terbaru
            </Link>
            <Link href="#features" className="text-gray-600 hover:text-[#ec6f66]" onClick={() => setIsMenuOpen(false)}>
              Fitur
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-[#ec6f66]" onClick={() => setIsMenuOpen(false)}>
              Cara Kerja
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-[#ec6f66]" onClick={() => setIsMenuOpen(false)}>
              Testimoni
            </Link>
            {!user ? (
              <>
                <Link href="/auth/login" className="text-gray-600 hover:text-[#ec6f66]" onClick={() => setIsMenuOpen(false)}>
                  Masuk
                </Link>
                <Link href="/auth/register" className="text-gray-600 hover:text-[#ec6f66]" onClick={() => setIsMenuOpen(false)}>
                  Daftar
                </Link>
              </>
            ) : (
              <>
                <Link href="/report/create" className="text-gray-600 hover:text-[#ec6f66]" onClick={() => setIsMenuOpen(false)}>
                  Laporkan
                </Link>
                <button onClick={handleLogout} className="text-red-500 text-left px-4">
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
