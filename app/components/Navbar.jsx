"use client"

import Link from "next/link"
import { useState } from "react"
import { School, Plus, List, Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: "/", label: "Home", icon: School },
    { href: "/addSchool", label: "Add School", icon: Plus },
    { href: "/showSchools", label: "All Schools", icon: List },
  ]

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200/50">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center px-2 sm:px-4 py-2 text-lg sm:text-xl font-heading font-bold text-blue-600 hover:text-purple-600 transition-all duration-200 hover:scale-105 rounded-lg"
            >
              <School className="w-5 h-5 sm:w-6  sm:h-6 mr-1 sm:mr-2 transition-transform duration-200 hover:rotate-12" />
               <span className="block sm:hidden">SH</span>
              <span className="hidden sm:inline">SchoolHub</span>
            
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {menuItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 group"
              >
                <Icon className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-6" />
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              className="flex items-center justify-center w-12 h-12 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-105"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 transition-transform duration-200 rotate-0 hover:rotate-90" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-3 space-y-1 border-t border-gray-200/50">
            {menuItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center w-full px-3 sm:px-4 py-3 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:translate-x-1 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0 transition-transform duration-200 group-hover:rotate-12" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
