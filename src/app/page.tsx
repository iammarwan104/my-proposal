"use client";

import { useState } from "react";
import Snowfall from "react-snowfall";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const FallingLeaves = dynamic(() => import("./components/FallingLeaves"), {
  ssr: false,
});

export default function HomePage() {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showTema, setShowTema] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const [touchCount, setTouchCount] = useState(0);
  const [finalMessage, setFinalMessage] = useState(""); // State baru untuk pesan akhir

  // Mengambil nama dari query parameter URL
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "seseorang";

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

    setShowTema(true)
    setFinalMessage(`Ok ${name} Sayang Love You`); // Mengatur pesan akhir
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      {showTema ? (
        <Snowfall
          color="white"
          snowflakeCount={150}
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: 0,
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
            zIndex: -1,
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
              {`Halo ${name},`}
              <br />
              {showQuestion
                ? "Apakah kamu mau menjadi pacar saya?"
                : "Ada yang mau saya tanyakan..."}
            </>
          )}
        </h1>
        {finalMessage ? null : !showQuestion ? (
          <button
            onClick={() => setShowQuestion(true)}
            className="bg-green-500 text-white font-bold py-3 px-6 rounded-full text-lg animate-pulse hover:bg-green-600 transition-colors">
            {isMoved ? "Ya, saya siap!" : "Klik ini kalau berani!"}
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
        {touchCount > 3 && (
          <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            Tombol ini butuh liburan.
          </div>
        )}
      </div>
    </div>
  );
}