# Guide de test du système d'authentification

## Configuration initiale

### 1. Configuration du serveur

1. Allez dans le dossier serveur :
```bash
cd server
```

2. Créez un fichier `.env` avec vos identifiants email :
```env
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-app
PORT=4000
```

**Important pour Gmail :**
- Activez l'authentification à 2 facteurs sur votre compte Google
- Générez un mot de passe d'application : https://myaccount.google.com/apppasswords
- Utilisez ce mot de passe d'application (pas votre mot de passe normal)

3. Démarrez le serveur :
```bash
npm start
```

### 2. Démarrage de l'application React

Dans un autre terminal :
```bash
npm start
```

## Test du système

### 1. Inscription

1. Allez sur http://localhost:3000/auth
2. Cliquez sur l'onglet "Register"
3. Entrez un email valide
4. Entrez un mot de passe (minimum 6 caractères)
5. Cliquez sur le bouton œil pour vérifier que le mot de passe s'affiche/se masque
6. Soumettez le formulaire

**Résultat attendu :**
- Message de succès : "Compte créé ! Veuillez vérifier votre email..."
- Un email de vérification est envoyé à l'adresse indiquée

### 2. Vérification d'email

1. Ouvrez votre boîte email
2. Trouvez l'email de Rooty
3. Cliquez sur le bouton "Verify Email Address"
4. Vous serez redirigé vers la page de vérification

**Résultat attendu :**
- Page avec message de succès "Email vérifié !"
- Bouton pour aller à la connexion

### 3. Connexion

1. Cliquez sur "Go to Login" ou allez sur /auth
2. Entrez votre email et mot de passe
3. Soumettez le formulaire

**Résultat attendu :**
- Message "Connexion réussie !"
- Redirection vers /premium après 1.5 secondes

## Validation des fonctionnalités

✅ **Validation d'email** :
- Testez avec des emails invalides (sans @, sans domaine, etc.)
- Le message d'erreur doit apparaître en rouge sous le champ

✅ **Bouton œil** :
- Le mot de passe doit alterner entre masqué (•••) et visible
- L'icône doit changer entre œil barré et œil ouvert

✅ **Email de vérification** :
- L'email doit contenir un bouton cliquable
- Le lien doit fonctionner et marquer le compte comme vérifié
- Après vérification, impossible de réutiliser le même lien

✅ **Sécurité** :
- Les mots de passe sont hashés avec bcrypt
- Impossible de se connecter sans vérifier l'email
- Les tokens de vérification expirent après 24h

## Fichiers de données

Le serveur crée automatiquement ces fichiers :
- `users.json` : Liste des utilisateurs avec mots de passe hashés
- `verification_tokens.json` : Tokens de vérification actifs
- `subscribers.csv` : Abonnés à la newsletter

**Note** : Ces fichiers sont dans `.gitignore` et ne seront pas committés.

## Dépannage

### L'email n'arrive pas

1. Vérifiez que `EMAIL_USER` et `EMAIL_PASS` sont corrects dans `.env`
2. Pour Gmail, assurez-vous d'utiliser un mot de passe d'application
3. Vérifiez les logs du serveur pour voir les erreurs
4. Vérifiez votre dossier spam

### Erreur de connexion au serveur

1. Vérifiez que le serveur est lancé sur le port 4000
2. Vérifiez les logs du serveur
3. Assurez-vous que CORS est activé

### Le lien de vérification ne fonctionne pas

1. Vérifiez que le token est présent dans l'URL
2. Le token expire après 24h - demandez un nouvel email
3. Vérifiez les logs du serveur pour voir les erreurs

## Configuration alternative : Autres services d'email

### SendGrid
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
