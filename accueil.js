const zoneCitations = document.querySelector('#zone-citations');
const episodeEl = document.querySelector('#episode');
const citationEl = document.querySelector('#citation');
const personnageEl = document.querySelector('#personnage');

// Pour l'heure, l'API est stockée en local, mais on peut en changer l'URL à tout moment :
const url = 'API.json';


// ----------------------- FONCTION GÉNÉRIQUE POUR L'AFFICHAGE D'UNE CITATION -------------------------
function afficherCitation(table, nombre) {

    // Création dans le DOM de l'élément à afficher
    let citationEnCours = document.createElement('div');
    citationEnCours.className = "citation-item my-5";
    zoneCitations.append(citationEnCours);

    // Remplissage du contenu de l'éléments
    citationEnCours.innerHTML = `<div id="episode ${nombre}">
    Épisode : ${table[nombre].infos.saison} - ${table[nombre].infos.episode}</div>
    <div id="citation ${nombre}" class="my-2">${table[nombre].citation}</div>
    <div id="personnage ${nombre}">${table[nombre].infos.personnage}</div>`;
}

// ---------------- APPELER LES CITATIONS D'UN PERSONNAGE SUR UN CLIC DANS LE MENU --------------------
function appelerCitations(perso) {
    zoneCitations.innerHTML = "";
    let tableDeCitations = [];
    $.ajax({
        url,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            // Création d'un tableau contenant toutes les citations du personnage
            for (let index = 0; index < data.citation.length; index++) {
                const element = data.citation[index];

                if (element.infos.personnage == perso) {
                    tableDeCitations.push(element);
                }
            }

            console.log(tableDeCitations);

            // Bouclage sur le tableau pour en afficher les éléments un par un
            for (let index = 0; index < tableDeCitations.length; index++) {
                const element = tableDeCitations[index];
                afficherCitation(tableDeCitations, index);
            }
        },
        error: () => {
            alert(`Il y a eu une erreur lors du chargement des citations de ${perso}`);
        }
    });
}

// ---------------------- GÉNÉRATION ALÉATOIRE DE CITATION SUR LA PAGE D'ACCUEIL ----------------------
function afficherCitationAleatoire(table) {
    let nombre = Math.round(Math.random() * table.length);
    afficherCitation(table, nombre);
}

function escapeHTML(value) {
    return value.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
}


//----------------------- FONCTION POUR RECHARGER LA PAGE SUR CLIC DU BOUTON --------------------------
document.querySelector('#nouvelle-citation').addEventListener('click', () => {
    location.reload();
});