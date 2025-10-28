# 🚀 Configuration Vercel KV - Guide Complet

## ✅ Ce qui a été fait

Toutes les API ont été migrées vers **Vercel KV (Redis)** :
- ✅ `register.js` - Inscription des utilisateurs
- ✅ `login.js` - Connexion des utilisateurs
- ✅ `subscribe.js` - Abonnement newsletter
- ✅ `admin/export-users.js` - Export des utilisateurs en JSON
- ✅ `admin/export-subscribers.js` - Export des abonnés en JSON
- ✅ Page d'administration : `/admin`

---

## 🎯 Configuration dans Vercel (5 minutes)

### Étape 1 : Créer la base de données KV

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet `rooty-landing-page`
3. Cliquez sur l'onglet **"Storage"** en haut
4. Cliquez sur **"Create Database"**
5. Sélectionnez **"KV"** (Redis)
6. Donnez un nom : `rooty-users-db`
7. Sélectionnez la région : **Frankfurt** (ou la plus proche de vous)
8. Cliquez sur **"Create"**

### Étape 2 : Connecter au projet

1. Une fois la base créée, cliquez sur **"Connect Project"**
2. Sélectionnez votre projet : `rooty-landing-page`
3. Cochez **"Production"**, **"Preview"**, et **"Development"**
4. Cliquez sur **"Connect"**

✅ **C'est tout !** Vercel ajoute automatiquement toutes les variables d'environnement nécessaires :
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### Étape 3 : Redéployer

Le code est déjà prêt ! Il suffit de push vers GitHub :

\`\`\`bash
git add .
git commit -m "feat: Migrate to Vercel KV for persistent storage"
git push origin main
\`\`\`

Vercel va automatiquement redéployer avec la nouvelle base de données ! 🎉

---

## 📊 Utilisation de la page d'administration

### Accéder à l'admin

Une fois déployé, allez sur :
\`\`\`
https://votre-site.vercel.app/admin
\`\`\`

Vous verrez :
- 📈 **Statistiques** : Nombre d'utilisateurs et d'abonnés
- 📥 **Export JSON** : Boutons pour télécharger les données
- 💡 **Instructions Excel** : Comment ouvrir les JSON dans Excel

### Exporter les données

1. Cliquez sur **"Actualiser les stats"** pour voir les chiffres
2. Cliquez sur **"📥 Télécharger JSON"** pour :
   - **Utilisateurs** : Liste de tous les comptes créés
   - **Abonnés** : Liste des emails newsletter

Le fichier téléchargé s'appellera : `rooty-users-1730123456789.json`

### Ouvrir dans Excel

1. **Ouvrez Excel**
2. Onglet **"Données"**
3. **"Obtenir des données"** → **"À partir d'un fichier"** → **"À partir de JSON"**
4. Sélectionnez le fichier téléchargé
5. Cliquez sur **"Transformer les données"**
6. Dans Power Query, cliquez sur **"Convertir en table"**
7. Développez les colonnes si nécessaire
8. Cliquez sur **"Fermer et charger"**

✅ Vous avez maintenant un tableau Excel avec toutes vos données !

---

## 🔐 Structure des données

### Utilisateurs (users)

Chaque utilisateur est stocké avec la clé : `user:{email}`

\`\`\`json
{
  "id": "uuid-v4",
  "email": "user@example.com",
  "password": "hashed-bcrypt",
  "verified": true,
  "createdAt": "2025-10-28T10:30:00.000Z"
}
\`\`\`

Liste de tous les emails : `users:all` (Redis SET)

### Abonnés (subscribers)

Chaque abonné est stocké avec la clé : `subscriber:{email}`

\`\`\`json
{
  "email": "user@example.com",
  "subscribedAt": "2025-10-28T10:30:00.000Z"
}
\`\`\`

Liste de tous les emails : `subscribers:all` (Redis SET)

---

## 🧪 Tester localement

### Avec Vercel CLI

\`\`\`bash
# Installer Vercel CLI (une seule fois)
npm install -g vercel

# Lier votre projet
vercel link

# Télécharger les variables d'environnement
vercel env pull

# Lancer en local avec KV
vercel dev
\`\`\`

Maintenant votre application locale utilise la vraie base Vercel KV !

---

## 📊 Limites du plan gratuit

| Ressource | Limite gratuite |
|-----------|----------------|
| Stockage | 256 MB |
| Requêtes | 10,000 / mois |
| Bande passante | 100 MB / mois |

**Pour votre cas :**
- 1 utilisateur ≈ 0.5 KB
- 256 MB = ~500,000 utilisateurs possibles
- 10,000 requêtes = ~300 inscriptions/connexions par mois

✅ **Largement suffisant pour débuter !**

---

## 🔍 Visualiser les données dans Vercel

1. Allez dans votre dashboard Vercel
2. Storage → Votre base KV
3. Onglet **"Data"**
4. Vous pouvez voir toutes les clés et valeurs
5. Rechercher par clé : `user:email@example.com`

---

## 🆘 Dépannage

### "KV_URL is not defined"

→ Vous n'avez pas créé la base KV dans Vercel
→ Suivez l'étape 1 ci-dessus

### Les données ne persistent pas

→ Vérifiez que les variables d'environnement sont bien configurées
→ Dans Vercel : Settings → Environment Variables

### "Cannot connect to KV"

→ En local : Utilisez `vercel dev` au lieu de `npm start`
→ En production : Vérifiez que le projet est bien connecté à la base KV

### Je ne vois pas mes données dans l'admin

→ Créez d'abord un compte utilisateur ou abonnez-vous à la newsletter
→ Actualisez les stats avec le bouton "🔄 Actualiser"

---

## 🎉 Avantages de Vercel KV

✅ **Persistant** : Les données ne se perdent jamais
✅ **Rapide** : Base en mémoire (Redis)
✅ **Gratuit** : 256 MB inclus
✅ **Zero config** : Intégré à Vercel
✅ **Scalable** : Passe automatiquement à l'échelle
✅ **Backups** : Gérés par Vercel
✅ **Export facile** : JSON téléchargeable

---

## 📚 Prochaines étapes

Une fois que vous avez beaucoup d'utilisateurs, vous pouvez :
- 🔐 Ajouter une authentification admin
- 📊 Créer des graphiques de croissance
- 📧 Intégrer un service d'emailing (Mailchimp, SendGrid)
- 💳 Ajouter des paiements (Stripe)
- 🔍 Ajouter des filtres et recherches
- 📱 Créer une app mobile admin

Mais pour l'instant, vous avez tout ce qu'il faut ! 🚀
