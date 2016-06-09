////////////////////////////////////////////////////////////////////////////////
//  _____ _                                                     _     _       //
// /  ___| |                                                   | |   (_)      //
// \ `--.| |_ ___  __ _  __ _ _ __   ___   __ _ _ __ __ _ _ __ | |__  _  ___  //
//  `--. \ __/ _ \/ _` |/ _` | '_ \ / _ \ / _` | '__/ _` | '_ \| '_ \| |/ _ \ //
// /\__/ / ||  __/ (_| | (_| | | | | (_) | (_| | | | (_| | |_) | | | | |  __/ //
// \____/ \__\___|\__, |\__,_|_| |_|\___/ \__, |_|  \__,_| .__/|_| |_|_|\___| //
//                 __/ |                   __/ |         | |                  //
//                |___/                   |___/          |_|                  //
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////
///// variables globales/////////////////
////////////////////////////////////////

/// Souris[0] et Souris [1] Sont les coordonnées du curseur de la souris dans le canvas. 
/// Pour les mettre à jour, il faut créer un évenement "move" sur le canvas qui pointe vers la fonction BougeSouris.
var Souris=new Array(); 
var img = new Image() ;
var PositionSouris=new Array();
var	Composante=new Array();// Ce tableau est uniquement utilisé pour afficher les valeurs de chaque composants 
var octet=new Array();// Ce tableau met les un derrière les autres tous les chiffres binaires qui composent tout les caractères du texte
var octetbalise=new Array();// Ce tableau contient la variable octet entre les 2 balises de début et de fin
var octetinvers=new Array();// Ce tableau reconstitue les chiffres binaire en octets
var Comporouge=new Array();
var Compovert=new Array();
var Compobleu=new Array();
var bcrvb=new Array();//précedemment bincomponent
var bcrvbsecond=new Array();//précedemment bincomponent
var bc=new Array();//précedemment bincomponent
var bcv=new Array();//précedemment bincomponent
var bcb=new Array();//précedemment bincomponent
var decimalinvers=new Array();
var balise=[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0]// Balise de 2 octets qui définissent la présence, le début et la fin d'un texte caché
var downloadimg=0
caracterestotaux=0;
tour=0;
petittour=0;


////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////


var pixel = new Array();
var texte = [1, 254];
var balisek = [1, 254];
var pixelbin = new Array();
var valbin = new Array();
var pixellsb = new Array();
var pixelverif = new Array();




////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////






/////////////////////////////////////////
//////// Démarrage///////////////////////
////////////////////////////////////////
// S'execute dès que la page est chargée

function Demarrage () {
	canvas=document.getElementById("canvas");
	ctx=canvas.getContext("2d"); 
	
	ctx.textAlign="center";///////////////////////////////////////////// Texte de
	ctx.fillText("Faites parcourir pour insérer une image", 250, 250);// remplissage
	
	
	CheminDialog=document.getElementById("CheminDialog");
	CheminDialog.addEventListener("change",ChargeImagePartout, false);
	
	
/* 	var button = document.getElementById('btn-download');
	button.addEventListener('click', function (e) {
		var dataURL = canvas.toDataURL('image/png');
		button.href = dataURL;
	});	 */
	
	
	


	progress(0, $("#progressBar"));//Initialisation de la barre de progression à 0%






	
	

}


