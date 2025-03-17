import DefaultLayout from "@/layouts/default";
import { Card } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { title, subtitle } from "@/components/primitives";
import { motion } from "framer-motion";

const authors = [
  { name: "Aaron", image: "/images/placeholder.png", color: "primary" },
];

export default function ProjectBreakdown() {
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-8 py-10 md:py-12">
        {/* 🔥 Authors Section */}
        <div className="text-center">
          <h1 className={title({ class: undefined, className: undefined, fullWidth: undefined, size: undefined, color: "cyan" })}>Project Breakdown</h1>
          <p className={subtitle({ class: "mt-2" })}>
            A collaborative effort to build a real-time multimodal emotion recognition system.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-6">
            {authors.map((author, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <Avatar
                  src={author.image}
                  alt={author.name}
                  size="lg"
                  color={"primary"}
                  className="border-4 border-current shadow-lg"
                />
                <p className="mt-2 text-lg font-semibold text-default-800">{author.name}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 📌 Project Sections in a Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {/* 🎯 Problem Statement */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <Card className="p-6 border-l-4 border-primary shadow-lg">
              <h2 className="text-xl font-semibold text-primary">Problem Statement</h2>
              <p className="text-md mt-2 text-default-700">
                Develop a real-time system that recognizes human emotions by analyzing facial expressions and voice tone,
                combining these modalities for improved accuracy.
              </p>
            </Card>
          </motion.div>

          {/* 🚀 Key Features */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <Card className="p-6 border-l-4 border-secondary shadow-lg">
              <h2 className="text-xl font-semibold text-secondary">Key Features</h2>
              <ul className="mt-2 text-md text-default-700 list-disc list-inside">
                <li><strong>Visual Emotion Recognition:</strong> Detects faces and classifies expressions.</li>
                <li><strong>Audio Emotion Recognition:</strong> Captures audio input and analyzes features.</li>
                <li><strong>Multimodal Fusion:</strong> Combines visual and audio data for accuracy.</li>
                <li><strong>Output:</strong> Displays detected emotions in real-time.</li>
              </ul>
            </Card>
          </motion.div>

          {/* 🔧 Technology Stack */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <Card className="p-6 border-l-4 border-success shadow-lg">
              <h2 className="text-xl font-semibold text-success">Technology Stack</h2>
              <ul className="mt-2 text-md text-default-700 list-disc list-inside">
                <li><strong>Languages:</strong> Python, JavaScript</li>
                <li><strong>Libraries:</strong> OpenCV, TensorFlow, PyTorch, Librosa</li>
                <li><strong>Frameworks:</strong> Flask (API), React (UI)</li>
                <li><strong>Datasets:</strong> FER-2013, RAVDESS</li>
              </ul>
            </Card>
          </motion.div>

          {/* 📊 UML Overview */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <Card className="p-6 border-l-4 border-warning shadow-lg">
              <h2 className="text-xl font-semibold text-warning">UML Overview</h2>
              <p className="text-md mt-2 text-default-700">
                The system architecture includes real-time processing using Flask APIs for backend, React for frontend,
                and WebSockets for live data streaming.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>
    </DefaultLayout>
  );
}
