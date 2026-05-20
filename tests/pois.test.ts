import { describe, it, expect } from "vitest"
import { GET as getPoisHandler, POST as createPoiHandler } from "@/app/api/pois/route"

describe("POIs Routes", () => {
  describe("GET /api/pois", () => {
    it("should be implemented", async () => {
      // GET endpoint is implemented to fetch all POIs
      // Requires database connection to test fully
      expect(getPoisHandler).toBeDefined()
    })
  })

  describe("POST /api/pois", () => {
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

      const response = await createPoiHandler(request as any)
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

      const response = await createPoiHandler(request as any)
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

      const response = await createPoiHandler(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Name, latitude, and longitude are required")
    })

    it("should return 400 for invalid latitude", async () => {
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

      const response = await createPoiHandler(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Invalid latitude or longitude")
    })

    it("should return 400 for invalid longitude", async () => {
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

      const response = await createPoiHandler(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Invalid latitude or longitude")
    })

    it("should accept valid coordinates", async () => {
      const validCoordinates = [
        { latitude: 0, longitude: 0 },
        { latitude: 48.8566, longitude: 2.3522 },
        { latitude: -33.8688, longitude: 151.2093 },
        { latitude: 51.5074, longitude: -0.1278 },
      ]

      for (const coords of validCoordinates) {
        const request = new Request("http://localhost:3000/api/pois", {
          method: "POST",
          body: JSON.stringify({
            name: "Test POI",
            ...coords,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })

        const response = await createPoiHandler(request as any)
        const data = (await response.json()) as any

        // Should not return 400 for coordinate validation error
        expect(data.error).not.toContain("Invalid latitude or longitude")
      }
    })
  })
})
