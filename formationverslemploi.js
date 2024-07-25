

//----
const zoneDeTir = document.querySelector('.ZoneDeTir');
const boutonCommencer = document.querySelector('.BoutonCommencer');
const boutonRecruter = document.querySelector('.BoutonRecruter');
const boutonCompteur = document.querySelector('.BoutonCompteur')
const boutonBienEtre = document.querySelector('.BienEtre');
const boutonSommeil = document.querySelector('.Sommeil');
const boutonCompetenceTechnique = document.querySelector('.CompetenceTechnique');
const boutonCompetenceDouce = document.querySelector('.CompetenceDouce');
const leFrancois = document.querySelector('.leFrancois');
const P1 = document.querySelector('.Personnage1');
const P2 = document.querySelector('.Personnage2');
const P3 = document.querySelector('.Personnage3');
const P4 = document.querySelector('.Personnage4');

let hasard;
let hasardR;
let hasardX;
let hasardY;
let couleurDeFond;
let nbrPersoRestant;
let cestfini = false;

// détermination aléatoire des 3 participants
let apprenant1 = Math.floor(Math.random()*monJson.length);
let apprenant2 = Math.floor(Math.random()*monJson.length);
while(monJson[apprenant1].nom === monJson[apprenant2].nom){
    apprenant2 = Math.floor(Math.random()*monJson.length);
}
let apprenant3 = Math.floor(Math.random()*monJson.length);
while(monJson[apprenant1].nom === monJson[apprenant3].nom || monJson[apprenant2].nom === monJson[apprenant3].nom){
    apprenant3 = Math.floor(Math.random()*monJson.length);
}

document.querySelector('.Personnage1 img').src = monJson[apprenant1].source;
document.querySelector('.Personnage1 p').textContent = monJson[apprenant1].nom;
document.querySelector('.Personnage2 img').src = monJson[apprenant2].source;
document.querySelector('.Personnage2 p').textContent = monJson[apprenant2].nom;
document.querySelector('.Personnage3 img').src = monJson[apprenant3].source;
document.querySelector('.Personnage3 p').textContent = monJson[apprenant3].nom;


//------------------------------------------------------
    
boutonBienEtre.onclick = function(){
    zoneDeTir.style.cursor = 'url(coeur.png), crosshair';
    zoneDeTir.style.backgroundColor =  '#ff009d69';
}

boutonSommeil.onclick = function(){
    hasard = Math.floor(Math.random()*2)
    if(hasard===1){
        zoneDeTir.style.cursor = 'url(dormir.png), crosshair';
    } else {
        zoneDeTir.style.cursor = 'url(manger.png), crosshair';
    }
    
    zoneDeTir.style.backgroundColor =  '#60804069';
}

boutonCompetenceTechnique.onclick = function(){
    hasard = Math.floor(Math.random()*6)
    switch (hasard) {

        case 1 :
            zoneDeTir.style.cursor = 'url(ANGULAR.png), crosshair';
            break;   
        case 2 :
            zoneDeTir.style.cursor = 'url(CSHARP.png), crosshair';
            break;  
        case 3 :
            zoneDeTir.style.cursor = 'url(CSS.png), crosshair';
            break;  
        case 4 :
            zoneDeTir.style.cursor = 'url(HTML.png), crosshair';
            break;     
        case 5 :
            zoneDeTir.style.cursor = 'url(SQL.png), crosshair';
            break;  
        default :
            zoneDeTir.style.cursor = 'url(JS.png), crosshair';

    }
    
    zoneDeTir.style.backgroundColor =  '#8D00FF69';
}

boutonCompetenceDouce.onclick = function(){
    hasard = Math.floor(Math.random()*3)
    if(hasard===2){
        zoneDeTir.style.cursor = 'url(ss2pensees.png), crosshair';
    } else if (hasard === 1) {
        zoneDeTir.style.cursor = 'url(ss1puzzle.png), crosshair';
    } else {
        zoneDeTir.style.cursor = 'url(ss4mains.png), crosshair';
    }
    
    zoneDeTir.style.backgroundColor =  '#80406769';
}

//------------------------------------------------------

function genererCible(laCible, leId, laSrc){
    laCible.id = leId;
    laCible.classList.add('cible');
    laCible.src = laSrc;
    laCible.style.position = 'relative';
    laCible.style.top = ((Math.random()*300) - 150) + 'px';
    laCible.style.left = ((Math.random()*100) - 50) + 'px';
    zoneDeTir.appendChild(laCible);
}

function bougerCible(laCible){
    hasardR = Math.floor(Math.random()*360) -180;
    hasardX = Math.floor(Math.random()*80) -40;
    hasardY = Math.floor(Math.random()*80) -40;
    laCible.style.transform = `rotate(${hasardR}deg) translateX(${hasardX}px) translateY(${hasardY}px)`;
}

