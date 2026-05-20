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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Validate ID format
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Invalid POI ID" },
        { status: 400 }
      )
    }

    const result = await pool.query(
      `SELECT id, name, description, type, latitude, longitude,
              elevation, difficulty, crowded_level, opening_hours,
              contact_info, images_urls, created_by, created_at, updated_at
       FROM pois
       WHERE id = $1`,
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "POI not found" },
        { status: 404 }
      )
    }

    const poi = result.rows[0] as POI

    return NextResponse.json(
      {
        data: poi,
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Validate ID format
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Invalid POI ID" },
        { status: 400 }
      )
    }

    const deleteResult = await pool.query(
      "DELETE FROM pois WHERE id = $1 RETURNING id",
      [id]
    )

    if (deleteResult.rows.length === 0) {
      return NextResponse.json(
        { error: "POI not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "POI deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
