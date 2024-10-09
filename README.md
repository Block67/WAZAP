echo "# Projet API de Gestion des Abonnements WhatsApp

## Description

Ce projet est une API construite avec Node.js et Sequelize, permettant aux utilisateurs de s'inscrire, de se connecter, de gérer leurs abonnements et d'interagir avec l'API WhatsApp via une intégration avec WhatsApp Web JS.

## Fonctionnalités

- Inscription des utilisateurs
- Connexion des utilisateurs
- Gestion des abonnements
- Récupération de toutes les options d'abonnement
- Abonnement à un plan
- Intégration avec WhatsApp pour envoyer des messages

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/) ou tout autre système de gestion de base de données pris en charge par Sequelize.

## Installation

1. **Clonez le dépôt :**

   \`\`\`bash
   git clone https://github.com/votre-utilisateur/votre-repo.git
   cd votre-repo
   \`\`\`

2. **Installez les dépendances :**

   \`\`\`bash
   npm install
   \`\`\`

3. **Configurez la base de données :**
   - Créez une base de données et mettez à jour les informations de connexion dans le fichier \`config/sequelize.js\`.

4. **Migrations :**
   - Synchronisez les modèles avec la base de données :

   \`\`\`bash
   npm run migrate
   \`\`\`

5. **Démarrez le serveur :**

   \`\`\`bash
   npm start
   \`\`\`

## Utilisation

- **Inscription :**
  - POST \`/api/auth/register\`
  
- **Connexion :**
  - POST \`/api/auth/login\`

- **Récupérer tous les abonnements :**
  - GET \`/api/get-all-subscription\`

- **S'abonner à un plan :**
  - POST \`/api/subscribe\`
