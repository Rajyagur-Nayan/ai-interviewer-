"use client";

import Link from "next/link";
import { LayoutGrid, Twitter, Linkedin, Github, Send } from "lucide-react";

// --- Data for Footer Links (Easy to manage) ---
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Quiz" },
  { href: "/aptitude", label: "Aptitude Tests" },
  { href: "/videos", label: "Learning Videos" },
];

const resourceLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/faqs", label: "FAQs" },
  { href: "/terms", label: "Terms of Service" },
];

const socialLinks = [
  { href: "#", label: "Twitter", icon: <Twitter className="h-5 w-5" /> },
  { href: "#", label: "LinkedIn", icon: <Linkedin className="h-5 w-5" /> },
  { href: "#", label: "GitHub", icon: <Github className="h-5 w-5" /> },
];

// --- Main Footer Component ---
export default function Footer() {
  return (
    // Updated background and text colors
    <footer className="bg-zinc-900 border-t border-zinc-800 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About & Newsletter Section */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-white mb-4"
            >
              <LayoutGrid className="h-6 w-6 text-blue-500" />
              InterviewIQ
            </Link>
            <p className="max-w-md text-sm mb-6">
              Your trusted platform for mastering interviews. Practice with AI,
              take quizzes, and watch curated videos to land your dream job.
            </p>
            <h3 className="font-semibold text-zinc-200 mb-3">Stay Updated</h3>
            <form className="flex items-center gap-2 max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                // Updated input colors
                className="flex-grow px-4 py-2 bg-zinc-800 border-2 border-zinc-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-colors"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="p-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                aria-label="Subscribe to newsletter"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="font-semibold text-zinc-200 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="font-semibold text-zinc-200 mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Socials */}
      {/* Updated bottom bar colors */}
      <div className="bg-zinc-950/50 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} InterviewIQ. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <SocialIconLink
                key={link.label}
                href={link.href}
                label={link.label}
              >
                {link.icon}
              </SocialIconLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Reusable Sub-Components ---

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="hover:text-blue-400 transition-colors duration-200"
  >
    {children}
  </Link>
);

const SocialIconLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    // Updated social icon colors
    className="text-zinc-500 hover:text-blue-400 hover:scale-110 transition-all duration-200"
  >
    {children}
  </a>
);
