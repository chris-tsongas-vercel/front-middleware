import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const invalidImageResponse = new NextResponse(null, {
  status: 400,
  statusText: 'Invalid image URL',
})

export function middleware(request: NextRequest) {
  console.log('request.nextUrl.pathname', request.nextUrl.pathname)

  if (request.nextUrl.pathname == '/_next/image') {
    // If the request includes a query parameter other than the three allowed, throw an error
    if (
      Array.from(request.nextUrl.searchParams.keys()).some(
        (key) => !['url', 'w', 'q'].includes(key)
      )
    ) {
      return invalidImageResponse
    }

    // The source image URL is contained in the `url` query parameter
    const ogImageUrl = request.nextUrl.searchParams.get('url')
    const imageWidth = request.nextUrl.searchParams.get('w')
    const imageQuality = request.nextUrl.searchParams.get('q')

    if (!ogImageUrl || !imageWidth || !imageQuality) {
      // Pass the request along and let the native validation throw an error
      return NextResponse.next()
    }

    try {
      // Clone the image URL to be sanitized
      const imageUrl = new URL(ogImageUrl, request.url)

      // If the requested image URL includes any query parameters or hashes, throw an error
      if (imageUrl.search || imageUrl.hash) {
        return invalidImageResponse
      }
    } catch {
      // If the URL was invalid and `new URL` threw, just throw an error response
      return invalidImageResponse
    }
  }
}
