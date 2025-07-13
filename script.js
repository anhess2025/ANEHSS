  // Import des fonctions Firebase (API modulaire)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMI_JATEW1I0HG_x0NG4vizPRBud0kkVM",
  authDomain: "anehss.firebaseapp.com",
  projectId: "anehss",
  storageBucket: "anehss.firebasestorage.app",
  messagingSenderId: "138450949844",
  appId: "1:138450949844:web:a41647d3e5188327994d41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();


const CLOUD_NAME = "did435tay";
const UPLOAD_PRESET = "ml_default";

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



//+++++++++++++++++++++++++++++++++++++++++++++++PRODUITS EN VEDETTES+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let produitsVedette = [];
let nouveauxProduits = [];
let tousLesProduits = [];

async function chargerProduitsDepuisFirebase() {
    try {
        const querySnapshot = await getDocs(collection(db, "produits"));
        const produits = querySnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));


        produitsVedette = produits.filter(p => p.vedette);
        nouveauxProduits = produits.filter(p => p.nouveau);
        tousLesProduits = produits;

        afficherProduits(produitsVedette);
        afficherNouveautes(nouveauxProduits);
        afficherTousLesProduits(tousLesProduits);

    } catch(err) {
        console.error("Erreur de chargement Firebase:", err);
    
}
}

window.addEventListener("DOMContentLoaded", () => {
    //updateAuthState();
    chargerProduitsDepuisFirebase();
});

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
        <p class="note"><i class="fas fa-star"></i> ${prod.description}</p>
        <button class="btn-ajouter" data-id="${prod.nom}">Ajouter au Panier</button>
        </div>`;
        
        produitsContainer.appendChild(card);
        
    });
}

//afficherProduits(produitsVedette);




//==============================================NOUVEAUX PRODUITS=============================================================================
/*const nouveauxProduits = [
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
];*/

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
        <p>${prod.description}</p>
        <button class="btn-ajouter" data-id="${prod.nom}">Ajouter au panier</button>
        </div>`;
        nouveauxContainer.appendChild(card);
    });
}

//afficherNouveautes(nouveauxProduits);





//=======================================================TOUS LES PRODUITS================================================================

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
        <p >${prod.description}</p>
        <button class="btn-ajouter" data-id="${prod.nom}">Ajouter au panier</button>
        </div>`;
        justContainer.appendChild(card);
    });
}

//afficherTousLesProduits(tousLesProduits);

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
    const password = document.getElementById("password").value.trim();
    const email = document.getElementById("email").value.trim();
    if (password && email){
        signInWithEmailAndPassword(auth, email, password) 
        .then(userCredential => {
            hideLogin();
        })
        .catch(error => {
            console.error("Erreur de connexion:", error.message);
            alert("Identifiants incorrects ou utilisateur non existant.")
        });
     

    } else {
        alert("veuillez remplir les deux champs");
    }
});

//deconnexion
btnLogout.addEventListener("click", () => {
    signOut(auth).then(() => {
        console.log("Déconnecté");
    })
    updateAuthState();
    showLogin();
});

//Mise à jour de l'état
function updateAuthState() {
    onAuthStateChanged(auth, user => {
        if (user) {
            welcomeMsg.textContent = `Bienvenue ${user.email}`;
            btnLogout.style.display = "inline-block";
        } else {
            welcomeMsg.textContent = "";
            btnLogout.style.display = "none";
        }
        if (user && user.email === "anehssanehss@gmail.com"){
        window.location.href = "admin.html";
    }
    });
    
}

//Au chargement 
window.addEventListener("DOMContentLoaded", () => {
    
        updateAuthState();
    
});

function isUserLoggedIn() {
    return auth.currentUser !== null;
}

function requireAuth(callback) {
    if (isUserLoggedIn()) {
        callback()
    } else {
        showLogin();
    }
}


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

const btnRegister = document.getElementById("btn-register");

btnRegister.addEventListener("click", () => {
    const password = document.getElementById("password").value.trim();
    const email = document.getElementById("email").value.trim();
    if (password && email){
        createUserWithEmailAndPassword(auth, email, password) 
        .then(userCredential => {
            alert("compte créé avec succès !");
            hideLogin();
        })
        .catch(error => {
            console.error("Erreur d'inscription:", error.message);
            if (error.code === "auth/email-already-in-use"){
                alert("Cet e-mail est déja utilisé");
            } else if (error.code === "auth/weak-password") {
                alert("Mot de passe trop faible (min. 6 caractères.");
            } else {
                alert("Erreur :" + error.message);
            }
        });
    } else {
            alert("veuillez remplir les deux champs");

    }

});

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");

togglePassword.addEventListener("click", () => {
    const isPasswordVisible = passwordInput.type === "text";
    passwordInput.type = isPasswordVisible ? "password" : "text";
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
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

const track = document.getElementById("carousel-track");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dotsContainer = document.getElementById("carousel-dots");

const items = document.querySelectorAll(".carousel-item");
let index1 = 0;

items.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.addEventListener("click", () => {
        index1 = i;
        updateCarousel();
        resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("button");

function updateCarousel() {
    const width = items[0].clientWidth;
    track.style.transform = `translateX(-${index1 * width}px)`;
    updateDots();
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index1])
        dots[index1].classList.add("active");
}

nextBtn.addEventListener("click", () => {
    index1 = (index1 + 1) % items.length;
    updateCarousel();
    resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
    index1 = (index1 - 1 + items.length) % items.length;
    updateCarousel();
    resetAutoSlide();
});

window.addEventListener("resize", updateCarousel);

let autoSlide = setInterval(() => {
    index1 = (index1 + 1) % items.length;
    updateCarousel();
}, 5000);

function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
        index1 = (index1 + 1) % items.length;
        updateCarousel();
    }, 5000);
}

updateCarousel();
    
