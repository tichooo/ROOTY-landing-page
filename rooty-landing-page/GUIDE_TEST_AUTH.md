# 🧪 Guide de Test - Authentification Simple# Guide de test du système d'authentification



## ✅ Système d'authentification simplifié## Configuration initiale



Votre système fonctionne maintenant sans envoi d'email :### 1. Configuration du serveur

- ✅ Les utilisateurs s'inscrivent avec email + mot de passe

- ✅ Le compte est créé instantanément (pas de vérification)1. Allez dans le dossier serveur :

- ✅ Ils peuvent se connecter immédiatement après inscription```bash

cd server

---```



## 🧪 Comment tester en local2. Créez un fichier `.env` avec vos identifiants email :

```env

### 1️⃣ Démarrer l'applicationEMAIL_USER=votre-email@gmail.com

EMAIL_PASS=votre-mot-de-passe-app

```bashPORT=4000

npm start```

```

**Important pour Gmail :**

Ouvrez http://localhost:3000- Activez l'authentification à 2 facteurs sur votre compte Google

- Générez un mot de passe d'application : https://myaccount.google.com/apppasswords

### 2️⃣ Test d'inscription- Utilisez ce mot de passe d'application (pas votre mot de passe normal)



1. Allez sur http://localhost:3000/auth3. Démarrez le serveur :

2. Cliquez sur "Créer un compte" (ou "Create account")```bash

3. Remplissez :npm start

   - **Email** : test@example.com```

   - **Mot de passe** : test1234

4. Cliquez sur "Créer un compte"### 2. Démarrage de l'application React

5. ✅ Vous devriez voir : "Compte créé avec succès ! Vous pouvez maintenant vous connecter."

6. Après 2 secondes, le formulaire bascule automatiquement en mode connexionDans un autre terminal :

```bash

### 3️⃣ Test de connexionnpm start

```

1. Le formulaire devrait maintenant être en mode connexion

2. Entrez les mêmes identifiants :## Test du système

   - **Email** : test@example.com

   - **Mot de passe** : test1234### 1. Inscription

3. Cliquez sur "Se connecter"

4. ✅ Vous devriez voir : "Connexion réussie !"1. Allez sur http://localhost:3000/auth

5. Vous êtes redirigé vers la page Premium2. Cliquez sur l'onglet "Register"

3. Entrez un email valide

### 4️⃣ Test de persistance4. Entrez un mot de passe (minimum 6 caractères)

5. Cliquez sur le bouton œil pour vérifier que le mot de passe s'affiche/se masque

1. Actualisez la page (F5)6. Soumettez le formulaire

2. ✅ Vous devriez rester connecté (icône de profil visible dans le header)

3. Cliquez sur l'icône de profil**Résultat attendu :**

4. Cliquez sur "Déconnexion"- Message de succès : "Compte créé ! Veuillez vérifier votre email..."

5. ✅ Vous êtes déconnecté et l'icône disparaît- Un email de vérification est envoyé à l'adresse indiquée



---### 2. Vérification d'email



## 🔍 Tests d'erreur1. Ouvrez votre boîte email

2. Trouvez l'email de Rooty

### Email invalide3. Cliquez sur le bouton "Verify Email Address"

1. Essayez de vous inscrire avec : `test@test`4. Vous serez redirigé vers la page de vérification

2. ✅ Vous devriez voir : "Veuillez entrer une adresse email valide"

**Résultat attendu :**

### Mot de passe trop court- Page avec message de succès "Email vérifié !"

1. Essayez avec un mot de passe : `123`- Bouton pour aller à la connexion

2. ✅ Vous devriez voir : "Password must be at least 6 characters"

### 3. Connexion

### Email déjà utilisé

1. Essayez de créer un compte avec un email déjà enregistré1. Cliquez sur "Go to Login" ou allez sur /auth

2. ✅ Vous devriez voir : "Email already registered"2. Entrez votre email et mot de passe

3. Soumettez le formulaire

### Email inconnu

1. Essayez de vous connecter avec : `inconnu@example.com`**Résultat attendu :**

2. ✅ Vous devriez voir : "Email not found. Please register first."- Message "Connexion réussie !"

- Redirection vers /premium après 1.5 secondes

### Mauvais mot de passe

1. Utilisez un email existant mais un mauvais mot de passe## Validation des fonctionnalités

2. ✅ Vous devriez voir : "Incorrect password"

✅ **Validation d'email** :

---- Testez avec des emails invalides (sans @, sans domaine, etc.)

- Le message d'erreur doit apparaître en rouge sous le champ

## 🎯 Résumé des flux

✅ **Bouton œil** :

### Flux d'inscription- Le mot de passe doit alterner entre masqué (•••) et visible

```- L'icône doit changer entre œil barré et œil ouvert

1. User remplit email + password

2. Validation côté client✅ **Email de vérification** :

3. Requête POST /api/auth/register- L'email doit contenir un bouton cliquable

4. Backend vérifie si email existe déjà- Le lien doit fonctionner et marquer le compte comme vérifié

5. Hash du mot de passe avec bcrypt- Après vérification, impossible de réutiliser le même lien

6. Création de l'utilisateur (verified: true)

7. Message de succès✅ **Sécurité** :

8. Basculement automatique vers login après 2s- Les mots de passe sont hashés avec bcrypt

```- Impossible de se connecter sans vérifier l'email

- Les tokens de vérification expirent après 24h

### Flux de connexion

```## Fichiers de données

1. User remplit email + password

2. Requête POST /api/auth/loginLe serveur crée automatiquement ces fichiers :

3. Backend vérifie l'utilisateur et le mot de passe- `users.json` : Liste des utilisateurs avec mots de passe hashés

4. Retour des données utilisateur- `verification_tokens.json` : Tokens de vérification actifs

5. Stockage dans localStorage- `subscribers.csv` : Abonnés à la newsletter

6. Redirection vers /premium

```**Note** : Ces fichiers sont dans `.gitignore` et ne seront pas committés.



---## Dépannage



## ⚠️ Important pour la production### L'email n'arrive pas



Les données sont stockées temporairement dans `/tmp` sur Vercel :1. Vérifiez que `EMAIL_USER` et `EMAIL_PASS` sont corrects dans `.env`

- ⏱️ Durée de vie : ~15 minutes2. Pour Gmail, assurez-vous d'utiliser un mot de passe d'application

- 🗑️ Supprimées à chaque déploiement3. Vérifiez les logs du serveur pour voir les erreurs

4. Vérifiez votre dossier spam

Pour la production, utilisez une vraie base de données :

- Vercel KV (Redis)### Erreur de connexion au serveur

- Supabase (PostgreSQL)

- MongoDB Atlas1. Vérifiez que le serveur est lancé sur le port 4000

2. Vérifiez les logs du serveur

---3. Assurez-vous que CORS est activé



## 🎉 Avantages### Le lien de vérification ne fonctionne pas



- ✅ **Simple** : Pas de complexité d'envoi d'email1. Vérifiez que le token est présent dans l'URL

- ✅ **Rapide** : Inscription instantanée2. Le token expire après 24h - demandez un nouvel email

- ✅ **Gratuit** : Pas de service externe3. Vérifiez les logs du serveur pour voir les erreurs

- ✅ **Fiable** : Pas de dépendance SMTP

- ✅ **UX fluide** : Connexion immédiate## Configuration alternative : Autres services d'email



Parfait pour un MVP ! 🚀### SendGrid

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

### Outlook
```javascript
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```
