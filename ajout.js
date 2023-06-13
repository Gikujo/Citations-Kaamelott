var selectLivre = document.getElementById('livre-select');
var selectEpisode = document.querySelector('#episode-select');
var selectPersonnage = document.querySelector('#personnage-select');
var citationInput = document.querySelector('textarea');

// Pour l'heure, l'API est stockée en local, mais on peut en changer l'URL à tout moment :
const url = 'API.json';

// ********************************************************************************************
// ********************************** AFFICHAGE DU FORMULAIRE *********************************
// ********************************************************************************************

// ----------------- FONCTION POUR CHARGER LES ÉPISODES DU LIVRE SÉLECTIONNÉ ------------------
selectLivre.addEventListener('change', chargerEpisodes);
function chargerEpisodes() {
    var livreChoisi = selectLivre.options[selectLivre.selectedIndex].textContent;

    $.ajax({
        url,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            // Le code pour charger les épisodes s'exécute ici
            let tableauCitations = data.citation;
            let tableEpisodes = [];

            tableauCitations.forEach(element => {
                var str = element.infos.episode;
                var firstLetter = str.charAt(0).toUpperCase();

                element.infos.episode = firstLetter + str.slice(1).toLowerCase();
            });

            for (let index = 0; index < tableauCitations.length; index++) {
                const element = tableauCitations[index];

                if (element.infos.saison == livreChoisi) {

                    if (!tableEpisodes.includes(element.infos.episode)) {
                        tableEpisodes.push(element.infos.episode);
                    }
                }
            }
            tableEpisodes.sort();
            selectEpisode.removeAttribute('disabled');

            for (let index = 0; index < tableEpisodes.length; index++) {
                const element = tableEpisodes[index];
                selectEpisode.innerHTML += `<option value="${index}">${element}</option>`;
            }
        },
        error: () => {
            alert('Il y a eu une erreur lors du chargement des épisodes de ce livre.');
        }
    });
}

// --------------------------- CRÉATION DE LA LISTE DES PERSONNAGES ---------------------------
chargerPersonnages();

function chargerPersonnages() {

    $.ajax({
        url,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            const tableauPersonnages = trierPersonnages(data.citation);
            affichageSelect(tableauPersonnages);
        },
        error: () => {
            alert('Il y a eu une erreur');
        }
    });


}
// Tri des personnages par ordre alphabétique
let listePersonnages = [];
function trierPersonnages(table) {
    for (let index = 0; index < table.length; index++) {
        const element = table[index];
        if (!listePersonnages.includes(element.infos.personnage)) {
            listePersonnages.push(element.infos.personnage);
        }
    }

    listePersonnages.sort();
    return listePersonnages;
}

// Et affichage des personnages dans le menu
function affichageSelect(array) {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];

        selectPersonnage.innerHTML += `<option value="${index + 1}">${element}</option>`;
    }
}

// ********************************************************************************************
// ******************************* PRISE EN COMPTE DU FORMULAIRE ******************************
// ********************************************************************************************
const formulaire = document.querySelector('form');

formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
});

formulaire.addEventListener('submit', soumettreFormulaire);

function soumettreFormulaire() {
    if (selectEpisode.value == 0 || selectLivre.value == 0 || selectPersonnage.value == 0
        || citationInput.value == '') {
        alert(`Vous devez remplir l'intéGRAALité du formulaire.`);
    } else {
        // Vérifier que le formulaire ne contient pas de code
        let entreeEpisode = checkCars(selectEpisode.selectedOptions[0].textContent);
        let entreeLivre = checkCars(selectLivre.selectedOptions[0].textContent);
        let entreePersonnage = checkCars(selectPersonnage.selectedOptions[0].textContent);
        let entreeCitation = checkCars(citationInput.value);

        // Remplir l'API avec les éléments du formulaire

    }
}

// Fonctions pour annuler le code injecté

function checkCars(text) {
    var escapedText = escapeHTML(text);
    console.log(escapedText);

    return escapedText;
} function escapeHTML(text) {
    var element = document.createElement('div');
    element.innerText = text;
    return element.innerHTML;
}