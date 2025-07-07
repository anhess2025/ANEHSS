const burger = document.getElementById("burger");
const nav = document.getElementById("nav-links");

burger.addEventListener("click", () => {
    nav.classList.toggle("show");
});

document.getElementById("produits-link").addEventListener("click", () => {
    document.getElementById("content").innerHTML = "<br><h2>Gestion des produits</h2>"
});

document.getElementById("commandes-link").addEventListener("click", () => {
    document.getElementById("content").innerHTML = "<h2>Commandes recues</h2>"
});

document.getElementById("logout").addEventListener("click", () => {
    alert("Deconnexion");
});

import { db } from './firebase-config.js'
import {
    collection, getDocs, addDoc, deleteDoc, doc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { uploadImageToCloudinary} from './cloudinary.js';

const produitsRef = collection(db, "produits"); 
document.getElementById("produits-link").addEventListener("click", async () => {
    const content = document.getElementById("content");
    content.innerHTML = `
    <h2>Gestion des Produits</h2>
    <form id="ajouter-produit-form">
    <input type="text" placeholder="Nom" name="nom" required>
    <input type="number" placeholder="Prix" name="prix" required>
    <input type="text" placeholder="Catégorie" name="catégorie" required>
    <input type="text" placeholder="Description" name="description" required>
    <input type="file" name="image" required>
    <select name="etat">
    <option value="disponible">Disponible</option>
    <option value="rupture">Rupture de stock</option>
    </select>
    <button type="submit">Ajouter</button>
    </form>
    <div id="liste-produits"></div>
    `;

    document.getElementById("ajouter-produit-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target;
        const file = form.image.files[0];
        const imageUrl = await uploadImageToCloudinary(file);

        await addDoc(produitsRef, {
            nom: form.nom.value,
            prix: parseFloat(form.prix.value),
            description: form.description.value,
            categorie: form.categorie.value,
            etat: form.etat.value,
            image: imageUrl
        });

        alert("Produit ajouté !");
        form.reset();
        afficherProduits();
    });

    afficherProduits();
});


async function afficherProduits() {
    const snapshot = await getDocs(produitsRef);
    const liste = document.getElementById("liste-produits");
    liste.innerHTML = "";

    snapshot.forEach(docSnap => {
        const p = docSnap.data();
        const div = document.createElement("div");
        div.className = "carte-produit";
        div.innerHTML = `
        <img src="${p.image}" alt="">
        <h3>${p.nom}</h3>
        <p>${p.description}</p>
        <p>Catégorie: ${p.categorie} | Etat: ${p.etat}</p>
        <button onclick="supprimerProduit('${docSnap.id}')">Supprimer</button>`;
        liste.appendChild(div);
    });
}

window.supprimerProduit = async (id) => {
    if (confirm("confirmer la suppression ?")) {
        await deleteDoc(doc(db, "produits", id));
        afficherProduits();
    }
}

document.getElementById("commandes-link").addEventListener("click", async () => {
    const snapshot = await getDocs(collection(db, "commandes"));
    const content = document.getElementById("content");

    content.innerHTML = "<h2>Commandes recues</h2>";
    snapshot.forEach(doc => {
        const cmd = doc.data();
        content.innerHTML += `
        <div class="carte-commande">
        <p><b>${cmd.email}</b> - ${new Date(cmd.date.seconds * 1000).toLocaleString()}</p>
        <p>${cmd.produits?.length || 0} FCFA</p>
        <p>Adresse: ${cmd.adresse}, ${cmd.codePostal}</p>
        </div>
        `;
    });
});