
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
});

document.addEventListener("click", function(e) {
    const isClickInside = mobileNav.contains(e.target) || menuToggle.contains(e.target);
    if (!isClickInside) { 
    }
});

const produits = [
    {
        titre: "ANEHSS PCB SERVICES",
        description: "",
        image: "images/arduino.jpg",
        lien: "index.html"
    },
    {
        titre: "ANEHSS 3D PRINTING",
        description: "",
        image: "images/imprimante 3d.jpg",
        lien: "3d.html"
    },
    {
        titre: "PIECES ELECTRONIQUES DISPONIBLES",
        description: "",
        image: "images/pcb.jpg",
        lien: "3d.html"
    },
];

let index = 0;
const flipCardInner = document.getElementById("flip-card-inner");

function updateFlipCard() {
    const frontIndex = index % produits.length;
    const backIndex = (index + 1) % produits.length;

    const front = produits[frontIndex];
    const back = produits[backIndex];

    flipCardInner.innerHTML = `<div class="flip-card-front" style="background-image: url('${front.image}')">
    <div class="flip-card-content">
    <h2>${front.titre}</h2>
    <p>${front.description}<p>
    <a href="${front.lien}">Voir les produits</a>
    </div>
    </div>
    
    <div class="flip-card-back" style="background-image: url('${back.image}')">
    <div class="flip-card-content">
    <h2>${back.titre}</h2>
    <p>${back.description}<p>
    <a href="${back.lien}">Voir les produits</a>
    </div>
    </div>`;

    flipCardInner
    .style.transform = `rotateY(${index * 180}deg)`;
    index++;
    
    
}

updateFlipCard();
setInterval(updateFlipCard, 5000);

/*const recherchesPopulaires = [
    "chaussures",
    "Montres",
    "Casques"
];

const tagsContainer = document.getElementById("tags-container");

function genererTags(tags) {
    tagsContainer.innerHTML = "";
    tags.forEach(tags => {
        const button = document.createElement("button");
        button.className = "tag-button";
        button.textContent = tags;
        button.addEventListener("click", () => {
            alert(`vous avez cliqué sur "${tags}"`);
        });
        tagsContainer.appendChild(button);
    });
}

genererTags(recherchesPopulaires);*/


//+++++++++++++++++++++++++++++++++++++++++++++++PRODUITS EN VEDETTES+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const produitsVedette = [
    {
        nom: "Main Robotique",
        prix: 25000,
        image: "a1 main robotique.jpg",
        stock: "disponible",
        categorie: ""
    },
    {
        nom: "plaque pcb",
        prix: 7000,
        note: 4.5,
        image: "a2 plaque.jpg",
        stock: "disponible",
        categorie: ""
    },
    {
        nom: "lot de LED",
        prix: 10.99,
        note: 4.5,
        image: "a3 led.jpg",
        stock: "disponible",
        categorie: ""
    },
    {
        nom: "Arduino Uno",
        prix: 8000,
        note: 4.5,
        image: "a4 arduino.jpg",
        stock: "rupture",
        categorie: ""
    },
];

const produitsContainer = document.getElementById("produits-container");

function afficherProduits(produits){
    produitsContainer.innerHTML= "";
    produits.forEach(prod => {
        
        const card= document.createElement("div");
        card.className = "produit-card";
        card.innerHTML = `
        
        <img src="${prod.image}" alt="${prod.nom}">
        <div class="produit-info">
        <div class="badge-stock ${prod.stock}">${prod.stock}</div>
        <h3>${prod.nom}</h3>
        <p class="prix">${prod.prix.toFixed(2)} FCFA</p>
        <p class="note"><i class="fas fa-star"></i> ${prod.note}</p>
        <button class="btn-ajouter" data-id="${prod.nom}">Ajouter au Panier</button>
        </div>`;
        
        produitsContainer.appendChild(card);
        
    });
}

afficherProduits(produitsVedette);




//==============================================NOUVEAUX PRODUITS=============================================================================
const nouveauxProduits = [
    {
        nom: "Arduino Uno",
        prix: 8000,
        image: "a4 arduino.jpg",
        stock: "disponible",
        categorie: ""
    },
    {
        nom: "capteur d'eau",
        prix: 4500,
        image: "a6 capteur eau.jpg",
        stock: "disponible",
        categorie: ""
    },
    {
        nom: "Filament",
        prix: 12000,
        image: "a7 filament.jpg",
        stock: "disponible",
        categorie: ""
    },
    {
        nom: "Plaque",
        prix: 6000,
        image: "a2 plaque.jpg",
        stock: "disponible",
        categorie: ""
    }
];

