"use client"

import { useEffect } from "react"

export default function DocPage() {
  useEffect(() => {
    const loadSwaggerUI = async () => {
      const SwaggerUIBundle = (window as any).SwaggerUIBundle
      if (SwaggerUIBundle) {
        SwaggerUIBundle({
          url: "/api/doc",
          dom_id: "#swagger-ui",
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIBundle.SwaggerUIStandalonePreset,
          ],
          layout: "BaseLayout",
        })
      }
    }

    // Load swagger-ui-bundle.js
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui-bundle.js"
    script.async = true
    script.onload = loadSwaggerUI
    document.head.appendChild(script)

    // Load swagger-ui.css
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui.css"
    document.head.appendChild(link)
  }, [])

  return <div id="swagger-ui" />
}
