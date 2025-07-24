// components/IncidentPlayer.tsx
import React, { useRef, useEffect, useState } from "react";

interface IncidentPlayerProps {
  onCapture: (img: string) => void;
}

const IncidentPlayer: React.FC<IncidentPlayerProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturing, setCapturing] = useState(true);

  // Start webcam function
  const handleStartWebcam = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((s) => {
        setStream(s);
        setCapturing(true);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      })
      .catch((err) => {
        console.error("Webcam access denied:", err);
      });
  };

  useEffect(() => {
    // Cleanup: stop webcam when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream]);

  // Automatically capture image every 5 seconds, only if capturing is true
  useEffect(() => {
    if (!capturing) return;
    const interval = setInterval(() => {
      if (!videoRef.current) return;
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imgData = canvas.toDataURL("image/png");
        onCapture(imgData);
      }
    }, 5000); // 5000 ms = 5 seconds

    return () => clearInterval(interval);
  }, [onCapture, capturing]);

  const handleStopWebcam = () => {
    setCapturing(false); // Stop capturing incidents
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-gray-900 rounded-xl shadow-2xl w-full flex items-center justify-center mb-6" style={{ height: "320px" }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="h-64 w-auto rounded-lg border-4 border-gray-700 shadow-lg"
          style={{ maxHeight: "260px" }}
        />
      </div>
      <div className="flex gap-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          onClick={handleStartWebcam}
          disabled={!!stream && capturing}
        >
          Start Webcam
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700"
          onClick={handleStopWebcam}
          disabled={!stream || !capturing}
        >
          Stop Webcam
        </button>
      </div>
    </div>
  );
};

export default IncidentPlayer;
