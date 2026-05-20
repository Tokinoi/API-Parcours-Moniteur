import { NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

interface POI {
  id: string
  name: string
  description: string
  type: string
  latitude: number
  longitude: number
  elevation: number
  difficulty: string
  crowded_level: number
  opening_hours: Record<string, unknown>
  contact_info: Record<string, unknown>
  images_urls: string[]
  created_by: string
  created_at: string
  updated_at: string
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const validationStatus = searchParams.get("validation_status")
    const limit = searchParams.get("limit") || "50"
    const offset = searchParams.get("offset") || "0"

    let query = `
      SELECT id, name, description, type, latitude, longitude,
             elevation, difficulty, crowded_level, opening_hours,
             contact_info, images_urls, created_by, created_at, updated_at
      FROM pois
    `

    const params: any[] = []
    let paramCount = 1

    // Filter by validation status if provided
    if (validationStatus) {
      const statuses = validationStatus.split(",").map((s) => s.trim())
      if (statuses.length > 0) {
        // For now, assume all POIs are validated since we don't have validation_status column yet
        // This is a placeholder for future implementation
      }
    }

    // Add pagination
    query += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`
    params.push(parseInt(limit), parseInt(offset))

    const result = await pool.query(query, params)

    // Get total count
    const countResult = await pool.query("SELECT COUNT(*) as count FROM pois")
    const total = parseInt(countResult.rows[0].count)

    return NextResponse.json(
      {
        data: result.rows as POI[],
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.name || body.latitude === undefined || body.longitude === undefined) {
      return NextResponse.json(
        { error: "Name, latitude, and longitude are required" },
        { status: 400 }
      )
    }

    // Validate coordinates
    if (
      typeof body.latitude !== "number" ||
      typeof body.longitude !== "number" ||
      body.latitude < -90 ||
      body.latitude > 90 ||
      body.longitude < -180 ||
      body.longitude > 180
    ) {
      return NextResponse.json(
        { error: "Invalid latitude or longitude" },
        { status: 400 }
      )
    }

    const result = await pool.query(
      `INSERT INTO pois (name, description, type, latitude, longitude,
                         elevation, difficulty, crowded_level, opening_hours,
                         contact_info, images_urls, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING id, name, description, type, latitude, longitude,
                 elevation, difficulty, crowded_level, opening_hours,
                 contact_info, images_urls, created_by, created_at, updated_at`,
      [
        body.name,
        body.description || null,
        body.type || null,
        body.latitude,
        body.longitude,
        body.elevation || null,
        body.difficulty || null,
        body.crowded_level || null,
        body.opening_hours ? JSON.stringify(body.opening_hours) : null,
        body.contact_info ? JSON.stringify(body.contact_info) : null,
        body.images_urls || null,
        body.created_by || null,
      ]
    )

    const poi = result.rows[0]

    return NextResponse.json(
      {
        message: "POI created successfully",
        data: poi,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
