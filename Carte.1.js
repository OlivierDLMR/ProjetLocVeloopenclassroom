class Carte {
    constructor() {
        this.maCarte = null;
        this.center = [45.758389, 4.839928];
        this.zoom = 12;
        // Attributs - Propriétés : valeurs
        //Méthodes - Actions
        // init: function(){
        // Création du conteneur de carte
        this.maCarte = L.map('maCarte').setView(this.center, this.zoom);
        // Chargement des tuiles de la carte
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            id: 'mapbox.streets'
        }).addTo(this.maCarte);
    }
    ajouterMarker(lat, lng, color) {
        var iconUrl = "./images/iconMarkerVert.svg";
        switch (color) {
            case "red":
                iconUrl = "./images/iconMarkerRouge.svg";
                break;
            case "orange":
                iconUrl = "./images/iconMarkerOrange.svg";
                break;
            default:
                break;
        }
        var monIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: [92, 70],
            iconAnchor: [22, 94],
        });
        return L.marker([lat, lng], { icon: monIcon });
    }
    ajouterEvenement(obj, type, callback) {
        obj.on(type, callback);
    }
    ajouterCluster(elmts) {
        var group = L.markerClusterGroup({
            removeOutsideVisibleBounds: true,
            showCoverageOnHover: false,
        });
        group.addLayers(elmts);
        this.maCarte.addLayer(group);
    }
}
