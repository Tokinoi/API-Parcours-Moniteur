'use client'

import { useEffect } from 'react'

export default function DocPage() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui-bundle.js'
    script.async = true
    script.onload = () => {
      ;(window as any).SwaggerUIBundle({
        url: '/api/doc',
        dom_id: '#swagger-ui',
        presets: [
          (window as any).SwaggerUIBundle.presets.apis,
          (window as any).SwaggerUIBundle.SwaggerUIStandalonePreset,
        ],
        layout: 'BaseLayout',
      })
    }
    document.body.appendChild(script)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui.css'
    document.head.appendChild(link)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return <div id="swagger-ui" style={{ padding: '20px' }} />
}
