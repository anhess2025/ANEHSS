const form = document.getElementById("form-paiement");
const panier = JSON.parse(localStorage.getItem("panier")) || [];


const resumeDiv = document.getElementById("resume-commande");

let total = 0;
panier.forEach(p => {
    const ligne = document.createElement("div");
    const montant = p.prix * p.quantite;
    ligne.textContent = ` - ${p.nom} x ${p.quantite} - ${montant} FCFA`;
    resumeDiv.appendChild(ligne);
    total += montant;
});

const totalEl = document.createElement("strong");
totalEl.textContent = `Total : ${total} FCFA`;
resumeDiv.appendChild(totalEl);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const indisponibles = panier.filter(p => p.stock === "rupture");

    if (indisponibles.length > 0) {
        alert("Certains produits sont en rupture de stock :\n" + indisponibles.map(p => p.nom).join(", "));
        return;
    }

    const data = new FormData(form);
    const infos = Object.fromEntries(data.entries());

    let message = ` *Nouvelle commande ! *\n\n`;
    message += `Nom: ${infos.nom}\n`;
    message += `Email: ${infos.email}\n`;
    message += `Whatsapp: ${infos.whatsapp}\n`;
    message += `quarier: ${infos.quartier}\n Region: ${infos.region}\n code postal: ${infos.postal}\n précision: ${infos.adresse}`;
    message += `Delai de livraison souhaité: ${infos.delai}\n\n jours`;
    message += `Contenu de la commande: \n`;

    panier.forEach(p => {
        const ligne = `${p.nom} x ${p.quantite} = ${p.prix * p.quantite} FCFA`;
        message += `- ${ligne}\n`;
        
    });

    
    message += `\n Total: ${total} FCFA`;
    const numeroAdmin = "237679971006";
    const whatsappUrL = `https://wa.me/${numeroAdmin}?text=${encodeURIComponent(message)}`;

    const win = window.open(`https://wa.me/${numeroAdmin}?text=${encodeURIComponent(message)}`, "_blank");
    
    if (!win){
        alert("problèmes détectés");
    }
});

