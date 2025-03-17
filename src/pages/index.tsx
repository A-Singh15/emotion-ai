import { useEffect, useRef } from "react";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

// ✅ Declare the Web Component for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { url: string };
    }
  }
}

export default function IndexPage() {
  const splineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Dynamically load Spline Viewer script
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.79/build/spline-viewer.js";
    document.body.appendChild(script);
  }, []);

  return (
    <DefaultLayout>
      {/* Background Spline Viewer */}
      <div ref={splineRef} className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <spline-viewer url="https://prod.spline.design/6FvHj30hveMkrNtg/scene.splinecode" />
      </div>

      {/* Overlay Content */}
      <section className="relative flex flex-col items-center justify-center gap-4 py-8 md:py-10 text-white">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Welcome to&nbsp;</span>
          <span className={title({ color: "violet" })}>Audio-Visual&nbsp;</span>
          <br />
          <span className={title()}>Emotion Recognition System</span>
          <div className={subtitle({ class: "mt-4" })}>
            Experience real-time emotion recognition using cutting-edge AI technology.
          </div>
        </div>

        <div className="flex gap-3">
          <Link className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })} href="/jetson">
            With Jetson AI
          </Link>
          <Link className={buttonStyles({ color: "secondary", radius: "full", variant: "shadow" })} href="/without-jetson">
            Without Jetson AI
          </Link>
          <Link className={buttonStyles({ color: "warning", variant: "shadow", radius: "full" })} href="/realtimedetect">
            Real-Time Detection
          </Link>
          <Link className={buttonStyles({ color: "success", radius: "full", variant: "shadow" })} href="/attention">
            Attention Span
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
}
