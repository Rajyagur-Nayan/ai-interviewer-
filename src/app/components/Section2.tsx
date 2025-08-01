import { Mic, Brain, BarChart2 } from "lucide-react";

const features = [
  {
    title: "Speak Your Answers",
    description:
      "Engage in natural conversations, answering questions just like a real interview. Our AI listens attentively.",
    icon: <Mic className="text-blue-600 dark:text-blue-400 w-8 h-8 mb-2" />,
  },
  {
    title: "Receive Instant Feedback",
    description:
      "Get immediate, actionable insights on your responses, tone, and delivery from our intelligent AI.",
    icon: <Brain className="text-blue-600 dark:text-blue-400 w-8 h-8 mb-2" />,
  },
  {
    title: "Track Your Progress",
    description:
      "Monitor your improvement over time with detailed reports and personalized recommendations for growth.",
    icon: (
      <BarChart2 className="text-blue-600 dark:text-blue-400 w-8 h-8 mb-2" />
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-12 text-gray-900 dark:text-white">
          Seamless Interview Practice in 3 Steps
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm dark:shadow-md border border-gray-200 dark:border-zinc-700 hover:shadow-md transition"
            >
              <div className="flex flex-col items-center text-gray-800 dark:text-white">
                {feature.icon}
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
