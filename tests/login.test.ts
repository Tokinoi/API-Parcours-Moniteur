import { describe, it, expect } from "vitest"
import { POST as loginHandler } from "@/app/api/auth/login/route"

describe("Authentication Routes - Login", () => {
  describe("POST /api/auth/login", () => {
    it("should return 400 for missing email", async () => {
      const request = new Request("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          password: "securepassword123",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await loginHandler(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Email and password are required")
    })

    it("should return 400 for missing password", async () => {
      const request = new Request("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: "user@example.com",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await loginHandler(request as any)
      const data = (await response.json()) as any

      expect(response.status).toBe(400)
      expect(data.error).toContain("Email and password are required")
    })

    it("should return error for invalid credentials", async () => {
      const request = new Request("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: "nonexistent@example.com",
          password: "wrongpassword123",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await loginHandler(request as any)
      const data = (await response.json()) as any

      // Should return error (not 200)
      expect(response.status).not.toBe(200)
      expect(data.error).toBeDefined()
    })

    it("should accept valid email and password combination", async () => {
      const request = new Request("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: "user@example.com",
          password: "validpassword123",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const response = await loginHandler(request as any)
      const data = (await response.json()) as any

      // Should not return 400 for validation error
      expect(data.error).not.toContain("Email and password are required")
    })
  })
})
