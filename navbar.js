
const dropdownMenu = document.querySelector('#personnage-dropdown-menu');

// ----------------------------------------- REQUÊTE DE L'API -----------------------------------------
$.ajax({
    url,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
        afficherCitationAleatoire(data.citation);
        const tableauPersonnages = trierPersonnages(data.citation);
        affichageMenu(tableauPersonnages);
    },
    error: () => {
        alert('Il y a eu une erreur');
    }
});

// ------------------------------- CRÉATION DE LA LISTE DES PERSONNAGES -------------------------------
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
function affichageMenu(table) {
    table.forEach(element => {
        var escapedElement = escapeHTML(element);
        dropdownMenu.innerHTML += `<li><a class="dropdown-item" href="#" 
        onclick = 'appelerCitations("${escapedElement}")'>${element}</a></li>`;
    });
}