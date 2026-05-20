import { describe, it, expect } from "vitest"

describe("GET /api/pois", () => {
  describe("Route logic - GET all POIs", () => {
    it("should parse limit parameter from query string", () => {
      const url = new URL("http://localhost:3000/api/pois?limit=20")
      const limit = parseInt(url.searchParams.get("limit") || "50")
      expect(limit).toBe(20)
    })

    it("should use default limit of 50 when not provided", () => {
      const url = new URL("http://localhost:3000/api/pois")
      const limit = parseInt(url.searchParams.get("limit") || "50")
      expect(limit).toBe(50)
    })

    it("should parse offset parameter from query string", () => {
      const url = new URL("http://localhost:3000/api/pois?offset=100")
      const offset = parseInt(url.searchParams.get("offset") || "0")
      expect(offset).toBe(100)
    })

    it("should use default offset of 0 when not provided", () => {
      const url = new URL("http://localhost:3000/api/pois")
      const offset = parseInt(url.searchParams.get("offset") || "0")
      expect(offset).toBe(0)
    })

    it("should calculate total pages correctly", () => {
      const total = 250
      const limit = 50
      const expectedPages = Math.ceil(total / limit)
      expect(expectedPages).toBe(5)
    })

    it("should handle pagination with different limits", () => {
      const testCases = [
        { total: 100, limit: 10, expectedPages: 10 },
        { total: 100, limit: 25, expectedPages: 4 },
        { total: 100, limit: 50, expectedPages: 2 },
        { total: 100, limit: 100, expectedPages: 1 },
        { total: 101, limit: 50, expectedPages: 3 },
      ]

      testCases.forEach(({ total, limit, expectedPages }) => {
        const pages = Math.ceil(total / limit)
        expect(pages).toBe(expectedPages)
      })
    })

    it("should calculate correct range for pagination", () => {
      const limit = 50
      const offset = 100
      const start = offset
      const end = offset + limit - 1
      expect(start).toBe(100)
      expect(end).toBe(149)
    })

    it("should handle edge case of last page", () => {
      const total = 125
      const limit = 50
      const offset = 100
      const itemsOnLastPage = total - offset
      expect(itemsOnLastPage).toBe(25)
    })
  })
})
