import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ width: string; height: string }> }
) {
  try {
    const { width, height } = await params;
    const widthNum = parseInt(width) || 512;
    const heightNum = parseInt(height) || 512;
    
    // Get description from query parameter
    const url = new URL(request.url);
    const desc = url.searchParams.get('desc') || 'Storyboard Frame';
    
    // Create a more professional SVG placeholder
    const svg = `
      <svg width="${widthNum}" height="${heightNum}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="border" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0ea5e9;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="100%" height="100%" fill="url(#bg)"/>
        
        <!-- Border -->
        <rect x="2" y="2" width="${widthNum-4}" height="${heightNum-4}" fill="none" stroke="url(#border)" stroke-width="3" rx="8"/>
        
        <!-- Camera icon -->
        <g transform="translate(${widthNum/2-30}, ${heightNum/2-60})">
          <rect x="0" y="0" width="60" height="40" fill="none" stroke="#0ea5e9" stroke-width="2" rx="4"/>
          <circle cx="30" cy="20" r="12" fill="none" stroke="#0ea5e9" stroke-width="2"/>
          <circle cx="30" cy="20" r="6" fill="#0ea5e9"/>
          <rect x="45" y="8" width="8" height="24" fill="none" stroke="#0ea5e9" stroke-width="2" rx="2"/>
        </g>
        
        <!-- Title -->
        <text x="${widthNum/2}" y="${heightNum/2-10}" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="18" font-weight="bold">
          Storyboard Frame
        </text>
        
        <!-- AI Generated Image Label -->
        <text x="${widthNum/2}" y="${heightNum/2-20}" text-anchor="middle" fill="#374151" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
          AI Generated Image
        </text>
        
        <!-- Powered by Stable Diffusion -->
        <text x="${widthNum/2}" y="${heightNum/2+5}" text-anchor="middle" fill="#6B7280" font-family="Arial, sans-serif" font-size="12">
          Powered by Stable Diffusion
        </text>
        
        <!-- Description preview (truncated) -->
        <text x="${widthNum/2}" y="${heightNum/2+30}" text-anchor="middle" fill="#9CA3AF" font-family="Arial, sans-serif" font-size="10">
          ${desc ? (desc.length > 40 ? desc.substring(0, 40) + '...' : desc) : 'Professional commercial photography'}
        </text>
        
        <!-- Aspect ratio indicator -->
        <text x="${widthNum/2}" y="${heightNum-20}" text-anchor="middle" fill="#64748b" font-family="Arial, sans-serif" font-size="12">
          16:9 Aspect Ratio
        </text>
        
        <!-- Corner indicators -->
        <circle cx="20" cy="20" r="3" fill="#0ea5e9"/>
        <circle cx="${widthNum-20}" cy="20" r="3" fill="#0ea5e9"/>
        <circle cx="20" cy="${heightNum-20}" r="3" fill="#0ea5e9"/>
        <circle cx="${widthNum-20}" cy="${heightNum-20}" r="3" fill="#0ea5e9"/>
      </svg>
    `;

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating placeholder:', error);
    return new NextResponse('Error generating placeholder', { status: 500 });
  }
} 