import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { db } from "../../../../firebase/admin";

const quizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  answer: z.string(),
  explanation: z.string(),
  feedback_for_wrong_answers: z.string(),
});

// --- Retry helper ---
async function generateWithRetry(prompt: string, maxRetries = 5, delay = 3000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await generateObject({
        model: google("gemini-2.5-flash-lite"),
        schema: z.array(quizQuestionSchema),
        prompt,
      });
    } catch (err) {
      console.warn(`Attempt ${i + 1} failed:`, err);
      if (i === maxRetries - 1) throw err; // last attempt
      await new Promise((res) => setTimeout(res, delay * (i + 1))); // exponential backoff
    }
  }
}

export async function GET() {
  try {
    const amount = 25;
    const topic =
      "Logical Reasoning, Quantitative Aptitude, and Verbal Ability";
    const difficulty = "a mix of easy, medium, and hard questions";
    const userId = "anonymous_aptitude_user";

    const prompt = `
      Generate an aptitude test with exactly ${amount} multiple-choice questions (MCQs).
      The test should cover a broad range of topics including: ${topic}.
      The difficulty level should be ${difficulty}.
      
      Ensure the questions are high-quality, conceptually correct, and strictly follow the provided JSON schema:
      {
        "question": "string",
        "options": ["string", "string", "string", "string"],
        "answer": "string",
        "explanation": "string",
        "feedback_for_wrong_answers": "string"
      }
    `;

    // --- Generate with retry ---
    const { object: quizQuestions }: any = await generateWithRetry(prompt);

    const quizData = {
      topic: "General Aptitude",
      difficulty: "mixed",
      amount,
      userId,
      questions: quizQuestions,
      createdAt: new Date().toISOString(),
    };

    await db.collection("aptitude_quizzes").add(quizData);

    return Response.json(
      {
        success: true,
        message: "✅ Aptitude test generated successfully!",
        data: quizData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error generating aptitude test:", error);
    return Response.json(
      {
        success: false,
        error:
          (error as Error).message || "Failed to generate the aptitude test.",
      },
      { status: 500 }
    );
  }
}
