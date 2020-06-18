// On attend que le DOM soit prêt
$(function() {
    // Instanciation de l'objet "diaporama" en ES6
    let slider = new Diaporama();
    // slider.intervalId = slider.demarrerDiapo();
    // slider.init();
    
    // Instanciation de l'objet "carte"
    var carteActive = new Carte ();
    // carteActive.init();

    //Instanciation de l'objet "reservation"
    var resaObj = new Reservation();
    // resaObj.initialize();

    // Instanciation de l'objet "station"
    var stationObjet = new Station(carteActive, resaObj);
    // stationObjet.init();

    //Instanciation de l'objet "canvas"
    var signCanvas = new Canvas();
    // signCanvas.init();
})