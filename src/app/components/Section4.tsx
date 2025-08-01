"use client";
import {
  Bolt,
  GraduationCap,
  CalendarClock,
  Lightbulb,
  ShieldCheck,
  DollarSign,
} from "lucide-react";

const benefits = [
  {
    title: "Instant, Unbiased Feedback",
    description:
      "Receive objective evaluations without human bias, allowing for pure, data-driven improvement.",
    icon: <Bolt className="text-yellow-500 dark:text-yellow-400 w-6 h-6" />,
  },
  {
    title: "Learn & Improve Rapidly",
    description:
      "Identify strengths and weaknesses, then refine your answers and approach based on smart suggestions.",
    icon: (
      <GraduationCap className="text-yellow-500 dark:text-yellow-400 w-6 h-6" />
    ),
  },
  {
    title: "Practice Anytime, Anywhere",
    description:
      "Prepare on your schedule, at your pace. Our platform is available 24/7, wherever you are.",
    icon: (
      <CalendarClock className="text-yellow-500 dark:text-yellow-400 w-6 h-6" />
    ),
  },
  {
    title: "Personalized Insights",
    description:
      "Get tailored advice designed to address your unique needs and boost your interview performance.",
    icon: (
      <Lightbulb className="text-yellow-500 dark:text-yellow-400 w-6 h-6" />
    ),
  },
  {
    title: "Build Confidence",
    description:
      "Reduce interview anxiety by practicing in a safe, judgment-free environment until you feel ready.",
    icon: (
      <ShieldCheck className="text-yellow-500 dark:text-yellow-400 w-6 h-6" />
    ),
  },
  {
    title: "Cost-Effective Preparation",
    description:
      "Access premium interview coaching without the high cost of traditional human trainers.",
    icon: (
      <DollarSign className="text-yellow-500 dark:text-yellow-400 w-6 h-6" />
    ),
  },
];

export default function Section4() {
  return (
    <section className="py-16 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-12">
          Why AI Interviewer?
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm dark:shadow-md border border-gray-200 dark:border-zinc-700 p-6 text-left hover:shadow-md dark:hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-md text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
