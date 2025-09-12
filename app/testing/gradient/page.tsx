"use client";

import {
  useControlState,
  Controls,
  ControlsSlider,
  ControlsColorArray,
  ControlsConditional,
  ControlsToggle,
  ControlsButton,
} from "@/components/controls/index";
import { drawGradient } from "@/libs/gradient/client";
import * as React from "react";
import { useRef, useEffect, useState } from "react";

export default function GradientExample() {
  const { controlsState } = useControlState();

  const [isLoading, setIsLoading] = useState(true);
  const [regenerateTrigger, setRegenerateTrigger] = useState(0);

  const colors = controlsState["gradient-colors"];
  const randomness = controlsState["gradient-randomness"];
  const power = controlsState["gradient-power"];
  const showNoise = controlsState["gradient-noise-boolean"];
  const noise = controlsState["gradient-noise-value"];

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleRegenerate = () => {
    setRegenerateTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    if (!colors || colors.length === 0) {
      return;
    }

    setIsLoading(true);

    const timerId = setTimeout(() => {
      if (canvasRef.current) {
        const gradientOptions = {
          colors,
          randomness,
          power,
          ...(showNoise && { noise }),
        };

        drawGradient(canvasRef.current, gradientOptions);

        setIsLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [colors, randomness, power, showNoise, noise, regenerateTrigger]);

  return (
    <>
      <Controls title="Gradient Controls">
        <ControlsColorArray
          title="Colors"
          id={"gradient-colors"}
          initialValue={["#6dd5ed", "#2193b0", "#f8ffae", "#fff700"]}
        />
        <ControlsSlider
          title="Randomness"
          id={"gradient-randomness"}
          initialValue={0.6}
          step={0.01}
          min={0}
          max={1}
        />
        <ControlsSlider
          title="Power"
          id={"gradient-power"}
          initialValue={3}
          step={0.01}
          min={0}
          max={10}
        />
        <ControlsToggle
          title="Show Noise"
          id={"gradient-noise-boolean"}
          initialValue={false}
        />
        <ControlsConditional when="gradient-noise-boolean" is={true}>
          <ControlsSlider
            title="Noise"
            id={"gradient-noise-value"}
            initialValue={15}
            step={0.1}
            min={0}
            max={50}
          />
        </ControlsConditional>

        <ControlsButton title="Regenerate" onClick={handleRegenerate} />
      </Controls>

      <div className="relative w-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          height={600}
          width={900}
        />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
            <div className="text-white text-xl font-semibold animate-pulse">
              Generating...
            </div>
          </div>
        )}
      </div>
    </>
  );
}
