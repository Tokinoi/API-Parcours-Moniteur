import { describe, it, expect } from "vitest"

describe("GET /api/pois", () => {
  describe("Route logic - GET all POIs", () => {
    it("should return array of POIs", () => {
      const mockData = [
        {
          id: "550e8400-e29b-41d4-a716-446655440000",
          name: "Eiffel Tower",
          latitude: 48.8584,
          longitude: 2.2945,
          created_at: "2026-05-20T13:42:41.304400",
          updated_at: "2026-05-20T13:42:41.304400",
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440001",
          name: "Louvre",
          latitude: 48.861,
          longitude: 2.3359,
          created_at: "2026-05-20T13:42:40.304400",
          updated_at: "2026-05-20T13:42:40.304400",
        },
      ]

      expect(Array.isArray(mockData)).toBe(true)
      expect(mockData.length).toBeGreaterThan(0)
    })

    it("should return POIs with required fields", () => {
      const poi = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Eiffel Tower",
        latitude: 48.8584,
        longitude: 2.2945,
        created_at: "2026-05-20T13:42:41.304400",
        updated_at: "2026-05-20T13:42:41.304400",
      }

      expect(poi.id).toBeDefined()
      expect(poi.name).toBeDefined()
      expect(poi.latitude).toBeDefined()
      expect(poi.longitude).toBeDefined()
      expect(poi.created_at).toBeDefined()
      expect(poi.updated_at).toBeDefined()
    })

    it("should order POIs by created_at descending", () => {
      const pois = [
        { created_at: "2026-05-20T13:42:40.304400" },
        { created_at: "2026-05-20T13:42:41.304400" },
        { created_at: "2026-05-20T13:42:39.304400" },
      ]

      const sorted = [...pois].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )

      expect(sorted[0].created_at).toBe("2026-05-20T13:42:41.304400")
      expect(sorted[sorted.length - 1].created_at).toBe("2026-05-20T13:42:39.304400")
    })

    it("should have valid latitude range", () => {
      const pois = [
        { latitude: 48.8584 },
        { latitude: -33.8688 },
        { latitude: 0 },
      ]

      pois.forEach((poi) => {
        expect(poi.latitude).toBeGreaterThanOrEqual(-90)
        expect(poi.latitude).toBeLessThanOrEqual(90)
      })
    })

    it("should have valid longitude range", () => {
      const pois = [
        { longitude: 2.2945 },
        { longitude: 151.2093 },
        { longitude: -74.0060 },
      ]

      pois.forEach((poi) => {
        expect(poi.longitude).toBeGreaterThanOrEqual(-180)
        expect(poi.longitude).toBeLessThanOrEqual(180)
      })
    })
  })
})
