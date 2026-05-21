export const swaggerDefinitions = {
  openapi: "3.0.0",
  info: {
    title: "API Parcours Moniteur",
    version: "1.0.0",
    description: "API pour gérer les parcours, itinéraires et points d'intérêt",
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
  paths: {
    "/auth/request-code": {
      post: {
        summary: "Demander un code de vérification",
        tags: ["Auth"],
        "x-implemented": false,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Code envoyé par email" },
          400: { description: "Email manquant" },
        },
      },
    },
    "/auth/verify-code": {
      post: {
        summary: "Vérifier le code et obtenir JWT",
        tags: ["Auth"],
        "x-implemented": false,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  code: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "JWT token" },
          401: { description: "Code invalide" },
        },
      },
    },
    "/auth/logout": {
      delete: {
        summary: "Se déconnecter",
        tags: ["Auth"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Déconnecté" },
        },
      },
    },

    "/users/me": {
      get: {
        summary: "Récupérer mon profil",
        tags: ["Utilisateur"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Profil utilisateur" },
        },
      },
      patch: {
        summary: "Modifier mon profil",
        tags: ["Utilisateur"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: { type: "object" },
            },
          },
        },
        responses: {
          200: { description: "Profil modifié" },
        },
      },
      delete: {
        summary: "Supprimer mon compte (RGPD)",
        tags: ["Utilisateur"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Compte supprimé" },
        },
      },
    },

    "/pois": {
      get: {
        summary: "Lister les POIs",
        tags: ["Points d'Intérêt"],
        "x-implemented": false,
        parameters: [
          { name: "type", in: "query", schema: { type: "string" } },
          { name: "frequentation", in: "query", schema: { type: "integer" } },
          { name: "denivele", in: "query", schema: { type: "integer" } },
        ],
        responses: {
          200: { description: "Liste des POIs" },
        },
      },
      post: {
        summary: "Créer un POI (back-office)",
        tags: ["Points d'Intérêt"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object" },
            },
          },
        },
        responses: {
          201: { description: "POI créé" },
        },
      },
    },
    "/pois/{id}": {
      get: {
        summary: "Détail d'un POI + créneaux horaires",
        tags: ["Points d'Intérêt"],
        "x-implemented": false,
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Détail du POI" },
        },
      },
      delete: {
        summary: "Supprimer un POI (back-office)",
        tags: ["Points d'Intérêt"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "POI supprimé" },
        },
      },
    },
    "/pois/{id}/modification-requests": {
      post: {
        summary: "Soumettre une demande de modification",
        tags: ["Demandes de Modification"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object" },
            },
          },
        },
        responses: {
          201: { description: "Demande créée" },
        },
      },
    },
    "/modification-requests": {
      get: {
        summary: "Lister les demandes en attente (back-office)",
        tags: ["Demandes de Modification"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Liste des demandes" },
        },
      },
    },
    "/modification-requests/{id}": {
      patch: {
        summary: "Valider ou rejeter une demande",
        tags: ["Demandes de Modification"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object" },
            },
          },
        },
        responses: {
          200: { description: "Demande traitée" },
        },
      },
    },

    "/users/me/favorites": {
      get: {
        summary: "Mes favoris",
        tags: ["Favoris"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Liste des favoris" },
        },
      },
    },
    "/users/me/favorites/{poiId}": {
      post: {
        summary: "Ajouter aux favoris",
        tags: ["Favoris"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "poiId", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          201: { description: "Ajouté aux favoris" },
        },
      },
      delete: {
        summary: "Retirer des favoris",
        tags: ["Favoris"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "poiId", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Retiré des favoris" },
        },
      },
    },

    "/lists": {
      get: {
        summary: "Mes listes",
        tags: ["Listes"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Liste des listes" },
        },
      },
      post: {
        summary: "Créer une liste",
        tags: ["Listes"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object" },
            },
          },
        },
        responses: {
          201: { description: "Liste créée" },
        },
      },
    },
    "/lists/{id}": {
      get: {
        summary: "Détail d'une liste",
        tags: ["Listes"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Détail de la liste" },
        },
      },
      delete: {
        summary: "Supprimer une liste",
        tags: ["Listes"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Liste supprimée" },
        },
      },
    },
    "/lists/{id}/pois/{poiId}": {
      post: {
        summary: "Ajouter un POI à une liste",
        tags: ["Listes"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          { name: "poiId", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          201: { description: "POI ajouté" },
        },
      },
      delete: {
        summary: "Retirer un POI d'une liste",
        tags: ["Listes"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          { name: "poiId", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: {
          200: { description: "POI retiré" },
        },
      },
    },

    "/itineraries": {
      get: {
        summary: "Mes itinéraires",
        tags: ["Itinéraires"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Liste des itinéraires" },
        },
      },
      post: {
        summary: "Créer un itinéraire",
        tags: ["Itinéraires"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object" },
            },
          },
        },
        responses: {
          201: { description: "Itinéraire créé" },
        },
      },
    },
    "/itineraries/{id}": {
      get: {
        summary: "Détail d'un itinéraire",
        tags: ["Itinéraires"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Détail de l'itinéraire" },
        },
      },
      delete: {
        summary: "Supprimer un itinéraire",
        tags: ["Itinéraires"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Itinéraire supprimé" },
        },
      },
    },
    "/itineraries/{id}/route": {
      post: {
        summary: "Calculer le chemin optimal entre les POIs",
        tags: ["Itinéraires"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: { type: "object" },
            },
          },
        },
        responses: {
          200: { description: "Route calculée (GeoJSON)" },
        },
      },
    },

    "/admin/users": {
      get: {
        summary: "Lister tous les utilisateurs (back-office)",
        tags: ["Admin"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Liste des utilisateurs" },
        },
      },
    },
    "/admin/users/{id}": {
      patch: {
        summary: "Activer/Désactiver un utilisateur",
        tags: ["Admin"],
        "x-implemented": false,
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { type: "object" },
            },
          },
        },
        responses: {
          200: { description: "Utilisateur modifié" },
        },
      },
    },

    "/health": {
      get: {
        summary: "Vérifier la santé de l'API",
        tags: ["Health"],
        "x-implemented": true,
        responses: {
          200: { description: "API et BDD fonctionnent" },
        },
      },
    },
  },
}
