"use client";

import { BackgroundColor, StarsBackground } from "./SVGs/SVGs";

const Background = () => {
  return (
    <div className="relative w-screen">
      <span className="absolute w-full overflow-hidden">
        <BackgroundColor />
      </span>
      <span className="absolute w-full md:top-16 top-6 overflow-hidden">
        <StarsBackground />
      </span>
    </div>
  );
};

export default Background;
