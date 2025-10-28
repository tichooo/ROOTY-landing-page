# 📧 Configuration SendGrid pour Render

SendGrid est nécessaire car Render (et la plupart des services cloud gratuits) bloquent les connexions SMTP directes à Gmail.

## 🚀 Étapes de configuration (5 minutes)

### 1. Créer un compte SendGrid

1. Allez sur https://signup.sendgrid.com/
2. Créez un compte gratuit (100 emails/jour gratuitement)
3. Vérifiez votre email
4. Remplissez le questionnaire initial (sélectionnez "Web App" comme use case)

### 2. Créer une API Key

1. Dans le dashboard SendGrid, allez dans **Settings** → **API Keys**
2. Cliquez sur **"Create API Key"**
3. Nom : `Rooty Production`
4. Permissions : **Full Access** (ou "Restricted Access" avec Mail Send activé)
5. Cliquez **"Create & View"**
6. **⚠️ COPIEZ LA CLÉ IMMÉDIATEMENT** (elle ne sera plus visible après)

La clé ressemble à : `SG.xxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy`

### 3. Vérifier un expéditeur (Sender Identity)

SendGrid exige de vérifier l'expéditeur :

#### Option A : Single Sender Verification (RAPIDE)

1. Allez dans **Settings** → **Sender Authentication**
2. Cliquez **"Verify a Single Sender"**
3. Remplissez le formulaire :
   - **From Name** : Rooty
   - **From Email Address** : votre-email@gmail.com (utilisez votre vraie adresse)
   - **Reply To** : votre-email@gmail.com
   - **Company Address** : Votre adresse
4. Cliquez **"Create"**
5. **Vérifiez l'email** que SendGrid vous envoie
6. Cliquez sur le lien de vérification

#### Option B : Domain Authentication (AVANCÉ)

Pour utiliser `noreply@rooty.app`, vous devez avoir un domaine et configurer les DNS.

### 4. Mettre à jour le code

Le code est déjà prêt ! Il détecte automatiquement si SendGrid est disponible.

Vous devez juste mettre à jour l'email expéditeur dans `server/index.js` :

```javascript
const fromEmail = process.env.SENDGRID_API_KEY 
  ? 'votre-email-verifie@gmail.com' // Remplacez par l'email vérifié à l'étape 3
  : process.env.EMAIL_USER || 'your-email@gmail.com';
```

### 5. Configurer les variables d'environnement dans Render

1. Allez dans votre service Render
2. **Environment** → **Environment Variables**
3. Ajoutez ces variables :

```
SENDGRID_API_KEY=SG.votre-clé-sendgrid
FRONTEND_URL=https://votre-site.vercel.app
EMAIL_USER=votre-email@gmail.com
```

4. Cliquez **"Save Changes"**
5. Render va automatiquement redéployer

### 6. Tester

1. Allez sur votre site Vercel
2. Essayez de vous inscrire avec un email
3. Vous devriez recevoir l'email de vérification ! 🎉

---

## 🔍 Vérification

Dans les logs Render, vous devriez voir :
```
🔑 Configuration email: { ..., hasSendGrid: true }
✅ Email envoyé avec succès
```

Au lieu de :
```
❌ Erreur lors de l'envoi de l'email: Connection timeout
```

---

## 📊 Limites du plan gratuit SendGrid

- ✅ 100 emails/jour (suffisant pour débuter)
- ✅ Emails transactionnels (vérification, reset password)
- ⚠️ Marque SendGrid dans les emails
- 💡 Plan payant à partir de $15/mois pour 50,000 emails

---

## 🆘 Problèmes courants

### "Sender email not verified"

→ Retournez à l'étape 3 et vérifiez votre email expéditeur

### "API Key invalid"

→ Vérifiez que vous avez copié la clé complète (commence par `SG.`)

### Emails ne sont pas reçus

→ Vérifiez vos spams
→ Consultez les logs dans SendGrid : Activity → Email Activity

---

## 🎯 Résumé rapide

```bash
1. Créer compte SendGrid → https://signup.sendgrid.com/
2. Créer API Key → Settings → API Keys
3. Vérifier email expéditeur → Settings → Sender Authentication
4. Ajouter SENDGRID_API_KEY dans Render
5. Ajouter FRONTEND_URL dans Render
6. Mettre à jour l'email dans le code
7. Push vers GitHub
8. Tester ! 🚀
```
