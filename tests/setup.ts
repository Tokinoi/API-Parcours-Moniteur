import "@testing-library/jest-dom"
import { expect, afterEach } from "vitest"

// Set environment variables for tests
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co"
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "sb_test_anon_key_abcdefghijklmnopqrstuvwxyz123456"

afterEach(() => {
  // Cleanup après chaque test
})
