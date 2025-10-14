import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod"; // Import zod for schema definition
import { db } from "../../../../firebase/admin";

// ✅ GET route for health check (no change)
export async function GET() {
  return Response.json(
    { success: true, message: "🧠 DSA Quiz Generator API is live!" },
    { status: 200 }
  );
}

// ✅ POST route to generate DSA quiz (modified for reliability)
export async function POST(request: Request) {
  try {
    const { topic, difficulty, amount, userId } = await request.json();

    // 1. Define the schema for a single quiz question using Zod
    const quizQuestionSchema = z.object({
      question: z.string().describe("The question text"),
      options: z
        .array(z.string())
        .length(4)
        .describe("An array of 4 possible answers"),
      answer: z
        .string()
        .describe("The correct answer, exactly matching one of the options"),
      explanation: z
        .string()
        .describe("A short explanation of why the answer is correct"),
      feedback_for_wrong_answers: z
        .string()
        .describe("A helpful hint for users who select a wrong answer"),
    });

    // 2. Use `generateObject` with the schema
    const { object: quizQuestions } = await generateObject({
      model: google("gemini-2.5-pro"), // Using a modern model is recommended
      schema: z.array(quizQuestionSchema), // We expect an array of questions
      prompt: `
        Generate ${amount} multiple-choice questions (MCQs) on Data Structures and Algorithms.
        Topic: ${topic}.
        Difficulty: ${difficulty}.
        Each question must be conceptually correct, educational, and strictly follow the provided schema.
      `,
    });

    // ⛔ The manual JSON.parse() block is no longer needed!
    // The `quizQuestions` variable is already a valid, typed JavaScript array.

    // 3. Save generated quiz to Firestore
    const quizData = {
      topic,
      difficulty,
      amount,
      userId,
      questions: quizQuestions, // This is now guaranteed to be a valid array
      createdAt: new Date().toISOString(),
    };

    await db.collection("dsa_quizzes").add(quizData);

    // ✅ Return response
    return Response.json(
      {
        success: true,
        message: "✅ DSA Quiz generated successfully!",
        data: quizData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error generating DSA quiz:", error);
    return Response.json(
      {
        success: false,
        error:
          (error as Error).message ||
          "Something went wrong while generating the DSA quiz.",
      },
      { status: 500 }
    );
  }
}
