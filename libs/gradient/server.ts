"use server";

// ========= SERVER-SIDE IMPORTS =========

import sharp from "sharp";
import { generateGradientPixelData, GradientOptions } from "./core";

// ========= TYPE DEFINITIONS =========

/**
 * Extends the core GradientOptions to include server-side image encoding options.
 */
export interface GenerateImageOptions extends GradientOptions {
  /**
   * The desired output format for the image.
   * Note: 'jpeg' does not support transparency; rounded corners will have a black background.
   * @default 'png'
   */
  format?: "png" | "webp" | "jpeg";
  /**
   * The quality setting for lossy formats like 'webp' and 'jpeg'.
   * An integer between 1 and 100.
   * @default 80
   */
  quality?: number;
}

// ========= SERVER-SIDE FUNCTION =========

/**
 * Generates a mesh gradient and encodes it into the specified image format using 'sharp'.
 * This is a server-side only function.
 *
 * @param options The configuration for the gradient and the output image.
 * @returns A Promise that resolves to an object containing the image buffer and its corresponding MIME type.
 */
export async function generateGradientImage(
  options: GenerateImageOptions
): Promise<{ buffer: Buffer; contentType: string }> {
  // Step 1: Generate the raw pixel data using the universal core library.
  const pixelData = generateGradientPixelData(options);

  // Step 2: Initialize the 'sharp' instance with the raw pixel data.
  let sharpInstance = sharp(Buffer.from(pixelData), {
    raw: {
      width: options.width,
      height: options.height,
      channels: 4, // We always generate RGBA data.
    },
  });

  // Step 3: Apply the correct format and determine the content type.
  let contentType = "image/png";
  const quality = options.quality ?? 80;

  switch (options.format) {
    case "webp":
      sharpInstance = sharpInstance.webp({ quality });
      contentType = "image/webp";
      break;
    case "jpeg":
      // JPEG needs a background if the source is transparent. We'll flatten it.
      sharpInstance = sharpInstance.flatten().jpeg({ quality });
      contentType = "image/jpeg";
      break;
    case "png":
    default:
      sharpInstance = sharpInstance.png();
      contentType = "image/png";
      break;
  }

  // Step 4: Await the final buffer generation.
  const buffer = await sharpInstance.toBuffer();

  // Step 5: Return the buffer and its MIME type for use in the API response.
  return { buffer, contentType };
}
