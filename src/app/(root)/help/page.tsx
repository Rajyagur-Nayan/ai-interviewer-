"use client";

import {
  Search,
  Mic,
  MessageSquare,
  Settings,
  RefreshCcw,
  FileText,
  AlertCircle,
} from "lucide-react";

export default function HelpCenter() {
  return (
    <section className="bg-white dark:bg-black text-zinc-900 dark:text-white min-h-screen py-16 px-4">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">How Can We Help You?</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Find answers to your questions about using the AI Interview Assistant,
          from getting started to advanced tips and troubleshooting.
        </p>
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full px-4 py-3 pl-10 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none"
          />
          <Search
            className="absolute left-3 top-3 text-zinc-500 dark:text-zinc-400"
            size={20}
          />
        </div>
      </div>

      {/* Getting Started */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Getting Started & Using the Assistant
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Card
            icon={<Mic />}
            title="Starting an Interview"
            text="Learn how to initiate your first AI interview session and tailor your experience for a personalized approach."
          />
          <Card
            icon={<MessageSquare />}
            title="Voice Input & Feedback"
            text="Guidelines for using voice commands and receiving AI feedback through audio."
          />
          <Card
            icon={<FileText />}
            title="Text Input & Chat"
            text="Instructions for typing your responses and engaging with the AI via chat."
          />
          <Card
            icon={<Settings />}
            title="Navigating Feedback"
            text="Understand how to review performance reports and get actionable insights to improve."
          />
          <Card
            icon={<RefreshCcw />}
            title="Saving Your Progress"
            text="How to save your interview sessions and track your improvement."
          />
          <Card
            icon={<AlertCircle />}
            title="Technical Issues"
            text="Common troubleshooting steps for audio, video, or connectivity problems."
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-20">
        <h3 className="text-xl font-semibold text-center mb-8">
          Frequently Asked Questions
        </h3>
        <Accordion title="How do I start a new interview session?" />
        <Accordion title="Can I use both voice and text during an interview?" />
        <Accordion title="How accurate is the AI feedback?" />
        <Accordion title="What if I experience technical difficulties?" />
        <Accordion title="Is my interview data kept private?" />
        <Accordion title="Can I review past interview sessions?" />
      </div>
    </section>
  );
}

// --- Card Component ---
function Card({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-5 flex flex-col gap-2 shadow-sm hover:shadow-md transition">
      <div className="text-blue-600 dark:text-blue-400">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">{text}</p>
    </div>
  );
}

// --- Accordion Component ---
function Accordion({ title }: { title: string }) {
  return (
    <details className="mb-4 bg-zinc-100 dark:bg-zinc-800 rounded-md px-4 py-3 cursor-pointer">
      <summary className="font-medium">{title}</summary>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        This is placeholder content. Replace this with the appropriate answer.
      </p>
    </details>
  );
}
