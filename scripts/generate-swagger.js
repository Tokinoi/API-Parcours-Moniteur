const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const fs = require('fs');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Parcours Moniteur',
      version: '0.1.0',
      description: 'API pour gérer les parcours et itinéraires',
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
        description: 'API Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [path.join(__dirname, '../src/app/api/**/*.ts')],
};

const spec = swaggerJsdoc(options);

const outputDir = path.join(__dirname, '../src/lib');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(
  path.join(outputDir, 'swagger-spec-generated.json'),
  JSON.stringify(spec, null, 2)
);

console.log('✓ Swagger spec generated at src/lib/swagger-spec-generated.json');
