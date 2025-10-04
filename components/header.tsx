"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          <a href="/">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">B</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Bellaluna Hotels</h1>
                <p className="text-xs text-muted-foreground">Paris, France</p>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Accueil
            </a>
            <a
              href="/#chambres"
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Chambres
            </a>
            <a
              href="/#services"
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Services
            </a>
            <a
              href="/#contact"
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Contact
            </a>
            <Link href="/reservation">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Réserver</Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("accueil")}
              className="text-left text-foreground hover:text-primary transition-colors"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection("chambres")}
              className="text-left text-foreground hover:text-primary transition-colors"
            >
              Chambres
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-left text-foreground hover:text-primary transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-left text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <Link href="/reservation">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Réserver</Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
