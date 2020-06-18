
class Diaporama  {
  constructor (){
    // Attributs - Propriétés  : valeur
    this.diapos = [];
    this.intervalId = null;
    this.boutonPause = null;
    this.boutonPlay = null;

    // let self = this;

    this.diapos = document.getElementsByClassName("diapo");
    this.diapos = Array.from(this.diapos);
    
    
    // gestion des évènements
    this.boutonPlay = document.getElementById('playBtn');
    this.boutonPause = document.getElementById("pauseBtn");

    this.boutonPause.addEventListener("click", this.pauseDiapo.bind(this))
    this.boutonPlay.addEventListener("click", this.playDiapo.bind(this))
    
    let boutonRight = document.getElementById("rightBtn");
    boutonRight.addEventListener("click", this.avancerDiapo.bind(this));
    
    let boutonLeft = document.getElementById("leftBtn");
    boutonLeft.addEventListener("click", this.reculerDiapo.bind(this));
    
    document.addEventListener('keydown', this.keypress.bind(this))
    this.intervalId = this.demarrerDiapo();
  }
	
  
	// Méthodes - Actions
	// init: function() {

        
        
	
	
	demarrerDiapo() {
    return setInterval(this.avancerDiapo.bind(this), 2000);
	}

	pauseDiapo() {
    clearInterval(this.intervalId);
    this.boutonPause.style.display = "none";  
    this.boutonPlay.style.display = 'inline';
  }
  
  playDiapo(){
    this.intervalId = this.demarrerDiapo();
    this.boutonPause.style.display = "inline";
    this.boutonPlay.style.display = 'none';
  }
  
  avancerDiapo() {
    let diapoActive = document.getElementsByClassName('active')[0]
    // getElementsByClassName renvoie toujours un tableau même s'il n'y a qu'un seul élement dedans
    let index = this.diapos.indexOf(diapoActive); // Quel est l'index de la diapoActive dans le tableau diapos
  
    let diapoACacher = this.diapos[index];
    diapoACacher.classList.remove('active');
  
    if (index + 1 == this.diapos.length) {
      index = 0;
    } else {
      index = index + 1;
    }
  
    let diapoAMontrer = this.diapos[index];
    diapoAMontrer.classList.add('active');
  }
    
  reculerDiapo() {
      
    let diapoActive = document.getElementsByClassName('active')[0]
    // getElementsByClassName renvoie toujours un tableau même s'il n'y a qu'un seul élement dedans
    let index = this.diapos.indexOf(diapoActive); // Quel est l'index de la diapoActive dans le tableau diapos

    let diapoACacher = this.diapos[index];
    diapoACacher.classList.remove('active');

    if (index == 0) {
      index = this.diapos.length - 1;
    } else {
      index = index - 1;
    }

    let diapoAMontrer = this.diapos[index];
    diapoAMontrer.classList.add('active');   
  }
  
  keypress(eventHandler){
    let keyCode = eventHandler.keyCode;
    console.log(keyCode);
    if (keyCode == 37) { // Touche gauche
      this.reculerDiapo();
      clearInterval(this.intervalId);
      this.intervalId = this.demarrerDiapo();
    } else if (keyCode == 39) { //Touche droite
      this.avancerDiapo();
      clearInterval(this.intervalId);
      this.intervalId = this.demarrerDiapo();
    }
  }
  
}
