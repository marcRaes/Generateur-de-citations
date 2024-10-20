$(function() {
    getFileCitations("citations.json").then((value) => {
        // On stocke les citations dans une DIV caché du HTML
        $("#citations_json").text(JSON.stringify(value));
        var citations = JSON.parse($("#citations_json").text());
        // Génére une citation et retourne le nouveau tableau des citations
        $("#citations_json").text(JSON.stringify(changeCitation(citations)));
    });

    $('#genereCitation').on('click', function() {
        var citations = JSON.parse($("#citations_json").text());
        $("#citations_json").text(JSON.stringify(changeCitation(citations)));
        if(JSON.parse($("#citations_json").text()).length == 0) {
            getFileCitations("citations.json").then((value) => {
                $("#citations_json").text(JSON.stringify(value));
            });
        }
    });
});

function changeCitation(liste_citation) {
    let index = Math.floor(Math.random() * (liste_citation.length));
    $("#citation").text(liste_citation[index].citation);
    $("#auteur").text(liste_citation[index].auteur);
    // Affiche la citation
    $('#citation').fadeIn(1000);
    $('#auteur').fadeIn(1000);
    liste_citation.splice(index, 1);
    return liste_citation;
}

// Récupére le fichier des citations
function getFileCitations(file) {
    return new Promise(function (resolve, reject) {
        $.getJSON(file).done(function (data) {
            resolve(data);
        }).fail(function () {
            reject(Error('Impossible d\'ouvrir le fichier ' + file));
        });
    });
}