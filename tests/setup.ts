import "@testing-library/jest-dom"
import { afterEach, vi } from "vitest"

// Global test utilities
let storedUsers: Map<string, any> = new Map()

export function getMockUser(email: string) {
  return storedUsers.get(email)
}

export function addMockUser(email: string, user: any) {
  storedUsers.set(email, user)
}

afterEach(() => {
  // Cleanup après chaque test
  storedUsers.clear()
})
