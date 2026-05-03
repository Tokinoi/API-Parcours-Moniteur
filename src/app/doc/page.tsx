"use client"

export default function DocPage() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui.css"
      />
      <div id="swagger-ui" />
      <script
        src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui-bundle.js"
        defer
        onLoad={() => {
          if (typeof window !== "undefined" && (window as any).SwaggerUIBundle) {
            ;(window as any).SwaggerUIBundle({
              url: "/api/doc",
              dom_id: "#swagger-ui",
              presets: [
                (window as any).SwaggerUIBundle.presets.apis,
                (window as any).SwaggerUIBundle.SwaggerUIStandalonePreset,
              ],
              layout: "BaseLayout",
            })
          }
        }}
      />
    </>
  )
}
