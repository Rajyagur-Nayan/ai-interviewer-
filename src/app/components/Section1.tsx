"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Clapperboard, BookOpen } from "lucide-react";
import { clsx } from "clsx";
import { ReactNode } from "react";

// Data for our topic sections - makes the component cleaner and scalable
const topics = [
  {
    title: "Quizzes",
    description:
      "Test your coding knowledge and problem-solving skills with curated quizzes on different topics.",
    buttonText: "Attempt Quiz",
    href: "/quiz",
    image: "/quiz.jpg",
    icon: <BookOpen className="mr-2 h-5 w-5" />,
    imageLeft: false,
  },
  {
    title: "Aptitude Tests",
    description:
      "Improve your logical reasoning, numerical aptitude, and analytical skills with challenging aptitude tests.",
    buttonText: "Start Aptitude",
    href: "/aptitude",
    image: "/aptitude.png",
    icon: <BrainCircuit className="mr-2 h-5 w-5" />,
    imageLeft: true,
  },
  {
    title: "Learning Videos",
    description:
      "Access the latest tutorials and courses on coding, DSA, and aptitude to sharpen your knowledge.",
    buttonText: "Watch Videos",
    href: "/vedios",
    image: "/E-learning-Books.jpg",
    icon: <Clapperboard className="mr-2 h-5 w-5" />,
    imageLeft: false,
  },
];

export default function HomePage() {
  return (
    <main className="bg-slate-950 text-slate-100 antialiased">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 items-center gap-12 z-10">
          <motion.div
            className="flex flex-col gap-6 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter">
              Ace Your Interviews with{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                AI Assistant
              </span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Practice quizzes, aptitude tests, and watch curated learning
              videos to prepare for your next big opportunity. Your journey to
              becoming interview-ready starts now!
            </p>
            <Link href="/interview" className="self-center lg:self-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-lg text-xl font-semibold shadow-lg shadow-purple-500/20 transition-all duration-300"
              >
                Start Interview <ArrowRight className="ml-2 h-6 w-6" />
              </motion.button>
            </Link>
          </motion.div>
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Image
              src="/img1.jpg"
              alt="Interview Hero"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl shadow-blue-500/20"
            />
          </motion.div>
        </div>
      </section>

      {/* Topic Sections rendered from data array */}
      <div className="space-y-16 py-24 px-6">
        {topics.map((topic, index) => (
          <TopicSection key={index} {...topic} />
        ))}
      </div>
    </main>
  );
}

// Reusable Topic Section Component (now designed as a card)
type TopicSectionProps = {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  image: string;
  icon: ReactNode;
  imageLeft?: boolean;
};

function TopicSection({
  title,
  description,
  buttonText,
  href,
  image,
  icon,
  imageLeft = false,
}: TopicSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: ["easeOut"] },
    },
  };

  return (
    <motion.section
      className="max-w-7xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div
        className={clsx(
          "bg-slate-900/50 rounded-2xl border border-slate-800 p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 group transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10",
          { "lg:flex-row-reverse": imageLeft } // Conditionally reverse flex direction
        )}
      >
        {/* Text Content */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
          <p className="text-slate-400 text-lg">{description}</p>
          <Link href={href} className="self-start mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition-colors duration-300"
            >
              {icon} {buttonText}
            </motion.button>
          </Link>
        </div>

        {/* Image Content */}
        <div className="lg:w-1/2">
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="rounded-lg shadow-lg object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </motion.section>
  );
}
