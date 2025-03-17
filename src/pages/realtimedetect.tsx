import { useEffect, useState } from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";
import { io, Socket } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

export default function RealtimeEmotion() {
  const [emotion, setEmotion] = useState("Neutral 🙂");
  const [emotionHistory, setEmotionHistory] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [videoSrc, setVideoSrc] = useState("http://localhost:4200/video_feed");
  const [alertEmotion, setAlertEmotion] = useState(false);
  // @ts-ignore
  const [socket, setSocket] = useState<Socket | null>(null);

  // ✅ Persistent WebSocket Connection
  useEffect(() => {
    console.log("Initializing WebSocket...");

    const newSocket = io("http://localhost:4200");

    newSocket.on("connect", () => console.log("✅ WebSocket Connected"));
    newSocket.on("disconnect", () => console.log("❌ WebSocket Disconnected"));

    newSocket.on("emotion_data", (data) => {
      console.log("🔥 New Emotion Data:", data);

      const detectedEmotion = getEmoji(data.emotion);
      setEmotion(detectedEmotion);

      setEmotionHistory((prev) => {
        if (prev.length === 0 || prev[0] !== detectedEmotion) {
          return [detectedEmotion, ...prev.slice(0, 4)];
        }
        return prev;
      });

      setAlertEmotion(data.emotion !== "neutral" && data.emotion !== "happy");
    });

    setSocket(newSocket);

    return () => {
      console.log("Closing WebSocket...");
      newSocket.disconnect();
    };
  }, []); // ✅ Runs once to keep the socket alive

  const getEmoji = (emotion: string) => {
    const emojiMap: { [key: string]: string } = {
      happy: "Happy 😃",
      sad: "Sad 😢",
      angry: "Angry 😡",
      surprised: "Surprised 😲",
      neutral: "Neutral 🙂",
      fear: "Fear 😨",
      disgust: "Disgust 🤢",
    };
    return emojiMap[emotion] || "Neutral 🙂";
  };

  const toggleStream = () => {
    setIsStreaming(!isStreaming);
    setVideoSrc(isStreaming ? "" : "http://localhost:4200/video_feed");
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">

        {/* 🔥 Emotion Alert Animation */}
        <AnimatePresence>
          {isStreaming && alertEmotion && (
            <motion.div
              key="emotion-alert"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="text-4xl font-bold text-red-500"
            >
              Unusual Emotion Detected! ⚠️
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🎥 Video Box with Placeholder */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className={`p-4 rounded-lg shadow-lg ${
            alertEmotion ? "border-red-500 border-4" : "border-green-500 border-4"
          } w-full max-w-4xl`}
        >
          <Card className="p-4 w-full max-w-4xl flex flex-col items-center shadow-xl">
            <h2 className="text-xl font-semibold">Live Webcam Feed</h2>
            {isStreaming ? (
              <motion.img
                src={videoSrc}
                alt="Live Webcam"
                className="mt-4 border rounded-lg shadow-md w-full max-w-4xl h-96 object-cover bg-black"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            ) : (
              <div className="mt-4 border rounded-lg shadow-md w-full max-w-4xl h-96 bg-gray-800 flex items-center justify-center text-white text-lg">
                Camera is Off 📷
              </div>
            )}
            <Button color="primary" className="mt-4" onClick={toggleStream}>
              {isStreaming ? "Stop Video" : "Start Video"}
            </Button>
          </Card>
        </motion.div>

        {/* ✅ Fix: Emotion Data Display Below Video */}
        <Card className="p-6 w-full max-w-lg text-center shadow-lg mt-6">
          <h2 className="text-xl font-semibold">Detected Emotion</h2>
          <motion.p
            className="text-2xl mt-2"
            key={emotion}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {emotion}
          </motion.p>
        </Card>

        {/* ⏳ Emotion History */}
        <h3 className="text-lg font-semibold mt-6">Emotion History</h3>
        <div className="flex flex-wrap gap-3">
          {emotionHistory.map((e, idx) => (
            <Card key={idx} className="px-4 py-2 shadow">{e}</Card>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
