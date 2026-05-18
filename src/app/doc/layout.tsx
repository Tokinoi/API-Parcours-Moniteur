export const metadata = {
  title: "API Documentation - Parcours Moniteur",
  description: "Swagger UI for Parcours Moniteur API",
}

export default function DocLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
