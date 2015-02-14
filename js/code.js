////////////////////////////////////////
///// variables globales/////////////////
////////////////////////////////////////

/// Souris[0] et Souris [1] Sont les coordonn�es du curseur de la souris dans le canvas. 
/// Pour les mettre � jour, il faut cr�er un �venement "move" sur le canvas qui pointe vers la fonction BougeSouris.
var Souris=new Array(); 
var Img = new Image()�;
var PositionSouris=new Array();
var	Composante=new Array();// Ce tableau est uniquement utilis� pour afficher les valeurs de chaque composants 
caracterestotaux=0




/////////////////////////////////////////
//////// D�marrage///////////////////////
////////////////////////////////////////
// S'execute d�s que la page est charg�e

function Demarrage () {
	canvas=document.getElementById("canvas");
	ctx=canvas.getContext("2d"); 
	
	ctx.textAlign="center";///////////////////////////////////////////// Texte de
	ctx.fillText("Faites parcourir pour ins�rer une image", 250, 250);// remplissage
	
	
	CheminDialog=document.getElementById("CheminDialog");
	CheminDialog.addEventListener("change",chargeimage);
	
	
	caseR.addEventListener("change",pastilles)
	
	document.getElementById("texte").addEventListener("keyup", reste);


}


////////////////////////////////////////
//////////////fonctions  ///////////////
////////////////////////////////////////

function chargeimage() {
	Img.src=CheminDialog.value.toString();
	Img.addEventListener("load",afficheimage);
}

function afficheimage(){
	canvas.height = Img.height;//Conserve les proportions
	canvas.width = Img.width;////de l'image au canvas
	ctx.drawImage(Img,0,0,Img.width,Img.height);
	document.getElementById("details").innerHTML = "Largeur : " + canvas.height + ", hauteur : " + canvas.width;//largeur; hauteur
	caracterestotaux = (((canvas.height*canvas.width)-((canvas.height*canvas.width)%8))/8);
	document.getElementById("caracterestotaux").innerHTML = "Vous pouvez cacher un total de " + caracterestotaux + " caract�res dans cette image." + texte.length;
	
}
	
function coordonnes(event){
	BougeSouris(event);
	
	composantes();
	
    document.getElementById("coordonnees").innerHTML = "Coordonn�es en X : " + PositionSouris[0] + ", Y : " + PositionSouris[1];// Affichage des coordonn�es du curseur en bas du canvas
}

function caracteresrestants(texte){
	var caracteresrestants=caracterestotaux-texte.length;
    document.getElementById("caracteresrestants").innerHTML = "Encore " + caracteresrestants + " caract�res restants.";
}

function conversionascii(texte){
	alert("test");
	var ascii = texte.charCodeAt(0);
	alert(n);
}

////////////////////////////////////////
//////////////fonctions donn�es/////////
////////////////////////////////////////



function LirePixel() { // Renvoie un tableau contenant les 3 composante RGB du pixel (x,y) du contexte graphique du Canvas
	imageData = ctx.getImageData(0,0,canvas.width,canvas.height);	// lecture du pixel
	return imageData; // on renvoie le tableau contenant les 3 composantes
}

function EcrirePixel(imageData) { // Modifie les 3 composantes RGB du pixel(x,y) dans le contexte graphique du Canvas gr�ce au tableau Composante
	ctx.putImageData(imageData,0,0); // ecriture du pixel
}

function BougeSouris(event) { // met � jour la position du curseur
    PositionSouris[0] = event.clientX-document.getElementById("canvas").offsetLeft;
    PositionSouris[1] = event.clientY-document.getElementById("canvas").offsetTop;
	
}

var getOffsetLeft = function(elt) { // calcul la position du curseur dans la fen�tre active en abscisse
    var result = 0;
    if (elt.offsetParent) {
	result = result + getOffsetLeft(elt.offsetParent);
    }
    return result + elt.offsetLeft;
} 
var getOffsetTop = function(elt) {  // calcul la position du curseur dans la fen�tre active en ordonn�e
    var result = 0;
    if (elt.offsetParent) {
	result = result + getOffsetTop(elt.offsetParent);; 
    }
    return result + elt.offsetTop;
} 

////////////////////////////////////////
//////////////CORPS/////////////////////
////////////////////////////////////////


window.addEventListener("load", Demarrage); // attends le chargement complet pour lancer la fonction D�marrage
