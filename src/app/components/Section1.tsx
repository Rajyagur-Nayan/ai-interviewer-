import Image from "next/image";
import Link from "next/link";
import React from "react";

const Section1 = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row flex-wrap w-[90%] md:w-[80%] mx-auto h-auto md:h-[500px] mt-10 rounded-2xl overflow-hidden shadow-lg">
        {/* Left Section */}
        <div className=" md:w-1/2 w-full text-white flex flex-col justify-center p-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            Get Interview-Ready with{" "}
            <span className="text-blue-400">AI-Powered</span> Practice &
            Feedback
          </h2>
          <p className="text-gray-300 max-w-md">
            Practice real interview questions and receive instant, AI-driven
            feedback to boost your confidence.
          </p>

          <Link
            href="/interview"
            className="px-6 py-3 bg-blue-700 hover:bg-blue-600 transition-all rounded-xl mt-4 w-max"
          >
            Start Interview
          </Link>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 w-full  items-center justify-center p-4 md:block hidden">
          <Image
            src="/img1.jpg"
            alt="Interview Preparation"
            width={600}
            height={350}
            className="rounded-xl object-cover mt-15"
          />
        </div>
      </div>
    </div>
  );
};

export default Section1;
