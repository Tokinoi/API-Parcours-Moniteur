import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

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
    // Test connection by checking auth
    const { data, error } = await supabase.auth.admin.listUsers()

    if (error) throw error

    return NextResponse.json(
      {
        status: "ok",
        database: "connected",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Database connection error:", error)
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error)

    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        error: errorMessage,
      },
      { status: 500 }
    )
  }
}
