import { describe, it, expect, vi } from "vitest"

const mockPOI = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Eiffel Tower",
  latitude: 48.8584,
  longitude: 2.2945,
  created_at: "2026-05-20T13:42:41.304400",
  updated_at: "2026-05-20T13:42:41.304400",
}

const { mockSupabase } = vi.hoisted(() => {
  return {
    mockSupabase: {
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(() =>
              Promise.resolve({
                data: mockPOI,
                error: null,
              })
            ),
          })),
        })),
      })),
    },
  }
})

vi.mock("@/lib/supabase", () => ({
  supabase: mockSupabase,
}))

import { GET as getPoiByIdHandler } from "@/app/api/pois/[id]/route"

describe("GET /api/pois/:id", () => {
  describe("Fetch POI by ID", () => {
    it("should return 400 for empty ID", async () => {
      const request = new Request("http://localhost:3000/api/pois/", {
        method: "GET",
      })

      const response = await getPoiByIdHandler(request as any, {
        params: { id: "" },
      })
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Invalid POI ID")
    })

    it("should return a single POI with valid ID", async () => {
      const validUUID = "550e8400-e29b-41d4-a716-446655440000"
      const request = new Request(
        `http://localhost:3000/api/pois/${validUUID}`,
        {
          method: "GET",
        }
      )

      const response = await getPoiByIdHandler(request as any, {
        params: { id: validUUID },
      })
      const data = (await response.json()) as any

      expect(response.status).toBe(200)
      expect(data.data).toBeDefined()
      expect(data.data.id).toBe(validUUID)
    })

    it("should return POI with correct fields", async () => {
      const validUUID = "550e8400-e29b-41d4-a716-446655440000"
      const request = new Request(
        `http://localhost:3000/api/pois/${validUUID}`,
        {
          method: "GET",
        }
      )

      const response = await getPoiByIdHandler(request as any, {
        params: { id: validUUID },
      })
      const data = (await response.json()) as any

      const poi = data.data
      expect(poi.id).toBeDefined()
      expect(poi.name).toBeDefined()
      expect(poi.latitude).toBeDefined()
      expect(poi.longitude).toBeDefined()
      expect(poi.created_at).toBeDefined()
      expect(poi.updated_at).toBeDefined()
    })

    it("should return 404 when POI not found", async () => {
      mockSupabase.from.mockReturnValueOnce({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(() =>
              Promise.resolve({
                data: null,
                error: { message: "Not found" },
              })
            ),
          })),
        })),
      })

      const nonExistentUUID = "00000000-0000-0000-0000-000000000000"
      const request = new Request(
        `http://localhost:3000/api/pois/${nonExistentUUID}`,
        {
          method: "GET",
        }
      )

      const response = await getPoiByIdHandler(request as any, {
        params: { id: nonExistentUUID },
      })
      const data = (await response.json()) as any

      expect(response.status).toBe(404)
      expect(data.error).toContain("POI not found")
    })

    it("should accept valid UUID format", async () => {
      const validUUIDs = [
        "550e8400-e29b-41d4-a716-446655440000",
        "123e4567-e89b-12d3-a456-426614174000",
        "abcdef00-1234-5678-9abc-def012345678",
      ]

      for (const uuid of validUUIDs) {
        const request = new Request(`http://localhost:3000/api/pois/${uuid}`, {
          method: "GET",
        })

        const response = await getPoiByIdHandler(request as any, {
          params: { id: uuid },
        })
        const data = (await response.json()) as any

        expect(response.status).not.toBe(400)
        if (data.error) {
          expect(data.error).not.toContain("Invalid POI ID")
        }
      }
    })
  })
})