const nouveauxContainer = document.getElementById("nouveautes-container");

function afficherNouveautes(produits) {
    nouveauxContainer.innerHTML = "";
    produits.forEach(prod => {
        const card = document.createElement("div");
        card.className = "nouveau-produit";
        card.innerHTML = `
        <span class="badge-new">Nouveau</span>
        
        <img src="${prod.image}" alt="${prod.nom}">
        <div class="nouveau-info">
        <div class="badge-stock ${prod.stock}">${prod.stock}</div>
        <h3>${prod.nom}</h3>
        <p class="nouveau-prix">${prod.prix.toFixed(2)} FCFA</p>
        <button class="btn-ajouter" data-id="${prod.nom}">Ajouter au panier</button>
        </div>`;
        nouveauxContainer.appendChild(card);
    });
}

afficherNouveautes(nouveauxProduits);





//=======================================================TOUS LES PRODUITS================================================================
const tousLesProduits = [
    {
        nom: "Arduino Uno",
        prix: 8000,
        image: "a4 arduino.jpg",
        stock: "disponible",
        categorie: ""
    },
    {
        nom: "capteur d'eau",
        prix: 4500,
        image: "a6 capteur eau.jpg",
        stock: "disponible",
        categorie: ""
    },
    {
        nom: "Filament",
        prix: 12000,
        image: "a7 filament.jpg",
        stock: "disponible",
        categorie: ""
    },
    {
        nom: "Plaque",
        prix: 6000,
        image: "a2 plaque.jpg",
        stock: "disponible",
        categorie: ""
    }
];

const justContainer = document.getElementById("just-container");

function afficherTousLesProduits(produits) {
    justContainer.innerHTML = "";
    produits.forEach(prod => {
        const card = document.createElement("div");
        card.className = "card-produit";
        card.innerHTML = `
        <img src="${prod.image}" alt="${prod.nom}">
        
        <div class="card-info">
        <div class="badge-stock ${prod.stock}">${prod.stock}</div>
        <h3>${prod.nom}</h3>
        <p class="card-price">${prod.prix.toFixed(2)} FCFA</p>
        <button class="btn-ajouter" data-id="${prod.nom}">Ajouter au panier</button>
        </div>`;
        justContainer.appendChild(card);
    });
}

afficherTousLesProduits(tousLesProduits);

const inputRecherche = document.getElementById("recherche-input");
const inputPrixMin = document.getElementById("prix-min");
const inputPrixMax = document.getElementById("prix-max");
const btnFiltrer = document.getElementById("btn-filtrer");

function filtrerProduits() {
    const motCle = inputRecherche.value.toLowerCase();
    const min = parseFloat(inputPrixMin.value) || 0;
    const max = parseFloat(inputPrixMax.value) || Infinity;

    const produitsFiltres = tousLesProduits.filter(p => p.nom.toLowerCase().includes(motCle) && p.prix >= min && p.prix <= max);
    const produitsFiltresnv = nouveauxProduits.filter(p => p.nom.toLowerCase().includes(motCle) && p.prix >= min && p.prix <= max);
    const produitsFiltresvd = produitsVedette.filter(p => p.nom.toLowerCase().includes(motCle) && p.prix >= min && p.prix <= max);

    afficherTousLesProduits(produitsFiltres);
    afficherNouveautes(produitsFiltresnv);
    afficherProduits(produitsFiltresvd);
}

inputRecherche.addEventListener("input", filtrerProduits);
btnFiltrer.addEventListener("click", filtrerProduits);

//Authentification
const loginModal = document.getElementById("login-modal");
const btnLogin = document.getElementById("btn-login");
const btnLogout = document.getElementById("btn-logout");
const welcomeMsg = document.getElementById("welcome-msg");

function showLogin(){
    loginModal.classList.add("show");
}

function hideLogin(){
    loginModal.classList.remove("show");
}

btnLogin.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    if (username && email){
        const userData = {
            nom: username,
            email: email
        }; 

        localStorage.setItem("user", JSON.stringify(userData));
        updateAuthState();
        hideLogin();
    } else {
        alert("veuillez remplir les deux champs");
    }
});

//deconnexion
btnLogout.addEventListener("click", () => {
    localStorage.removeItem("user");
    updateAuthState();
    showLogin();
});

