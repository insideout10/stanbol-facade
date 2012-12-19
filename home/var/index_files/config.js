function getCookie(key)
{
    var cookieValue = null;

    if (key)
    {
        var cookieSearch = key + "=";

        if (document.cookie)
        {
            var cookieArray = document.cookie.split(";");
            for (var i = 0; i < cookieArray.length; i++)
            {
                var cookieString = cookieArray[i];

                // skip past leading spaces
                while (cookieString.charAt(0) == ' ')
                {
                    cookieString = cookieString.substr(1);
                }

                // extract the actual value
                if (cookieString.indexOf(cookieSearch) == 0)
                {
                    cookieValue = cookieString.substr(cookieSearch.length);
                }
            }
        }
    }

    return cookieValue;
}


(function(){
	
	// Login detection
	var logged = false;
	try {
		logged = $.cookie("rcsLogin");
	} catch (e) {
	}
	s.prop15 = (logged ? "" : "not ") + "logged in";

	var rcsTR=null;
	try {
		rcsTR = getCookie("rcsTR");
	} catch (e) {}
	if(rcsTR!=null && rcsTR!=""){
		var arrRcsTR=rcsTR.split("|");
		try {
			var idRuna=arrRcsTR[0];
			var genere=arrRcsTR[1];
			var eta=arrRcsTR[2];
			var prov=arrRcsTR[3];
			var state=arrRcsTR[4];
			
			//ID RUNA
			if(idRuna!=""){
				if(!isNaN(idRuna)) {
				s.prop65=idRuna;
				s.eVar65=idRuna;
				} else {
				s.prop65="";
				s.eVar65="";
				}
				//Genere
				if(genere!=""){
					s.prop62=genere;
					s.eVar62=genere;
				} else {
					s.prop62="ND";
					s.eVar62="ND";
				}
	
				//Eta'
				if(eta!=""){
					s.prop63=eta;
					s.eVar63=eta;
				} else {
					s.prop63="ND";
					s.eVar63="ND";
				}
	
				//Provincia
				if(prov==""){
					s.prop64="ND";
					s.eVar64="ND";
				} else {
					s.prop64=prov;
					s.eVar64=prov;
				}
				
				if(prov == "ES"){
					s.prop67="ND";
					s.eVar67="ND";
				} else {
					s.prop67="IT";
					s.eVar67="IT";
				}
			} else {
				//Genere
				if(genere!=""){
					s.prop62=genere;
					s.eVar62=genere;
				} else {
					s.prop62="ND";
					s.eVar62="ND";
				}
	
				//Eta'
				if(eta!=""){
					s.prop63=eta;
					s.eVar63=eta;
				} else {
					s.prop63="ND";
					s.eVar63="ND";
				}
	
				//Provincia
				if(prov==""){
					s.prop64="ND";
					s.eVar64="ND";
				} else if (state == "IT" || state == "" || !state){
					s.prop64=prov;
					s.eVar64=prov;
				} else {
					s.prop64="EE";
					s.eVar64="EE";
				}
				
				if(state!=""){
					s.prop67=state;
					s.eVar67=state;
				} else {
					s.prop67="ND";
					s.eVar67="ND";
				}
			}
		} catch (e) {}
	}

	function stringContains() {
		// Funzione di utilità che accetta più espressioni regolari come
		// parametri e controlla se almeno una di esse corrisponde alla stringa.
		// Restituisce true oppure false.
		// Esempio: if (stringa.contains("pippo.shtml", "pluto.html$")) { ... }
		var myString = this;
		var result = false;
		$.each(arguments, function() {
			myRegExp = new RegExp(this.replace(".", "\."), "gim");
			if (myRegExp.test(myString)) {
				result = true;
				return false;  // stoppiamo l'iterazione al primo match
			}
		})
		return result;
	}

	String.prototype.contains = stringContains;
	
	// Mappa URL --> eventi
	var pageUrl = document.location.href;

	if (pageUrl.contains("login\=ok$")) {
		var isFirstLogincorriere=s.getValOnce('logincorriere','e7_logincorriere',0);
		if(isFirstLogincorriere){
		//s.events=s.apl(s.events,"event7",",",2);
		}
	}
		
	if (pageUrl.contains("accesso\/ConfermaEmail.do")) {
		var isFirstRegistrationcorriere=s.getValOnce('registrationcorriere','e3_registrationcorriere',0);
		if(isFirstRegistrationcorriere){
			s.events=s.apl(s.events,"event3",",",2);
		}else{
			s.events="event3";
		}
		s.pageName = "COR/registrazione/step3";
		s.eVar68="Corriere";

	}	
		
		
	
	// buca ricerca top	
	
	
	
	if (pageUrl.contains("sitesearch.corriere.it\/forward.jsp")) { 
		if (pageUrl.contains("q\=")){
			if (pageUrl.contains("login\=ok$")) {}	
				else{
				
				if(!s.prop13){
					s.prop13=s.getQueryParam('q');
					if(s.prop13){
						s.prop19 = "Cerca in Corriere"; s.eVar19=s.prop19;
						s.prop13=s.prop13.toLowerCase();
						s.eVar13=s.prop13;
						var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
						if(t_search){
							s.events=s.apl(s.events,"event1",",",2);
									}
					/*	if(s.prop19&&!s.eVar19) */
								}
							}
		}
	}}
	
	// buca ricerca finanza
	if (pageUrl.contains("borsa.corriere.it")) { 
	if(!s.prop13){
			s.prop13=s.getQueryParam('SH2_SPPAR1');
			if(s.prop13 == "Cerca azioni e fondi") {s.prop13="nessuna parola cercata"};
			if(s.prop13){
				s.prop19 = "Economia e finanza"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				/*if(s.prop19&&!s.eVar19)*/
						}
					}
	}
	
	
	if (pageUrl.contains("dizionari.corriere.it")) { 
		s.pageName="DIZIONARI.COR/";
		if (pageUrl.contains("dizionario_italiano")) s.pageName="DIZIONARI.COR/dizionario_italiano/";
		if (pageUrl.contains("dizionario_inglese")) s.pageName="DIZIONARI.COR/dizionario_inglese/";
		if (pageUrl.contains("cgi-bin\/sansing")) s.pageName="DIZIONARI.COR/dizionario_inglese/";
		if (pageUrl.contains("dizionario_francese")) s.pageName="DIZIONARI.COR/dizionario_francese/";
		if (pageUrl.contains("cgi-bin\/zanfra")) s.pageName="DIZIONARI.COR/dizionario_francese/";
		if (pageUrl.contains("dizionario_tedesco")) s.pageName="DIZIONARI.COR/dizionario_tedesco/";
		if (pageUrl.contains("cgi-bin\/sansted")) s.pageName="DIZIONARI.COR/dizionario_tedesco/";
		if (pageUrl.contains("cgi-bin\/zanspa")) s.pageName="DIZIONARI.COR/dizionario_spagnolo/";
		if (pageUrl.contains("dizionario_spagnolo")) s.pageName="DIZIONARI.COR/dizionario_spagnolo/";
		if (pageUrl.contains("dizionario_sinonimi_contrari")) s.pageName="DIZIONARI.COR/dizionario_sinonimicontrari/";
		if (pageUrl.contains("cgi-bin\/sincontr")) s.pageName="DIZIONARI.COR/dizionario_sinonimicontrari/";
		if (pageUrl.contains("dizionario-modi-di-dire")) s.pageName="DIZIONARI.COR/dizionario_modididire/";
		if (pageUrl.contains("dizionario-citazioni")) s.pageName="DIZIONARI.COR/dizionario_citazioni/";
		if (pageUrl.contains("dizionario-si-dice")) s.pageName="DIZIONARI.COR/dizionario_sidice";
	}
	
	
	
	// annunci
	/*if (pageUrl.contains("annunci.corriere.it")) {
		s.pageName="ANNUNCI.COR/";
	}
	*/


	// buche dizionari
	/*if (pageUrl.contains("dizionario_italiano")) { 
	if(!s.prop13){
			if ($('#ris-main span strong').html() == "Parola non trovata") 
				{ s.prop13 = "Parola non trovata"; }
			else {
				s.prop13= $('#defin-dx h5 strong span').html();
				 }
			if(s.prop13){
				s.prop19 = "Dizionario Italiano"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				
						}
					}
	}
	
	if (pageUrl.contains("cgi-bin\/sabcol")) { 
	if(!s.prop13){
			if ($('#ris-main span strong').html() == "Parola non trovata") 
				{ s.prop13 = "Parola non trovata"; }
			else {
				s.prop13= $('#defin-dx h5 strong span').html();
				 }
			if(s.prop13){
				s.prop19 = "Dizionario Italiano"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				 
						}
					}
	}
	
	if (pageUrl.contains("dizionario_inglese")) {  
	if(!s.prop13){
			if ($('#ris-main span strong').html() == "Parola non trovata") 
				{ s.prop13 = "Parola non trovata"; }
			else {
				s.prop13= $('ul.formichina em').html();
				 }
			if(s.prop13){
				s.prop19 = "Dizionario Inglese"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
			
						}
					}
	}
	
	if (pageUrl.contains("cgi-bin\/sansing")) { 
	if(!s.prop13){
			if ($('#ris-main span strong').html() == "Parola non trovata") 
				{ s.prop13 = "Parola non trovata"; }
			else {
				s.prop13= $('ul.formichina em').html();
				 }
			if(s.prop13){
				s.prop19 = "Dizionario Inglese"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				
						}
					}
	}
	
	if (pageUrl.contains("dizionario_spagnolo")) { 
	if(!s.prop13){
			if ($('#ris-main span strong').html() == "Parola non trovata") 
				{ s.prop13 = "Parola non trovata"; }
			else {
				s.prop13= $('li a.def-attivo').html();
				 }
			if(s.prop13){
				s.prop19 = "Dizionario Spagnolo"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				
						}
					}
	}
	
	if (pageUrl.contains("cgi-bin\/zanspa")) { 
	if(!s.prop13){
			if ($('#ris-main span strong').html() == "Parola non trovata") 
				{ s.prop13 = "Parola non trovata"; }
			else {
				s.prop13= $('li a.def-attivo').html();
				 }
			if(s.prop13){
				s.prop19 = "Dizionario Spagnolo"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				
						}
					}
	}
	
	if (pageUrl.contains("dizionario_francese")) { 
	if(!s.prop13){
			if ($('#ris-main span strong').html() == "Parola non trovata") 
				{ s.prop13 = "Parola non trovata"; }
			else {
				s.prop13= $('li a.def-attivo').html();
				 }
			if(s.prop13){
				s.prop19 = "Dizionario Francese"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				
						}
					}
	}
	
	if (pageUrl.contains("cgi-bin\/zanfra")) { 
	if(!s.prop13){
			if ($('#ris-main span strong').html() == "Parola non trovata") 
				{ s.prop13 = "Parola non trovata"; }
			else {
				s.prop13= $('li a.def-attivo').html();
				 }
			if(s.prop13){	
				s.prop19 = "Dizionario Francese"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				
						}
					}
	}
	
	if (pageUrl.contains("dizionario_tedesco")) { 
	if(!s.prop13){
			if ($('#ris-main span strong').html() == "Parola non trovata") 
				{ s.prop13 = "Parola non trovata"; }
			else {
				s.prop13= $('li a.def-attivo').html();
				 }
			if(s.prop13){
				s.prop19 = "Dizionario Tedesco"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				
						}
					}
	}
	
	if (pageUrl.contains("cgi-bin\/sansted")) { 
	if(!s.prop13){
			if ($('#ris-main span strong').html() == "Parola non trovata") 
				{ s.prop13 = "Parola non trovata"; }
			else {
				s.prop13= $('li a.def-attivo').html();
				 }
			if(s.prop13){
				s.prop19 = "Dizionario Tedesco"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				
						}
					}
	}
	*/
	// fine buche dizionari
	
	
	// buca dizionario salute
	/*if (pageUrl.contains("\/salute\/dizionario")) { 
	if(!s.prop13){
			s.prop13= $('h1.keyword').html();
			if(s.prop13){
				s.prop19 = "Dizionario Salute"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
			
						}
					}
	}
	*/
	// ricerca auto
	if (pageUrl.contains("Automobili\/ricercaAnnuncio.do")) { 
	
	if(!s.prop13){
			
			var marca=s.getQueryParam('idMarca');
			var modello=s.getQueryParam('idVersione');
			var minPrezzo=s.getQueryParam('minPrezzo');
			var maxPrezzo= s.getQueryParam('maxPrezzo');
			s.prop13= marca + ',' + modello + ',' + minPrezzo + ',' + maxPrezzo;
			if(s.prop13){
				s.prop19 = "Automobili"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				/*if(s.prop19&&!s.eVar19)*/
						}
					}
	}
	
	//ricerca casa
	if (pageUrl.contains("trovocasa.corriere.it\/annunci\/RicercaAnnunciDaCorriere.do")) { 
	
	if(!s.prop13){
			var tipoAnnuncio=s.getQueryParam('tipoAnnuncio');
			var categoriaImmobile=s.getQueryParam('categoriaImmobile');
			var idprovincia=s.getQueryParam('idprovincia');
			var idcomune= s.getQueryParam('idcomune');
			var tipoImmobile= s.getQueryParam('tipoImmobile');
			s.prop13= tipoAnnuncio + ',' + categoriaImmobile + ',' + idprovincia + ',' + idcomune + ',' + tipoImmobile;
			if(s.prop13){
				s.prop19 = "TrovoCasa"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				/*if(s.prop19&&!s.eVar19)*/
						}
					}
	}
	
	//ricerca lavoro
	if (pageUrl.contains("lavoro.corriere.it\/jobs\/default.aspx")) { 
	if(!s.prop13){
			s.prop13=s.getQueryParam('Body');
			if(s.prop13){
				s.prop19 = "TrovoLavoro"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				/*if(s.prop19&&!s.eVar19)*/
						}
					}
	}
	
	//ricerca libri
	if (pageUrl.contains("cerca-libri.aspx")) { 
	if(!s.prop13){
			s.prop13=s.getQueryParam('query');
			if(s.prop13){
				s.prop19 = "Cerca libri"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				/*if(s.prop19&&!s.eVar19)*/
						}
					}
	}
	
	
	
	//ricerca archivio storico
	if (pageUrl.contains("archiviostorico.corriere.it")) { 
		s.pageName="ARCHIVIOSTORICO.COR/";
		s.prop39=$('title').text();
	}
	
	
	
	if (pageUrl.contains("searchresultsArchivio.jsp")) { 
	if(!s.prop13){
			s.prop13=s.getQueryParam('cosa_cercare');
			if(s.prop13){
				s.prop19 = "Cerca archivio storico"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				/*if(s.prop19&&!s.eVar19)*/
						}
					}
	}
	
	
	//ricerca viaggi
	if (pageUrl.contains("viaggi.corriere.it\/ricerca")) { 
	if(!s.prop13){
			s.prop13=s.getQueryParam('q');
			if (s.prop13 == "") {s.prop13="nessuna parola cercata";}
			if(s.prop13){
				s.prop19 = "Cerca viaggi"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				/*if(s.prop19&&!s.eVar19)*/
						}
					}
	}
	
	
	//ricerca motori
	if (pageUrl.contains("trovamotori.do")) { 
	if(!s.prop13){
			s.prop13=s.getQueryParam('parolachiave');
			if(s.prop13){
				s.prop19 = "Cerca motori"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				/*if(s.prop19&&!s.eVar19)*/
						}
					}
	}
	
	//ricerca ricette
	if (pageUrl.contains("\/cucina.corriere.it\/ricerca\/ricetta.htm")) { 
	if(!s.prop13){
			s.prop13=s.getQueryParam('q');
			if (s.prop13 == "") {s.prop13="nessuna parola cercata";}
			if(s.prop13){
				s.prop19 = "Cerca ricette"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				/*if(s.prop19&&!s.eVar19)*/
						}
					}
	}
	
	//ricerca vini
	if (pageUrl.contains("\/cucina.corriere.it\/ricerca\/vini.htm")) { 
	if(!s.prop13){
			s.prop13=s.getQueryParam('q');
			if (s.prop13 == "") {s.prop13="nessuna parola cercata";}
			if(s.prop13){
				s.prop19 = "Cerca vini"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				/*if(s.prop19&&!s.eVar19)*/
						}
					}
	}
	
	//ricerca prodotti tipici
	if (pageUrl.contains("\/cucina.corriere.it\/ricerca\/tipici.htm")) { 
	if(!s.prop13){
			s.prop13=s.getQueryParam('q');
			if (s.prop13 == "") {s.prop13="nessuna parola cercata";}
			if(s.prop13){
				s.prop19 = "Cerca prodotti tipici"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				/*if(s.prop19&&!s.eVar19)*/
						}
					}
	}
	
	//trova cinema
	if (pageUrl.contains("trovocinema")) { 
	if(!s.prop13){
			var provincia=s.getQueryParam('trovocinema.provincia');
			var comune=s.getQueryParam('trovocinema.idComune');
			var film=s.getQueryParam('trovocinema.idFilm');
			var genere=s.getQueryParam('trovocinema.genere');
			var cinema=s.getQueryParam('trovocinema.idCinema');
			s.prop13=provincia + ' ' + comune + ' ' + film + ' ' + genere + ' ' + cinema;
			if(s.prop13){
				s.prop19 = "Cerca cinema"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				/*if(s.prop19&&!s.eVar19)*/
						}
					}
	}
	
	//trova film
	if (pageUrl.contains("trovofilm.action")) { 
	if(!s.prop13){
			var titolo=s.getQueryParam('film.titolo');
			var genere=s.getQueryParam('film.genere');
			var regista=s.getQueryParam('film.regista');
			var attore=s.getQueryParam('film.attore');
			s.prop13=titolo + ' ' + genere + ' ' + regista + ' ' + attore;
			if(s.prop13){
				s.prop19 = "Cerca film"; s.eVar19=s.prop19;
				s.prop13=s.prop13.toLowerCase();
				s.eVar13=s.prop13;
				var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
				if(t_search){
					s.events=s.apl(s.events,"event1",",",2);
							}
				/*if(s.prop19&&!s.eVar19)*/
						}
					}
	}
	
	//corriere tv
	if (pageUrl.contains("video.corriere.it")) {
		if (pageUrl.contains("search.shtml")) {
			if(!s.prop13){
					s.prop13=s.getQueryParam('q');
					if (s.prop13 == "") {s.prop13="nessuna parola cercata";}
					if(s.prop13){
						s.prop19 = "Cerca Corriere Tv"; s.eVar19=s.prop19;
						s.prop13=s.prop13.toLowerCase();
						s.eVar13=s.prop13;
						var t_search=s.getValOnce(s.eVar13,'ev13_GZ',0);
						if(t_search){
							s.events=s.apl(s.events,"event1",",",2);
									}
								}
							}
		}			
	}
	
	

// blog e forum	
	
/*
	if (pageUrl.contains("media\/upload\/files$") && $("div.message.status").text().indexOf("inserito nella coda di approvazione") !== -1) { s.events = "event10"; }
	if (pageUrl.contains("groups\/manage\/overview") && $("div.message.status").text().indexOf("inviato in coda di moderazione") !== -1) { s.events = "event11"; }
	if (pageUrl.contains("events\/manage\/overview") && $("div.message.status").text().indexOf("inserito in coda per approvazione") !== -1) { s.events = "event11"; }
	
*/	

	// Link ID e link POS
	
	$("div.homearticle-box, div#edicola-testo, div.ricerca-web").each( function(i, item) {
			var numeratore = ++i;
			var classeContenitore = $(item).attr("class") + " = ";
			$(item)
				.attr("rel", classeContenitore + numeratore)
				.find("a[href]")
				.each( function(i, item) {
							var linkName = ["&lid="];
							if ($(this).attr("href").length < 100) {
								linkName.push( $(this).attr("href").replace(/http\:\/\//i, ""))
							} else {
								var thisUrl = $(this).attr("href").replace(/http\:\/\//i, "");
								linkName.push( thisUrl.slice(0,48), "...", thisUrl.slice((thisUrl.length - 48), thisUrl.length));
							}
							
							linkName.push("&lpos=", classeContenitore, numeratore,  "__link-position = ", ++i);
							$(item).attr("name", linkName.join(""));
						
				}) // fine each() a
			
		})  // fine each() div.news-block
		
		$("div#home-2col ul.zappingnews li").each( function(j, item) {
			var numeratore = ++j;
			var classeContenitore = $(item).attr("class") + " = ";
			$(item)
				.attr("rel", classeContenitore + numeratore)
				.find("a[href]")
				.each( function(j, item) {
							var linkName = ["&lid="];
							if ($(this).attr("href").length < 100) {
								linkName.push( $(this).attr("href").replace(/http\:\/\//i, ""))
							} else {
								var thisUrl = $(this).attr("href").replace(/http\:\/\//i, "");
								linkName.push( thisUrl.slice(0,48), "...", thisUrl.slice((thisUrl.length - 48), thisUrl.length));
							}
						
							linkName.push("&lpos=", "Zapping News Box = ", numeratore,  "__link-position = ", ++j);
							$(item).attr("name", linkName.join(""));
							
				}) // fine each() a
			
		})  // fine each() div.news-block
		
		$("div.vaschetta3col div.colonna").each( function(z, item) {
			var numeratore = ++z;
			var classeContenitore = $(item).attr("class") + " = ";
			$(item)
				.attr("rel", classeContenitore + numeratore)
				.find("a[href]")
				.each( function(z, item) {
							var linkName = ["&lid="];
							if ($(this).attr("href").length < 100) {
								linkName.push( $(this).attr("href").replace(/http\:\/\//i, ""))
							} else {
								var thisUrl = $(this).attr("href").replace(/http\:\/\//i, "");
								linkName.push( thisUrl.slice(0,48), "...", thisUrl.slice((thisUrl.length - 48), thisUrl.length));
							}
							
						
							linkName.push("&lpos=", classeContenitore, numeratore,  "__link-position = ", ++z);
							$(item).attr("name", linkName.join(""));
							
				}) // fine each() a
			
		})  // fine each() div.news-block

})();


























