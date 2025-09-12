import { NextRequest, NextResponse } from 'next/server';
import { generateGradientImage, GenerateImageOptions } from '@/libs/gradient/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const colorsQuery = searchParams.get('colors');
    if (!colorsQuery) {
      return new NextResponse(
        "The 'colors' parameter is required. Example: ?colors=e0c3fc,8ec5fc", 
        { status: 400 }
      );
    }
    const colors = colorsQuery.split(',').filter(c => c.length > 0).map(c => `#${c}`);
    if (colors.length === 0) {
       return new NextResponse("The 'colors' parameter cannot be empty.", { status: 400 });
    }

    const options: GenerateImageOptions = {
      width: 1200,
      height: 1200,
      colors,
      randomness: 0.5,
      power: 3,
      format: 'png',
      quality: 80,
      noise: false,
      cornerRadius: 0,
    };
    const MAX_DIMENSION = 2048;

    const sizeQuery = searchParams.get('size');
    if (sizeQuery) {
      const dimensions = sizeQuery.split('x');
      if (dimensions.length !== 2) {
        return new NextResponse("Malformed 'size' parameter. Use the format <width>x<height>.", { status: 400 });
      }
      const parsedWidth = parseInt(dimensions[0], 10);
      const parsedHeight = parseInt(dimensions[1], 10);

      if (isNaN(parsedWidth) || isNaN(parsedHeight) || parsedWidth <= 0 || parsedHeight <= 0) {
        return new NextResponse("Invalid width or height in 'size' parameter.", { status: 400 });
      }
      
      options.width = Math.min(MAX_DIMENSION, parsedWidth);
      options.height = Math.min(MAX_DIMENSION, parsedHeight);
    }
    
    const cornerRadiusQuery = searchParams.get('cornerRadius');
    if (cornerRadiusQuery) {
      const radius = parseInt(cornerRadiusQuery, 10);
      if (!isNaN(radius) && radius >= 0) {
        options.cornerRadius = radius;
      }
    }
    
    const randomnessQuery = searchParams.get('randomness');
    if (randomnessQuery) options.randomness = Math.max(0, Math.min(1, parseFloat(randomnessQuery)));
    
    const powerQuery = searchParams.get('power');
    if (powerQuery) options.power = Math.max(0.5, Math.min(10, parseFloat(powerQuery)));

    const noiseQuery = searchParams.get('noise');
    if (noiseQuery) {
      if (noiseQuery.toLowerCase() === 'true') {
        options.noise = true;
      } else {
        const noiseIntensity = parseInt(noiseQuery, 10);
        if (!isNaN(noiseIntensity)) {
          options.noise = Math.max(0, Math.min(255, noiseIntensity));
        }
      }
    }

    const formatQuery = searchParams.get('format');
    if (formatQuery === 'webp' || formatQuery === 'jpeg') {
      options.format = formatQuery;
    }

    const qualityQuery = searchParams.get('quality');
    if (qualityQuery) options.quality = Math.max(1, Math.min(100, parseInt(qualityQuery, 10)));

    const { buffer, contentType } = await generateGradientImage(options);
    
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store',
      },
    });

  } catch (error: unknown) {
    console.error('Failed to generate gradient image:', error);
    if (error instanceof Error) {
        return new NextResponse(`Failed to generate image: ${error.message}`, { status: 500 });
    }
    return new NextResponse('An unknown error occurred while generating the image.', { status: 500 });
  }
}