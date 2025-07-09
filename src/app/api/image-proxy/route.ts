import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl || !imageUrl.startsWith('https://placehold.co/')) {
    return new NextResponse('A valid placehold.co URL parameter is required', {
      status: 400,
    });
  }

  try {
    // Fetch the image from the original source
    const response = await fetch(imageUrl);

    // Check if the request was successful
    if (!response.ok) {
      return new NextResponse(response.statusText, {status: response.status});
    }

    // Get the image data as a blob
    const blob = await response.blob();

    // Return the image data with the correct content type
    const headers = new Headers();
    headers.set(
      'Content-Type',
      response.headers.get('Content-Type') || 'image/png'
    );

    return new NextResponse(blob, {status: 200, statusText: 'OK', headers});
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}
