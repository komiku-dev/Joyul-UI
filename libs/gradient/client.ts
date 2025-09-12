// ========= CLIENT-SIDE IMPORTS =========

import { generateGradientPixelData } from "./core";

// ========= TYPE DEFINITIONS =========

/**
 * Configuration options for drawing the gradient on a canvas.
 */
export interface DrawGradientOptions {
  /** An array of hex color strings (e.g., '#ff0000') that will define the gradient. */
  colors: string[];
  /**
   * How much to randomize the point positions. 0 is a perfect grid, 1 is max chaos.
   * @default 0.5
   */
  randomness?: number;
  /**
   * The power exponent for the distance weighting. Higher values create sharper, more defined color zones.
   * @default 2
   */
  power?: number;
  /** The radius for the corners of the canvas. If 0 or undefined, the canvas will be a rectangle. */
  cornerRadius?: number;
  /**
   * Adds a noise texture.
   * - `true` enables noise with a default intensity.
   * - A `number` specifies the intensity.
   */
  noise?: boolean | number;
}

// ========= CLIENT-SIDE FUNCTION =========

/**
 * Generates and draws a mesh gradient onto a provided HTMLCanvasElement.
 * This function is for CLIENT-SIDE USE ONLY.
 * @param canvas The HTMLCanvasElement to draw the gradient on.
 * @param options The configuration options for the gradient.
 */
export function drawGradient(
  canvas: HTMLCanvasElement,
  options: DrawGradientOptions
): void {
  if (!canvas) {
    console.error("Canvas element not provided.");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Could not get 2D rendering context from canvas.");
    return;
  }

  const { width, height } = canvas;
  if (width === 0 || height === 0) {
    console.warn("Canvas dimensions are 0. Gradient will not be drawn.");
    return;
  }

  const pixelData = generateGradientPixelData({
    width,
    height,
    colors: options.colors,
    randomness: options.randomness,
    power: options.power,
    cornerRadius: options.cornerRadius,
    noise: options.noise,
  });

  const imageData = ctx.createImageData(width, height);
  imageData.data.set(pixelData);
  ctx.clearRect(0, 0, width, height);
  ctx.putImageData(imageData, 0, 0);
}
