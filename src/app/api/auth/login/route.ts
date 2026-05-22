import { NextRequest, NextResponse } from "next/server"
import { supabaseClient } from "@/lib/supabase"

interface LoginBody {
  email: string
  password: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LoginBody

    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Authenticate with Supabase
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    })

    if (error || !data.session) {
      return NextResponse.json(
        { error: error?.message || "Invalid email or password" },
        { status: 401 }
      )
    }

    return NextResponse.json(
      {
        message: "Login successful",
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_in: data.session.expires_in,
        user: {
          id: data.user.id,
          email: data.user.email,
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
