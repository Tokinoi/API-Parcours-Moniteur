import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import pool from "@/lib/db"

interface SignupBody {
  email: string
  password: string
  first_name?: string
  last_name?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SignupBody

    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate password length
    if (body.password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      )
    }

    // Create user in Supabase Auth
    const { data, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true,
    })

    if (authError || !data.user) {
      return NextResponse.json(
        { error: authError?.message || "Failed to create account" },
        { status: 400 }
      )
    }

    // Create user record in database
    const result = await pool.query(
      `INSERT INTO users (id, email, first_name, last_name, is_active)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, first_name, last_name, is_admin, created_at`,
      [
        data.user.id,
        body.email,
        body.first_name || null,
        body.last_name || null,
        true,
      ]
    )

    const user = result.rows[0]

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          is_admin: user.is_admin,
          created_at: user.created_at,
        },
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
