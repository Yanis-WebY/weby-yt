let isClicked = false;
let bouton = document.getElementById("btn");
let logo = document.getElementById("logo");
let image = document.getElementById("image");
let body = document.querySelector("body");

bouton.addEventListener('click',function() {

if (isClicked == false) {    
isClicked = true;
body.style.backgroundColor = "black";
body.classList.add('white');
logo.style.color  = "white";
image.src = "./weby-blanc.jpg";
bouton.innerHTML = "Light";
bouton.classList.add('btn-dark', 'btn-light');
}
else {
    isClicked = false;
    body.style.backgroundColor = "white" ;
    body.classList.remove('white');
    logo.style.color  = "black";
    image.src = "./weby-noir.jpg";
    bouton.innerHTML = "Dark";
    bouton.classList.add('btn-light', 'btn-dark');
}

})


function save() {

    let iframe = document.getElementById("iframeCode").value;
    window.localStorage.setItem("iframe" + +new Date(), iframe);
    window.location.reload();

}






// 2. Chargement des vidéos déjà enregistrées //
window.onload = function load() {
    // Transformer le LocalStorage en objet clé:valeur que l'on peut lire facilement
    let iframes = {
        ...localStorage,
    };
    // Création d'une variable vide qui va 'recevoir' l'iframe
    let html = "";

    // Transformer les iframes en tableau, en faire une seule chaine de caractère géante,
    // puis ajouter le bouton de suppression après chaque iframe avec un attribut contenant la clé
    for ([key, iframe] of Object.entries(iframes)) {
        html +=
            iframe +
            `<button class="delete" style="position:relative;left:-30px;top:-10px" data-key="${key}">X</button>`;
    }

    // Ajouter le code HTML généré dans le div vide
    document.querySelector(".video-play").innerHTML = html;

    // Enregistrer l'événement de suppression de vidéo
    document.querySelectorAll("button.delete").forEach((button) => {
        // Au clic sur le bouton de suppression
        button.addEventListener("click", () => {
            // Suppression effective de l'iframe dans le localStorage
            // expliquer dataset
            window.localStorage.removeItem(button.dataset.key);
            // Recharger la page pour voir les changements
            window.location.reload();
        });
    });
};





// Searchbar

// Attend que le DOM soit entièrement chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", function() {
    // Ajoute un écouteur d'événements au formulaire de recherche lorsque soumis
    document.getElementById("searchForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche le rechargement de la page après la soumission du formulaire
  
        // Récupère la valeur de recherche saisie par l'utilisateur
        var searchTerm = document.getElementById("searchInput").value;
  
        // Appelle les fonctions pour souligner les termes de recherche dans les titres et les URL des vidéos
        highlightTitles(searchTerm);
        highlightVideoURLs(searchTerm);
    });
  });
  
  // Fonction pour souligner les termes de recherche dans les titres des vidéos
  function highlightTitles(searchTerm) {
    // Sélectionne tous les éléments ayant la classe .title-video (les titres des vidéos)
    var titles = document.querySelectorAll('.title-video');
  
    // Parcourt tous les titres des vidéos
    titles.forEach(function(title) {
        // Récupère le texte du titre
        var titleText = title.textContent;
        // Remplace tous les occurrences du terme de recherche par le terme souligné dans le texte du titre
        var newText = titleText.replace(new RegExp(searchTerm, "gi"), function(match) {
            return '<span class="highlight">' + match + '</span>';
        });
        // Remplace le texte du titre par le nouveau texte contenant les termes soulignés
        title.innerHTML = newText;
    });
  }
  
  // Fonction pour mettre en évidence les URL des vidéos contenant les termes de recherche
  function highlightVideoURLs(searchTerm) {
    // Sélectionne tous les éléments <iframe> sur la page (les vidéos incorporées)
    var iframes = document.querySelectorAll('iframe');
  
    // Parcourt tous les éléments <iframe> sur la page
    iframes.forEach(function(iframe) {
        // Récupère l'URL de la vidéo depuis l'attribut src de l'élément <iframe>
        var videoURL = iframe.getAttribute('src');
        // Vérifie si l'URL de la vidéo contient le terme de recherche
        if (videoURL.includes(searchTerm)) {
            // Met en évidence la vidéo en ajoutant une bordure jaune
            iframe.style.border = "3px solid crimson";
        }
    });
  }