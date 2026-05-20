import { describe, it, expect, vi, beforeEach } from "vitest"
import { POST } from "@/app/api/pois/route"

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(function (data) {
        return {
          select: vi.fn(() => ({
            single: vi.fn(() => {
              const poi = {
                id: "550e8400-e29b-41d4-a716-446655440000",
                name: data[0].name,
                latitude: data[0].latitude,
                longitude: data[0].longitude,
                created_at: "2026-05-20T13:42:41.304400",
                updated_at: "2026-05-20T13:42:41.304400",
              }
              return Promise.resolve({ data: poi, error: null })
            }),
          }))
        }
      }),
    })),
  },
}))

describe("POST /api/pois", () => {
  describe("Validation", () => {
    it("should return 400 for missing name", async () => {
      const request = new Request("http://localhost:3000/api/pois", {
        method: "POST",
        body: JSON.stringify({
          latitude: 48.8566,
          longitude: 2.3522,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Name, latitude, and longitude are required")
    })

    it("should return 400 for missing latitude", async () => {
      const request = new Request("http://localhost:3000/api/pois", {
        method: "POST",
        body: JSON.stringify({
          name: "Test POI",
          longitude: 2.3522,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Name, latitude, and longitude are required")
    })

    it("should return 400 for missing longitude", async () => {
      const request = new Request("http://localhost:3000/api/pois", {
        method: "POST",
        body: JSON.stringify({
          name: "Test POI",
          latitude: 48.8566,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Name, latitude, and longitude are required")
    })

    it("should return 400 for invalid latitude (too high)", async () => {
      const request = new Request("http://localhost:3000/api/pois", {
        method: "POST",
        body: JSON.stringify({
          name: "Test POI",
          latitude: 91,
          longitude: 2.3522,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Invalid latitude or longitude")
    })

    it("should return 400 for invalid latitude (too low)", async () => {
      const request = new Request("http://localhost:3000/api/pois", {
        method: "POST",
        body: JSON.stringify({
          name: "Test POI",
          latitude: -91,
          longitude: 2.3522,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Invalid latitude or longitude")
    })

    it("should return 400 for invalid longitude (too high)", async () => {
      const request = new Request("http://localhost:3000/api/pois", {
        method: "POST",
        body: JSON.stringify({
          name: "Test POI",
          latitude: 48.8566,
          longitude: 181,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Invalid latitude or longitude")
    })

    it("should return 400 for invalid longitude (too low)", async () => {
      const request = new Request("http://localhost:3000/api/pois", {
        method: "POST",
        body: JSON.stringify({
          name: "Test POI",
          latitude: 48.8566,
          longitude: -181,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Invalid latitude or longitude")
    })

    it("should return 400 for non-numeric latitude", async () => {
      const request = new Request("http://localhost:3000/api/pois", {
        method: "POST",
        body: JSON.stringify({
          name: "Test POI",
          latitude: "not-a-number",
          longitude: 2.3522,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Invalid latitude or longitude")
    })

    it("should return 400 for non-numeric longitude", async () => {
      const request = new Request("http://localhost:3000/api/pois", {
        method: "POST",
        body: JSON.stringify({
          name: "Test POI",
          latitude: 48.8566,
          longitude: "not-a-number",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Invalid latitude or longitude")
    })
  })

  describe("Success cases", () => {
    it("should accept valid coordinates at equator", async () => {
      const request = new Request("http://localhost:3000/api/pois", {
        method: "POST",
        body: JSON.stringify({
          name: "Equator POI",
          latitude: 0,
          longitude: 0,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(201)
      expect(data.message).toBe("POI created successfully")
      expect(data.data).toBeDefined()
      expect(data.data.id).toBeDefined()
      expect(data.data.name).toBe("Equator POI")
      expect(data.data.latitude).toBe(0)
      expect(data.data.longitude).toBe(0)
    })

    it("should accept valid coordinates in Paris", async () => {
      const request = new Request("http://localhost:3000/api/pois", {
        method: "POST",
        body: JSON.stringify({
          name: "Eiffel Tower",
          latitude: 48.8566,
          longitude: 2.3522,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(201)
      expect(data.message).toBe("POI created successfully")
      expect(data.data.name).toBe("Eiffel Tower")
      expect(data.data.latitude).toBe(48.8566)
      expect(data.data.longitude).toBe(2.3522)
    })

    it("should accept valid coordinates in Sydney", async () => {
      const request = new Request("http://localhost:3000/api/pois", {
        method: "POST",
        body: JSON.stringify({
          name: "Opera House",
          latitude: -33.8568,
          longitude: 151.2153,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(201)
      expect(data.data.name).toBe("Opera House")
      expect(data.data.latitude).toBe(-33.8568)
      expect(data.data.longitude).toBe(151.2153)
    })

    it("should accept valid coordinates at pole", async () => {
      const request = new Request("http://localhost:3000/api/pois", {
        method: "POST",
        body: JSON.stringify({
          name: "North Pole",
          latitude: 90,
          longitude: 0,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(201)
      expect(data.data.latitude).toBe(90)
    })

    it("should return created POI with id and timestamps", async () => {
      const request = new Request("http://localhost:3000/api/pois", {
        method: "POST",
        body: JSON.stringify({
          name: "Test POI",
          latitude: 48.0,
          longitude: 2.0,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await POST(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(201)
      expect(data.data.id).toBeDefined()
      expect(data.data.created_at).toBeDefined()
      expect(data.data.updated_at).toBeDefined()
    })
  })
})
