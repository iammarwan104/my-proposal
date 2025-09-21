"use client";

import { useState, useEffect } from "react";

export default function GeneratePage() {
  const [name, setName] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (name) {
      setGeneratedUrl(`${origin}?name${encodeURIComponent(name)}`);
    } else {
      setGeneratedUrl("");
    }
  }, [name, origin]);

  const handleCopyToClipboard = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl).then(
        () => {
          alert("URL disalin ke clipboard!");
        },
        (err) => {
          console.error("Tidak dapat menyalin teks: ", err);
          alert("Gagal menyalin URL.");
        }
      );
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Buat Tautan Anda
        </h1>
        <p className="text-gray-600 mb-8">
          Masukkan nama orang yang Anda tuju untuk membuat tautan pribadi.
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama..."
          className="w-full p-3 mb-4 text-lg text-gray-700 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />
        {generatedUrl && (
          <div className="w-full p-3 mb-4 text-lg bg-gray-50 border border-gray-200 rounded-lg overflow-x-auto">
            <a
              href={generatedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {generatedUrl}
            </a>
          </div>
        )}
        <button
          onClick={handleCopyToClipboard}
          disabled={!generatedUrl}
          className="w-full bg-pink-500 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-pink-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Salin Tautan
        </button>
      </div>
    </div>
  );
}
