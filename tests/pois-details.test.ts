import { describe, it, expect } from "vitest"
import { GET as getPoiHandler } from "@/app/api/pois/[id]/route"

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

  })

})
