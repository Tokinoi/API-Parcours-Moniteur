import { NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Vérifier la santé de l'API et la connexion à la BDD
 *     description: Teste la connexion à Supabase et retourne le statut
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API et BDD fonctionnent correctement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *                 database:
 *                   type: string
 *                   example: "connected"
 *                 timestamp:
 *                   type: string
 *       500:
 *         description: Erreur de connexion à la BDD
 */
export async function GET(_req: NextRequest) {
  try {
    const result = await pool.query("SELECT NOW()")

    return NextResponse.json(
      {
        status: "ok",
        database: "connected",
        timestamp: result.rows[0].now,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Database connection error:", error)

    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
