// Cette fichier contient toutes les définitions Swagger pour les endpoints
// À intégrer dans chaque fichier de route

export const swaggerEndpoints = {
  // AUTH
  authRequestCode: `
    /**
     * @swagger
     * /api/auth/request-code:
     *   post:
     *     summary: Demander un code de vérification
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *     responses:
     *       200:
     *         description: Code envoyé par email
     *       400:
     *         description: Email manquant
     */
  `,

  authVerifyCode: `
    /**
     * @swagger
     * /api/auth/verify-code:
     *   post:
     *     summary: Vérifier le code et obtenir JWT
     *     tags:
     *       - Auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               code:
     *                 type: string
     *     responses:
     *       200:
     *         description: JWT token
     *       401:
     *         description: Code invalide
     */
  `,

  authLogout: `
    /**
     * @swagger
     * /api/auth/logout:
     *   delete:
     *     summary: Se déconnecter
     *     tags:
     *       - Auth
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Déconnecté
     */
  `,

  // USERS
  usersMe: `
    /**
     * @swagger
     * /api/users/me:
     *   get:
     *     summary: Récupérer mon profil
     *     tags:
     *       - Utilisateur
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Profil utilisateur
     *   patch:
     *     summary: Modifier mon profil
     *     tags:
     *       - Utilisateur
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       content:
     *         application/json:
     *     responses:
     *       200:
     *         description: Profil modifié
     *   delete:
     *     summary: Supprimer mon compte (RGPD)
     *     tags:
     *       - Utilisateur
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Compte supprimé
     */
  `,

  // POIS
  pois: `
    /**
     * @swagger
     * /api/pois:
     *   get:
     *     summary: Lister les POIs
     *     tags:
     *       - Points d'Intérêt
     *     parameters:
     *       - name: type
     *         in: query
     *         type: string
     *       - name: frequentation
     *         in: query
     *         type: integer
     *       - name: denivele
     *         in: query
     *         type: integer
     *     responses:
     *       200:
     *         description: Liste des POIs
     *   post:
     *     summary: Créer un POI (back-office)
     *     tags:
     *       - Points d'Intérêt
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *     responses:
     *       201:
     *         description: POI créé
     */
  `,

  poisDetail: `
    /**
     * @swagger
     * /api/pois/{id}:
     *   get:
     *     summary: Détail d'un POI
     *     tags:
     *       - Points d'Intérêt
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Détail du POI
     *   delete:
     *     summary: Supprimer un POI (back-office)
     *     tags:
     *       - Points d'Intérêt
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: POI supprimé
     */
  `,

  // MODIFICATION REQUESTS
  modificationRequests: `
    /**
     * @swagger
     * /api/modification-requests:
     *   get:
     *     summary: Lister les demandes en attente (back-office)
     *     tags:
     *       - Demandes de Modification
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Liste des demandes
     */
  `,

  modificationRequestDetail: `
    /**
     * @swagger
     * /api/modification-requests/{id}:
     *   patch:
     *     summary: Valider ou rejeter une demande
     *     tags:
     *       - Demandes de Modification
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *     responses:
     *       200:
     *         description: Demande traitée
     */
  `,

  // FAVORITES
  favorites: `
    /**
     * @swagger
     * /api/users/me/favorites:
     *   get:
     *     summary: Mes favoris
     *     tags:
     *       - Favoris
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Liste des favoris
     */
  `,

  favoriteAction: `
    /**
     * @swagger
     * /api/users/me/favorites/{poiId}:
     *   post:
     *     summary: Ajouter aux favoris
     *     tags:
     *       - Favoris
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       201:
     *         description: Ajouté aux favoris
     *   delete:
     *     summary: Retirer des favoris
     *     tags:
     *       - Favoris
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Retiré des favoris
     */
  `,

  // LISTS
  lists: `
    /**
     * @swagger
     * /api/lists:
     *   get:
     *     summary: Mes listes
     *     tags:
     *       - Listes
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Liste des listes
     *   post:
     *     summary: Créer une liste
     *     tags:
     *       - Listes
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *     responses:
     *       201:
     *         description: Liste créée
     */
  `,

  listDetail: `
    /**
     * @swagger
     * /api/lists/{id}:
     *   get:
     *     summary: Détail d'une liste
     *     tags:
     *       - Listes
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Détail de la liste
     *   delete:
     *     summary: Supprimer une liste
     *     tags:
     *       - Listes
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Liste supprimée
     */
  `,

  listPois: `
    /**
     * @swagger
     * /api/lists/{id}/pois/{poiId}:
     *   post:
     *     summary: Ajouter un POI à une liste
     *     tags:
     *       - Listes
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       201:
     *         description: POI ajouté
     *   delete:
     *     summary: Retirer un POI d'une liste
     *     tags:
     *       - Listes
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: POI retiré
     */
  `,

  // ITINERARIES
  itineraries: `
    /**
     * @swagger
     * /api/itineraries:
     *   get:
     *     summary: Mes itinéraires
     *     tags:
     *       - Itinéraires
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Liste des itinéraires
     *   post:
     *     summary: Créer un itinéraire
     *     tags:
     *       - Itinéraires
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *     responses:
     *       201:
     *         description: Itinéraire créé
     */
  `,

  itineraryDetail: `
    /**
     * @swagger
     * /api/itineraries/{id}:
     *   get:
     *     summary: Détail d'un itinéraire
     *     tags:
     *       - Itinéraires
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Détail de l'itinéraire
     *   delete:
     *     summary: Supprimer un itinéraire
     *     tags:
     *       - Itinéraires
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Itinéraire supprimé
     */
  `,

  itineraryRoute: `
    /**
     * @swagger
     * /api/itineraries/{id}/route:
     *   post:
     *     summary: Calculer le chemin optimal
     *     tags:
     *       - Itinéraires
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Route calculée (GeoJSON)
     */
  `,

  // ADMIN
  adminUsers: `
    /**
     * @swagger
     * /api/admin/users:
     *   get:
     *     summary: Lister tous les utilisateurs
     *     tags:
     *       - Admin
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Liste des utilisateurs
     */
  `,

  adminUserDetail: `
    /**
     * @swagger
     * /api/admin/users/{id}:
     *   patch:
     *     summary: Activer/Désactiver un utilisateur
     *     tags:
     *       - Admin
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *     responses:
     *       200:
     *         description: Utilisateur modifié
     */
  `,
}
