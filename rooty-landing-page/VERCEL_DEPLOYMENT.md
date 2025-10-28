# 🚀 Déploiement sur Vercel - Guide Complet

## 📋 Nouvelle Architecture

Tout est maintenant sur Vercel :
- ✅ Frontend React
- ✅ Backend (Serverless Functions)
- ✅ Emails via Google Apps Script

---

## 🎯 Étapes de déploiement

### 1️⃣ Configurer Google Apps Script

Suivez le guide complet : **[GUIDE_GOOGLE_APPS_SCRIPT.md](./GUIDE_GOOGLE_APPS_SCRIPT.md)**

En résumé :
1. Créez un script sur https://script.google.com
2. Copiez le code fourni dans le guide
3. Déployez comme Web App
4. Copiez l'URL générée

### 2️⃣ Configurer Vercel

#### A. Connecter le repository

1. Allez sur https://vercel.com
2. Cliquez sur "Add New Project"
3. Importez votre repository GitHub `tichooo/ROOTY-landing-page`

#### B. Configurer le projet

- **Framework Preset** : Create React App
- **Root Directory** : `rooty-landing-page`
- **Build Command** : `npm run build`
- **Output Directory** : `build`

#### C. Ajouter les variables d'environnement

Dans **Settings** → **Environment Variables**, ajoutez :

```
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/VOTRE_URL/exec
```

⚠️ Remplacez `VOTRE_URL` par l'URL copiée à l'étape 1

#### D. Déployer

Cliquez sur **"Deploy"**. Vercel va :
- Installer les dépendances
- Compiler le frontend
- Créer les serverless functions automatiquement
- Vous donner une URL de production

---

## 📁 Structure des API

Les API Vercel sont dans le dossier `/api` :

```
api/
├── register.js         → POST /api/auth/register
├── login.js           → POST /api/auth/login
├── verify-email.js    → GET /api/auth/verify-email
└── subscribe.js       → POST /api/subscribe
```

Les rewrites dans `vercel.json` font le mapping automatiquement.

---

## 🧪 Tester en local

### 1. Installer Vercel CLI

```bash
npm install -g vercel
```

### 2. Lancer le dev server

```bash
vercel dev
```

Cela lance :
- Le frontend React sur http://localhost:3000
- Les serverless functions sur http://localhost:3000/api/*

### 3. Configurer les variables d'environnement locales

Créez un fichier `.env.local` :

```
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/VOTRE_URL/exec
```

---

## 🔄 Mises à jour automatiques

Chaque fois que vous poussez vers GitHub :
```bash
git add .
git commit -m "Update"
git push origin main
```

Vercel détecte automatiquement le push et redéploie !

---

## ⚠️ Important : Limitations Vercel (Plan gratuit)

### Stockage temporaire (/tmp)

Les fichiers JSON (users.json, tokens.json) sont stockés dans `/tmp` :
- ✅ Fonctionne pour les tests
- ⚠️ Les données sont **effacées** après chaque déploiement
- ⚠️ Durée de vie limitée (~15 minutes)

### 🎯 Pour la production

Vous devez utiliser une vraie base de données :

#### Option 1 : Vercel KV (Redis) - Recommandé
- Gratuit jusqu'à 256 MB
- Intégration native Vercel
- https://vercel.com/docs/storage/vercel-kv

#### Option 2 : Supabase (PostgreSQL)
- Gratuit jusqu'à 500 MB
- Interface simple
- https://supabase.com

#### Option 3 : MongoDB Atlas
- Gratuit jusqu'à 512 MB
- NoSQL
- https://www.mongodb.com/atlas

---

## 📊 Surveillance

### Logs Vercel

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. Onglet **"Logs"**
4. Filtrez par fonction pour voir les erreurs

### Logs Google Apps Script

1. Ouvrez votre script sur https://script.google.com
2. **Affichage** → **Journaux d'exécution**
3. Voyez tous les emails envoyés et les erreurs

---

## 🆘 Problèmes courants

### "Cannot find module 'bcrypt'"

→ Vercel n'a peut-être pas installé les dépendances
→ Solution : Ajoutez un fichier `package.json` dans le dossier `/api`

### "GOOGLE_APPS_SCRIPT_URL is not defined"

→ Vérifiez que la variable d'environnement est bien configurée dans Vercel
→ Settings → Environment Variables

### Les emails ne sont pas envoyés

→ Vérifiez les logs Google Apps Script
→ Vérifiez que l'URL se termine bien par `/exec`
→ Testez l'Apps Script directement avec la fonction `testEmail()`

### "User not found" après vérification

→ Les données ont été effacées de `/tmp`
→ Solution temporaire : Inscrivez-vous et vérifiez rapidement
→ Solution permanente : Utilisez une vraie base de données (Vercel KV, Supabase, etc.)

---

## 🎉 Résumé

Votre site est maintenant :
- ✅ Hébergé sur Vercel (frontend + backend)
- ✅ Emails via Google Apps Script
- ✅ Déploiement automatique via Git
- ✅ Gratuit (avec limitations)

Pour passer en production réelle, ajoutez une base de données !

---

## 📚 Ressources

- [Documentation Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Guide Google Apps Script](./GUIDE_GOOGLE_APPS_SCRIPT.md)
- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
