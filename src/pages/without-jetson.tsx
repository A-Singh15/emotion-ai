import { useEffect, useRef, useState } from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { FaceMesh } from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";

export default function RealtimeEmotion() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(true);
  const [emotion, setEmotion] = useState("Neutral 🙂");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    if (isStreaming) {
      startWebcam();
    } else {
      stopWebcam();
    }
  }, [isStreaming]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const faceMesh = new FaceMesh({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });

      faceMesh.onResults((results) => detectEmotion(results));

      if (videoRef.current && videoRef.current instanceof HTMLVideoElement) {
        const camera = new cam.Camera(videoRef.current, {
          onFrame: async () => {
            await faceMesh.send({ image: videoRef.current });
          },
          width: 720,
          height: 560,
        });
        camera.start();
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const detectEmotion = (results: any) => {
    if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0)
      return;

    const landmarks = results.multiFaceLandmarks[0];

    // **Get Key Facial Landmarks**
    const leftEyebrow = landmarks[70].y;
    const rightEyebrow = landmarks[300].y;
    const mouthOpen = landmarks[13].y - landmarks[14].y;
    const leftEye = landmarks[159].y - landmarks[145].y;
    const rightEye = landmarks[386].y - landmarks[374].y;
    const mouthWidth = landmarks[61].x - landmarks[291].x;
    const mouthHeight = landmarks[13].y - landmarks[14].y;

    let detectedEmotion = "Neutral 🙂";

    // **Emotion Detection Rules**
    if (mouthOpen > 0.04 && mouthWidth > 0.08) {
      detectedEmotion = "Surprised 😲";
    } else if (leftEyebrow < 0.38 && rightEyebrow < 0.38) {
      detectedEmotion = "Angry 😡";
    } else if (leftEye > 0.02 && rightEye > 0.02 && mouthHeight > 0.02) {
      detectedEmotion = "Happy 😃";
    } else if (mouthOpen > 0.02 && leftEyebrow > 0.42 && rightEyebrow > 0.42) {
      detectedEmotion = "Sad 😢";
    }

    setEmotion(detectedEmotion);
    setHistory((prev) => [detectedEmotion, ...prev.slice(0, 4)]);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
        <h1 className={title()}>Live Emotion Detection</h1>
        <p className={subtitle({ class: "mt-2" })}>
          AI-powered real-time emotion recognition using facial analysis.
        </p>

        {/* Video Box - Enlarged & Clean UI */}
        <Card className="p-4 rounded-lg shadow-lg border border-gray-500 w-full max-w-4xl">
          <h2 className="text-xl font-semibold text-center">Live Webcam Feed</h2>
          <div className="relative flex justify-center items-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="border rounded-lg shadow-md w-full max-w-2xl"
            />
          </div>
          <Button
            color="primary"
            className="mt-4"
            onClick={() => setIsStreaming(!isStreaming)}
          >
            {isStreaming ? "Stop Video" : "Start Video"}
          </Button>
        </Card>

        {/* Emotion Updates - Displayed Below Video */}
        <Card className="p-6 w-full max-w-lg text-center shadow-lg">
          <h2 className="text-xl font-semibold">Detected Emotion</h2>
          <p className="text-2xl mt-2">{emotion}</p>
        </Card>

        {/* Emotion History */}
        <h3 className="text-lg font-semibold mt-6">Emotion History</h3>
        <div className="flex flex-wrap gap-3">
          {history.map((e, idx) => (
            <Card key={idx} className="px-4 py-2 shadow">{e}</Card>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
