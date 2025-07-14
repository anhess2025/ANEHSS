document.getElementById("btn-retour").addEventListener("click", () => {
    window.history.back()
});

//Récuperation des informations du site
const user = JSON.parse(localStorage.getItem("user"));
const commandes = JSON.parse(localStorage.getItem("commandes")) || [];
const articles = JSON.parse(localStorage.getItem("panier")) || [];

if (!user) {
    alert("Vous devez être connecté");
    window.location.href = "index.html";
} else {

    const infoDiv = document.getElementById("user-info");
    infoDiv.innerHTML = `
    <p><strong>Nom: </strong> ${user.nom}</p>
    <p><strong>Email: </strong> ${user.email}</p
    `;


const commandesDiv = document.getElementById("liste-commande");

if (commandes.length === 0) {
    commandesDiv.innerHTML = '<p>Aucune commande passée.</p>';
} else {
    commandes.forEach((cmd, i) => {
        const bloc = document.createElement("div");
        bloc.style.borderBottom = "1px solid #ccc";
        bloc.style.marginBottom = " 1rem";

        let listeArticles = "<ul>";
        articles.forEach(article => {
            const montant = article.prix * article.quantite;
            listeArticles += `<li>${article.nom} x ${article.quantite} - ${montant} FCFA</li>`;
        });
        listeArticles += "</ul>";
        bloc.innerHTML = `
        <h4>Commande #${i + 1} - ${cmd.date}</h4>
        <p><strong>Total: </strong> ${cmd.total} FCFA</p>`;
            commandesDiv.appendChild(bloc);
    });
}
}


