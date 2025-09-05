import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(request, { params }) {
  try {
    // AWAIT the params object
    const { filename } = await params
    
    // Validate filename to prevent directory traversal
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return new NextResponse('Invalid filename', { status: 400 })
    }

    // Construct file path
    const filePath = join(process.cwd(), 'public', 'schoolImages', filename)
    
    // Read the file
    const imageBuffer = await readFile(filePath)
    
    // Determine content type based on file extension
    const extension = filename.split('.').pop().toLowerCase()
    let contentType = 'image/jpeg' // default
    
    switch (extension) {
      case 'png':
        contentType = 'image/png'
        break
      case 'webp':
        contentType = 'image/webp'
        break
      case 'gif':
        contentType = 'image/gif'
        break
      case 'jpg':
      case 'jpeg':
      default:
        contentType = 'image/jpeg'
        break
    }
    
    // Return the image with appropriate headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // 1 year cache
      }
    })
    
  } catch (error) {
    console.error('Error serving image:', error)
    
    if (error.code === 'ENOENT') {
      return new NextResponse('Image not found', { status: 404 })
    }
    
    return new NextResponse('Internal server error', { status: 500 })
  }
}