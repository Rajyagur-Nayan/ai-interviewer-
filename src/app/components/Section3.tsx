import Link from "next/link";
import React from "react";

const Section3 = () => {
  interface InterviewData {
    id: string;
    userId: string;
    role: string;
    type: "Mock" | "Real" | "Practice";
    techStack: string[];
    level: "Beginner" | "Intermediate" | "Advanced";
    questions: string[];
    finalized: boolean;
    createdAt: Date;
  }

  const dummyInterviews: InterviewData[] = [
    {
      id: "1",
      userId: "user101",
      role: "Frontend Developer",
      type: "Mock",
      techStack: ["React", "TypeScript", "TailwindCSS"],
      level: "Intermediate",
      questions: [
        "Explain the difference between props and state in React.",
        "What are React Hooks?",
      ],
      finalized: true,
      createdAt: new Date("2024-06-15T10:00:00Z"),
    },
    {
      id: "2",
      userId: "user102",
      role: "Backend Developer",
      type: "Practice",
      techStack: ["Node.js", "Express", "MongoDB"],
      level: "Beginner",
      questions: ["What is REST API?", "How does Express handle routing?"],
      finalized: false,
      createdAt: new Date("2024-06-20T14:30:00Z"),
    },
    {
      id: "3",
      userId: "user103",
      role: "Full Stack Engineer",
      type: "Real",
      techStack: ["React", "Node.js", "PostgreSQL"],
      level: "Advanced",
      questions: [
        "Describe the MVC architecture.",
        "How to implement authentication in a full-stack app?",
      ],
      finalized: true,
      createdAt: new Date("2024-06-25T09:15:00Z"),
    },
    {
      id: "4",
      userId: "user104",
      role: "Data Scientist",
      type: "Mock",
      techStack: ["Python", "Pandas", "Scikit-learn"],
      level: "Intermediate",
      questions: [
        "What is the difference between supervised and unsupervised learning?",
        "Explain the concept of overfitting.",
      ],
      finalized: false,
      createdAt: new Date("2024-07-01T11:45:00Z"),
    },
    {
      id: "5",
      userId: "user105",
      role: "DevOps Engineer",
      type: "Practice",
      techStack: ["Docker", "Kubernetes", "AWS"],
      level: "Advanced",
      questions: [
        "How does container orchestration work with Kubernetes?",
        "Explain CI/CD pipelines.",
      ],
      finalized: true,
      createdAt: new Date("2024-07-03T15:20:00Z"),
    },
    {
      id: "6",
      userId: "user106",
      role: "Mobile App Developer",
      type: "Real",
      techStack: ["React Native", "TypeScript"],
      level: "Beginner",
      questions: [
        "What are the advantages of using React Native?",
        "How does state management work in mobile apps?",
      ],
      finalized: false,
      createdAt: new Date("2024-07-05T08:10:00Z"),
    },
  ];

  return (
    <div>
      <div className="p-6 bg-white dark:bg-black  space-y-6 max-w-7xl mx-auto">
        <h1 className="text-3xl  md:text-4xl font-bold leading-snug mb-6 text-gray-900 dark:text-white">
          Take Interviews
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dummyInterviews.map((data) => (
            <div
              key={data.id}
              className="border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-lg bg-white dark:bg-gray-900 hover:scale-105 hover:shadow-2xl transition-all  
              animate-in fade-in slide-in-from-bottom-6 "
            >
              <h2 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
                {data.role} - {data.level}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                Tech Stack: {data.techStack.join(", ")}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                Type: {data.type}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                Finalized:{" "}
                <span
                  className={data.finalized ? "text-green-500" : "text-red-500"}
                >
                  {data.finalized ? "Yes" : "No"}
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                Questions: {data.questions.length}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
                Date: {data.createdAt.toLocaleDateString()}
              </p>
              <Link
                href="/"
                className="bg-blue-600 px-4 py-2 rounded-2xl hover:bg-blue-700  text-white transition-colors cursor-pointer duration-300"
              >
                View Interview
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section3;
