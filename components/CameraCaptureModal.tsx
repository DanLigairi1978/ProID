
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CameraIcon } from './icons/CameraIcon';

interface CameraCaptureModalProps {
  onCapture: (imageDataUrl: string) => void;
  onClose: () => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let activeStream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        activeStream = mediaStream;
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        alert("Could not access the camera. Please check permissions.");
        onClose();
      }
    };

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        onCapture(dataUrl);
      }
    }
  }, [onCapture]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-4 rounded-lg shadow-xl relative max-w-lg w-full">
        <video ref={videoRef} autoPlay playsInline className="w-full h-auto rounded-md" />
        <canvas ref={canvasRef} className="hidden" />
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={handleCapture}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 transition-transform transform hover:scale-110"
          >
            <CameraIcon className="w-8 h-8" />
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 font-bold text-2xl flex items-center justify-center w-16 h-16 transition-transform transform hover:scale-110"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};
