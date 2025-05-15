"use client"

import { useState, useEffect } from "react"

export default function TypedHeading() {
  // Words that will replace "Urbanize"
  const words = [
    "Urbanize",
    "Kreativitas",
    "Kolaborasi",
    "Inovasi",
    "Partisipasi",
    "Aksi Nyata",
    "Perubahan",
    "Masa Depan",
  ]

  const [currentWord, setCurrentWord] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(100)

  useEffect(() => {
    const timer = setTimeout(() => {
      // Handle typing and deleting animation
      if (!isDeleting && currentWord === words[currentIndex]) {
        // Pause at complete word before deleting
        setTypingSpeed(2000) // Wait 2 seconds before deleting
        setIsDeleting(true)
        return
      } else if (isDeleting && currentWord === "") {
        // Move to next word after fully deleted
        setIsDeleting(false)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
        setTypingSpeed(100) // Reset typing speed
        return
      }

      // Set typing speed
      setTypingSpeed(isDeleting ? 50 : 100) // Faster when deleting

      // Handle typing or deleting
      if (isDeleting) {
        setCurrentWord(words[currentIndex].substring(0, currentWord.length - 1))
      } else {
        setCurrentWord(words[currentIndex].substring(0, currentWord.length + 1))
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [currentWord, currentIndex, isDeleting, typingSpeed, words])

  return (
    <>
      <span className="block text-[#ec6f66]">Ubah Kotamu</span>
      <span className="block text-[#ec6f66]">
        Dengan{" "}
        <span className="text-gray-500">
          {currentWord}
          <span className="inline-block w-3.5 h-8 bg-[#ec6f66] ml-1 animate-blink"></span>
        </span>
      </span>
    </>
  )
}
