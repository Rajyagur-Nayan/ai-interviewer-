"use client";

import Image from "next/image";
import React, { useState } from "react";

export enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const message = ["what is the questions ", " my name is nayan "];
const lastMessage = message[message.length - 1];

const Page = () => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const isVoice = true;

  const toggleCall = () => {
    setCallStatus((prev) =>
      prev === CallStatus.ACTIVE ? CallStatus.FINISHED : CallStatus.ACTIVE
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <main className="w-full max-w-5xl flex flex-col md:flex-row gap-6">
        {/* Interviewer Panel */}
        <div className="flex-1 bg-purple-700 text-white flex flex-col items-center justify-center p-6 rounded-2xl">
          <div className="text-center relative">
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 relative">
              <Image
                src="/img1.jpg"
                alt="AI Interviewer"
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
              {isVoice && (
                <span className="absolute top-0 left-0 w-full h-full animate-ping bg-pink-400 rounded-full opacity-30" />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">AI Interviewer</h2>
            <p className="text-sm opacity-80">Ready to assess your skills</p>
          </div>
        </div>

        {/* Client Panel */}
        <div className="flex-1 bg-gray-800 text-white md:block hidden  flex-col items-center justify-center p-6 rounded-2xl">
          <div className="text-center">
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
              <Image
                src="/img1.jpg"
                alt="User"
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">You</h2>
            <p className="text-sm opacity-80">Let&apos;s begin the interview</p>
          </div>
        </div>
      </main>

      <div className="mt-5">
        {message.length > 0 && lastMessage && (
          <div className="p-4 bg-gray-800 rounded-lg w-full shadow">
            <p className="text-white text-base">{lastMessage}</p>
          </div>
        )}
      </div>

      {/* Call Control Button */}
      <div className="flex justify-center mt-8">
        <button
          type="button"
          onClick={toggleCall}
          className={`px-6 py-3 rounded-lg font-semibold transition cursor-pointer ${
            callStatus === CallStatus.ACTIVE
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {callStatus === CallStatus.ACTIVE ? "End Call" : "Start Call"}
        </button>
      </div>
    </div>
  );
};

export default Page;
