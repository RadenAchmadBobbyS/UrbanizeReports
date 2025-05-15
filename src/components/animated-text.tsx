"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function AnimatedText() {
  const phrases = [
    "Platform yang memungkinkan kamu untuk berperan aktif dalam mengidentifikasi dan menyelesaikan masalah di lingkungan sekitarmu.",
    "Laporkan masalah infrastruktur dan lingkungan dengan mudah melalui aplikasi yang intuitif.",
    "Berkolaborasi dengan warga lain untuk menciptakan solusi yang berkelanjutan bagi kota kita.",
    "Pantau perkembangan proyek perbaikan kota secara real-time dengan fitur tracking.",
    "Jadilah bagian dari perubahan positif untuk menciptakan kota yang lebih baik untuk semua.",
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length)
        setIsVisible(true)
      }, 500) // Wait for exit animation to complete
    }, 4000) // Change text every 4 seconds

    return () => clearInterval(interval)
  }, [phrases.length])

  return (
    <div className="relative h-full flex items-center justify-center lg:justify-start">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute"
          >
            {phrases[currentIndex]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
