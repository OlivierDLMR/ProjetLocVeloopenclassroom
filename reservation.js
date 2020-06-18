class Reservation  {
    constructor(){

    this.station= null;
    this.nom = '';
    this.prenom = '';
    this.dateResa = null;
    this.signature = null;

    // initialize: function() {

        $('#btnResa').click(this.btnResaClick.bind(this));
        $('.formulaire-bouton').click(this.formBtnClick.bind(this));
        $('#btnValiderCanvas').click(this.validerSignature.bind(this));

        // Vérifier dans localStorage s'il y a une clef "identite"
        var identite = localStorage.getItem('identite');
        if (identite) {
            identite = JSON.parse(identite);
            this.prenom = identite.prenom;
            this.nom = identite.nom;
            $('#prenom').val(this.prenom);
            $('#nom').val(this.nom);
        }

    }
    

    

    btnResaClick() {
        $('.formulaire').show();
    }

    formBtnClick() {
        this.prenom = $('#prenom').val();
        this.nom = $('#nom').val();

        // Api Web Storage : stocker nom et prenom dans le local storage
        /*
         * Local storage : sauvegardé ad vitam eternam sur le navigateur client
         * Session storage : sauvegardé le temps de la session (si on ferme l'onglet ou le navigateur, les données sont perdues)
        */
        // localStorage.setItem('prenom', this.prenom);
        // localStorage.setItem('nom', this.nom);
        var identite = {prenom: this.prenom, nom: this.nom}
        localStorage.setItem('identite', JSON.stringify(identite)); // JSON.stringify permet de convertir un objet en chaine de caractere

        // Afficher le canvas
        
    }

    validerSignature() {
        var self = this

        this.signature = 'abc'
        this.dateResa = new Date();

        sessionStorage.setItem('dateResa', this.dateResa);
        sessionStorage.setItem('signature', this.signature);

        

        // Démarrer le chrono de réservation
        var interval = setInterval(function() {
            var diff = self.dateDiff(self.dateResa, new Date())
            var minRestantes = 19 - diff.min
            var secRestantes = 59 - diff.sec
            console.log('Temps restant : ' + minRestantes + '-' + secRestantes)

            
            document.getElementById("timer").innerHTML = "Temps restant : " + minRestantes + "min " + secRestantes + "sec ";

            if (minRestantes <= 0 && secRestantes <= 0) {
                clearInterval(interval);
                console.log('Fin de la réservation')

                document.getElementById("timer").innerHTML = "Réservation expirée";
			    $("#annulation").hide();
            }
        }, 1000);
    }
   
    dateDiff(date1, date2){
        var diff = {}                           // Initialisation du retour
        var tmp = date2 - date1;
     
        tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
        diff.sec = tmp % 60;                    // Extraction du nombre de secondes
     
        tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
        diff.min = tmp % 60;                    // Extraction du nombre de minutes
     
        tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
        diff.hour = tmp % 24;                   // Extraction du nombre d'heures
         
        tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
        diff.day = tmp;
         
        return diff;
    }

}