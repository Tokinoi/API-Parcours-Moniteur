import { NextRequest, NextResponse } from "next/server"
import { readFileSync } from "fs"
import { join } from "path"

export async function GET(_req: NextRequest) {
  try {
    const specPath = join(process.cwd(), "src/lib/swagger-spec-generated.json")
    const specData = JSON.parse(readFileSync(specPath, "utf-8"))
    return NextResponse.json(specData)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load swagger spec" },
      { status: 500 }
    )
  }
}
