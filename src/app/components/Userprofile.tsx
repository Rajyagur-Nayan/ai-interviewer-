"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Edit3, Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// --- Main User Profile Page Component ---
export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-2xl shadow-2xl shadow-black/30 p-8"
      >
        <ProfileHeader />

        {/* Tab Navigation */}
        <div className="mt-8 border-b border-slate-700">
          <nav className="flex space-x-6">
            <TabButton
              label="Profile Details"
              isActive={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />
            <TabButton
              label="Security"
              isActive={activeTab === "security"}
              onClick={() => setActiveTab("security")}
            />
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProfileDetailsTab
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />
              </motion.div>
            )}
            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SecurityTab />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// --- Child Components for better organization ---

const ProfileHeader = () => (
  <div className="flex flex-col items-center text-center">
    <div className="relative p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
      <Image
        src="/img1.jpg"
        alt="User Avatar"
        width={128}
        height={128}
        className="rounded-full border-4 border-slate-900 object-cover"
      />
    </div>
    <h1 className="text-3xl font-bold mt-4">David Robinson</h1>
    <p className="text-slate-400">david.robinson@example.com</p>
  </div>
);

const TabButton = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "relative pb-2 font-medium transition-colors",
      isActive ? "text-blue-400" : "text-slate-400 hover:text-slate-200"
    )}
  >
    {label}
    {isActive && (
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
        layoutId="underline"
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    )}
  </button>
);

const ProfileDetailsTab = ({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}) => (
  <form>
    <div className="space-y-6">
      <InfoField
        id="username"
        label="Username"
        icon={<User className="h-5 w-5 text-slate-400" />}
        defaultValue="david_robinson"
        disabled={!isEditing}
      />
      <InfoField
        id="email"
        label="Email Address"
        icon={<Mail className="h-5 w-5 text-slate-400" />}
        defaultValue="david.robinson@example.com"
        type="email"
        disabled={!isEditing}
      />
    </div>
    <div className="mt-8 flex justify-end gap-4">
      {isEditing ? (
        <>
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" /> Cancel
          </Button>
          <Button
            onClick={() => setIsEditing(false)}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <Save className="h-4 w-4" /> Save Changes
          </Button>
        </>
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Edit3 className="h-4 w-4" /> Edit Profile
        </Button>
      )}
    </div>
  </form>
);

const SecurityTab = () => (
  <form>
    <h3 className="text-xl font-semibold mb-4">Change Password</h3>
    <div className="space-y-6">
      <InfoField
        id="current-password"
        label="Current Password"
        icon={<Lock className="h-5 w-5 text-slate-400" />}
        type="password"
        placeholder="••••••••"
      />
      <InfoField
        id="new-password"
        label="New Password"
        icon={<Lock className="h-5 w-5 text-slate-400" />}
        type="password"
        placeholder="••••••••"
      />
      <InfoField
        id="confirm-password"
        label="Confirm New Password"
        icon={<Lock className="h-5 w-5 text-slate-400" />}
        type="password"
        placeholder="••••••••"
      />
    </div>
    <div className="mt-8 flex justify-end">
      <Button className="bg-blue-600 hover:bg-blue-700">Update Password</Button>
    </div>
  </form>
);

const InfoField = ({ id, label, icon, ...props }: any) => (
  <div>
    <Label
      htmlFor={id}
      className="block text-sm font-medium text-slate-300 mb-2"
    >
      {label}
    </Label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <Input
        id={id}
        className="pl-10 w-full bg-slate-800/60 border-2 border-slate-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  </div>
);
