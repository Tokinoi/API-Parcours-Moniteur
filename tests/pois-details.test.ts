import { describe, it, expect } from "vitest"
import { GET as getPoiHandler, DELETE as deletePoiHandler } from "@/app/api/pois/[id]/route"

describe("POI Details Routes", () => {
  describe("GET /api/pois/:id - Input Validation", () => {
    it("should return 400 for empty ID", async () => {
      const request = new Request("http://localhost:3000/api/pois/", {
        method: "GET",
      })

      const response = await getPoiHandler(request as any, {
        params: { id: "" },
      })
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Invalid POI ID")
    })

    it("should accept valid UUID format", async () => {
      const validUUID = "550e8400-e29b-41d4-a716-446655440000"
      const request = new Request(
        `http://localhost:3000/api/pois/${validUUID}`,
        {
          method: "GET",
        }
      )

      const response = await getPoiHandler(request as any, {
        params: { id: validUUID },
      })
      const data = (await response.json()) as any

      // Should not return 400 for validation
      expect(data.error).not.toContain("Invalid POI ID")
    })
  })

  describe("DELETE /api/pois/:id - Input Validation", () => {
    it("should return 400 for empty ID", async () => {
      const request = new Request("http://localhost:3000/api/pois/", {
        method: "DELETE",
      })

      const response = await deletePoiHandler(request as any, {
        params: { id: "" },
      })
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Invalid POI ID")
    })

    it("should accept valid UUID format", async () => {
      const validUUID = "550e8400-e29b-41d4-a716-446655440000"
      const request = new Request(
        `http://localhost:3000/api/pois/${validUUID}`,
        {
          method: "DELETE",
        }
      )

      const response = await deletePoiHandler(request as any, {
        params: { id: validUUID },
      })
      const data = (await response.json()) as any

      // Should not return 400 for validation
      expect(data.error).not.toContain("Invalid POI ID")
    })
  })
})
