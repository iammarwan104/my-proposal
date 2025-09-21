"use client";

import { useState, useRef, useEffect } from "react";
import Snowfall from "react-snowfall";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const FallingLeaves = dynamic(() => import("./components/FallingLeaves"), {
  ssr: false,
});

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6">
    <path
      fillRule="evenodd"
      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z"
      clipRule="evenodd"
    />
  </svg>
);

const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6">
    <path
      fillRule="evenodd"
      d="M6.75 5.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75zm9 0a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);

export default function ProposalPage() {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showTema, setShowTema] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const [touchCount, setTouchCount] = useState(0);
  const [finalMessage, setFinalMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);

  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const togglePlayPause = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const moveButton = () => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 80;
    const x = Math.random() * (maxX > 0 ? maxX : window.innerWidth / 2);
    const y = Math.random() * (maxY > 0 ? maxY : window.innerHeight / 2);
    setNoButtonPosition({ top: y, left: x });
    setIsMoved(true);
    setTouchCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setShowTema(true);
    setFinalMessage(`Ok ${name} Sayang Love You`);
  };

  return (
    <div
      className="relative overflow-hidden min-h-screen text-white"
      style={{
        backgroundImage: "url(/sunset.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="absolute inset-0 w-full h-full bg-black/50 z-0" />
      <audio ref={audioRef} src="/akhirnya-naff.mp3" loop />
      {showTema ? (
        <Snowfall
          color="white"
          snowflakeCount={150}
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: 1, // Pastikan salju di atas overlay
            top: 0,
            left: 0,
          }}
        />
      ) : (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1, // Pastikan daun di atas overlay
          }}>
          <FallingLeaves />
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 className="text-4xl font-bold mb-8">
          {finalMessage ? (
            finalMessage
          ) : (
            <>
              
              {showQuestion
                ? "Maukigah jadi pacarku?"
                : (<>{name.length === 0 ? "" : `Halo ${name},`}
              <br />Ada yang mau ku tanyakan ki...</>)}
            </>
          )}
        </h1>
        {finalMessage ? null : !showQuestion ? (
          <button
            onClick={() => setShowQuestion(true)}
            className="bg-green-500 text-white font-bold py-3 px-6 rounded-full text-lg animate-pulse hover:bg-green-600 transition-colors">
            {isMoved ? "Ya, saya siap!" : "Iya, Apa?"}
          </button>
        ) : (
          <div className="flex space-x-4">
            <button
              onClick={handleYesClick}
              className="bg-pink-500 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-pink-600 transition-colors">
              Iya
            </button>
            <button
              onTouchStart={moveButton}
              onMouseEnter={moveButton}
              className="bg-gray-400 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300"
              style={{
                position: isMoved ? "absolute" : "relative",
                top: `${noButtonPosition.top}px`,
                left: `${noButtonPosition.left}px`,
              }}>
              Tidak
            </button>
          </div>
        )}
         {showTema
          ? ""
          : touchCount === 3 && (
              <div className="mt-8 p-4 bg-red-500/80 text-white rounded-lg">
                Tidak mau i diganggu tombol "Tidak", tombol "iya" na saja nah!
              </div>
            )}
            {showTema
          ? ""
          : touchCount > 3 && (
              <div className="mt-8 p-4 bg-red-500/80 text-white rounded-lg">
                Bilang mmg ka ta tdk mau i, tombol "iya" na saja nah!
              </div>
            )}
      </div>
      <button
        onClick={togglePlayPause}
        className="fixed bottom-5 right-5 bg-white/50 backdrop-blur-md text-gray-800 p-3 rounded-full shadow-lg hover:bg-white/70 transition-colors z-20"
        aria-label={isPlaying ? "Pause music" : "Play music"}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
}
