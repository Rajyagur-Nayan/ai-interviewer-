"use client";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

export enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
  CONNECTING = "CONNECTING",
}

interface AgentProps {
  userName: string;
  userId: string;
  type: string;
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface message {
  type: "transcript" | string; // could be other types depending on your system
  transcriptType?: "final" | "partial"; // optional if not always present
  transcript?: string; // actual text of the message
  role: "user" | "system" | "assistant"; // can adjust based on your app
}

const Agent = ({ type }: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = {
          role: message.role,
          content: message.transcript || "",
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log(error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      console.log("end the interview ");
    }
  }, [messages, callStatus, type, router]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    try {
      await vapi.start(process.env.NEXT_PUBLIC_WORKFLOW_TOKEN!, {});
    } catch (error) {
      console.error("Workflow start failed:", error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleEndCall = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const lastMessage = messages[messages.length - 1]?.content;
  const isCallInactiveAndFinished =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

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
              {isSpeaking && (
                <span className="absolute top-0 left-0 w-full h-full animate-ping bg-gray-400 rounded-full opacity-30" />
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
        {messages.length > 0 && lastMessage && (
          <div className="p-4 bg-gray-800 rounded-lg w-full shadow">
            <p className="text-white text-base">{lastMessage}</p>
          </div>
        )}
      </div>

      {/* Call Control Button */}
      <div className="flex justify-center mt-8">
        {callStatus !== "ACTIVE" ? (
          <button
            type="button"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            onClick={handleCall}
          >
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />
            <span>{isCallInactiveAndFinished ? "call" : "..."}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleEndCall}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            End
          </button>
        )}
      </div>
    </div>
  );
};

export default Agent;
