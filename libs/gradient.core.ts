// lib/gradient.core.ts

// ========= TYPE DEFINITIONS =========

export interface GradientOptions {
  width: number;
  height: number;
  colors: string[];
  randomness?: number;
  power?: number;
}

export type ColorPoint = {
  x: number;
  y: number;
  color: [number, number, number];
};

// ========= PRIVATE HELPERS =========

function createPoints(colors: string[], randomness: number): ColorPoint[] {
    // ... This is the exact same createPoints function from before
    const numPoints = colors.length;
    if (numPoints === 0) throw new Error('Color array cannot be empty.');
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

export function hexToRgb(hex: string): [number, number, number] {
  // ... Same hexToRgb function as before
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16); g = parseInt(hex[2] + hex[2], 16); b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16); g = parseInt(hex.substring(3, 5), 16); b = parseInt(hex.substring(5, 7), 16);
  }
  return [r, g, b];
}

// ========= MAIN UNIVERSAL FUNCTION =========

/**
 * Generates the raw pixel data for a mesh gradient.
 * This function is ISOMORPHIC - it can run on the server and the client.
 * @returns A Uint8ClampedArray of raw pixel data [R,G,B,A, R,G,B,A, ...]
 */
export function generateGradientPixelData({
  width,
  height,
  colors,
  randomness = 0.5,
  power = 2,
}: GradientOptions): Uint8ClampedArray {
  const points = createPoints(colors, randomness);
  
  // The rendering logic is now inside this function.
  const pixelData = new Uint8ClampedArray(width * height * 4);
  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
        let totalWeight = 0, r = 0, g = 0, b = 0;
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
            r += point.color[0] * weight; g += point.color[1] * weight; b += point.color[2] * weight;
            totalWeight += weight;
        }
        if (totalWeight > 0) {
            r /= totalWeight; g /= totalWeight; b /= totalWeight;
        }
        const index = (py * width + px) * 4;
        pixelData[index] = r; pixelData[index + 1] = g; pixelData[index + 2] = b; pixelData[index + 3] = 255;
    }
  }
  return pixelData;
}