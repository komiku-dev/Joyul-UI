// ========= TYPE DEFINITIONS =========

/**
 * Options for generating the gradient pixel data.
 */
export interface GradientOptions {
  /** The width of the output image in pixels. */
  width: number;
  /** The height of the output image in pixels. */
  height: number;
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
  /** The radius for the corners of the final image. If 0 or undefined, the image will be a rectangle. */
  cornerRadius?: number;
  /**
   * Adds a noise texture.
   * - `true` enables noise with a default intensity.
   * - A `number` (e.g., 20) specifies the intensity.
   * @default false
   */
  noise?: boolean | number;
}

/**
 * Internal representation of a single color point on the canvas.
 */
export type ColorPoint = {
  x: number;
  y: number;
  color: [number, number, number];
};

// ========= PRIVATE HELPERS =========

/**
 * Creates a well-distributed set of points based on the number of colors provided.
 * @internal
 */
function createPoints(colors: string[], randomness: number): ColorPoint[] {
  const numPoints = colors.length;
  if (numPoints === 0) throw new Error("Color array cannot be empty.");
  const parsedColors = colors.map(hexToRgb);
  const points: ColorPoint[] = [];
  const cols = Math.ceil(Math.sqrt(numPoints));
  const rows = Math.ceil(numPoints / cols);
  const cellWidth = 1 / cols;
  const cellHeight = 1 / rows;
  for (let i = 0; i < numPoints; i++) {
    const color = parsedColors[i];
    const gridX = i % cols;
    const gridY = Math.floor(i / cols);
    const baseX = cellWidth * (gridX + 0.5);
    const baseY = cellHeight * (gridY + 0.5);
    const randomX = (Math.random() - 0.5) * 2 * cellWidth * randomness;
    const randomY = (Math.random() - 0.5) * 2 * cellHeight * randomness;
    points.push({
      x: Math.max(0, Math.min(1, baseX + randomX)),
      y: Math.max(0, Math.min(1, baseY + randomY)),
      color: color,
    });
  }
  return points;
}

// ========= PUBLIC UTILITIES =========

/**
 * Parses a hex color string (e.g., '#RRGGBB' or '#RGB') into an [r, g, b] array.
 * @param hex The hex color string to parse.
 * @returns An array of three numbers representing the RGB values [0-255].
 */
export function hexToRgb(hex: string): [number, number, number] {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  return [r, g, b];
}

// ========= MAIN UNIVERSAL FUNCTION =========

/**
 * Generates the raw pixel data for a mesh gradient.
 * This function is universal (isomorphic) and can run on the server or in the browser.
 * @param options The gradient configuration options.
 * @returns A Uint8ClampedArray of raw pixel data in the format [R,G,B,A, R,G,B,A, ...].
 */
export function generateGradientPixelData({
  width,
  height,
  colors,
  randomness = 0.5,
  power = 2,
  cornerRadius = 0,
  noise = false,
}: GradientOptions): Uint8ClampedArray {
  const points = createPoints(colors, randomness);
  const pixelData = new Uint8ClampedArray(width * height * 4);
  const r = cornerRadius;

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      let totalWeight = 0,
        R = 0,
        G = 0,
        B = 0;

      for (const point of points) {
        const pointX = point.x * (width - 1);
        const pointY = point.y * (height - 1);
        const distance = Math.sqrt(
          Math.pow(px - pointX, 2) + Math.pow(py - pointY, 2)
        );
        if (distance === 0) {
          R = point.color[0];
          G = point.color[1];
          B = point.color[2];
          totalWeight = 1;
          break;
        }
        const weight = 1 / Math.pow(distance, power);
        R += point.color[0] * weight;
        G += point.color[1] * weight;
        B += point.color[2] * weight;
        totalWeight += weight;
      }

      if (totalWeight > 0) {
        R /= totalWeight;
        G /= totalWeight;
        B /= totalWeight;
      }

      if (noise) {
        const intensity = typeof noise === "number" ? noise : 15; // Default intensity of 15
        const noiseValue = (Math.random() - 0.5) * 2 * intensity;
        R = Math.max(0, Math.min(255, R + noiseValue));
        G = Math.max(0, Math.min(255, G + noiseValue));
        B = Math.max(0, Math.min(255, B + noiseValue));
      }

      let alpha = 255;
      if (r > 0) {
        if (
          px < r &&
          py < r &&
          Math.sqrt(Math.pow(px - r, 2) + Math.pow(py - r, 2)) > r
        )
          alpha = 0;
        else if (
          px > width - r &&
          py < r &&
          Math.sqrt(Math.pow(px - (width - r), 2) + Math.pow(py - r, 2)) > r
        )
          alpha = 0;
        else if (
          px < r &&
          py > height - r &&
          Math.sqrt(Math.pow(px - r, 2) + Math.pow(py - (height - r), 2)) > r
        )
          alpha = 0;
        else if (
          px > width - r &&
          py > height - r &&
          Math.sqrt(
            Math.pow(px - (width - r), 2) + Math.pow(py - (height - r), 2)
          ) > r
        )
          alpha = 0;
      }

      const index = (py * width + px) * 4;
      pixelData[index] = R;
      pixelData[index + 1] = G;
      pixelData[index + 2] = B;
      pixelData[index + 3] = alpha;
    }
  }
  return pixelData;
}
