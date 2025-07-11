"use client ";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-base-content mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-2">Interview IQ</h2>
          <p className="text-sm">
            Your trusted platform for mastering interviews and landing your
            dream job.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:underline">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="font-semibold mb-2">Contact Us</h2>
          <p className="text-sm">Email: support@interviewiq.com</p>
          <p className="text-sm">Phone: +1 234 567 890</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" aria-label="Twitter" className="hover:text-primary">
              Twitter
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary">
              LinkedIn
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-primary">
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-4 border-t py-4">
        &copy; {new Date().getFullYear()} Interview IQ. All rights reserved.
      </div>
    </footer>
  );
}
