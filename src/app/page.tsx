'use client';

import { useState } from 'react';

export default function Home() {
  const [showQuestion, setShowQuestion] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const [touchCount, setTouchCount] = useState(0);

  const moveButton = () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    setNoButtonPosition({ top: y, left: x });
    setIsMoved(true);
    setTouchCount(prev => prev + 1);
  };

  const showFinalMessage = () => {
    // Arahkan ke halaman "ya" atau tampilkan pesan
    // Untuk contoh ini, kita tampilkan pesan sederhana
    alert("Terima kasih, kamu sudah membuat saya menjadi orang paling bahagia di dunia!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-8">
        {showQuestion ? "Apakah kamu mau menjadi pacar saya?" : "Ada yang mau saya tanyakan..."}
      </h1>
      {!showQuestion ? (
        <button
          onClick={() => setShowQuestion(true)}
          className="bg-green-500 text-white font-bold py-3 px-6 rounded-full text-lg animate-bounce hover:bg-green-600 transition-colors"
        >
          {isMoved ? "Ya, saya siap!" : "Klik ini kalau berani!"}
        </button>
      ) : (
        <div className="flex space-x-4">
          <button
            onClick={showFinalMessage}
            className="bg-pink-500 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-pink-600 transition-colors"
          >
            Iya
          </button>
          <button
            onTouchStart={moveButton}
            onMouseEnter={moveButton}
            className="bg-gray-400 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300"
            style={{
              position: isMoved ? 'absolute' : 'relative',
              top: `${noButtonPosition.top}px`,
              left: `${noButtonPosition.left}px`,
            }}
          >
            Tidak
          </button>
        </div>
      )}

      {touchCount > 3 && (
        <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          Sepertinya Tombol "Tidak" butuh liburan.
        </div>
      )}
    </div>
  );
}