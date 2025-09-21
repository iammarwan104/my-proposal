'use client';

import { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim'; // Menggunakan loadSlim untuk mengurangi ukuran bundle
import type { Engine, IOptions, RecursivePartial } from '@tsparticles/engine';

const LeafParticles = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // Memuat mesin partikel
    await loadSlim(engine);
  }, []);

  const options: RecursivePartial<IOptions> = useMemo(() => ({
    particles: {
      number: {
        value: 30, // Jumlah daun
      },
      color: {
        value: ["#8b5e32", "#a0522d", "#b5651d", "#f08080"], // Warna-warna daun musim gugur
      },
      shape: {
        type: "circle", // Bentuk daun sederhana
      },
      opacity: {
        value: { min: 0.5, max: 0.8 },
        random: true,
      },
      size: {
        value: { min: 5, max: 15 }, // Ukuran daun
        random: true,
      },
      move: {
        direction: "bottom",
        enable: true,
        speed: { min: 0.5, max: 2 }, // Kecepatan jatuh
        straight: false,
        random: true,
        decay: 0.1, // Agar pergerakan lebih alami
        outModes: {
          default: "destroy",
        },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
      },
    },
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
  }), []);

  return <Particles id="leafs-particles" init={particlesInit} options={options} />;
};

export default LeafParticles;