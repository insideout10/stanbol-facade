// per edigeo-online:
// var sito = "www.edigeo-online.it/dizionari_corriere";
// var cgi = "www.edigeo-online.it/cgi-local/esplora";

// per test corriere:
// var sito = "staging-dizionari.corriere.it";
// var cgi = "staging-dizionari.corriere.it/cgi-bin/esplora";

// per dizionari.corriere.it:
var sito = "dizionari.corriere.it";
var cgi = "dizionari.corriere.it/cgi-bin/esplora";


if (window.event)
document.captureEvents(event.mouseup);
document.onmouseup = prendiSel;

var stato = "off";

function prendiSel() {
	var obj=document.getElementById("evid");
	if(obj) obj.parentNode.removeChild(obj);
	if (window.getSelection) var str = window.getSelection().toString();	// Firefox, Safari, Chrome
	else if (document.selection) var str = document.selection.createRange().text;	// IExplorer
	else return;
	str = str.replace(/'|%92/g,'’');
	if ((str != '') && (stato == "off")) mostraPulsante(str);
	stato = "off";
	}

function mostraPulsante(str) {
	if (window.getSelection) {	// Firefox, Safari, Chrome
		var sel = window.getSelection();
		var range = document.createRange();
		range.setStart( sel.focusNode,sel.focusOffset );

		var newP = document.createElement('span');
		newP.setAttribute("id","evid");
		var stringa = "'" + str + "'";
		newP.innerHTML = '<a href="#" onMouseup="cercaStringa(' + stringa + ');"><img src="http://' + sito + '/images/info.gif" border=0 title="Esplora il significato del termine: ' + str + '" style="height:26px; width:26px; margin:-20px 0 0 -20px; position:absolute; display: inline;"></a>';
		range.insertNode( newP );
		}
	else if(document.selection) {	// IExplorer
		var range = document.selection.createRange();
		stringa = "'" + str + "'";
		var len = -20;
		if (document.documentMode == 8) {
			len = range.text.length;
			if (len <= 40) len = len*5-10;
			else len = 60;
			range.collapse();
			}
		else range.collapse(false);
		range.pasteHTML('<a id="evid" href="#" onMouseup="cercaStringa(' + stringa + ');"><img src="http://' + sito + '/images/info.gif" border=0 title="Esplora il significato del termine: ' + str + '" style="height:26px; width:26px; margin:-20px 0 0 ' + len +'px; position:absolute; display: inline;"></a>');
		}
	else return;
	}

function cercaStringa(testo) {
	if (testo) {
		newWin = window.open('http://' + cgi + '/cerca?' + testo, 'dizionario', 'width=1010,height=1200,resizable=yes,menubar=yes,scrollbars=1,status=yes,titlebar=yes,toolbar=yes,location=0,personalbar=0');
		if (navigator.userAgent.indexOf('Chrome/') > 0) newWin.blur();
		newWin.focus();
		}
	stato = "on";
	}

