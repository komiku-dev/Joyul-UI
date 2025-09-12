// lib/gradient.server.ts

import sharp from 'sharp';
import { generateGradientPixelData, GradientOptions } from './gradient.core';

/**
 * Generates a mesh gradient and encodes it into a PNG image buffer.
 * SERVER-SIDE ONLY.
 */
export async function generateGradientPng(options: GradientOptions): Promise<Buffer> {
  // 1. Generate the raw pixel data using the universal core library
  const pixelData = generateGradientPixelData(options);

  // 2. Use Sharp to encode the pixel data into a PNG
  const imageBuffer = await sharp(Buffer.from(pixelData), {
    raw: {
      width: options.width,
      height: options.height,
      channels: 4,
    },
  })
    .png()
    .toBuffer();

  return imageBuffer;
}