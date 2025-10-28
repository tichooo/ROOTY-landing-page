# 📧 Configuration Google Apps Script pour l'envoi d'emails

Ce guide vous explique comment créer un Google Apps Script pour envoyer des emails de vérification depuis votre compte Gmail.

## 🎯 Avantages de cette méthode

- ✅ **Gratuit** : Pas besoin de service payant
- ✅ **Simple** : Utilise votre compte Gmail existant
- ✅ **Fiable** : Google gère l'infrastructure
- ✅ **Quota** : 100 emails/jour (quota Gmail gratuit)

---

## 📝 Étape 1 : Créer le Google Apps Script

### 1.1 Créer un nouveau projet

1. Allez sur https://script.google.com
2. Cliquez sur **"Nouveau projet"**
3. Nommez le projet : `Rooty Email Service`

### 1.2 Copier le code

Remplacez tout le contenu par ce code :

\`\`\`javascript
function doPost(e) {
  try {
    // Parse the request body
    const data = JSON.parse(e.postData.contents);
    const { to, subject, verificationUrl } = data;
    
    // Validate input
    if (!to || !subject || !verificationUrl) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Email HTML template
    const htmlBody = \`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00D9B2; margin: 0;">Rooty</h1>
        </div>
        
        <h2 style="color: #333;">Welcome to Rooty!</h2>
        
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
          Thank you for creating an account. Please verify your email address by clicking the button below:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="\${verificationUrl}" 
             style="display: inline-block; padding: 15px 30px; 
                    background-color: #00D9B2; color: white; 
                    text-decoration: none; border-radius: 8px; 
                    font-weight: bold; font-size: 16px;">
            Verify Email Address
          </a>
        </div>
        
        <p style="color: #999; font-size: 14px;">
          Or copy and paste this link in your browser:
        </p>
        <p style="color: #00D9B2; word-break: break-all; font-size: 14px;">
          \${verificationUrl}
        </p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        
        <p style="color: #999; font-size: 12px; text-align: center;">
          This link will expire in 24 hours.<br>
          If you didn't create this account, please ignore this email.
        </p>
      </div>
    \`;
    
    // Send email
    GmailApp.sendEmail(to, subject, '', {
      htmlBody: htmlBody,
      name: 'Rooty'
    });
    
    // Log success
    Logger.log('Email sent to: ' + to);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Email sent successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional)
function testEmail() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        to: 'your-email@gmail.com', // Change this to your email for testing
        subject: 'Test Email from Rooty',
        verificationUrl: 'https://rooty.com/verify?token=test123'
      })
    }
  };
  
  const response = doPost(testData);
  Logger.log(response.getContent());
}
\`\`\`

### 1.3 Sauvegarder

Cliquez sur **💾 Enregistrer** (ou Ctrl+S)

---

## 🚀 Étape 2 : Déployer le script

### 2.1 Déployer comme Web App

1. Cliquez sur **"Déployer"** → **"Nouvelle version de déploiement"**
2. Configurez :
   - **Type** : Web App
   - **Exécuter en tant que** : Moi (votre-email@gmail.com)
   - **Qui peut accéder** : **Tout le monde**
3. Cliquez sur **"Déployer"**

### 2.2 Autoriser l'accès

1. Cliquez sur **"Autoriser l'accès"**
2. Choisissez votre compte Gmail
3. Cliquez sur **"Paramètres avancés"**
4. Cliquez sur **"Accéder à [nom du projet] (non sécurisé)"**
5. Cliquez sur **"Autoriser"**

### 2.3 Copier l'URL du Web App

Après le déploiement, vous verrez une URL comme :
\`\`\`
https://script.google.com/macros/s/AKfycbx.../exec
\`\`\`

**⚠️ COPIEZ CETTE URL** - vous en aurez besoin pour Vercel !

---

## 🧪 Étape 3 : Tester le script

### Option 1 : Test avec la fonction testEmail

1. Dans l'éditeur, modifiez l'email dans la fonction `testEmail`
2. Sélectionnez la fonction `testEmail` dans le menu déroulant
3. Cliquez sur **▶️ Exécuter**
4. Vérifiez vos logs : **Affichage** → **Journaux**
5. Vérifiez votre boîte email

### Option 2 : Test avec curl

\`\`\`bash
curl -X POST "https://script.google.com/macros/s/VOTRE_URL/exec" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "votre-email@gmail.com",
    "subject": "Test Rooty",
    "verificationUrl": "https://rooty.com/verify?token=test123"
  }'
\`\`\`

---

## ⚙️ Étape 4 : Configurer Vercel

### 4.1 Ajouter la variable d'environnement

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. **Settings** → **Environment Variables**
4. Ajoutez :
   - **Name** : `GOOGLE_APPS_SCRIPT_URL`
   - **Value** : L'URL copiée à l'étape 2.3
   - **Environment** : Cochez Production, Preview, et Development

### 4.2 Redéployer

Vercel va automatiquement redéployer avec la nouvelle variable.

---

## ✅ Étape 5 : Tester l'intégration complète

1. Allez sur votre site Vercel
2. Essayez de vous inscrire avec un email
3. Vérifiez votre boîte email
4. Cliquez sur le lien de vérification
5. Connectez-vous avec vos identifiants

---

## 🔍 Dépannage

### L'email n'arrive pas

1. **Vérifiez les spams** : L'email peut être dans les spams
2. **Vérifiez les logs Apps Script** :
   - Ouvrez votre script
   - **Affichage** → **Journaux d'exécution**
3. **Vérifiez la variable Vercel** : L'URL doit finir par `/exec`

### Erreur "Authorization required"

- Refaites l'étape 2.2 (Autoriser l'accès)
- Assurez-vous que "Qui peut accéder" est bien sur "Tout le monde"

### Quota dépassé

Google Apps Script permet **100 emails/jour** avec un compte Gmail gratuit.
Pour plus, vous devez :
- Utiliser Google Workspace (payant)
- Ou passer à un service d'emailing tiers

---

## 📊 Limites

| Limite | Valeur |
|--------|--------|
| Emails/jour | 100 (Gmail gratuit) |
| Emails/jour | 1500 (Google Workspace) |
| Temps d'exécution max | 6 minutes |
| Appels simultanés | 30 |

---

## 🎉 C'est terminé !

Votre système d'envoi d'emails est maintenant configuré avec :
- ✅ Google Apps Script pour l'envoi
- ✅ Vercel Serverless Functions pour l'API
- ✅ Frontend et Backend sur la même plateforme

Plus besoin de serveur séparé ! 🚀
