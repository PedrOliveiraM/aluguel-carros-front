'use client'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-400 py-8 text-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">Vehicle Rental</h3>
            <p className="text-sm">
              Your trusted partner for all your vehicle rental needs.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-gray-900">
                  Our Vehicles
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-gray-900">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-900">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-900">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-gray-900">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-gray-900">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-gray-900">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Vehicle Rental System. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