//Mise à jour de l'état
function updateAuthState() {
    const userData = localStorage.getItem("user");
        if (userData) {
            btnLogout.style.display = "inline-block";
        } else {
            welcomeMsg.textContent = "";
            btnLogout.style.display = "none";
        }
}

//Au chargement 
window.addEventListener("DOMContentLoaded", () => {
    
        updateAuthState();
    
});

function isUserLoggedIn() {
    return !!localStorage.getItem("user");
}

function requireAuth(callback) {
    if (isUserLoggedIn()) {
        callback()
    } else {
        showLogin();
    }
}

/*document.getElementById("link-panier").addEventListener("click", (e) => {
    e.preventDefault();
    requireAuth(() => {
        window.location.href = "panier.html";
    });
});

document.getElementById("link-profil").addEventListener("click", (e) => {
    e.preventDefault();
    requireAuth(() => {
        window.location.href = "profil.html";
    });
});*/

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-ajouter")){
    e.preventDefault();
    requireAuth(() => {
        const nomProduit = e.target.dataset.id;
        ajouterAuPanier(nomProduit);
    });
}
});

//la croix
document.getElementById("close-login").addEventListener("click", () => {
    hideLogin();
});

//logique du panier
let panier = JSON.parse(localStorage.getItem("panier")) || [];

function ajouterAuPanier(nomProduit) {
    const produit = tousLesProduits.find(p => p.nom === nomProduit);

    if (!produit) return;
    
    const index = panier.findIndex(p => p.nom === produit.nom);

    if (index !== -1) {
        panier[index].quantite += 1;
    } else {
        panier.push({ ...produit,prix: Math.ceil(produit.prix), quantite: 1});
    }

    localStorage.setItem("panier", JSON.stringify(panier));
    updateCartCount();
    openCart()
}

function calculerTotal() {
    return Math.ceil(panier.reduce((total, p) => total + p.prix * p.quantite, 0));
}

const sideCart = document.getElementById("side-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const panierCompteur = document.getElementById("panier-compteur");

function openCart() {
    renderCart();
    sideCart.classList.add("open");
}

document.getElementById("close-cart").addEventListener("click", () => {
    sideCart.classList.remove("open");
});

function updateCartCount() {
    const totalCount = panier.reduce((sum, p) => sum + p.quantite, 0);
    panierCompteur.textContent = totalCount;
}

//contenu du panier
function renderCart() {
    cartItemsContainer.innerHTML = "";
    panier.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
        <div style="display: flex; justify-content: space-beetween; align-items: center; margin-bottom: 10px;">
        <div>
        <strong>${item.nom}</strong> <br>${item.prix * item.quantite} FCFA </div>
        <div>
        <button class="btn-moins" data-index="${index}">-</button>
        <span style="margin: 0 8px;">${item.quantite}</span>
        <button class="btn-plus" data-index="${index}">+</button>
        </div>
        </div>`;
        cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = `${calculerTotal()} FCFA;`
    updateCartCount();
}

// Ecoute les clics...
cartItemsContainer.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (index === undefined) return;

    if (e.target.classList.contains("btn-plus")){
        panier[index].quantite += 1;

    }else if
        (e.target.classList.contains("btn-moins")) {
            panier[index].quantite -= 1;
            if (panier[index].quantite <= 0){
                panier.splice(index, 1);
            }
        }
    localStorage.setItem("panier", JSON.stringify(panier));
    renderCart();
})

document.getElementById("link-panier").addEventListener("click", (e) => {0
     e.preventDefault();

    requireAuth(() => {
        openCart();
    });
});

document.getElementById("btn-commander").addEventListener("click", () => {
    if (panier.length === 0) return alert("Votre panier est vide");


const commandes = JSON.parse(localStorage.getItem("commandes")) || [];
const commande = {
    date: new Date().toLocaleString(),
    items: panier,
    total: calculerTotal()
};

commandes.push(commande);
localStorage.setItem("commandes", JSON.stringify(commandes));


localStorage.setItem("panier", JSON.stringify(panier));
renderCart();
alert("commande enregistrée avec succès !");
sideCart.classList.remove("open");
window.location.href = "paiement.html"
});

 const bouton3D = document.getElementById("bouton-3d");
 const slide3D = document.getElementById("slide-3d");

bouton3D.addEventListener("click", () => {
    slide3D.classList.toggle("active");
});

document.addEventListener("click", function (e) {
    if (!slide3D.contains(e.target) && !bouton3D.contains(e.target)) {
        slide3D.classList.remove("active");
    }
});