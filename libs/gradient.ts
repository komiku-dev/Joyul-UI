// lib/gradient.ts
//
// This utility generates a single, smooth, high-quality mesh gradient.
// The main entry point is the `generateMeshGradient` function.

// ========= TYPE DEFINITIONS =========

/**
 * The public interface for creating a mesh gradient.
 * These are the options you pass to the main function.
 */
export interface GenerateMeshGradientOptions {
  /** The width of the output image in pixels. */
  width: number;
  /** The height of the output image in pixels. */
  height: number;
  /** An array of hex color strings (e.g., '#ff0000') that will define the gradient. */
  colors: string[];
  /**
   * How much to randomize the point positions. 0 is a perfect grid, 1 is max chaos.
   * A value around 0.5 is a good starting point.
   * @default 0.5
   */
  randomness?: number;
  /**
   * The power exponent for the distance weighting. Higher values create sharper, more defined color zones.
   * @default 2
   */
  power?: number;
}

/**
 * Internal representation of a single color point on the canvas.
 */
type ColorPoint = {
  x: number; // Position from 0-1
  y: number; // Position from 0-1
  color: [number, number, number]; // RGB color
};


// ========= PRIVATE HELPERS =========

/**
 * Creates a well-distributed set of points based on the number of colors provided.
 * @internal
 */
function createPoints(colors: string[], randomness: number): ColorPoint[] {
  const numPoints = colors.length;
  if (numPoints === 0) {
    throw new Error('Color array cannot be empty.');
  }

  const parsedColors = colors.map(hexToRgb);
  const points: ColorPoint[] = [];

  const cols = Math.ceil(Math.sqrt(numPoints));
  const rows = Math.ceil(numPoints / cols);

  // The size of each conceptual grid cell
  const cellWidth = 1 / cols;
  const cellHeight = 1 / rows;

  for (let i = 0; i < numPoints; i++) {
    const color = parsedColors[i];
    const gridX = i % cols;
    const gridY = Math.floor(i / cols);

    // FIX 1: The base position is now the CENTER of the cell, which is much more stable.
    const baseX = cellWidth * (gridX + 0.5);
    const baseY = cellHeight * (gridY + 0.5);

    // FIX 2: The random offset is now correctly scaled to the cell size and randomness factor.
    // The `(Math.random() - 0.5) * 2` creates a range from -1 to 1.
    const randomX = (Math.random() - 0.5) * 2 * cellWidth * randomness;
    const randomY = (Math.random() - 0.5) * 2 * cellHeight * randomness;

    const finalX = baseX + randomX;
    const finalY = baseY + randomY;

    points.push({
      x: Math.max(0, Math.min(1, finalX)),
      y: Math.max(0, Math.min(1, finalY)),
      color: color,
    });
  }

  return points;
}

/**
 * Renders the final pixel buffer using an Inverse Distance Weighting algorithm.
 * @internal
 */
function renderSmoothGradient(
  width: number,
  height: number,
  points: ColorPoint[],
  power: number
): Uint8ClampedArray {
  const pixelData = new Uint8ClampedArray(width * height * 4);

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      let totalWeight = 0;
      let r = 0, g = 0, b = 0;

      for (const point of points) {
        const pointX = point.x * (width - 1);
        const pointY = point.y * (height - 1);
        const distance = Math.sqrt(Math.pow(px - pointX, 2) + Math.pow(py - pointY, 2));

        if (distance === 0) {
          r = point.color[0]; g = point.color[1]; b = point.color[2];
          totalWeight = 1;
          break;
        }
        
        const weight = 1 / Math.pow(distance, power);
        
        r += point.color[0] * weight;
        g += point.color[1] * weight;
        b += point.color[2] * weight;
        totalWeight += weight;
      }

      if (totalWeight > 0) {
        r /= totalWeight; g /= totalWeight; b /= totalWeight;
      }
      
      const index = (py * width + px) * 4;
      pixelData[index] = r;
      pixelData[index + 1] = g;
      pixelData[index + 2] = b;
      pixelData[index + 3] = 255;
    }
  }

  return pixelData;
}


// ========= PUBLIC UTILITIES =========

/**
 * Parses a hex color string (#RRGGBB or #RGB) into an [r, g, b] array.
 */
export function hexToRgb(hex: string): [number, number, number] {
  let r = 0, g = 0, b = 0;
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


// ========= MAIN FUNCTION =========

/**
 * Generates a mesh gradient from a set of colors.
 * This is the primary function to be used to create a gradient.
 * @returns A Uint8ClampedArray containing the raw pixel data for the image.
 */
export function generateMeshGradient({
  width,
  height,
  colors,
  randomness = 0.5,
  power = 2,
}: GenerateMeshGradientOptions): Uint8ClampedArray {
  const points = createPoints(colors, randomness);
  const pixelData = renderSmoothGradient(width, height, points, power);
  return pixelData;
}