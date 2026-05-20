import swaggerJsdoc from "swagger-jsdoc"
import path from "path"

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Parcours Moniteur",
      version: "0.1.0",
      description: "API pour gérer les parcours et itinéraires",
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
        description: "API Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [path.join(process.cwd(), "src/app/api/**/*.ts")],
}

export const swaggerSpec = swaggerJsdoc(options)
