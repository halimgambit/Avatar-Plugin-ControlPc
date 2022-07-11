exports.action = function(data, callback){

let nomUsers = "";
if(!nomUsers){
	Avatar.speak('nom d\'utilisateur du pc non renseigner, renseigne le dans le fichier js a la ligne nom user' , data.client , function(){
		Avatar.Speech.end(data.client);
		});
		return;
}

let lettreCd = "";
if(!lettreCd) {
	Avatar.speak('lettre du lecteure disque manquante, rrenseigne le dans le fichier js a la ligne lettre cd' , data.client , function(){
		Avatar.Speech.end(data.client);  
	});
		return;
}


var tblCommand = {
	setVolume : function() { setVolume (data, client);
},
    VolumeUp : function() { VolumeUp (data, client);
},
    VolumeDown : function() { VolumeDown (data, client);
},
    volumeMute : function() { volumeMute (data, client);
},	
    volumeUnMute : function() { volumeUnMute (data, client);
},
    repertoireExplorateur : function() { repertoireExplorateur (data, client);
},	
    repertoireC : function() { repertoireC (data, client);
},	
    repertoireTelechargement : function() { repertoireTelechargement (data, client);
},	
    repertoireDocuments : function() { repertoireDocuments (data, client);
},	
    repertoireVideos : function() { repertoireVideos (data, client);
},	
    repertoireMusiques : function() { repertoireMusiques (data, client);
},	
    repertoireImages : function() { repertoireImages (data, client);
},	
    repertoireBureau : function() { repertoireBureau (data, client);
},	
    repertoirePlugins : function() { repertoirePlugins (data, client);
},	
    masqueLesFenetres : function() { masqueLesFenetres (data, client);
},	
    afficheLesFenetres : function() { afficheLesFenetres (data, client);
},	
    vueGlobal : function() { vueGlobal (data, client);
},	
    restoreFenetres : function() { restoreFenetres (data, client);
},	
    fermeFenetres : function() { fermeFenetres (data, client);
},	
    fermeNavigateurs : function() { fermeNavigateurs (data, client);
},	
    fermeSession : function() { fermeSession (data, client);
},	
    redemarrePc : function() { redemarrePc (data, client);
},	
    arretePc : function() { arretePc (data, client);
},	
    allumeEcran : function() { allumeEcran (data, client);
},	
    eteinsEcran : function() { eteinsEcran (data, client);
},	
    lecteurCdOuvert : function() { lecteurCdOuvert (data, client);
},	
    lecteurCdfermer : function() { lecteurCdfermer (data, client);
},	
	corbeille : function() {corbeille (data, client);
},	
    videCorbeille : function() {videCorbeille (data, client);
}	
};
	let client = setClient(data);
	info("ControlPc:", data.action.command, "From:", data.client, "To:", client);
	tblCommand[data.action.command]();
	


function setVolume (data, client) {

    Avatar.askme("A combien veux tu régler le volume ?|A combien veux tu régler le son ?", client, {
		"*": "generic",
		"terminer": "done"
}, 0, function (answer, end) {
    end(client, true);
    if (!answer) {
	return Avatar.speak("Recommence je n'ai rien entendue", data.client, function(){
	setVolume(data, client);
	});
}
if (answer && answer.indexOf('generic') != -1) {
	answer = answer.split(':')[1];
	answer = answer.replace('a','');
	answer = answer.replace('à','');
	let value = answer*655;
    Avatar.speak("Le volume est maintenant à." + answer + "%", data.client, function () {
	Avatar.Speech.end(data.client, true, () => {
    Avatar.runApp(__dirname + '/nircmd/nircmdc64.exe setsysvolume' + " " + value, null, data.client, function () {
    });
    });
    });
	return;
}
    switch(answer) {
	case "done":
    default:
    Avatar.speak("Terminé", data.client, function(){
    end(data.client, true);
    });
}
    });
}


function VolumeUp (data, client) {
	Avatar.speak("Je monte le volume|Je monte le son", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + '/nircmd/nircmdc64.exe changesysvolume 5000', null, data.client, function(){
	});
	});
	});
}

function VolumeDown (data, client) {
	Avatar.speak("Je baisse le volume|Je baisse le son", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + '/nircmd/nircmdc64.exe changesysvolume -5000', null, data.client, function(){
	});
	});
	});
}


function volumeMute (data, client) {
	Avatar.speak("Je coupe le son|Je coupe le volume", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + '/nircmd/nircmdc64.exe mutesysvolume 1',null, data.client, function(){
	});
	});
    });
}

function volumeUnMute (data, client) {
	Avatar.speak("Je remet le son|Je remet le volume", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + '/nircmd/nircmdc64.exe mutesysvolume 0', null,data.client, function(){
	});
	});
    });
}

function repertoireExplorateur (data, client) {
	Avatar.speak("J'ouvre l'éxplorateure de fichier|J'ouvre le poste de travail", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + "/nircmd/nircmdc64.exe sendkeypress lwin+E ", null, data.client, function(){
	});
    });
    });
}

function repertoireC (data, client) {
	Avatar.speak("J'ouvre le dossier local C", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp("start C:/", null, data.client, function(){
	});
    });
    });
}

