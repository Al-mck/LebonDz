function $_GET(param) {
  var vars = {};
  window.location.href.replace( location.hash, '' ).replace( 
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function( m, key, value ) { // callback
      vars[key] = value !== undefined ? value : '';
    }
  );

  if ( param ) {
    return vars[param] ? vars[param] : null;  
  }
  return vars;
}

function chargementPage()  {
  if($.cookie("pseudo") === undefined || $.cookie("pseudo") === null || $.cookie("pseudo") = "") {
    //Pas connecté.
    $('#publishAnnounceBloc').hide();
    $('#inscriptionButton').show();
    $('#connexionButton').show();

  }
  else {
    //Connecté.
    $('#publishAnnounceBloc').show();
    $('#inscriptionButton').hide();
    $('#connexionButton').hide();
  }

}

function recupererAnnonces() {
  $.ajax({
     url : 'localhost/annonces',
     type : 'GET',
     dataType : 'json',
     success : function(json, statut){
        $("#announcesBloc").html("")
        $.each(json, function( index, value) {
          $("#announcesBloc").html($("#announcesBloc").html()+
            '<div class="row"><h3>'+ value.titre
            +'</h3><h4>'+ value.categorie
            +'</h4><p>'+ value.detailAnnonce
            +'</p><a class="btn btn-success" href="consulterAnnonce.html?id='+ value.idAnnonce
            +'">Voir détails <span class="glyphicon glyphicon-chevron-right"></span></a></div>')
        });
     },
     error : function(resultat, statut, erreur){
        $("#announcesBloc").html("Erreur de chargement des annonces.")
     }
  })
};

function sIncrire() {
  $.ajax({
     url : 'Localhost/user/inscription',
     type : 'POST',
     data : { email : $('#email').val(), pseudo : $('#pseudo').val(), telephone : $('#telephone').val(), password : $('#password').val()},
     dataType : 'json',
     success : function(json, statut){
        $('#subscribeBloc').html("Inscription réussie. Vous pouvez vous connecter.")
     },
     error : function(resultat, statut, erreur){
       $('#subscribeBloc').html("Inscription échouée. Veuillez contacter un administrateur.")
     }
  })
};

function seConnecter() {
  $.ajax({
     url : 'Localhost/user/connect',
     type : 'POST',
     dataType : 'json',
     data : { email : $('#email').val(), password : $('#password').val()},
     success : function(json, statut){
        $.cookie("failedConnexion", 0);
        $.cookie("email", json.email);
        $.cookie("pseudo", json.pseudo);
        $.cookie("telephone", json.telephone);
        $.cookie("password", json.motDePasse);
        $('#connexionBloc').html("Bienvenue "+json.pseudo+".")
     },
     error : function(resultat, statut, erreur){
        if($.cookie("failedConnexion") === undefined || $.cookie("failedConnexion") === null || $.cookie("failedConnexion") = 0) {
          $('#connexionBloc').html("Connexion échouée. Veuillez réessayer.</br> "+$('#connexionBloc').html())
          $.cookie("failedConnexion", 1);
        }
        else {
          $.cookie("failedConnexion", $.cookie("failedConnexion")+1);
        }

     }
  })
};

function publierAnnonce() {
  $.ajax({
     url : 'localhost/annonces/ajouter',
     type : 'POST',
     dataType : 'json',
     data : { titre : $('#titre').val(), 
              categorie : $('#categorie').val(), 
              contenu : $('#contenu').val(), 
              pseudo :  $.cookie("pseudo"), 
              date : new Date(), 
              prix : $('#prix').val(), 
              ville : $('#ville').val()
            },
     success : function(json, statut){
        $('#publishBloc').html("Publication réussie.")
     },
     error : function(resultat, statut, erreur){
       $('#publishBloc').html("Publication échouée.")
     }
  })
};

function consulterAnnonce() {
  $.ajax({
     url : 'localhost/annonces/'+$_GET('id'),
     type : 'GET',
     dataType : 'json',
     success : function(json, statut){
        $("#announceBloc").html(
          '<h3>'+json.idAnnonce+'-'+json.titre
          +'</h3><h4>'+json.categorie.categorieLibelle
          +'</h4><p>'+json.detailAnnonce
          +'</br>+Ville : '+json.ville.villeLibelle
          +'</br>+Prix : '+json.prix
          +'</br>+Utilisateur : '+json.dateAnnonce.
          +'</br>+Date : '+json.utilisateur.email
          +'</p><a class="btn btn-success" href="parcourirAnnonces.html"><span class="glyphicon glyphicon-chevron-left"></span>Retour </a>')
     },
     error : function(resultat, statut, erreur){
       $("#announceBloc").html('Echec de récupération de l\'annonce.</p><a class="btn btn-success" href="parcourirAnnonces.html"><span class="glyphicon glyphicon-chevron-left"></span>Retour </a>')
     }
  })
};

function recupererListeCategories() {
  $.ajax({
     url : 'localhost/getCategories',
     type : 'GET',
     dataType : 'json',
     success : function(json, statut){
        $("#categorie").html("")
        $.each(json, function( index, value) {
          $("#categorie").html($("#categorie").html()+
            '<div class="row"><h3>'+ value.titre
            +'</h3><h4>'+ value.categorie
            +'</h4><p>'+ value.detailAnnonce
            +'</p><a class="btn btn-success" href="consulterAnnonce.html?id='+ value.idAnnonce
            +'">Voir détails <span class="glyphicon glyphicon-chevron-right"></span></a></div>')
        });
     },
     error : function(resultat, statut, erreur){
        $("#categorie").html("Erreur.")
     }
  })
};