function modifierBarre(numeroPersonnage, typeBarre){
    let laBarre = document.querySelector(`.Personnage${numeroPersonnage} .Barre${typeBarre}`);
    if(laBarre.offsetHeight < 25){
        laBarre.setAttribute("style",`height:${laBarre.offsetHeight+1}px`)
    }
}

function tirerCible(numPerso){
    couleurDeFond = zoneDeTir.style.backgroundColor;
    switch (couleurDeFond) {
        case 'rgba(128, 64, 103, 0.41)':
            modifierBarre(numPerso,'SS')
        break;
        case 'rgba(141, 0, 255, 0.41)':
            modifierBarre(numPerso,'TS')
        break;
        case 'rgba(255, 0, 157, 0.41)':
            modifierBarre(numPerso,'W')
        break;
        case 'rgba(96, 128, 64, 0.41)':
            modifierBarre(numPerso,'RAE')
        break;       
        default:
            break;
    }
}

function eliminerImage(lImage, laSource){
    if(lImage.src === laSource){
        lImage.remove();
    }
}

function baisserBarre(laBarre){
    let tailleBarre = laBarre.offsetHeight - Math.floor(Math.random()*2)
    laBarre.setAttribute('style', `height:${tailleBarre}px`)
    if(tailleBarre < 1){
        if(laBarre.parentNode.parentElement.classList.contains('Perso')){
        let uneSource = laBarre.parentNode.parentElement.querySelector('img').src;
        laBarre.parentNode.parentElement.remove();
        document.querySelectorAll('img').forEach((uneImage) => eliminerImage(uneImage, uneSource));
        } else {
            laBarre.setAttribute('style', `height:${Math.ceil(Math.random()*20)}px`)    
        }

    }
}

//------------------------------------------------------

boutonRecruter.onclick = function(){
    document.querySelector('body').style.cursor = 'url(embauche.png), crosshair';
    cestfini = true;
}

leFrancois.onclick = function(){
    if(cestfini=== true){
        zoneDeTir.innerHTML = "<p>Bravo, vous avez engagé Francois c'est le meilleur !!!!!!!!!!!!!!!!!!</p> <p>----</p> <img src=\"qrcode.png\" alt=\"qrcode vers linktree francois gentric\" width=\"70%\"> <p>----</p> <a href=\"https://linktr.ee/francoisgentric\">Linktree de Francois</a> <p>----</p>";   
        
        let BoutonFin = document.createElement('button');
        BoutonFin.textContent = 'Terminer';
        BoutonFin.classList.add('BChartreuse');
        zoneDeTir.appendChild(BoutonFin);
        
        BoutonFin.onclick = function(){
                document.querySelector('body').classList.add('finDeFin')
                setTimeout(() => {
                    location.reload();
                }, 2900);
        }
    }
}

//------------------------------------------------------

boutonCommencer.onclick = function(){

        zoneDeTir.innerHTML = "";
        boutonCommencer.disabled = true;

        // création des 4 cibles
        zoneDeTir.setAttribute('style', 'justify-content: center');
        let cible1 = document.createElement('img');
        genererCible(cible1, 'cible1', monJson[apprenant1].source)
        let cible2 = document.createElement('img');
        genererCible(cible2, 'cible2', monJson[apprenant2].source)
        let cible3 = document.createElement('img');
        genererCible(cible3, 'cible3', monJson[apprenant3].source)
        let cible4 = document.createElement('img');
        genererCible(cible4, 'cible4', 'Francois.png')

        // quand on clique sur la cible
        cible1.onclick = function(){
            tirerCible(1);
        }
        cible2.onclick = function(){
            tirerCible(2);
        }
        cible3.onclick = function(){
            tirerCible(3);
        }
        cible4.onclick = function(){
            tirerCible(4);
        }          
//------------------------------------------------------
    let vitesseJeu = 900;
    let compteur = 0;
    let interval = setInterval(function (){

        vitesseJeu *= 0.95;
        compteur++;
        boutonCompteur.textContent = compteur;

        // on descend les compteurs
        document.querySelectorAll('.Les4barres div').forEach((uneBarre) => baisserBarre(uneBarre));

        // on fait bouger les cibles
        document.querySelectorAll('.cible').forEach((uneCible) => bougerCible(uneCible));

        // fin du jeu quand il ne reste plus que Francois
        nbrPersoRestant = document.querySelectorAll('img').length;
        if(nbrPersoRestant === 2){
            clearInterval(interval);
            zoneDeTir.innerHTML = "<p>L'action \"Recruter\" est débloquée </p> <p> 👍 </p> <p>Cliquez sur Recruter !</p> <p> 💌 </p> <p>Choisissez votre candidat !</p> <p> 🤑 </p>";
            boutonRecruter.disabled = false;
            boutonRecruter.classList.add('clickdefin');
            leFrancois.classList.add('clickdefin');
        }
    }, vitesseJeu);

        }




        