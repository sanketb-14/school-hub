import { NextResponse } from 'next/server'
import { executeQuery } from '@/lib/db'

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
    // Parse JSON data instead of FormData
    const data = await request.json()
    
    // Extract fields from JSON
    const { name, address, city, state, contact, email_id, image } = data

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json(
        { error: 'All fields are required' },
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

    // Insert into database with the image URL
    const result = await executeQuery(
      `INSERT INTO schools (name, address, city, state, contact, image, email_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, image, email_id]
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