// app/api/videos/route.ts
import { NextResponse } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY!;
const MAX_RESULTS = 10; // Number of videos per query

async function fetchYouTubeVideos(query: string) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=date&maxResults=${MAX_RESULTS}&q=${encodeURIComponent(
    query
  )}&key=${YOUTUBE_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || "YouTube API request failed");
  }

  return data.items.map((item: any) => ({
    title: item.snippet.title,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    description: item.snippet.description,
    channel: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    thumbnail:
      item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
  }));
}

export async function GET() {
  try {
    // Coding playlists/videos by specific programming languages
    const codingVideos = await fetchYouTubeVideos(
      "JavaScript tutorial for beginners"
    );
    const dsaVideos = await fetchYouTubeVideos("DSA full course for beginners");
    const aptitudeVideos = await fetchYouTubeVideos(
      "Aptitude preparation full course"
    );

    return NextResponse.json({
      success: true,
      data: { codingVideos, dsaVideos, aptitudeVideos },
    });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
