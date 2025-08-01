"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  ChevronRight,
  Circle,
  CircleUserRound,
  Menu,
  Moon,
  X,
} from "lucide-react"; // Optional icons, install lucide-react
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-black border-b shadow-sm mb-1 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              Interview IQ
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/about" className="hover:text-primary">
              About
            </Link>
            <Link href="/help" className="hover:text-primary">
              Help
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex cursor-pointer"
              onClick={() => setIsProfileDialogOpen(true)}
            >
              <CircleUserRound className=" text-whit hover:text-blue-600" />
              <span className="sr-only">User</span>
            </Button>
          </div>
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex gap-3  ">
            <div>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-ghost"
              >
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
            <div>
              <CircleUserRound />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link href="/" className="block hover:text-primary">
              Home
            </Link>
            <Link href="/about" className="block hover:text-primary">
              About
            </Link>
            <Link href="/help" className="block hover:text-primary">
              Help
            </Link>
          </div>
        )}
      </div>
      {isProfileDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[100]">
          {/* Overlay with blur */}
          <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-md shadow-xl overflow-hidden w-11/12 max-w-md mx-auto my-auto">
            {/* Dialog Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-zinc-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Profile
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer"
                onClick={() => setIsProfileDialogOpen(false)}
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-red-500" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            {/* User Info Section */}
            <div className="p-6 flex flex-col items-center gap-3">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-zinc-700 border-2 border-blue-400">
                <Image
                  src="/img4.png"
                  alt="User Avatar"
                  fill
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  David Robinson
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Joined 1 year ago
                </p>
              </div>
            </div>

            {/* Profile Options Section */}
            <div className="px-6 py-3">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                Profile
              </h3>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between py-2 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-600/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <Circle className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Manage user</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </Button>
            </div>

            {/* Settings Options Section */}
            <div className="px-6 py-3 border-t border-gray-200 dark:border-zinc-700">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                Settings
              </h3>

              <Button
                variant="ghost"
                className="w-full flex items-center justify-between py-2 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-600/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Bell className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Notifications</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </Button>

              <Button
                variant="ghost"
                className="w-full flex items-center justify-between py-2 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-md transition-colors duration-200 mt-1"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-600/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Moon className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Dark Mode</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </Button>
            </div>

            {/* Sign Out Button */}
            <div className="p-6 border-t border-gray-200 dark:border-zinc-700">
              <Button
                variant="outline"
                className="w-full cursor-pointer border-red-400 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-700 transition-colors duration-200"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
