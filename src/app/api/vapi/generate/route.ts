import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "../../../../../firebase/admin";

export async function GET() {
  return Response.json(
    {
      success: true,
      data: "thank you ",
    },
    {
      status: 200,
    }
  );
}

export async function POST(params: Request) {
  const { role, level, amount, type, techStack, userId } = await params.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
          The job role is ${role}.
          The job experience level is ${level}.
          The tech stack used in the job is: ${techStack}.
          The focus between behavioural and technical questions should lean towards: ${type}.
          The amount of questions required is: ${amount}.
          Please return only the questions, without any additional text.
          The questions are going to be read by a voice assistant so do not use "/" or "*" or any special symbols.
          Return the questions formatted like this:
          ["Question 1", "Question 2", "Question 3"]
          
          Thank you!<3`,
    });

    const interview = {
      role,
      type,
      level,
      techStack: techStack.split(","),
      questions: JSON.parse(questions),
      userId,
      finalized: true,
      createdAt: new Date().toISOString(),
    };

    await db.collection("interview").add(interview);

    return Response.json(
      { success: true, data: "THANK YOU " },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating or saving interview:", error);
    return Response.json(
      {
        success: false,
        error: (error as Error).message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
