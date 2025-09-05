import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { executeQuery } from '@/lib/db'

// Configure the API route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export async function GET() {
  try {
    const schools = await executeQuery(
      'SELECT id, name, address, city, state, contact, image, email_id, created_at FROM schools ORDER BY created_at DESC'
    )
    
    return NextResponse.json(schools)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch schools' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const name = formData.get('name')
    const address = formData.get('address')
    const city = formData.get('city')
    const state = formData.get('state')
    const contact = formData.get('contact')
    const email_id = formData.get('email_id')
    const imageFile = formData.get('image')

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json(
        { error: 'All fields except image are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email_id)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate contact number
    const contactRegex = /^[0-9]{10,15}$/
    if (!contactRegex.test(contact)) {
      return NextResponse.json(
        { error: 'Invalid contact number' },
        { status: 400 }
      )
    }

    let imageName = null

    // Handle image upload if provided
    if (imageFile && imageFile.size > 0) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.' },
          { status: 400 }
        )
      }

      // Validate file size (5MB limit)
      if (imageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'File size too large. Maximum size is 5MB.' },
          { status: 400 }
        )
      }

      // Generate unique filename
      const timestamp = Date.now()
      const originalName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      imageName = `${timestamp}_${originalName}`

      // Create schoolImages directory if it doesn't exist
      const uploadDir = join(process.cwd(), 'public', 'schoolImages')
      try {
        await mkdir(uploadDir, { recursive: true })
      } catch (error) {
        if (error.code !== 'EEXIST') {
          throw error
        }
      }

      // Save the file
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filePath = join(uploadDir, imageName)
      await writeFile(filePath, buffer)
    }

    // Insert into database
    const result = await executeQuery(
      `INSERT INTO schools (name, address, city, state, contact, image, email_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, imageName, email_id]
    )

    return NextResponse.json(
      { 
        success: true, 
        message: 'School added successfully',
        id: result.insertId 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error adding school:', error)
    
    // Handle specific database errors
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'A school with this email already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}