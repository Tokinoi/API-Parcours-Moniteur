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

// Set environment variables for tests
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co"
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "sb_test_anon_key_abcdefghijklmnopqrstuvwxyz123456"

afterEach(() => {
  // Cleanup après chaque test
  storedUsers.clear()
})
