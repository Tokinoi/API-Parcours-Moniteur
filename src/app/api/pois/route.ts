import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

/**
 * @swagger
 * /api/pois:
 *   post:
 *     summary: Create a new POI
 *     description: Create a new Point of Interest with name, latitude, and longitude
 *     tags:
 *       - POIs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - latitude
 *               - longitude
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the POI
 *                 example: Eiffel Tower
 *               latitude:
 *                 type: number
 *                 description: Latitude coordinate (-90 to 90)
 *                 example: 48.8584
 *               longitude:
 *                 type: number
 *                 description: Longitude coordinate (-180 to 180)
 *                 example: 2.2945
 *     responses:
 *       201:
 *         description: POI created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: POI created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *                     latitude:
 *                       type: number
 *                     longitude:
 *                       type: number
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Name, latitude, and longitude are required
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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

    const { data, error } = await supabase
      .from("pois")
      .insert([
        {
          name: body.name,
          latitude: body.latitude,
          longitude: body.longitude,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(
      {
        message: "POI created successfully",
        data,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("POI creation error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

