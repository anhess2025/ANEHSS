const btnCommande = document.getElementById("lien-commande");
const popup = document.getElementById("popup-formulaire");
const fermer = document.getElementById("fermer-popup");
const form = document.getElementById("form-commande");
const fichierInput = document.getElementById("fichier-commande");
const statut = document.getElementById("fichier-statut");

const CLOUD_NAME = "did435tay";
const UPLOAD_PRESET = "ml_default";

btnCommande.addEventListener("click", () => {
    popup.style.display = "flex";

});

fermer.addEventListener("click", () => {
    popup.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statut.innerText = " Enregistrement en cours..."
    const file = fichierInput.files[0];
    if (!file) {
        alert("veuillez ajouter un fichier.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    let urlFichier = "";
    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
            {
                method: "POST",
                body: formData
            }
        );
        const data = await  res.json();
        urlFichier = data.secure_url;
        statut.innerHTML = `Fichier prêt : <a href="${urlFichier}" target="_blank">voir</a>`;
    } catch (error) {
        statut.innerHTML = "Erreur lors de l'envoi :(";
        return;
    }


    const data = new FormData(form);


    const nom = data.get("nom");
    const email = data.get("email");
    const tel = data.get("telephone");
    const adresse = data.get("adresse");
    const codePostal = data.get("codePostal");
    const dimensions = data.get("dimensions");
    const materiel = data.get("materiel");
    const message = data.get("message");
    

    const contenu = `h
    Nouvelle commande personnalisée: *\n
    Nom : ${nom} \n
    Email : ${email} \n
    Téléphone Whatsapp : ${tel} \n
    Adresse : ${adresse} ${codePostal} \n
    Matériel : ${materiel} \n
    Cahier de charges : ${message} \n
    Fichier envoyé: ${urlFichier}`;


    const numero = "237679971006"
    const lien = `https://wa.me/${numero}?text=${encodeURIComponent(contenu)}`;

    window.open(lien, "_blank")
});
document.getElementById("btn-retour").addEventListener("click", () => {
    window.history.back()
});