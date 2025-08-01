// components/MissionAndFeatures.tsx
"use client";

import { BadgeCheck, Clock, TrendingUp, DollarSign } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300">
      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">
          Our Mission & Vision
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Block 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Transforming Interview Preparation
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              Our mission is to democratize access to high-quality interview
              coaching by leveraging cutting-edge AI technology. We believe
              everyone deserves the opportunity to present their best self in a
              job interview.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="/img3.webp"
              alt="Interview Practice Illustration"
              width={400}
              height={300}
              className="rounded-2xl shadow-lg  "
            />
          </div>

          {/* Block 2 */}
          <div>
            <Image
              src="/img2.jpg"
              alt="AI Networking"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              A Future of Confident Professionals
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              Our vision is to empower millions of job seekers worldwide to
              approach interviews with unwavering confidence and clarity,
              ultimately bridging the gap between talent and opportunity.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose AI Interview Assistant */}
      <div className="bg-zinc-100 dark:bg-black py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-semibold text-center mb-12">
            Why Choose AI Interview Assistant?
          </h3>

          <div className="grid sm:grid-cols-2 gap-10 text-sm">
            <div className="flex items-start space-x-4">
              <BadgeCheck className="text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <h4 className="font-semibold">Unbiased & Objective</h4>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Receive feedback free from human bias, focusing purely on your
                  performance and content.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <h4 className="font-semibold">24/7 Availability</h4>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Practice anytime, anywhere, fitting seamlessly into your busy
                  schedule.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <TrendingUp className="text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <h4 className="font-semibold">Rapid Skill Improvement</h4>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Identify and work on weaknesses quickly with targeted,
                  actionable insights.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <DollarSign className="text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <h4 className="font-semibold">Cost-Effective Coaching</h4>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Access professional-grade coaching without the premium price
                  tag.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
