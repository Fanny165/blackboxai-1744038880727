// Données des logements (simulées)
const properties = [
    {
        id: 1,
        title: "Appartement moderne",
        location: "Kagugu, Gisenyi",
        price: 350,
        bedrooms: 2,
        bathrooms: 1,
        area: 75,
        type: "Apartment",
        description: "Bel appartement lumineux situé à 10 minutes du centre-ville de Gisenyi. Comprend une cuisine équipée, un salon spacieux et une terrasse avec vue sur le lac Kivu.",
        amenities: ["WiFi", "Parking", "Climatisation", "Meublé"],
        images: [
            "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
            "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
            "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg"
        ]
    },
    {
        id: 2,
        title: "Studio meublé",
        location: "Cyiza, Gisenyi",
        price: 250,
        bedrooms: 1,
        bathrooms: 1,
        area: 45,
        type: "Studio",
        description: "Studio fonctionnel idéal pour une personne, situé dans un quartier calme à proximité des commerces.",
        amenities: ["WiFi", "Meublé", "Cuisine équipée"],
        images: [
            "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
            "https://images.pexels.com/photos/271616/pexels-photo-271616.jpeg"
        ]
    },
    {
        id: 3,
        title: "Maison spacieuse",
        location: "Mutakura, Gisenyi",
        price: 500,
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        type: "House",
        description: "Grande maison familiale avec jardin et vue sur le lac. Parfait pour les expatriés avec enfants.",
        amenities: ["Parking", "Jardin", "Cuisine équipée", "Sécurité"],
        images: [
            "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg",
            "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
        ]
    }
];

// Fonction pour afficher les logements sur la page d'accueil
function displayFeaturedProperties() {
    const featuredContainer = document.querySelector('#featured-properties');
    if (!featuredContainer) return;

    // Trier par prix et prendre les 3 premiers
    const featured = [...properties]
        .sort((a, b) => a.price - b.price)
        .slice(0, 3);

    featuredContainer.innerHTML = featured.map(property => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="${property.images[0]}" alt="${property.title}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-xl font-semibold">${property.title}</h3>
                <p class="text-gray-600">${property.location}</p>
                <div class="flex items-center mt-2 text-sm">
                    <i class="fas fa-bed text-blue-500 mr-1"></i>
                    <span class="mr-3">${property.bedrooms} chambre${property.bedrooms > 1 ? 's' : ''}</span>
                    <i class="fas fa-bath text-blue-500 mr-1"></i>
                    <span>${property.bathrooms} salle${property.bathrooms > 1 ? 's' : ''} de bain</span>
                </div>
                <p class="text-blue-600 font-bold mt-2">$${property.price}/mois</p>
                <button onclick="location.href='details.html?id=${property.id}'" 
                    class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                    Voir détails
                </button>
            </div>
        </div>
    `).join('');
}

// Fonction pour afficher tous les logements
function displayAllProperties() {
    const listingsContainer = document.querySelector('#property-listings');
    if (!listingsContainer) return;

    listingsContainer.innerHTML = properties.map(property => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="${property.images[0]}" alt="${property.title}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-xl font-semibold">${property.title}</h3>
                <p class="text-gray-600">${property.location}</p>
                <div class="flex items-center mt-2 text-sm">
                    <i class="fas fa-bed text-blue-500 mr-1"></i>
                    <span class="mr-3">${property.bedrooms} chambre${property.bedrooms > 1 ? 's' : ''}</span>
                    <i class="fas fa-bath text-blue-500 mr-1"></i>
                    <span>${property.bathrooms} salle${property.bathrooms > 1 ? 's' : ''} de bain</span>
                </div>
                <p class="text-blue-600 font-bold mt-2">$${property.price}/mois</p>
                <button onclick="location.href='details.html?id=${property.id}'" 
                    class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                    Voir détails
                </button>
            </div>
        </div>
    `).join('');
}

// Fonction pour afficher les détails d'un logement
function displayPropertyDetails() {
    const detailsContainer = document.querySelector('#property-details');
    if (!detailsContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = parseInt(urlParams.get('id'));
    const property = properties.find(p => p.id === propertyId);

    if (!property) {
        detailsContainer.innerHTML = '<p class="text-red-500">Logement non trouvé</p>';
        return;
    }

    // Mise à jour des images
    const imagesContainer = document.querySelector('#property-images');
    if (imagesContainer) {
        imagesContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                <img src="${property.images[0]}" alt="${property.title}" class="w-full h-96 object-cover">
            </div>
            <div class="grid grid-cols-3 gap-2">
                ${property.images.slice(1).map(img => `
                    <img src="${img}" alt="${property.title}" class="h-32 object-cover">
                `).join('')}
            </div>
        `;
    }

    // Mise à jour des détails
    detailsContainer.innerHTML = `
        <h2 class="text-2xl font-bold mb-2">${property.title}</h2>
        <p class="text-gray-600 mb-4">
            <i class="fas fa-map-marker-alt text-blue-500 mr-2"></i>
            ${property.location}
        </p>
        
        <div class="flex items-center justify-between mb-6">
            <div>
                <p class="text-3xl font-bold text-blue-600">$${property.price} <span class="text-lg font-normal">/mois</span></p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Disponible</span>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="flex items-center">
                <i class="fas fa-bed text-blue-500 mr-2"></i>
                <span>${property.bedrooms} Chambre${property.bedrooms > 1 ? 's' : ''}</span>
            </div>
            <div class="flex items-center">
                <i class="fas fa-bath text-blue-500 mr-2"></i>
                <span>${property.bathrooms} Salle${property.bathrooms > 1 ? 's' : ''} de bain</span>
            </div>
            <div class="flex items-center">
                <i class="fas fa-ruler-combined text-blue-500 mr-2"></i>
                <span>${property.area} m²</span>
            </div>
            <div class="flex items-center">
                <i class="fas fa-home text-blue-500 mr-2"></i>
                <span>${property.type}</span>
            </div>
        </div>

        <hr class="my-4">

        <h3 class="text-xl font-semibold mb-2">Description</h3>
        <p class="text-gray-700 mb-6">${property.description}</p>

        <h3 class="text-xl font-semibold mb-2">Équipements</h3>
        <div class="grid grid-cols-2 gap-2 mb-6">
            ${property.amenities.map(amenity => `
                <div class="flex items-center">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>${amenity}</span>
                </div>
            `).join('')}
        </div>

        <button class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mb-4">
            <i class="fas fa-phone mr-2"></i> Contacter le propriétaire
        </button>

        <button class="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600">
            <i class="fas fa-calendar-alt mr-2"></i> Réserver une visite
        </button>
    `;
}

// Gestion du formulaire de contact
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
            alert('Veuillez remplir tous les champs du formulaire.');
            return;
        }
        
        // En production, vous enverriez ces données à un serveur
        console.log('Message envoyé:', { name, email, subject, message });
        alert('Merci pour votre message! Nous vous contacterons bientôt.');
        contactForm.reset();
    });
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    // Détecter la page courante et initialiser les fonctions appropriées
    if (document.querySelector('#featured-properties')) {
        displayFeaturedProperties(); // Page d'accueil
    }
    
    if (document.querySelector('#property-listings')) {
        displayAllProperties(); // Page des logements
    }
    
    if (document.querySelector('#property-details')) {
        displayPropertyDetails(); // Page de détails
    }
    
    setupContactForm(); // Formulaire de contact
});

// Fonction de filtrage (à implémenter)
function filterProperties() {
    // À compléter avec la logique de filtrage
    console.log('Filtrage des propriétés...');
}