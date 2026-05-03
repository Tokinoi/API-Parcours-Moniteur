import { NextResponse } from "next/server"

export const notImplemented = () =>
  NextResponse.json({ error: "Not implemented" }, { status: 501 })
