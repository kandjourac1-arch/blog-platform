// Enhanced search index and client search (title + excerpt + tags)
const index = [
  {slug: '/articles/001-ia-generative-effets-marche-travail.html', title: "L'IA générative et ses effets structurels sur le marché du travail", excerpt: "Analyse des transformations que l'IA générative impose aux compétences, aux modèles d'emploi et aux politiques publiques.", tags:['IA','emploi']},
  {slug: '/articles/002-transition-energetique-europe.html', title: 'Transition énergétique en Europe : progrès, blocages et scénarios', excerpt: 'Bilan analytique des politiques énergétiques européennes.', tags:['énergie','climat']},
  {slug: '/articles/003-crise-energetique-mondiale.html', title: 'Crise énergétique mondiale : dépendances, géopolitique et pistes de résilience', excerpt: 'Analyse des tensions sur les marchés de l\'énergie.', tags:['énergie','géopolitique']},
  {slug: '/articles/004-sante-publique-apres-pandemie.html', title: 'Santé publique après la pandémie : leçons et priorités pour les systèmes de soins', excerpt: 'Synthèse des enseignements des dernières crises sanitaires.', tags:['santé']},
  {slug: '/articles/005-cybersecurite-processus-electoraux.html', title: 'Cyber-sécurité et processus électoraux : risques et réponses démocratiques', excerpt: 'Évaluation des menaces numériques pesant sur les élections.', tags:['cybersécurité']},
  {slug: '/articles/006-regulation-ia-internationale.html', title: "La régulation de l'IA à l'échelle internationale", excerpt: 'Panorama des efforts internationaux pour encadrer l\'IA.', tags:['IA','régulation']},
  {slug: '/articles/007-inflation-politiques-monétaires.html', title: 'Inflation et politiques monétaires : état des lieux', excerpt: 'Analyse des trajectoires inflationnistes récentes.', tags:['économie']},
  {slug: '/articles/008-criminalite-financiere-nouvelles-technologies.html', title: 'Criminalité financière et nouvelles technologies', excerpt: 'Comment la numérisation facilite certains types de fraudes.', tags:['finance']},
  {slug: '/articles/009-education-inegalites-tech.html', title: 'Éducation et inégalités : l\'impact des technologies éducatives', excerpt: 'Les EdTech peuvent réduire ou amplifier les inégalités.', tags:['éducation']},
  {slug: '/articles/010-banques-centrales-transition-verte.html', title: 'Rôle des banques centrales dans la transition verte', excerpt: 'Examens des instruments monétaires pour soutenir la décarbonation.', tags:['finance','environnement']},
  {slug: '/articles/011-automatisation-production-industrie.html', title: 'Automatisation en production : gains d\'efficacité et tensions sociales', excerpt: 'La robotisation des chaînes de production transforme l\'organisation du travail.', tags:['industrie']},
  {slug: '/articles/012-souverainete-numerique-europe.html', title: 'Souveraineté numérique : où en est l\'Europe face aux géants du cloud ?', excerpt: 'L\'autonomie numérique passe par des choix de souveraineté, de sécurité et de confiance.', tags:['tech']},
  {slug: '/articles/013-innovation-biomedicale.html', title: 'Innovation biomédicale : de la recherche aux usages de masse', excerpt: 'La bio-ingénierie ouvre des promesses majeures en matière de diagnostic et de thérapies.', tags:['santé']},
  {slug: '/articles/014-densification-urbaines.html', title: 'Densification urbaine : entre contraintes foncières et qualité de vie', excerpt: 'La ville compacte répond à la pression démographique.', tags:['ville']},
  {slug: '/articles/015-securite-logistique-mondiale.html', title: 'Sécurité logistique mondiale : fragilités et nouvelles stratégies', excerpt: 'Les interruptions de chaînes logistiques exposent les dépendances.', tags:['commerce']},
  {slug: '/articles/016-emploi-femmes-numerique.html', title: 'Emploi des femmes et numérique : progrès, freins, et trajectoires de convergence', excerpt: 'Le secteur numérique est un levier d\'inclusion, mais les écarts persistent.', tags:['soci��té']},
  {slug: '/articles/017-culture-ia-creation.html', title: 'Culture et IA générative : innovation créative ou normalisation des contenus ?', excerpt: 'Les outils génératifs modifient la création artistique.', tags:['culture']},
  {slug: '/articles/018-rechauffement-climatique-donnees.html', title: 'Réchauffement climatique et qualité des données : l\'impact des observations', excerpt: 'La qualité et la transparence des données climatiques sont essentielles.', tags:['climat']},
  {slug: '/articles/019-teletravail-organisation.html', title: 'Télétravail et organisation des équipes : encore une mutation à venir', excerpt: 'L\'organisation du travail hybride combine avantages et défis.', tags:['travail']},
  {slug: '/articles/020-education-ia-livre.html', title: "L'IA dans l'éducation : promesses, limites et règles de prudence", excerpt: 'Les tuteurs intelligents peuvent améliorer l\'apprentissage si leur usage est cadré.', tags:['éducation']}
];

const input = document.getElementById('searchInput');

input.addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  const cards = document.querySelectorAll('.card');
  if (!q) { cards.forEach(c=>c.style.display='block'); return; }
  cards.forEach(c=>c.style.display='none');
  const results = index.filter(item => (item.title + ' ' + item.excerpt + ' ' + (item.tags||[]).join(' ')).toLowerCase().includes(q));
  results.forEach(r => {
    const selector = `a.card-link[href$="${r.slug}"]`;
    const el = document.querySelector(selector);
    if (el) el.closest('.card').style.display='block';
  });
});
