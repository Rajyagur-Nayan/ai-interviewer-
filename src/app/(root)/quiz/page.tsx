"use client";

import { useState, FormEvent, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, BrainCircuit, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have this from ShadCN

// --- Interfaces & Types (Unchanged) ---
interface AIQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  feedback_for_wrong_answers: string;
}

interface QuizQuestion extends AIQuestion {
  correctAnswerIndex: number;
}

type QuizState = "setup" | "loading" | "in-progress" | "completed";

// --- Main Quiz Page Component ---
export default function QuizPage() {
  // --- State Management (Mostly Unchanged) ---
  const [topic, setTopic] = useState<string>("Data Structures");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );
  const [amount, setAmount] = useState<number>(5);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [answerStatus, setAnswerStatus] = useState<
    "correct" | "incorrect" | null
  >(null);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>("setup");
  const [error, setError] = useState<string | null>(null);

  const startQuiz = async (e: FormEvent) => {
    e.preventDefault();
    setQuizState("loading");
    setError(null);

    try {
      const res = await fetch("/api/dsa-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          difficulty,
          amount,
          userId: "user-from-form",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch quiz data");
      }

      const responseData = await res.json();
      const fetchedQuestions: AIQuestion[] = responseData.data?.questions;

      if (!fetchedQuestions || fetchedQuestions.length === 0) {
        throw new Error(
          "No questions were returned for the selected criteria."
        );
      }

      const transformedQuestions = fetchedQuestions.map((q) => ({
        ...q,
        correctAnswerIndex: q.options.indexOf(q.answer),
      }));

      setQuestions(transformedQuestions);
      setCurrentQuestionIndex(0);
      setSelectedAnswerIndex(null);
      setAnswerStatus(null);
      setScore(0);
      setQuizState("in-progress");
    } catch (err: any) {
      setError(err.message);
      setQuizState("setup");
      console.error(err);
    }
  };

  // --- Event Handlers (Moved into child components for better locality) ---
  const handleAnswerSelect = (selectedIndex: number) => {
    if (answerStatus !== null) return;
    setSelectedAnswerIndex(selectedIndex);
    const correct =
      questions[currentQuestionIndex].correctAnswerIndex === selectedIndex;
    if (correct) {
      setAnswerStatus("correct");
      setScore((prev) => prev + 1);
    } else {
      setAnswerStatus("incorrect");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswerIndex(null);
      setAnswerStatus(null);
    } else {
      setQuizState("completed");
    }
  };

  const handleReturnToSetup = () => {
    setQuizState("setup");
    setError(null);
  };

  // --- Main Render Logic ---
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <AnimatePresence mode="wait">
        {quizState === "setup" && (
          <QuizSetup
            topic={topic}
            setTopic={setTopic}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            amount={amount}
            setAmount={setAmount}
            onSubmit={startQuiz}
            error={error}
          />
        )}
        {quizState === "loading" && (
          <motion.div
            key="loading"
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <BrainCircuit className="w-16 h-16 mx-auto animate-pulse text-indigo-400" />
            <p className="text-xl font-semibold mt-4">
              Generating Your Custom Quiz...
            </p>
          </motion.div>
        )}
        {quizState === "in-progress" && (
          <QuizInProgress
            key="in-progress"
            currentQuestion={questions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            selectedAnswerIndex={selectedAnswerIndex}
            answerStatus={answerStatus}
            onAnswerSelect={handleAnswerSelect}
            onNextQuestion={handleNextQuestion}
          />
        )}
        {quizState === "completed" && (
          <QuizCompleted
            key="completed"
            score={score}
            totalQuestions={questions.length}
            onRestart={handleReturnToSetup}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Child Components for each Quiz State ---

const QuizContainer = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: -20 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-2xl shadow-2xl shadow-black/30 p-8"
  >
    {children}
  </motion.div>
);

const QuizSetup = ({
  topic,
  setTopic,
  difficulty,
  setDifficulty,
  amount,
  setAmount,
  onSubmit,
  error,
}: any) => (
  <QuizContainer>
    <h1 className="text-3xl font-bold text-center mb-2">Setup Your Quiz 📝</h1>
    <p className="text-center text-slate-400 mb-6">Customize your challenge.</p>
    {error && (
      <p className="bg-red-900/50 text-red-400 p-3 rounded-md mb-4 text-center border border-red-800">
        {error}
      </p>
    )}
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Form inputs are styled more modernly */}
      <div className="space-y-6">
        <FormInput
          id="topic"
          label="Topic"
          value={topic}
          onChange={(e: any) => setTopic(e.target.value)}
        />
        <FormSelect
          id="difficulty"
          label="Difficulty"
          value={difficulty}
          onChange={(e: any) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </FormSelect>
        <FormInput
          id="amount"
          label="Number of Questions"
          type="number"
          value={amount}
          onChange={(e: any) => setAmount(Number(e.target.value))}
          min="1"
          max="10"
        />
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
      >
        Start Quiz <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  </QuizContainer>
);

const FormInput = ({ label, ...props }: any) => (
  <div>
    <label
      htmlFor={props.id}
      className="block text-sm font-medium text-slate-300 mb-1"
    >
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-2 bg-slate-800/60 border-2 border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white transition-colors"
    />
  </div>
);
const FormSelect = ({ label, children, ...props }: any) => (
  <div>
    <label
      htmlFor={props.id}
      className="block text-sm font-medium text-slate-300 mb-1"
    >
      {label}
    </label>
    <select
      {...props}
      className="w-full px-4 py-2 bg-slate-800/60 border-2 border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white transition-colors"
    >
      {children}
    </select>
  </div>
);

const QuizInProgress = ({
  currentQuestion,
  questionIndex,
  totalQuestions,
  selectedAnswerIndex,
  answerStatus,
  onAnswerSelect,
  onNextQuestion,
}: any) => (
  <QuizContainer>
    {/* Progress Bar */}
    <div className="mb-6">
      <div className="flex justify-between items-end mb-1">
        <h2 className="text-xl font-bold text-white">
          Question {questionIndex + 1}
        </h2>
        <p className="text-sm text-slate-400">
          {questionIndex + 1} / {totalQuestions}
        </p>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
          initial={{ width: `${(questionIndex / totalQuestions) * 100}%` }}
          animate={{
            width: `${((questionIndex + 1) / totalQuestions) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>

    <p className="text-xl mt-2 text-slate-200 mb-6 min-h-[6rem]">
      {currentQuestion.question}
    </p>

    <motion.div
      className="flex flex-col space-y-3"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {currentQuestion.options.map((option: string, index: number) => {
        const isSelected = selectedAnswerIndex === index;
        const isCorrect = currentQuestion.correctAnswerIndex === index;
        let buttonClass =
          "border-slate-700 bg-slate-800 hover:bg-slate-700 hover:border-indigo-500";
        if (answerStatus) {
          if (isCorrect)
            buttonClass = "border-green-500 bg-green-500/20 text-green-300";
          else if (isSelected)
            buttonClass = "border-red-500 bg-red-500/20 text-red-400";
          else buttonClass = "border-slate-800 bg-slate-900/50 opacity-50";
        } else if (isSelected) {
          buttonClass = "border-indigo-500 bg-indigo-500/20";
        }

        return (
          <motion.button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={!!answerStatus}
            className={cn(
              "w-full p-4 text-left rounded-lg border-2 transition-all duration-300 text-slate-200",
              buttonClass
            )}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {option}
          </motion.button>
        );
      })}
    </motion.div>

    <AnimatePresence>
      {answerStatus && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-6 text-left p-4 rounded-lg bg-slate-800/70 border border-slate-700"
        >
          <div className="flex items-center gap-3">
            {answerStatus === "correct" ? (
              <CheckCircle className="text-green-400 w-8 h-8" />
            ) : (
              <XCircle className="text-red-400 w-8 h-8" />
            )}
            <div>
              <h3
                className={cn(
                  "font-bold text-lg",
                  answerStatus === "correct" ? "text-green-400" : "text-red-400"
                )}
              >
                {answerStatus === "correct" ? "Correct!" : "Incorrect"}
              </h3>
              <p className="text-slate-300 text-sm mt-1">
                {answerStatus === "correct"
                  ? currentQuestion.explanation
                  : currentQuestion.feedback_for_wrong_answers}
              </p>
            </div>
          </div>
          <button
            onClick={onNextQuestion}
            className="mt-4 w-full bg-indigo-600 text-white px-8 py-2 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
          >
            {questionIndex < totalQuestions - 1
              ? "Next Question"
              : "Finish Quiz"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  </QuizContainer>
);

const QuizCompleted = ({ score, totalQuestions, onRestart }: any) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  let message = "Keep practicing!";
  if (percentage > 90) message = "Outstanding! You're a true expert!";
  else if (percentage > 70)
    message = "Great job! You've got a solid understanding.";
  else if (percentage > 50)
    message = "Good effort! A little more practice will help.";

  return (
    <QuizContainer>
      <h1 className="text-3xl font-bold mb-2 text-center">
        Quiz Completed! 🎉
      </h1>
      <p className="text-slate-400 text-center mb-6">{message}</p>
      <div className="text-center bg-slate-800/50 p-8 rounded-xl border border-slate-700">
        <p className="text-lg text-slate-300">Your Score</p>
        <p className="text-6xl font-extrabold my-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          {score}
          <span className="text-3xl text-slate-500"> / {totalQuestions}</span>
        </p>
        <p className="text-2xl font-bold text-indigo-400">({percentage}%)</p>
      </div>
      <button
        onClick={onRestart}
        className="mt-8 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 font-semibold"
      >
        Create a New Quiz
      </button>
    </QuizContainer>
  );
};
