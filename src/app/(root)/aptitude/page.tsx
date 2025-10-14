"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, BrainCircuit } from "lucide-react";
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

type QuizState = "initial" | "loading" | "in-progress" | "completed";

const QUESTIONS_PER_PAGE = 5;

// --- Main Aptitude Test Page Component ---
export default function AptitudeTestPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [quizState, setQuizState] = useState<QuizState>("initial");
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [score, setScore] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1); // 1 for next, -1 for prev

  const startTest = async () => {
    setQuizState("loading");
    setError(null);
    try {
      const res = await fetch("/api/aptitude");

      if (!res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          throw new Error(
            errorData.error || "Failed to fetch the aptitude test"
          );
        } else {
          throw new Error(
            `Server returned a non-JSON error. Status: ${res.status}`
          );
        }
      }

      const responseData = await res.json();
      const fetchedQuestions: AIQuestion[] = responseData.data?.questions;

      if (!fetchedQuestions || fetchedQuestions.length === 0) {
        throw new Error("The API did not return any questions.");
      }

      const transformedQuestions = fetchedQuestions.map((q) => ({
        ...q,
        correctAnswerIndex: q.options.indexOf(q.answer),
      }));

      setQuestions(transformedQuestions);
      setCurrentPage(0);
      setSelectedAnswers({});
      setScore(0);
      setQuizState("in-progress");
    } catch (err: any) {
      setError(err.message);
      setQuizState("initial");
      console.error(err);
    }
  };

  const handleSubmitTest = () => {
    const finalScore = questions.reduce((acc, question, index) => {
      return selectedAnswers[index] === question.correctAnswerIndex
        ? acc + 1
        : acc;
    }, 0);
    setScore(finalScore);
    setQuizState("completed");
  };

  // --- Main Render Logic ---
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <AnimatePresence mode="wait">
        {/* CORRECT: `key` is now on the direct child of AnimatePresence */}
        {quizState === "initial" && (
          <TestInitialScreen key="initial" onStart={startTest} error={error} />
        )}
        {quizState === "loading" && <LoadingScreen key="loading" />}
        {quizState === "in-progress" && (
          <TestInProgressScreen
            key="in-progress"
            questions={questions}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            selectedAnswers={selectedAnswers}
            setSelectedAnswers={setSelectedAnswers}
            onSubmit={handleSubmitTest}
            slideDirection={slideDirection}
            setSlideDirection={setSlideDirection}
          />
        )}
        {quizState === "completed" && (
          <TestCompletedScreen
            key="completed"
            score={score}
            totalQuestions={questions.length}
            onRestart={() => setQuizState("initial")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Child Components for each State ---

// CORRECT: `TestContainer` no longer accepts a `key` prop.
const TestContainer = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="w-full max-w-4xl bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-2xl shadow-2xl shadow-black/30 p-8"
  >
    {children}
  </motion.div>
);

const TestInitialScreen = ({
  onStart,
  error,
}: {
  onStart: () => void;
  error: string | null;
}) => (
  // CORRECT: The `key` is removed from here.
  <TestContainer>
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-4">
        Aptitude Assessment
      </h1>
      <p className="text-slate-400 mb-8 max-w-xl mx-auto">
        This is a timed assessment covering logical, quantitative, and verbal
        skills. Please answer all questions to the best of your ability.
      </p>
      {error && (
        <p className="bg-red-900/50 text-red-400 p-3 rounded-md mb-6 text-center border border-red-800">
          {error}
        </p>
      )}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-purple-500/50"
      >
        Start Test
      </motion.button>
    </div>
  </TestContainer>
);

const LoadingScreen = () => (
  <motion.div
    exit={{ opacity: 0 }}
    className="text-center flex flex-col items-center"
  >
    <BrainCircuit className="w-16 h-16 mx-auto animate-pulse text-indigo-400" />
    <p className="text-xl font-semibold mt-4">Preparing Your Assessment...</p>
  </motion.div>
);

const TestInProgressScreen = ({
  questions,
  currentPage,
  setCurrentPage,
  selectedAnswers,
  setSelectedAnswers,
  onSubmit,
  slideDirection,
  setSlideDirection,
}: any) => {
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, endIndex);

  const handleAnswerSelect = (qIndex: number, optIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [qIndex]: optIndex });
  };
  const handlePageChange = (newPage: number) => {
    setSlideDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
  };

  const pageVariants = {
    hidden: (direction: number) => ({ opacity: 0, x: direction * 300 }),
    visible: { opacity: 1, x: 0 },
    exit: (direction: number) => ({ opacity: 0, x: direction * -300 }),
  };

  return (
    // CORRECT: The `key` is removed from here.
    <TestContainer>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Panel: Questions */}
        <div className="flex-grow lg:w-3/4 overflow-hidden">
          <ProgressBar
            current={Object.keys(selectedAnswers).length}
            total={questions.length}
          />
          <AnimatePresence initial={false} custom={slideDirection}>
            <motion.div
              key={currentPage}
              custom={slideDirection}
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
            >
              {currentQuestions.map((q: QuizQuestion, pageIndex: number) => {
                const globalIndex = startIndex + pageIndex;
                return (
                  <div key={globalIndex} className="mb-8">
                    <p className="text-lg text-slate-300 mb-4">
                      <span className="font-bold text-white mr-2">
                        {globalIndex + 1}.
                      </span>
                      {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt, optIndex) => (
                        <button
                          key={optIndex}
                          onClick={() =>
                            handleAnswerSelect(globalIndex, optIndex)
                          }
                          className={cn(
                            "p-3 text-left rounded-lg border-2 transition-all text-slate-200",
                            selectedAnswers[globalIndex] === optIndex
                              ? "bg-indigo-500/20 border-indigo-500 font-semibold"
                              : "bg-slate-800 border-slate-700 hover:bg-slate-700/70"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Right Panel: Navigator */}
        <div className="lg:w-1/4 lg:border-l lg:border-slate-800 lg:pl-8">
          <QuestionNavigator
            totalQuestions={questions.length}
            selectedAnswers={selectedAnswers}
            currentPage={currentPage}
            onQuestionSelect={(qIndex: any) =>
              handlePageChange(Math.floor(qIndex / QUESTIONS_PER_PAGE))
            }
          />
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="pagination-btn"
            >
              <ArrowLeft size={18} /> Prev
            </button>
            {currentPage < totalPages - 1 ? (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="pagination-btn"
              >
                Next <ArrowRight size={18} />
              </button>
            ) : (
              <button onClick={onSubmit} className="submit-btn">
                <Check size={18} /> Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </TestContainer>
  );
};

const QuestionNavigator = ({
  totalQuestions,
  selectedAnswers,
  currentPage,
  onQuestionSelect,
}: any) => (
  <div>
    <h3 className="font-bold text-lg mb-4">Question Map</h3>
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: totalQuestions }).map((_, index) => {
        const isAnswered = selectedAnswers[index] !== undefined;
        const isOnCurrentPage =
          Math.floor(index / QUESTIONS_PER_PAGE) === currentPage;
        return (
          <button
            key={index}
            onClick={() => onQuestionSelect(index)}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-md font-semibold transition-all duration-200 border-2",
              isAnswered
                ? "bg-indigo-500/20 border-indigo-500 text-white"
                : "bg-slate-800 border-slate-700 text-slate-400",
              isOnCurrentPage
                ? "ring-2 ring-offset-2 ring-offset-slate-900 ring-blue-500"
                : "hover:border-slate-500"
            )}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  </div>
);

const ProgressBar = ({
  current,
  total,
}: {
  current: number;
  total: number;
}) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-1 text-sm">
        <span className="font-semibold text-white">Progress</span>
        <span className="text-slate-400">
          {current} / {total} Answered
        </span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const TestCompletedScreen = ({ score, totalQuestions, onRestart }: any) => (
  // CORRECT: The `key` is removed from here.
  <TestContainer>
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2 text-white">Test Completed! 🎉</h1>
      <p className="text-slate-400 mb-6">Here is your final score.</p>
      <div className="my-8">
        <p className="text-lg text-slate-300">Your Score</p>
        <p className="text-7xl font-extrabold my-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          {score}
          <span className="text-4xl text-slate-500"> / {totalQuestions}</span>
        </p>
      </div>
      <button
        onClick={onRestart}
        className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
      >
        Take Another Test
      </button>
    </div>
  </TestContainer>
);
