const form = document.getElementById("form-paiement");
const panier = JSON.parse(localStorage.getItem("panier")) || [];
const produits = JSON.parse(localStorage.getItem("produits")) || [];

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
    message += `Pays: ${infos.pays}\n Region: ${infos.region}\n code postal: ${infos.postal}\n`;
    message += `Delai de livraison souhaité: ${infos.delai}\n\n`;
    message += `Contenu de la commande: *\n`;

    panier.forEach(p => {
        const total = p.quantite * p.prix;
        message += `- ${p.nom} x${p.quantite} = ${total} FCFA\n`;
        
    });

    const total = panier.reduce((s, p) => s + (p.prix * p.quantite), 0);
    message += `\n Total: ${total} FCFA`;
    const numeroAdmin = "237679971006";
    const whatsappUrL = `https://wa.me/${numeroAdmin}?text=${encodeURIComponent(message)}`;

    const win = window.open(`https://wa.me/${numeroAdmin}?text=${encodeURIComponent(message)}`, "_blank");
    
    if (!win){
        alert("problèmes détectés");
    }
});