////////////////////////////////////////
//////////////fonctions  ///////////////
////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////     _  ___                      _   _ ___          ___   __ _         _   //
//////////////////////////////////////////////////////////  _ | |/ _ \ _  _ ___ _ _ _  _  | | | |_ _|  ___   |   \ /_/| |__ _  _| |_ //
////////////////////////////////////////////////////////// | || | (_) | || / -_) '_| || | | |_| || |  |___|  | |) / -_) '_ \ || |  _|//
//////////////////////////////////////////////////////////  \__/ \__\_\\_,_\___|_|  \_, |  \___/|___|        |___/\___|_.__/\_,_|\__|//
//////////////////////////////////////////////////////////                          |__/                                             //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(function() {
///////////////////////////////////////////////////////////// Fenetre "modal"
	$( "#fenetre-1" ).dialog({
		autoOpen: false,
		maxWidth:600,
        maxHeight: 500,
        width: 600,
        height: 500,
	});
	
	$( "#fenetre-2" ).dialog({
		autoOpen: false,
		maxWidth:600,
        maxHeight: 500,
        width: 600,
        height: 500,
	});
	
	$( "#fenetre-3" ).dialog({
		autoOpen: false,
		maxWidth: 1680,
        maxHeight: 300,
	});
	
	$( "#fenetre-4" ).dialog({
		autoOpen: true,
        width: 450,
        height: 400,
	});
	
	$( "#fenetre-5" ).dialog({
		autoOpen: false,
		maxWidth:600,
        maxHeight: 500,
        width: 600,
        height: 500,
	});
	
	$( "#fenetre-6" ).dialog({
		autoOpen: false,
        width: 500,
        height: 165,
	});
	
	$( "#fenetre-7" ).dialog({
		autoOpen: false,
        width: 500,
        height: 165,
	});
	

	$( "#ouverture-1" ).click(function() { //Ouverture de la fenêtre "modal"
		$( "#fenetre-1" ).dialog( "open" );
	});
	
	$( "#ouverture-2" ).click(function() { //Ouverture de la fenêtre "modal"
		$( "#fenetre-2" ).dialog( "open" );
	});

	$( ".ouverture-3" ).click(function() { //Ouverture de la fenêtre "modal"
		$( "#fenetre-5" ).dialog( "open" );
	});

	$( document ).tooltip({
		track: true,
		position: {
        my: "left top",
		
		}
	}); //infobulle
	
	$( "#aide" ).click(function() { //Ouverture de la fenêtre "modal"
		$( document ).tooltip( "open" );
	});


});





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function progress(percent, $element) {
	var progressBarWidth = percent * $element.width() / 100;
	$element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");//&nbsp; sans retour à la ligne avec un espace
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////     _  ___                      _   _ ___          ___ _      //
//////////////////////////////////////////////////////////////////////  _ | |/ _ \ _  _ ___ _ _ _  _  | | | |_ _|  ___   | __(_)_ _  //
////////////////////////////////////////////////////////////////////// | || | (_) | || / -_) '_| || | | |_| || |  |___|  | _|| | ' \ //
//////////////////////////////////////////////////////////////////////  \__/ \__\_\\_,_\___|_|  \_, |  \___/|___|        |_| |_|_||_|//
//////////////////////////////////////////////////////////////////////                          |__/                                 //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////













////////////////Couleur Survol du bouton téléchargement/////////////Rouge quand le téléchargement n'est pas disponible, bleu quand il l'est
function survol1(){
	if(downloadimg==0){
		document.getElementById('BoutonType2').style.color="#CF000F";
	}else{
		document.getElementById('BoutonType2').style.color="#14b9d6";
	}
}

function survol2(){
	document.getElementById('BoutonType2').style.color="#5e6d81";
}
////////////////////////////////////////////////////////////////////





function canvastopng(){
	img = document.getElementById("canvastopng");
	img.src = canvas.toDataURL();
}

function saveimg(){//Déverrouille le bouton "Télécharger l'image"
	var link = document.getElementById("save");
	link.href = canvas.toDataURL("image/bmp");
	link.download = "SteganographieISNHQE2015.bmp";
	
	var resultat = document.getElementById("resultat")
	resultat.src = canvas.toDataURL("image/bmp");
	downloadimg=1;
	//////////////////////////////////////////////////////////////////Taille de la fenêtre (obligé de faire de cette manière car la taille max ) n'est pas prise 
	if(img.width>window.innerWidth){//////////////////////////////////en compte sans rafraichissement maxWidth et maxHeight ne peuvent donc pas être utilisés
		var largeur=img.width-(img.width-window.innerWidth)-68;///////$( "#fenetre-3" ).dialog({maxWidth: window.innerWidth,maxHeight: window.innerHeight,});
	}else{
		var largeur=img.width-38;
	}
	
	if(img.height>window.innerHeight){
		var hauteur=img.height-(img.height-window.innerHeight)-30;
	}else{
		var hauteur=img.height;
	}
	
	$( "#fenetre-3" ).dialog({width: largeur,height: hauteur,});
	$( "#fenetre-3" ).dialog( "open" );//Ouverture de la fenêtre "modal"
	
	
	terminal("Largeur de l'image");
	terminal(img.width);
	terminal("Hauteur de l'image");
	terminal(img.height);
	
}

function chargeimage() {
	Img.src=CheminDialog.value.toString();
	Img.addEventListener("load",afficheimage);
}

function afficheimage(){
	canvas.height = Img.height;//Conserve les proportions
	canvas.width = Img.width;////de l'image au canvas
	ctx.drawImage(Img,0,0,Img.width,Img.height);
	document.getElementById("details").innerHTML = "Largeur : " + canvas.height + ", hauteur : " + canvas.width;//largeur; hauteur
	caracterestotaux = (((canvas.height*canvas.width*3)-((canvas.height*canvas.width*3)%8))/8);
	document.getElementById("ouiwtf").innerHTML = "Vous pouvez cacher un total de " + caracterestotaux + " caractères dans cette image.";
	canvastopng();
	
}

function caracteresrestants(texte){
	var caracteresrestants=caracterestotaux-texte.length;
    document.getElementById("caracteresrestants").innerHTML = "Encore " + caracteresrestants + " caractères restants.";
}

function caracterelimite(){
	var reste=(canvas.height*canvas.width)%8;
	var limitedecaracteres = (((canvas.height*canvas.width)-reste)/8)-16;//16 correspond à la balise de 2 octets
	terminal(limitedecaracteres +" caractères peuvent être codés dans l'image");
	limitedecaracteres = (canvas.height*canvas.width);
	terminal("limitedecaracteres");
	terminal(limitedecaracteres);
	var contentsbits=((content.length)*8+16);
	terminal("contentsbits");
	terminal(contentsbits);
	limitedecaracteres=contentsbits-limitedecaracteres;
	terminal("limitedecaracteres");
	if(limitedecaracteres<0){
		terminal("Le nombre de caractères rentre bien dans l'image");
		limitation=0;//Nécessaire pour lancer la fonction ecpixel
	}else{
		reste=limitedecaracteres%8;
		limitedecaracteres=(limitedecaracteres-reste)/8;
		var messagelimite= "Il y a "+limitedecaracteres + " caractères en trop";
		terminal(messagelimite);
		document.getElementById("messagelimite").innerHTML = messagelimite;
		$( "#fenetre-7" ).dialog( "open" );//Ouverture de la fenêtre "modal"
		limitation=1;
		progress(100, $("#progressBar"));		
	}
	terminal(contentsbits);
}

function conversionascii(texte){
	terminal("test");
	var ascii = texte.charCodeAt(0);
	terminal(n);
}

function separateur(){
	terminal("Début de la séparation du texte")	
	var content = tinyMCE.get("texte").getContent();
/* 	terminal(content);	
	terminal(content.split(""));
 */	
	var separateur = content.split("");// la fonction split crée un tableau qui sépare à chaques caratères
/* 	terminal("test");
	terminal(separateur);
	terminal(separateur.length);
	terminal("annonce boucle");
 */	
	for(var i = 0;i < separateur.length;i++){////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////A refaire
// 		terminal(separateur[i].charCodeAt().toString(2));// à la base 7 chiffres, pour la facilité on ajoute le 8ème pour faire un octet
		caracterebin = separateur[i].charCodeAt().toString(2);//appelle du tableau, conversion en code ascii décimal, conversion en binaire(temporaire pour test)
		while(caracterebin.length!=8){//on ajoute des 0 pour obtenir le bon compte d'octet
			caracterebin = "0" + caracterebin;
		}
		
		// terminal(caracterebin);
	//	document.getElementById("testbin"+[i]).innerHTML =  caracterebin;
		octetintermediaire = caracterebin.split("");//split de l'octet
		// terminal("taille de l'octet")
		// terminal(caracterebin.length);
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Systeme de pourcentage avec le terminal
		for(var j = 0;j<octetintermediaire.length;j++){//Cette boucle place le contenu du petit tableau "octetintermediaire"contenant un seul octet dans le grand tableau "octetfinal" contenant tous les octets
			stockage();//Appel de la fonction stockage
			tour++;
			petittour++;
		}
		// terminal("Plop");
		petittour=0;
		terminal(i + "%");
	}
	// terminal("FIN");//trouver un moyen d'y arriver
	terminal("Fin de la séparation du texte")
	balises();//Appel de la fonction balises
	document.getElementById("ouiwtf").innerHTML =  octetbalise;	
}

function stockage(){
/* 	terminal("octey");
	terminal(octetintermediaire);
	terminal(octetintermediaire[petittour]);
 */	octet[tour]=octetintermediaire[petittour];
/* 	terminal("octet");
	terminal(octet);
 */	
}

function balises(){
// terminal("Début Insertion de la variable octet entre les 2 balises");
// terminal(octet);
////Début Insertion de la variable octet entre les 2 balises////


/* for (var i=0, j=0; i<octet.length+32; i++, j++){
	if(i<16){
		octetbalise[i]=balise[j];
	}else if(i>=octet.length+16){
		if(i==octet.length+16){//évite de redéclarer une troisime variable qui aurait la même utilité que i et j
			j=0;
		}		
		octetbalise[i]=balise[j];
	}else{
		if(i==16){//évite de redéclarer une troisime variable qui aurait la même utilité que i et j
			j=0;
		}
		octetbalise[i]=octet[j];
	}
	
}
 *///Version de la fonction balises avec une balise de départ et une balise de fin


for (var i=0, j=0; i<octet.length+32; i++, j++){
	if(i>=octet.length+16){
		if(i==octet.length+16){//évite de redéclarer une troisime variable qui aurait la même utilité que i et j
			j=0;
		}		
		octetbalise[i]=balise[j];
	}else if(i<16){
		octetbalise[i]=balise[j];		
	}else{
		if(i==16){
			j=0;
		}
		octetbalise[i]=octet[j];
	}
	
}
////Fin Insertion de la variable octet entre les 2 balises////
// terminal(octetbalise);
}


function testmcee(){
	var content =  tinyMCE.get("texte").getContent();
	/* document.getElementById("testmce").innerHTML =  content; */
	document.getElementById("testmce2").value =  content;
	
}



////////////
/* Le terminal permet dans la version définitive du projet de combler le fait que les terminales ne sont plus là. 
Indique l'avancer des fonctions utile lors de traitement d'image haute résolution (si le navigateur ne plante pas).
 */
 function terminal(content){
	document.getElementById("terminal").value +=  content + "\n";
/* 	var scroll = document.getElementById('terminal');////Pour scroller la barre vers
	scroll.scrollTop = scroll.scrollHeight;////////////le bas automatiquement
 */}
////////////



function stegano(){
	recuppixel();
}

//élève B//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////  ___         _          //
//////////////////////////////////////////////////////////////////////////////////////////////// |_ _|_ ___ _(_)_ _  ___ //
////////////////////////////////////////////////////////////////////////////////////////////////  | || '_\ V / | ' \/ -_)//
//////////////////////////////////////////////////////////////////////////////////////////////// |___|_|  \_/|_|_||_\___|//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function chargeImage()
{
	Img.src=Dialogue.value.toString();
	Img.addEventListener("load",afficheDansCanvas);  
}

function afficheDansCanvas() 
{
    ctx.drawImage(Img, 0, 0, Img.width, Img.height, 0, 0, Canvas.width, Canvas.height);
}


// reupèrer et convertir chaque pixel de l'image suivant la composante rouge
//--------------------------------------------------------------------------
function recuppixel() 
{
progress(0, $("#progressBar"));

terminal("converstext début")
converstext();
terminal("converstext fin")
terminal("Recuppixel");
LirePixel();

	for(var i=0, h=0; i<imageData.data.length; i+=4, h++) {// i augmente de 4 h augment de 1
		Comporouge[h]=imageData.data[i];
/* 		Compovert[h]=imageData.data[i+1];// Dans le cas de 3 composantes
		Compobleu[h]=imageData.data[i+2];
 */	}
progress(15, $("#progressBar"));

	terminal("Comporouge");
	terminal(Comporouge);
	
    terminal("tri");
	tri();
	
progress(50, $("#progressBar"));

	terminal("fin tri");
    terminal(Comporouge);
	terminal("Comporouge");
	terminal(Comporouge);
	caracterelimite();
	if(limitation==0){
		ecpixel();
	}
}

function ecpixel() 
{	
	for(var i=0, h=0; i<imageData.data.length; i+=4, h++) {// i augmente de 4 h augment de 1
		imageData.data[i]=Comporouge[h];
/* 		imageData.data[i+1]=Compovert[h];// Dans le cas de l'utilisation de 3 composantes
 		imageData.data[i+2]=Compobleu[h];
 */	}

 	for(var i=0; i<=Comporouge.length; i++){
		bc[i]= parite(Comporouge[i]);//on demande la parité de la composante pour en extraire un chiffre binaire
	}
terminal(bc);
 
 
EcrirePixel(imageData);	
saveimg()
progress(100, $("#progressBar"));
terminal("Le texte à bien été codé dans l'image, vous pouvez maintenant la télécharger");

	
}



// convertie le texte en code ascii puis en bianire
//--------------------------------------------------
function converstext()
{		
	content = tinyMCE.get("texte").getContent();	// recupère chaque lettre de la zone de texte		
		terminal("content");
		terminal(content);
	for (i=0; i<content.length; i++)
	{
		texte[i+2] = content[i].charCodeAt();		// convertie chaque lettre en code ascii			*****************  +2 car la balise prend 2 cases d'un tableau
	}
	terminal(texte);
	balize();
}



function balize(){//balize car conflit avec la variable balise
terminal("Fonction balize");
	for (var i=texte.length, j=0; j<2; i++, j++){
		texte[i]=balisek[j];	
		terminal(texte);
		//terminal("j");
		//terminal(j);
	}
}

function tri() 
{
    terminal("Dans tri");
    terminal(texte.length);
    terminal("texte");
    terminal(texte);
    h=0
    for (i=0; i<texte.length; i++)
    {
        
		for (j=128; j>=1; j=j/2)
        {
            temp=j & texte[i];
			// terminal("temp");
			// terminal(temp);
            
            // terminal(" texte: "+texte[i] + " j: "+ j + " calcul: " + temp  );
            
            pp=Comporouge[h] & 254;
            
            if (temp == j)
				{
                    Comporouge[h]=pp + 1; // Mask xxxx xxx1
				}
			else 
				{
                
					Comporouge[h]=pp; // Mask xxxx xxx0
				}
            
            h++;
		}
		
	}
    terminal("texte2");
    terminal(texte);
	
}

function insertion () 
{
	for(var i=0, j=0; i<imageData.data.length; i+=4, j++) {// i augmente de 4 j augment de 1
/* 		terminal(i);
		terminal(j);
 */		imageData.data[i]=Comporouge[j];
	}
}


//élève A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////    _          __ _ _     //
///////////////////////////////////////////////////////////////////////////////////////////////   /_\  _ __  /_/| (_)___ //
///////////////////////////////////////////////////////////////////////////////////////////////  / _ \| '  \/ -_) | / -_)//
/////////////////////////////////////////////////////////////////////////////////////////////// /_/ \_\_|_|_\___|_|_\___|//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function DecimalVersBinaire() { // convertion binaire vers décimal avec modulo et division 
	//DB=Decimal.value;
	//if (Decimal.value<0 || Decimal.value>255){
	//terminal ("Impossible");
	//}
	//else{
	var decimal=Comporouge[i];
	var valbit;
	for (var j=7; j>=0; j--){
	valbit = decimal % 2;// modulo
	valbin[j]=valbit;
	decimal=Math.floor(decimal/2); // division 
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////  ___ _          _          __ _ _     //
////////////////////////////////////////////////////////////////////////////////// | __(_)_ _     /_\  _ __  /_/| (_)___ //
////////////////////////////////////////////////////////////////////////////////// | _|| | ' \   / _ \| '  \/ -_) | / -_)//
////////////////////////////////////////////////////////////////////////////////// |_| |_|_||_| /_/ \_\_|_|_\___|_|_\___|//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////  ___ _        ___         _          //
/////////////////////////////////////////////////////////////////////////////////// | __(_)_ _   |_ _|_ ___ _(_)_ _  ___ //
/////////////////////////////////////////////////////////////////////////////////// | _|| | ' \   | || '_\ V / | ' \/ -_)//
/////////////////////////////////////////////////////////////////////////////////// |_| |_|_||_| |___|_|  \_/|_|_||_\___|//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function steganoinvers(){
progress(0, $("#progressBar"));
var caractereinvers = new Array();	
var textefinal;
var presencebalisedebut=0;//la variable va déterminer l'execution de la suite de la fonction ou non
var presencebalisefin=0;//la variable va déterminer l'execution de la suite de la fonction ou non
	
//On lit tous les pixels de l'image	
LirePixel();
//On ne garde que la composante rouge
	for(var i=0, j=0; i<=imageData.data.length; i+=4, j++) {// i augmente de 4 j augment de 1
		Comporouge[j]=imageData.data[i];
	}

//On demande la parité de la composante rouge
	for(var i=0; i<=Comporouge.length; i++){
		bc[i]= parite(Comporouge[i]);//on demande la parité de la composante pour en extraire un chiffre binaire
		/* terminal(bc); */				
	}
progress(15, $("#progressBar")); 

	
//Vérification de la présence des balises, si il n'y a pas de balise un message s'affiche informant du fait qu'il n'y a pas de texte codé dans l'image
//Début vérification présence balises
//document.getElementById("ouiwtf").innerHTML =  bc;



//élève A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////    _          __ _ _     //
///////////////////////////////////////////////////////////////////////////////////////////////   /_\  _ __  /_/| (_)___ //
///////////////////////////////////////////////////////////////////////////////////////////////  / _ \| '  \/ -_) | / -_)//
/////////////////////////////////////////////////////////////////////////////////////////////// /_/ \_\_|_|_\___|_|_\___|//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
var detection=0;
var limitetexte=0;
while(detection<=bc.length){
	if(bc[detection]==balise[0] && bc[detection+1]==balise[1] && bc[detection+2]==balise[2] && bc[detection+3]==balise[3] && bc[detection+4]==balise[4] && bc[detection+5]==balise[5] && bc[detection+6]==balise[6] && bc[detection+7]==balise[7] && bc[detection+8]==balise[8] && bc[detection+9]==balise[9] && bc[detection+10]==balise[10] && bc[detection+11]==balise[11] && bc[detection+12]==balise[12] && bc[detection+13]==balise[13] && bc[detection+14]==balise[14] && bc[detection+15]==balise[15]){
		if(detection==0){
			presencebalisedebut=1;			
			terminal("Balise de début détectée");
		}else if(detection!=0){
			presencebalisefin=1;
			terminal("Balise de fin détectée");	
			limitetexte=detection-16;
			terminal(detection);
			detection=bc.length;//arrêt de la boucle
		}
		detection+=8;		
	}else{
		detection+=8;
		// terminal("detection");
		// terminal(detection);
		//terminal("pas de texte")
	}
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////  ___ _          _          __ _ _     //
////////////////////////////////////////////////////////////////////////////////// | __(_)_ _     /_\  _ __  /_/| (_)___ //
////////////////////////////////////////////////////////////////////////////////// | _|| | ' \   / _ \| '  \/ -_) | / -_)//
////////////////////////////////////////////////////////////////////////////////// |_| |_|_||_| /_/ \_\_|_|_\___|_|_\___|//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


progress(35, $("#progressBar"));

if(presencebalisedebut==1 && presencebalisefin==1){
	terminal(limitetexte + " caractères à insérer");
		for(var i=0, j=16; i<limitetexte; i++, j++){//supression des balises
			bcrvbsecond[i]=bc[j];
		}
		terminal("bcrvbsecond : " + bcrvbsecond);
		for(var i=0, j=0; i<limitetexte; i++){// boucle qui reforme les octets	
				if(i!=0 && i%8==0){//Tout les 8 tours, lancer le if sauf quand i=0 (parceque 0,1,2,3,4,5,6,7 = 8 chiffres)
					/* terminal("i=multiple de 8"); */
					j++;
				}	
			
				bcrvbsecond[i]=bcrvbsecond[i] + "";//conversion du nombre en chaîne de caractères
				octetinvers[j]=octetinvers[j] + "";
				if(i%8==0){// premier tour insérer pour définir une valeur à octetinvers
					octetinvers[j]=bcrvbsecond[i];
				}else{
					octetinvers[j]+=bcrvbsecond[i];		
				}
		}
	progress(75, $("#progressBar"));
		
	terminal("octetinvers.length : " + octetinvers.length);
	for(var i=0; i<=octetinvers.length; i++){// Conversion binaire decimale (juste un test avec 8 caractères)
		decimalinvers[i] = parseInt(octetinvers[i], 2);//Conversionbindec(octetinvers[i])
	}
	
	for(var i=0; i<octetinvers.length; i++){// Receptionne le code ascii de chaque caractères et le met dans le input text "testmce2" (juste un test avec 56 bit soit 8 caractères)
		caractereinvers[i] = String.fromCharCode(decimalinvers[i]);
		if(i==0){// premier tour insérer pour définir une valeur à textefinal
			textefinal = caractereinvers[i];
		}else{
			textefinal += caractereinvers[i];
		}
		
		
	}
	tinyMCE.get('texte').setContent(textefinal);// On retourne le texte à TinyMCE
	// tinyMCE.get("texte").getContent() = textefinal;
	progress(100, $("#progressBar"));
	terminal("Le texte a bien été décodé");
		
}else{
	progress(100, $("#progressBar"));
	terminal("Il n'y a pas de texte codé dans l'image");
	$( "#fenetre-6" ).dialog( "open" );//Ouverture de la fenêtre "modal"
}
}





//élève A//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////    _          __ _ _     //
///////////////////////////////////////////////////////////////////////////////////////////////   /_\  _ __  /_/| (_)___ //
///////////////////////////////////////////////////////////////////////////////////////////////  / _ \| '  \/ -_) | / -_)//
/////////////////////////////////////////////////////////////////////////////////////////////// /_/ \_\_|_|_\___|_|_\___|//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function parite(component){//
	return (component%2);//modulo de 2 donne la parité du nombre de manière binaire
}



function ChargeImagePartout(event){//Dans le MDN
    progress(30, $("#progressBar"));
    var reader = new FileReader();
    reader.onload = function(event){
        img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);//Plus opti
    progress(100, $("#progressBar"));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////  ___ _          _          __ _ _     //
////////////////////////////////////////////////////////////////////////////////// | __(_)_ _     /_\  _ __  /_/| (_)___ //
////////////////////////////////////////////////////////////////////////////////// | _|| | ' \   / _ \| '  \/ -_) | / -_)//
////////////////////////////////////////////////////////////////////////////////// |_| |_|_||_| /_/ \_\_|_|_\___|_|_\___|//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



	
	terminal("                   <<<<>>>>>>           .----------------------------.");
	terminal("                _>><<<<>>>>>>>>>       /               _____________)");
	terminal("       \|/      \<<<<<  < >>>>>>>>>   /            _______________)");
	terminal(" -------*--===<=<<           <<<<<<<>/         _______________)");
	terminal("       /|\     << @    _/      <<<<</       _____________)");
	terminal("              <  \    /  \      >>>/      ________)  ____");
	terminal("                  |  |   |       </      ______)____((- \\\\");
	terminal("                  o_|   /        /      ______)         \  \\\\    \\");
	terminal("                       |  ._    (      ______)           \  \\\\\\\\");
	terminal("                       | /       `----------'    /       /     \\\\\\");
	terminal("               .______/\/     /                 /       /          \\");
	terminal("              / __.____/    _/         ________(       /");
	terminal("             / / / ________/`---------'         \     /  \_");
	terminal("            / /  \ \                             \   \ \_  ");
	terminal("           ( <    \ \                             >  /    \ ");
	terminal("            \/      \\_                          / /       > )");
	terminal("                     \_|                        / /       / /");
	terminal("                                              _//       _//");
	terminal("                                             /_|       /_|");
	terminal("");
	terminal("Une image a été chargée");
}





////////////////////////////////////////
//////////////fonctions données/////////
////////////////////////////////////////



function LirePixel() { // Renvoie un tableau contenant les 3 composante RGB du pixel (x,y) du contexte graphique du Canvas
	imageData = ctx.getImageData(0,0,canvas.width,canvas.height);	// lecture du pixel
	return imageData; // on renvoie le tableau contenant les 3 composantes
}

function EcrirePixel(imageData) { // Modifie les 3 composantes RGB du pixel(x,y) dans le contexte graphique du Canvas grâce au tableau Composante
	ctx.putImageData(imageData,0,0); // ecriture du pixel
}

function BougeSouris(event) { // met à jour la position du curseur
    PositionSouris[0] = event.clientX-document.getElementById("canvas").offsetLeft;
    PositionSouris[1] = event.clientY-document.getElementById("canvas").offsetTop;
	
}

var getOffsetLeft = function(elt) { // calcul la position du curseur dans la fenêtre active en abscisse
    var result = 0;
    if (elt.offsetParent) {
	result = result + getOffsetLeft(elt.offsetParent);
    }
    return result + elt.offsetLeft;
} 
var getOffsetTop = function(elt) {  // calcul la position du curseur dans la fenêtre active en ordonnée
    var result = 0;
    if (elt.offsetParent) {
	result = result + getOffsetTop(elt.offsetParent);; 
    }
    return result + elt.offsetTop;
} 

////////////////////////////////////////
/////////////////JQUERY/////////////////
////////////////////////////////////////


$(document).ready(function() {
$("#terminal").html(">_");

setInterval(function(){
removeAndAppendBlickWraper();
},2000);
	
});

function removeAndAppendBlickWraper(){
		removeAndAppendBlick(function(){
		
				var text = $("#terminal").val(),
				withCursortext =text+">_";
				$("#terminal").val(withCursortext);
		});
}
function removeAndAppendBlick(callback){
var text = $("#terminal").val();
 var witoutCursor = text.substr(0,text.lastIndexOf(">_"));
 $("#terminal").val(witoutCursor);
 setTimeout(function(){
 callback();
 },1500);
 
}



////////////////////////////////////////
//////////////CORPS/////////////////////
////////////////////////////////////////


window.addEventListener("load", Demarrage); // attends le chargement complet pour lancer la fonction Démarrage
window.addEventListener("resize", function(){// Les 2 divs de la même taille
	if(window.innerHeight<800){
		document.getElementById('div-2').style.height=438;
	}else if(window.innerHeight>=800 && window.innerHeight<820){
		document.getElementById('div-2').style.height=593;
	}else if(window.innerHeight>=820 && window.innerHeight<840){
		document.getElementById('div-2').style.height=603;
	}else if(window.innerHeight>=840 && window.innerHeight<860){
		document.getElementById('div-2').style.height=623;
	}else if(window.innerHeight>=860 && window.innerHeight<880){
		document.getElementById('div-2').style.height=643;
	}else if(window.innerHeight>=880 && window.innerHeight<900){
		document.getElementById('div-2').style.height=663;
	}else if(window.innerHeight>=900){
		document.getElementById('div-2').style.height=678;
	}
});

window.addEventListener("load", function(){
	if(window.innerHeight<800){
		document.getElementById('div-2').style.height=438;
	}else if(window.innerHeight>=800 && window.innerHeight<820){
		document.getElementById('div-2').style.height=593;
	}else if(window.innerHeight>=820 && window.innerHeight<840){
		document.getElementById('div-2').style.height=603;
	}else if(window.innerHeight>=840 && window.innerHeight<860){
		document.getElementById('div-2').style.height=623;
	}else if(window.innerHeight>=860 && window.innerHeight<880){
		document.getElementById('div-2').style.height=643;
	}else if(window.innerHeight>=880 && window.innerHeight<900){
		document.getElementById('div-2').style.height=663;
	}else if(window.innerHeight>=900){
		document.getElementById('div-2').style.height=678;
	}
});
