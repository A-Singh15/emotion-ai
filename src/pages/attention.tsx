import { useEffect, useState } from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

export default function RealtimeAttention() {
  const [focusStatus, setFocusStatus] = useState("Neutral 🙂");
  const [gazeDirection, setGazeDirection] = useState("Center");
  const [blinking, setBlinking] = useState("No");
  const [history, setHistory] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [videoSrc, setVideoSrc] = useState("http://localhost:4200/video_feed");
  const [isFocused, setIsFocused] = useState(false);
  // @ts-ignore
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    if (isStreaming) {
      const newSocket = io("http://localhost:4200");

      newSocket.on("attention_data", (data) => {
        setFocusStatus(data.focus_status);
        setGazeDirection(data.gaze_direction);
        setBlinking(data.blinking);
        setHistory((prev) => [data.focus_status, ...prev.slice(0, 4)]);

        setIsFocused(data.focus_status.includes("Focused"));
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    } else {
      setIsFocused(false);
      setFocusStatus("Neutral 🙂");
      setGazeDirection("Center");
      setBlinking("No");
      setHistory([]);
    }
  }, [isStreaming]);

  const toggleStream = () => {
    setIsStreaming(!isStreaming);
    setVideoSrc(isStreaming ? "" : "http://localhost:4200/video_feed");
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">

        {/* 🔥 Attention Animation */}
        <AnimatePresence>
          {isStreaming && isFocused && (
            <motion.div
              key="focus-animation"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              className="text-4xl font-bold text-green-500"
            >
              FOCUS FOCUS FOCUS! 🎯
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isStreaming && !isFocused && focusStatus.includes("Distracted") && (
            <motion.div
              key="distracted-animation"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              className="text-4xl font-bold text-red-500"
            >
              DISTRACTED! PAY ATTENTION! 😵‍💫
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🎥 Video Box with Placeholder */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className={`p-4 rounded-lg shadow-lg ${
            isFocused ? "border-green-500 border-4" : "border-red-500 border-4"
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

        {/* 📊 Real-Time Attention Status */}
        <Card className="p-6 w-full max-w-lg text-center shadow-lg">
          <h2 className="text-xl font-semibold">Attention Status</h2>
          <p className="text-2xl mt-2">{focusStatus}</p>
          <p className="text-lg mt-2">Gaze: {gazeDirection}</p>
          <p className="text-lg mt-2">Blinking: {blinking}</p>
        </Card>

        {/* ⏳ Attention History */}
        <h3 className="text-lg font-semibold mt-6">Attention History</h3>
        <div className="flex flex-wrap gap-3">
          {history.map((e, idx) => (
            <Card key={idx} className="px-4 py-2 shadow">{e}</Card>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
