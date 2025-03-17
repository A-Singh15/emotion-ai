import { useEffect, useRef, useState } from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function AppWithoutJetson() {
  const [emotion, setEmotion] = useState("Neutral 🙂");
  const [emotionHistory, setEmotionHistory] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const fetchEmotion = async () => {
      try {
        const response = await fetch("http://localhost:4000/emotion");
        const data = await response.json();
        const detectedEmotion = getEmoji(data.emotion);

        setEmotion(detectedEmotion);
        setEmotionHistory((prev) => [detectedEmotion, ...prev.slice(0, 4)]);
      } catch (error) {
        console.error("Error fetching emotion:", error);
      }
    };

    if (isStreaming) {
      fetchEmotion();
      const interval = setInterval(fetchEmotion, 4000);
      return () => clearInterval(interval);
    }
  }, [isStreaming]);

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

  const toggleVideo = async () => {
    if (!isStreaming) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("Failed to access camera:", err);
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
    setIsStreaming(!isStreaming);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
        <h1 className={title()}>Emotion Recognition (No Jetson)</h1>
        <p className={subtitle({ class: "mt-2" })}>Live AI-based emotion recognition using facial analysis.</p>

        <Card className="p-6 w-full max-w-lg text-center">
          <h2 className="text-xl font-semibold">Detected Emotion</h2>
          <p className="text-2xl mt-2">{emotion}</p>
          <Button color="primary" className="mt-4" onClick={toggleVideo}>
            {isStreaming ? "Stop Video" : "Start Video"}
          </Button>
        </Card>

        <h3 className="text-lg font-semibold mt-6">Emotion History</h3>
        <div className="flex flex-wrap gap-3">
          {emotionHistory.map((e, idx) => (
            <Card key={idx} className="px-4 py-2">{e}</Card>
          ))}
        </div>

        <div className="mt-8 w-full flex justify-center">
          <video ref={videoRef} autoPlay muted className="w-full max-w-lg rounded-lg shadow-lg" />
        </div>
      </section>
    </DefaultLayout>
  );
}
