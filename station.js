class Station  {
    
    constructor (carteObj, resaObj){
        let self = this;
        this.stations= [];
        
         //        https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=7182c8f0e91be3d835401faad4cd197824223f26 clé Olivier
         //        https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=a8c933beecb21575101c0d6f1a892de73f6baf91 clé Julien    
        // On récupère les stations depuis l'API JC Decaux
        $.getJSON('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=a8c933beecb21575101c0d6f1a892de73f6baf91')
            .done(function(stations) {

                console.log("stations: ", stations)

                this.stations = stations;
                let markers = [] 
                
                // On parcourt les stations retournées par JC Decaux
                this.stations.forEach(function(station)  {

                    let color = ""
                    if (station.status === "OPEN") {
                        if (station.available_bikes === 0) {
                            color = "orange"
                        }else {
                            color = "green"
                        }
                    }else {
                        color = "red"
                    }

                    
                    // Création d'un marker pour la station parcouru
                    let marker = carteObj.ajouterMarker(station.position.lat, station.position.lng, color);

                    // On gère l'évènement de clic sur le marker
                    carteObj.ajouterEvenement(marker, "click", self.markerClick.bind(station))
                    
                    // Stokage du marker dans le markerClusterGroup
                    markers.push(marker)
                })

                // let group = L.markerClusterGroup();
                // group.addLayers(markers);
                // carteObj.ajouterCluster(markers);
                carteObj.ajouterCluster(markers)
            })    
            .fail(function(err) {
                // Gestion d'erreur
                console.log('Une erreur s\'est produite lors du chargement des stations')
            })
        }

        markerClick(ev) {
            // On met à jour les informations de la station sélectionnée à droite de la carte
            document.getElementById("stationName").innerText = this.name;
            document.getElementById("adresseStation").innerText = this.address;
            document.getElementById("etatStation").innerText = this.status;
            document.getElementById("veloDispo").innerText = this.available_bikes;
            document.getElementById("attacheDispo").innerText = this.available_bike_stands;

            document.getElementById("infoStation").style.display = "block"; // appel le block infoStation, apparait sur la page
            $(".btnResa").show(); // méthode jQuery pour adfficher le bouton resa
            $(".no-selected-station").hide(); //méthode jquerry pour cacher l'element sur la page
            $(".monCanvas").show();
            // this.resaObj.station = this
        }    
    }
    
    
    
    


