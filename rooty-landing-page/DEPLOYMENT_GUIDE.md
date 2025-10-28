# 🚀 Guide de Déploiement - Rooty Landing Page

Ce guide vous explique comment déployer votre frontend (Vercel) et votre backend (Render).

## 📋 Prérequis

- Compte GitHub avec votre repository
- Compte Vercel (déjà configuré ✅)
- Compte Render (gratuit)
- Identifiants Gmail avec App Password

---

## 🔧 Étape 1 : Déployer le Backend sur Render

### 1.1 Créer un compte Render

1. Allez sur https://render.com
2. Cliquez sur "Get Started"
3. Connectez-vous avec GitHub

### 1.2 Créer un nouveau Web Service

1. Dans le dashboard Render, cliquez sur **"New +"** → **"Web Service"**
2. Connectez votre repository GitHub : `tichooo/ROOTY-landing-page`
3. Configurez le service :

   **Nom** : `rooty-backend` (ou le nom de votre choix)
   
   **Root Directory** : `server`
   
   **Environment** : `Node`
   
   **Region** : Choisissez la région la plus proche (ex: Frankfurt pour l'Europe)
   
   **Branch** : `main`
   
   **Build Command** : `npm install`
   
   **Start Command** : `npm start`
   
   **Plan** : Free (0$/mois)

### 1.3 Configurer les variables d'environnement

Dans la section "Environment Variables", ajoutez :

```
EMAIL_USER=my.rooty.app@gmail.com
EMAIL_PASS=yznlgpbotulvdyae
NODE_ENV=production
PORT=4000
```

⚠️ **Important** : Utilisez votre vrai App Password Gmail (celui configuré dans votre .env local)

### 1.4 Déployer

1. Cliquez sur **"Create Web Service"**
2. Render va automatiquement :
   - Cloner votre repo
   - Installer les dépendances
   - Démarrer le serveur
   
3. **Attendez 2-3 minutes** que le déploiement se termine

4. Une fois terminé, vous verrez l'URL de votre backend :
   ```
   https://rooty-backend-XXXX.onrender.com
   ```
   
5. **Copiez cette URL** - vous en aurez besoin pour l'étape suivante

---

## 🌐 Étape 2 : Mettre à jour le Frontend sur Vercel

### 2.1 Configurer l'URL du backend

1. Ouvrez votre projet dans VS Code
2. Éditez le fichier `src/config/api.js` :

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://votre-backend-url.onrender.com' // ⬅️ REMPLACEZ PAR VOTRE URL RENDER
    : 'http://localhost:4000');

export default API_BASE_URL;
```

**OU** configurez la variable d'environnement dans Vercel :

### 2.2 Ajouter la variable d'environnement dans Vercel

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet `rooty-landing-page`
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez :
   ```
   Name: REACT_APP_API_URL
   Value: https://votre-backend-url.onrender.com
   ```
5. Cliquez sur **"Save"**

### 2.3 Redéployer le frontend

#### Option A : Via Git (recommandé)

```powershell
git add .
git commit -m "Update backend API URL for production"
git push origin main
```

Vercel détectera automatiquement le push et redéploiera.

#### Option B : Redéploiement manuel

Dans le dashboard Vercel :
1. Allez dans **Deployments**
2. Cliquez sur le bouton **"Redeploy"** sur le dernier déploiement

---

## ✅ Étape 3 : Tester le déploiement

### 3.1 Tester le backend

Ouvrez votre navigateur et testez :
```
https://votre-backend-url.onrender.com/api/subscribe
```

Vous devriez voir une erreur (c'est normal, c'est un POST endpoint).

### 3.2 Tester le frontend

1. Allez sur votre site Vercel
2. Essayez de vous inscrire avec un email
3. Vérifiez que vous recevez un email de vérification
4. Cliquez sur le lien de vérification
5. Connectez-vous avec vos identifiants

---

## 🔍 Dépannage

### Le backend ne démarre pas sur Render

- Vérifiez les logs dans Render Dashboard → Logs
- Assurez-vous que toutes les variables d'environnement sont correctes
- Vérifiez que `server/package.json` contient bien `"start": "node index.js"`

### Erreur "Unable to connect to server"

- Vérifiez que l'URL du backend dans `src/config/api.js` est correcte
- Vérifiez que le backend est bien déployé et en ligne sur Render
- Ouvrez la console du navigateur (F12) pour voir les erreurs réseau

### Les emails ne sont pas envoyés

- Vérifiez que `EMAIL_USER` et `EMAIL_PASS` sont corrects dans Render
- Vérifiez que votre App Password Gmail est toujours valide
- Consultez les logs Render pour voir les erreurs d'envoi d'email

### Le site Vercel ne se met pas à jour

- Forcez un nouveau build : Settings → General → Clear Build Cache & Redeploy
- Vérifiez que les variables d'environnement sont bien configurées

---

## 💡 Notes importantes

### Service gratuit Render

Le plan gratuit de Render :
- ✅ Parfait pour un site de landing page
- ⚠️ Le serveur se met en "veille" après 15 minutes d'inactivité
- ⏱️ Le premier appel après veille prend ~30 secondes (démarrage du serveur)
- 💡 Suffisant pour débuter, passez au plan payant si le trafic augmente

### Données persistantes

Actuellement, les données (users.json, verification_tokens.json) sont stockées dans des fichiers.

⚠️ **Important** : Sur Render gratuit, ces fichiers sont **effacés à chaque redéploiement**.

Pour la production, envisagez d'utiliser :
- MongoDB Atlas (base de données gratuite)
- PostgreSQL (via Render ou Supabase)
- Firebase Firestore

---

## 📚 Ressources

- [Documentation Render](https://render.com/docs)
- [Documentation Vercel](https://vercel.com/docs)
- [Nodemailer Gmail Setup](https://nodemailer.com/usage/using-gmail/)

---

## 🎉 C'est terminé !

Votre site est maintenant en ligne avec :
- ✅ Frontend sur Vercel
- ✅ Backend sur Render
- ✅ Système d'authentification fonctionnel
- ✅ Envoi d'emails de vérification

Bonne chance avec Rooty ! 🚀
