import { describe, it, expect } from "vitest"

describe("API Routes", () => {
  it("should return 501 for unimplemented endpoints", async () => {
    // Test example - à adapter avec vos vraies requêtes
    const response = { error: "Not implemented" }
    expect(response.error).toBe("Not implemented")
  })

  describe("Lists API", () => {
    it("GET /api/lists should return list of parcours", async () => {
      // À implémenter
      expect(true).toBe(true)
    })

    it("POST /api/lists should create a new parcours", async () => {
      // À implémenter
      expect(true).toBe(true)
    })
  })

  describe("Itineraries API", () => {
    it("GET /api/itineraries should return list of itineraries", async () => {
      // À implémenter
      expect(true).toBe(true)
    })
  })

  describe("POIs API", () => {
    it("GET /api/pois should return list of points of interest", async () => {
      // À implémenter
      expect(true).toBe(true)
    })
  })
})
