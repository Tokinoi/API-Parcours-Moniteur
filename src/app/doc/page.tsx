"use client"

import { useEffect } from "react"

export default function DocPage() {
  useEffect(() => {
    const loadSwaggerUI = async () => {
      const SwaggerUIBundle = await import("swagger-ui-dist").then(
        (m) => m.default || m
      )

      SwaggerUIBundle({
        url: "/api/doc",
        dom_id: "#swagger-ui",
        presets: [
          await import("swagger-ui-dist/swagger-ui").then((m) => m.default),
        ],
      })
    }

    loadSwaggerUI()
  }, [])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@3/swagger-ui.css"
      />
      <div id="swagger-ui" style={{ margin: "20px" }} />
    </>
  )
}
