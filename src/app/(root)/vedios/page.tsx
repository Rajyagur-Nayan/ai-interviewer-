/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

// --- Types (Unchanged) ---
type Video = {
  title: string;
  url: string;
  description: string;
  channel: string;
  publishedAt: string;
  thumbnail: string;
};

type VideoCategories = {
  codingVideos: Video[];
  dsaVideos: Video[];
  aptitudeVideos: Video[];
};

// --- Main Page Component ---
export default function VideosPage() {
  const [videos, setVideos] = useState<VideoCategories | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        if (!res.ok) throw new Error("Failed to fetch videos.");

        const data = await res.json();
        if (data.success) {
          setVideos(data.data);
        } else {
          throw new Error(data.message || "Could not retrieve video data.");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto z-10 relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
        >
          Latest Learning Videos
        </motion.h1>

        {loading ? (
          <>
            <VideoCategorySection
              title="Coding Tutorials"
              videos={[]}
              isLoading={true}
            />
            <VideoCategorySection
              title="DSA Tutorials"
              videos={[]}
              isLoading={true}
            />
            <VideoCategorySection
              title="Aptitude Preparation"
              videos={[]}
              isLoading={true}
            />
          </>
        ) : error ? (
          <p className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">
            {error}
          </p>
        ) : videos ? (
          <>
            <VideoCategorySection
              title="Coding Tutorials"
              videos={videos.codingVideos}
            />
            <VideoCategorySection
              title="DSA Tutorials"
              videos={videos.dsaVideos}
            />
            <VideoCategorySection
              title="Aptitude Preparation"
              videos={videos.aptitudeVideos}
            />
          </>
        ) : (
          <p className="text-center text-slate-400">No videos found.</p>
        )}
      </div>
    </main>
  );
}

// --- Reusable Child Components ---

// Renders a full category section with title and grid
function VideoCategorySection({
  title,
  videos,
  isLoading = false,
}: {
  title: string;
  videos: Video[];
  isLoading?: boolean;
}) {
  const skeletonCount = 3; // Number of skeletons to show per category

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-3xl font-semibold mb-6 border-l-4 border-purple-500 pl-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <VideoCardSkeleton key={i} />
            ))
          : videos.map((video, index) => (
              <VideoCard key={index} video={video} />
            ))}
      </div>
    </motion.div>
  );
}

// The interactive card for a single video
function VideoCard({ video }: { video: Video }) {
  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:border-purple-500/70 hover:shadow-purple-500/10 hover:-translate-y-2"
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircle className="w-16 h-16 text-white/80" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-slate-100 mb-2 line-clamp-2 h-14">
          {video.title}
        </h3>
        <p className="text-sm text-purple-400 font-medium mb-2">
          {video.channel}
        </p>
        <p className="text-sm text-slate-400 line-clamp-3 h-[60px]">
          {video.description}
        </p>
      </div>
    </motion.a>
  );
}

// A placeholder card for the loading state
function VideoCardSkeleton() {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden p-4 space-y-4">
      <div className="bg-slate-700 h-48 rounded-md animate-pulse"></div>
      <div className="space-y-3">
        <div className="bg-slate-700 h-5 w-5/6 rounded-md animate-pulse"></div>
        <div className="bg-slate-700 h-5 w-4/6 rounded-md animate-pulse"></div>
        <div className="bg-slate-700 h-4 w-1/3 rounded-md animate-pulse"></div>
        <div className="bg-slate-700 h-4 w-full rounded-md animate-pulse"></div>
        <div className="bg-slate-700 h-4 w-3/4 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}
