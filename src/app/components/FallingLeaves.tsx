'use client';

import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const FallingLeaves = () => {
  const { width, height } = useWindowSize();

  const confettiProps = {
    recycle: true,
    numberOfPieces: 50,
    wind: 0.05,
    gravity: 0.1,
    initialVelocityY: { min: 2, max: 5 },
    colors: ["#8B4513", "#CD853F", "#A0522D"],
    run: true,
    width,
    height,
    confettiSource: {
      w: width,
      h: 0,
      x: 0,
      y: -100,
    },
    shapes: ["circle", "square", "rectangle"],
  };

  return <Confetti {...confettiProps} />;
};

export default FallingLeaves;