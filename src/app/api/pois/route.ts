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
 *     description: Retrieve a paginated list of all Points of Interest
 *     tags:
 *       - POIs
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Number of results to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of results to skip
 *     responses:
 *       200:
 *         description: List of POIs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       name:
 *                         type: string
 *                       latitude:
 *                         type: number
 *                       longitude:
 *                         type: number
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     limit:
 *                       type: integer
 *                     offset:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *       500:
 *         description: Server error
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const limit = parseInt(searchParams.get("limit") || "50")
    const offset = parseInt(searchParams.get("offset") || "0")

    const { data, count, error } = await supabase
      .from("pois")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json(
      {
        data: (data || []) as POI[],
        pagination: {
          limit,
          offset,
          total: count || 0,
          pages: Math.ceil((count || 0) / limit),
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

