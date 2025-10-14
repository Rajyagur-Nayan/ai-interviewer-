"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  CircleUserRound,
  LayoutGrid,
  LogOut,
  Menu,
  Moon,
  Settings,
  User,
  BookOpen,
  BrainCircuit,
  Clapperboard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// --- Data for Navigation Links ---
const navLinks = [
  { href: "/", label: "Home", icon: <LayoutGrid className="h-5 w-5" /> },
  { href: "/quiz", label: "Quiz", icon: <BookOpen className="h-5 w-5" /> },
  {
    href: "/aptitude",
    label: "Aptitude",
    icon: <BrainCircuit className="h-5 w-5" />,
  },
  {
    href: "/vedios",
    label: "Videos",
    icon: <Clapperboard className="h-5 w-5" />,
  },
];

// --- Main Navbar Component ---
export default function Navbar() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white"
          >
            <LayoutGrid className="h-7 w-7 text-blue-500" />
            InterviewIQ
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
              />
            ))}
          </div>

          {/* Right-side controls */}
          <div className="flex items-center gap-2">
            <ProfileDialog />
            <MobileMenuSheet
              isOpen={isSheetOpen}
              setIsOpen={setIsSheetOpen}
              pathname={pathname}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

// --- Child Components for better organization ---

// Animated NavLink for Desktop
const NavLink = ({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) => (
  <Link
    href={href}
    className={cn(
      "relative px-4 py-2 text-sm font-medium transition-colors duration-300",
      isActive
        ? "text-blue-600 dark:text-blue-400"
        : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
    )}
  >
    {label}
    {isActive && (
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
        layoutId="underline"
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    )}
  </Link>
);

// Profile Dialog (Modal)
const ProfileDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" size="icon" className="rounded-full">
        <CircleUserRound className="h-6 w-6 text-slate-600 dark:text-slate-300" />
        <span className="sr-only">Open Profile</span>
      </Button>
    </DialogTrigger>
    <DialogContent className="w-11/12 max-w-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl">
      <DialogHeader>
        <DialogTitle className="text-center text-xl font-bold text-slate-800 dark:text-white">
          Profile
        </DialogTitle>
      </DialogHeader>
      <div className="p-6 flex flex-col items-center gap-4 border-b dark:border-slate-700">
        <div className="relative p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
          <Image
            src="/img4.png"
            alt="User Avatar"
            width={96}
            height={96}
            className="rounded-full border-4 border-white dark:border-slate-900 object-cover"
          />
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-slate-800 dark:text-white">
            David Robinson
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Joined 1 year ago
          </p>
        </div>
      </div>
      <div className="px-4 py-2 space-y-1">
        <ProfileOption
          icon={<User className="w-5 h-5 text-blue-500" />}
          label="Manage Account"
        />
        <ProfileOption
          icon={<Bell className="w-5 h-5 text-purple-500" />}
          label="Notifications"
        />
        <ProfileOption
          icon={<Settings className="w-5 h-5 text-slate-500" />}
          label="Settings"
        />
      </div>
      <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center">
            <Moon className="w-5 h-5 text-indigo-500" />
          </div>
          <Label
            htmlFor="dark-mode"
            className="font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
          >
            Dark Mode
          </Label>
        </div>
        <Switch id="dark-mode" />
      </div>
      <div className="p-4 mt-2">
        <Button
          variant="outline"
          className="w-full cursor-pointer border-red-500/50 text-red-600 dark:text-red-500 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

const ProfileOption = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <button className="w-full flex items-center justify-between py-3 px-4 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200 text-left">
    <div className="flex items-center gap-4">
      {icon} <span className="font-medium">{label}</span>
    </div>
    <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-500" />
  </button>
);

// Mobile Menu (Sheet)
const MobileMenuSheet = ({
  isOpen,
  setIsOpen,
  pathname,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pathname: string;
}) => (
  <div className="md:hidden">
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Menu className="h-6 w-6 text-slate-600 dark:text-slate-300" />
          <span className="sr-only">Open Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-3/4 bg-white dark:bg-slate-900 border-l dark:border-slate-800"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            Menu
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full pt-8">
          <div className="flex-grow space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-4 text-lg p-3 rounded-lg font-medium transition-colors",
                  pathname === link.href
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>
          <div className="py-4 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              className="w-full justify-start text-left cursor-pointer border-red-500/50 text-red-600 dark:text-red-500 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 flex items-center gap-4 text-lg p-3 h-auto"
            >
              <LogOut className="w-5 h-5" /> Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  </div>
);