function repertoireTelechargement (data, client) {
	Avatar.speak("J'ouvre le dossier téléchargement", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp("start C:/Users/" + nomUsers + "/Downloads", null, data.client, function(){
	});
    });
    });
}

function repertoireDocuments (data, client) {
	Avatar.speak("J'ouvre le dossier document ", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp("start C:/Users/"+ nomUsers + "/Documents", null, data.client, function(){
	});
    });
    });
}

function repertoireVideos (data, client) {
	Avatar.speak("J'ouvre le dossier video", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp('start C:/Users/' + nomUsers + '/Videos', null, data.client, function(){
	});
    });
    });
}
function repertoireMusiques (data, client) {
	Avatar.speak("J'ouvre le dossier musique", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp("start C:/Users/" + nomUsers + "/Music", null, data.client, function(){
	});
    });
    });
}

function repertoireImages (data, client) {
	Avatar.speak("J'ouvre le dossier image", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp("start C:/Users/" + nomUsers + "/Images", null, data.client, function(){
	});
    });
    });
}

function repertoireBureau (data, client) {
	Avatar.speak("J'ouvre le dossier bureau", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp("start C:/Users/" + nomUsers + "/Desktop", null, data.client, function(){
	});
    });
    });
}

/*
function repertoirePlugins (data, client) {
	Avatar.speak("J'ouvre le dossier plug in", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp("./resources/core/plugins", null, data.client, function(){
	});
    });
    });
}
*/

function masqueLesFenetres (data, client) {
	Avatar.speak("je passe au bureau", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + "/nircmd/nircmdc64.exe sendkeypress lwin+D", null, data.client, function(){
	});
    });
    });
}

function afficheLesFenetres (data, client) {
	Avatar.speak("je retourne au bureau", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + "/nircmd/nircmdc64.exe sendkeypress lwin+D", null, data.client, function(){
	});
    });
    });
}

function vueGlobal (data, client) {
	Avatar.speak("voici une vu global", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + '/nircmd/nircmdc64.exe sendkeypress lwin+tab', null, data.client, function(){
	});
    });
    });
}

function restoreFenetres (data, client) {
	Avatar.speak("je restaure les fenètres|je restaure les pages", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + "/nircmd/nircmdc64.exe sendkeypress lwin+tab", null, data.client, function(){
	});
    });
    });
}

function fermeFenetres (data, client) {
	Avatar.speak("je ferme les fenètres|je ferme les pages", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + '/nircmd/nircmdc64.exe win close class "CabinetWClass"', null, data.client, function(){
	});
    });
    });
}

function fermeNavigateurs (data, client) {
	Avatar.speak("je ferme les navigateurs", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + '/nircmd/nircmdc64.exe sendkeypress Ctrl+F4' , null , data.client, function() {
	Avatar.runApp(__dirname + '/nircmd/nircmdc64.exe killprocess firefox.exe', null, data.client, function(){
	Avatar.runApp(__dirname + '/nircmd/nircmdc64.exe killprocess msedge.exe', null, data.client, function(){		
	});
    });
    });
    });
    });
}

function fermeSession (data, client) {
	Avatar.speak("je ferme la session", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + '/nircmd/nircmdc64.exe sendkeypress lwin+l', null, data.client, function(){
	});
    });
    });
}

function redemarrePc (data, client) {
	Avatar.speak("Je redémarre le pc|Je redémarre l'ordinateur", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + "/nircmd/nircmdc64.exe exitwin reboot", null, data.client , function(){
	});
    });
	});
}

function arretePc (data, client) {
	Avatar.speak("J'arrete le pc|J'arrete l'ordinateur", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + "/nircmd/nircmdc64.exe exitwin poweroff", null, data.client , function(){
	});
    });
	});
}

function allumeEcran (data, client) {
	Avatar.speak("J'allume l'écran|Je rallume l'écran", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + "/nircmd/nircmdc64.exe monitor on", null, data.client , function(){
	});
    });
	});
}

function eteinsEcran (data, client) {
	Avatar.speak("J'eteins l'écran|J'eteins le moniteur", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + "/nircmd/nircmdc64.exe monitor off", null, data.client , function(){
	});
    });
	});
}

function lecteurCdOuvert (data, client) {
	Avatar.speak("J'ouvre le tiroire du lecteur disque", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + "/nircmd/nircmdc64.exe cdrom open" + lettreCd + ":", null, data.client , function(){
	});
    });
	});
}

function lecteurCdfermer (data, client) {
	Avatar.speak("Je ferme le tiroire du lecteur disque", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + "/nircmd/nircmdc64.exe cdrom close" + lettreCd + ":", null, data.client , function(){
	});
    });
	});
}

function corbeille (data, client) {
	Avatar.speak("J'affiche la corbeille", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp("start C:$RECYCLE.BIN", null, data.client, function(){
	});
    });
	});
}

function videCorbeille (data, client) {
	Avatar.speak("Je vide la corbeille", data.client, function() {
	Avatar.Speech.end(data.client, true, () => {
	Avatar.runApp(__dirname + "/nircmd/nircmdc64.exe emptybin", null, data.client, function(){
	});
    });
	});
}
}

function setClient (data) {
	var client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
    if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}
