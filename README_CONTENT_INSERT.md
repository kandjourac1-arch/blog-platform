# Blog Platform — Contenu généré AI

Ce commit ajoute un premier lot d'articles (10 articles : 5 articles complets en markdown + 5 résumés) et l'infrastructure minimale pour importer ces articles dans MongoDB.

Branche : features/ai/blog-site

Fichiers ajoutés :
- content/articles/*.md (articles)
- content/index.json (méta-index)
- scripts/importArticles.js (script d'import vers MongoDB)

Instructions rapides :
1. Installez les dépendances :
   npm install
2. Assurez-vous que MONGODB_URI est défini dans .env
3. Importez les articles :
   node scripts/importArticles.js

Après import, vous pouvez ajouter des routes pour servir ces articles depuis l'API existante (/api/articles). Le script suppose un modèle simple 'Article'.

Prochaines étapes :
- Valider le style des articles (je peux produire les 95 articles restants complets en lots de 20).
- Ajouter une interface front-end (React/Vite) pour afficher la liste et lire les articles.

