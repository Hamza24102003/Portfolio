// Fonction pour formater la date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Articles sur la cybersécurité en entreprise
const recommendedArticles = [
    {
        title: "Les tendances de la cybersécurité en 2024",
        description: "Découvrez les principales tendances et défis de la cybersécurité pour les entreprises en 2024, de l'IA à la protection des données.",
        category: "Tendances",
        readTime: "5 min",
        image: "/images/articles/cybersecurity-trends.jpg",
        url: "https://www.lemondeinformatique.fr/actualites/lire-les-10-tendances-cybersecurite-pour-2024-selon-gartner-90489.html"
    },
    {
        title: "Cybersécurité : Les bonnes pratiques pour les PME",
        description: "Guide complet des mesures essentielles que les petites et moyennes entreprises doivent mettre en place pour se protéger.",
        category: "Guide",
        readTime: "7 min",
        image: "/images/articles/sme-security.jpg",
        url: "https://www.ssi.gouv.fr/entreprise/guide/guide-des-bonnes-pratiques-de-linformatique/"
    },
    {
        title: "L'impact de l'IA sur la sécurité informatique",
        description: "Comment l'intelligence artificielle transforme la cybersécurité et aide les entreprises à mieux se protéger.",
        category: "Technologie",
        readTime: "6 min",
        image: "/images/articles/ai-security.jpg",
        url: "https://www.journaldunet.com/solutions/dsi/1520685-l-ia-au-service-de-la-cybersecurite/"
    },
    
      
    
    {
        title: "Conformité RGPD : Les obligations des entreprises",
        description: "Mise à jour sur les exigences de protection des données et les bonnes pratiques pour rester conforme.",
        category: "Réglementation",
        readTime: "6 min",
        image: "/images/articles/gdpr-compliance.jpg",
        url: "https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on"
    },
    {
        title: "La sécurité cloud : Enjeux et solutions",
        description: "Analyse des risques liés au cloud computing et des solutions pour sécuriser les données en entreprise.",
        category: "Cloud",
        readTime: "7 min",
        image: "/images/articles/cloud-security.jpg",
        url: "https://www.cio-online.com/actualites/lire-securite-cloud-les-5-bonnes-pratiques-a-adopter-12345.html"
    }
];

// Fonction pour créer une carte d'actualité
function createNewsCard(article) {
    return `
        <div class="news-card">
            <div class="news-header">
                <span class="news-date">${formatDate(article.publishedAt)}</span>
                <span class="news-source">${article.source.name}</span>
            </div>
            <h5 class="news-title">${article.title}</h5>
            <p class="news-description">${article.description}</p>
            <a href="${article.url}" target="_blank" class="news-link">Lire l'article</a>
        </div>
    `;
}

// Fonction pour créer une carte d'article recommandé
function createRecommendedCard(article) {
    return `
        <div class="recommended-card">
            <div class="recommended-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="recommended-content">
                <div class="article-meta">
                    <span class="article-category">${article.category}</span>
                    <span class="article-read-time">${article.readTime}</span>
                </div>
                <h5 class="article-title">${article.title}</h5>
                <p class="article-description">${article.description}</p>
                <a href="${article.url}" target="_blank" class="read-more">Lire l'article</a>
            </div>
        </div>
    `;
}

// Fonction pour afficher les articles recommandés
function displayRecommendedArticles() {
    const recommendedContainer = document.createElement('div');
    recommendedContainer.className = 'recommended-articles';
    recommendedContainer.innerHTML = `
        <h4 class="section-title">Actualités Cybersécurité</h4>
        <div class="recommended-grid">
            ${recommendedArticles.map(createRecommendedCard).join('')}
        </div>
    `;
    
    const newsFeed = document.getElementById('news-feed');
    newsFeed.parentNode.insertBefore(recommendedContainer, newsFeed.nextSibling);
}

// Fonction pour charger les actualités
async function loadNews() {
    try {
        // Remplacez 'YOUR_API_KEY' par une clé API valide
        const response = await fetch('https://newsapi.org/v2/everything?q=cybersecurity&language=fr&sortBy=publishedAt&apiKey=YOUR_API_KEY');
        const data = await response.json();
        
        const newsContainer = document.getElementById('news-feed');
        if (data.articles && data.articles.length > 0) {
            newsContainer.innerHTML = data.articles.slice(0, 6).map(createNewsCard).join('');
        } else {
            newsContainer.innerHTML = '<p class="no-news">Aucune actualité disponible pour le moment.</p>';
        }
        
        // Afficher les articles recommandés
        displayRecommendedArticles();
    } catch (error) {
        console.error('Erreur lors du chargement des actualités:', error);
        document.getElementById('news-feed').innerHTML = '<p class="error-message">Erreur lors du chargement des actualités. Veuillez réessayer plus tard.</p>';
    }
}

// Charger les actualités au chargement de la page
document.addEventListener('DOMContentLoaded', loadNews);
