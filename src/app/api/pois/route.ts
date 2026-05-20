import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

interface POI {
  id: string
  name: string
  latitude: number
  longitude: number
  created_at: string
  updated_at: string
}

/**
 * @swagger
 * /api/pois:
 *   get:
 *     summary: Get all POIs
 *     description: Retrieve all Points of Interest
 *     tags:
 *       - POIs
 *     responses:
 *       200:
 *         description: List of all POIs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */
export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("pois")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json((data || []) as POI[], {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
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

