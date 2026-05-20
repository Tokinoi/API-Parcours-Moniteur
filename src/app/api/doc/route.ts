import { NextRequest, NextResponse } from "next/server"
import specData from "@/lib/swagger-spec-generated.json"

export async function GET(_req: NextRequest) {
  return NextResponse.json(specData)
}
