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
 * /api/pois/{id}:
 *   get:
 *     summary: Get a specific POI by ID
 *     description: Retrieve a Point of Interest by its UUID
 *     tags:
 *       - POIs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: POI unique identifier
 *     responses:
 *       200:
 *         description: POI found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *         description: Invalid POI ID format
 *       404:
 *         description: POI not found
 *       500:
 *         description: Server error
 */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Validate ID format
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Invalid POI ID" },
        { status: 400, headers: corsHeaders }
      )
    }

    const { data, error } = await supabase
      .from("pois")
      .select("*")
      .eq("id", id)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: "POI not found" },
        { status: 404, headers: corsHeaders }
      )
    }

    const poi = data as POI

    return NextResponse.json(
      {
        data: poi,
      },
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: corsHeaders }
    )
  }
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}
