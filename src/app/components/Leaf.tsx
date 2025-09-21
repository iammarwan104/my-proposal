// src/app/components/Leaf.tsx
import React, { useEffect, useRef } from 'react';

interface LeafProps {
  initialLeft: number;
  duration: number;
  delay: number;
  size: number;
}

const Leaf: React.FC<LeafProps> = ({ initialLeft, duration, delay, size }) => {
  const leafRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (leafRef.current) {
      leafRef.current.style.animationDuration = `${duration}s`;
      leafRef.current.style.animationDelay = `${delay}s`;
      leafRef.current.style.left = `${initialLeft}vw`; // Menggunakan vw untuk responsif
      leafRef.current.style.width = `${size}px`;
      leafRef.current.style.height = `${size * 0.7}px`; // Proporsi daun
      leafRef.current.style.opacity = `${0.5 + Math.random() * 0.5}`; // Opasitas acak
    }
  }, [duration, delay, initialLeft, size]);

  return (
    <div
      ref={leafRef}
      className="leaf-item absolute bg-green-500 rounded-full"
      style={{
        // Ini adalah fallback styles, yang utama diatur via useEffect
        // Bentuk daun bisa lebih kompleks dengan pseudo-elements atau SVG
        width: `${size}px`,
        height: `${size * 0.7}px`,
        filter: 'blur(0.5px)', // Sedikit blur agar lebih alami
      }}
    ></div>
  );
};

export default Leaf;