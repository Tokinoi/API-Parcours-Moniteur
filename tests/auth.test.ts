import { describe, it, expect } from "vitest"
import { POST as signupHandler } from "@/app/api/auth/signup/route"

describe("Authentication Routes", () => {
  describe("POST /api/auth/signup", () => {
    describe("Input Validation", () => {
      it("should return 400 for missing email", async () => {
        const request = new Request("http://localhost:3000/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            password: "securepassword123",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })

        const response = await signupHandler(request as any)
        const data = (await response.json()) as any

        expect(response.status).toBe(400)
        expect(data.error).toContain("Email and password are required")
      })

      it("should return 400 for missing password", async () => {
        const request = new Request("http://localhost:3000/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            email: "user@example.com",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })

        const response = await signupHandler(request as any)
        const data = (await response.json()) as any

        expect(response.status).toBe(400)
        expect(data.error).toContain("Email and password are required")
      })

      it("should return 400 for invalid email format", async () => {
        const request = new Request("http://localhost:3000/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            email: "invalid-email",
            password: "securepassword123",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })

        const response = await signupHandler(request as any)
        const data = (await response.json()) as any

        expect(response.status).toBe(400)
        expect(data.error).toContain("Invalid email format")
      })

      it("should return 400 for password shorter than 6 characters", async () => {
        const request = new Request("http://localhost:3000/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            email: "user@example.com",
            password: "short",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })

        const response = await signupHandler(request as any)
        const data = (await response.json()) as any

        expect(response.status).toBe(400)
        expect(data.error).toContain("Password must be at least 6 characters")
      })

      it("should accept valid email formats", async () => {
        const validEmails = [
          "user@example.com",
          "test.user@example.co.uk",
          "user+tag@example.com",
        ]

        for (const email of validEmails) {
          const request = new Request("http://localhost:3000/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({
              email,
              password: "validpassword123",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })

          const response = await signupHandler(request as any)
          const data = (await response.json()) as any
          // Should not return 400 for invalid email format
          expect(data.error).not.toContain("Invalid email format")
        }
      })

      it("should reject already registered email", async () => {
        const email = `duplicate-${Date.now()}@example.com`
        const password = "validpassword123"

        // First signup attempt
        const firstRequest = new Request(
          "http://localhost:3000/api/auth/signup",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        await signupHandler(firstRequest as any)

        // Second signup with same email should fail with error response
        const secondRequest = new Request(
          "http://localhost:3000/api/auth/signup",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        const secondResponse = await signupHandler(secondRequest as any)
        const secondData = (await secondResponse.json()) as any

        // Should return error (not success status 201)
        expect(secondResponse.status).not.toBe(201)
        expect(secondData.error).toBeDefined()
      })
    })
  })

})
