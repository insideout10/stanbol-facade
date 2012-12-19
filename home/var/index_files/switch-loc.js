function getCookieCor(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
function setCookieCor(name, value, expiredays, path, domain, secure) {
    var expires = new Date();
    expires.setDate( expires.getDate() + expiredays );
    var cookieString = name + "=" +escape(value) +
       ( (expires) ? ";expires=" + expires.toGMTString() : "") +
       ( (path) ? ";path=" + path : "") +        
       ( (domain) ? ";domain=" + domain : "") +
       ( (secure) ? ";secure" : "");
    document.cookie = cookieString;
}
$(document).ready(function(){
var url_json = "http://js2.corriereobjects.it/informazione_locale/json/comuni_istat.js";
var url_box_meteo = "http://www.corriere.it/linked_webroots/8100.corriere.it/ssi/contents/statistiche/box-home-corriere-hp/";
if((document.URL).indexOf("motori.corriere.it") > -1){
	//url_json = "/linked_webroots/www.corriere.it/informazione_locale/json/comuni.json";
	url_box_meteo = "http://motori.corriere.it/linked_webroots/www.corriere.it/linked_webroots/8100.corriere.it/ssi/contents/statistiche/box-home-corriere-hp/";
}
	if ($("#autocomplete").length > 0 || $("#tempo_op").length > 0 || $("#tools_menu_sez").length > 0 || $("#box-informazione-locale2").length > 0) {

		$(".autocomplete-switch").click(function(){
			$(".loc").val("");
			if ($("#autocomplete").data('clicked') != "yes") {
				$.ajax({
					url: url_json,
					async: true,
					dataType: "script",
					success: function(json) {
						$(".loc, .input-autocomplete").autocomplete(comuni_it.comuni, {
							autoFill:false,
							minChars:1,
							delay: 20,
							formatItem: function(row) {
								return row.name;
							},
							formatMatch: function(row) {
								return row.name;
							}
						}).result(function(event, data, formatted) {
							newLoc = data.value;
							newLocToShow = data.name;
							newLocIstat = data.ci;
						});
					}
				});				
			} 
			
			var context = "." +$(this).attr("class");
			$(context).parents("div").find(".switch-loc").show()
			$(".loc").focus();
			$("#autocomplete").data('clicked', 'yes');		
			return false;
		});
		
		$(".input-autocomplete").click(function(){
			$(".input-autocomplete").val("");
			if ($("#autocomplete").data('clicked') != "yes") {
				$.ajax({
					url: url_json,
					async: true,
					dataType: "script",
					success: function(json) {
						$(".loc, .input-autocomplete").autocomplete(comuni_it.comuni, {
							autoFill:false,
							minChars:1,
							delay: 20,
							formatItem: function(row) {
								return row.name;
							},
							formatMatch: function(row) {
								return row.name;
							}
						}).result(function(event, data, formatted) {
							newLoc = data.value;
							newLocToShow = data.name;
							newLocIstat = data.ci;
						});
					}
				});				
			} 
			
			$(".input-autocomplete").focus();
			$("#autocomplete").data('clicked', 'yes');		
			return false;
		});
		$("#loc_comune").click(function(){
			if(($("#loc_comune").val()).indexOf("Inserisci una localit") > -1) $("#loc_comune").val("");
				$.ajax({
					url: url_json,
					async: true,
					dataType: "script",
					success: function(json) {
						$("#search_comune .ac_results").remove();
						$("#search_comune #loc_comune").autocomplete(comuni_it.comuni, {
							autoFill:false,
							minChars:1,
							delay: 20,
							top: 95,
							left: 14,
							containerResult: "#search_comune",
							formatItem: function(row) {
								return row.name;
							},
							formatMatch: function(row) {
								return row.name;
							}
						}).result(function(event, data, formatted) {
							newLoc = data.value;
							newLocToShow = data.name;
							newLocIstat = data.ci;
							goTo();
						});
					}
				});				
		});
		$("#gotocomune").click(function(event){
			event.preventDefault();
			goTo();
		});		
		$(".close-search").click(function(){
			$(".switch-loc").hide();
			return false;
		});
			
		function goTo() {
			if(typeof( window["newLoc"]) != "undefined") {
				tmp = window.location = "http://" + newLoc + ".corriere.it/?q=" + newLoc + "";
				//$.cookie("rcsLocalPref",newLoc+ "|" +newLocToShow,{domain: "corriere.it", path: "/", expires: 365});
				setCookieCor("rcsLocalPref", newLoc+ "|" +newLocToShow+ "|" +newLocIstat, 365, "/", "corriere.it");
			} else {
				return false;
			}
		};
	
		$(".loc, .input-autocomplete").keypress(function(e){
			if(e.which == 13){
				goTo();
				return false;
			}
		});
	
		$(".gotoloc").click(function(){
			goTo();
			return false;
		});
				
		// verifico che abbia già il cookie per la località preferita
		//var rcsLocalPref = $.cookie("rcsLocalPref");
		var rcsLocalPref = getCookieCor("rcsLocalPref");
			
		// se non ha il cookie lo creo
		if(!rcsLocalPref){
			//$.cookie("rcsLocalPref", "milano|Milano" ,{domain: "corriere.it", path: "/", expires: 365});
			setCookieCor("rcsLocalPref", "milano|Milano|015146", 365, "/", "corriere.it");
			//rcsLocalPref = $.cookie("rcsLocalPref");
			rcsLocalPref = getCookieCor("rcsLocalPref");
		}
			
		$(".change-cookie").click(function(){
    		newLoc = $(this).attr("rel");
    		newLocToShow = $(this).text();
    		//$.cookie("rcsLocalPref",newLoc+ "|" +newLocToShow,{domain: "corriere.it", path: "/", expires: 365});
			setCookieCor("rcsLocalPref", newLoc+ "|" +newLocToShow+ "|" +newLocIstat, 365, "/", "corriere.it");
		});
		
		
		
		// se ho una località preferita settata
		if(rcsLocalPref != "--" && rcsLocalPref != null){
			cookieRcsLocalPref=rcsLocalPref.split("|");
			nomeComune = cookieRcsLocalPref[1];
			
			if (nomeComune.length > 15) {
				nomeComune = nomeComune.substring(0, 12) + "...";
			}
			
			// mostro il comune in testata 
			if ($("#autocomplete").length > 0) {
				
				$("#autocomplete a").attr("href","http://"+cookieRcsLocalPref[0]+".corriere.it");
				$("#autocomplete span").text(nomeComune);
				$("#autocomplete a").removeClass("autocomplete-switch");
				$("#autocomplete a").unbind("click");
			}
			
			// carico il box del comune in terza colonna - new3col
			if ($("#box-infolocale").length > 0 || $("#tempo_op").length > 0 || $("#tools_menu_sez").length > 0) {				
				if ($('#box-infolocale').length > 0) {
					$.ajax({
						url: url_box_meteo+cookieRcsLocalPref[0]+'.shtml',
						success: function(data) {
							$('#box-infolocale #ajax-data').html(data);
						}
					});
				}
			}
			
			// carico il box del comune in terza colonna
			if ($("#box-informazione-locale2").length > 0 || $("#tempo_op").length > 0 || $("#tools_menu_sez").length > 0) {
				var pos_day = 'notte';
				var dataOraAria = new Date();
				if ((dataOraAria.getHours() >= 0 && dataOraAria.getHours() < 6) ){
					pos_day = 'notte';
				}else if ( (dataOraAria.getHours() >= 6 && dataOraAria.getHours() < 12) ){
					pos_day = 'mattino';
				}else if ( (dataOraAria.getHours() >= 12 && dataOraAria.getHours() < 18) ){
					pos_day = 'pomeriggio';
				}else if ( (dataOraAria.getHours() >= 18 && dataOraAria.getHours() < 24) ){
					pos_day = 'sera';
				}				
				
				
				if ($('#box-informazione-locale2').length > 0) {
					$.ajax({
						url: url_box_meteo+cookieRcsLocalPref[0]+'.shtml',
						success: function(data) {
							$('#box-informazione-locale2 .box-info h6 a').text(cookieRcsLocalPref[1]).attr('href','http://'+ cookieRcsLocalPref[0]+ '.corriere.it');
							$('#box-informazione-locale2 .link-comune').attr('href','http://'+cookieRcsLocalPref[0]+'.corriere.it');
							data = data.replace(/static.8100.corriereobjects.it/g,"images2.corriereobjects.it/linked_webroots/8100.corriere.it");
							$('#box-informazione-locale2 .ajax-content').html(data);
							$('#box-informazione-locale2 .ajax-content a').attr('href','http://'+cookieRcsLocalPref[0]+'.corriere.it');
							var dataOraAria = new Date();
							if (pos_day == 'notte'){
								$(".notte").removeClass("hidden");
							}else if (pos_day == 'mattino'){
								$(".mattina").removeClass("hidden");
							}else if (pos_day == 'pomeriggio'){
								$(".pomeriggio").removeClass("hidden");
							}else if (pos_day == 'sera'){
								$(".sera").removeClass("hidden");
							}
							
							$('#box-informazione-locale2 .box-info-default').css("display","none");
							$('#box-informazione-locale2 .box-info').css("display","block");
							
							$('.show-default-box').click(function(){
								$('#box-informazione-locale2 .box-info').css("display","none");
								$('#box-informazione-locale2 .box-info-default').css("display","block");
								return false;
							});						
						}
					});
				}
				
				var loc_meteo_xml = cookieRcsLocalPref[0];
				
				function caricaMeteoIstat(){
				   $.ajax({
					url: "/linked_webroots/8100.corriere.it/fornitori/"+istatComune+".xml",
					dataType: "xml",
					type: "GET",
					success: function(xml) {
						  $("#tempo_op a.link-meteo").attr("href","http://"+loc_meteo_xml+".corriere.it");
						  var deg_meteo = $(xml).find('day[date='+server_yyyy+server_m_mm+server_d_dd+'] momento[value='+pos_day+'] temperatura-media temperatura').text();
						  deg_meteo = Math.round(deg_meteo) + "&deg;";
						  var img_meteo_name = $(xml).find('day[id=1] momento[value='+pos_day+'] tempo-id').text();
						  var id_img_met = "http://images2.corriereobjects.it/linked_webroots/8100.corriere.it/img/meteo/new/"+img_meteo_name+".png";
						  $("#tempo_op img.ico-meteo").attr("src",id_img_met);
						  $("#tempo_op img.ico-meteo").css("cursor","pointer");
						  $("#tempo_op img.ico-meteo").click(function(){
								var loc_meteo_xml_norm = loc_meteo_xml.replace(/-/g,"+");
								window.open('http://meteo.corriere.it/meteo/'+loc_meteo_xml_norm);
						  });
						  $("#tempo_op a.link-meteo").html(nomeComune + " " + deg_meteo);					  
							$("#comune_switch .comune-switch span").text("CAMBIA");
							$("#search_comune span").text(nomeComune);
							$("#search_comune img").attr("src",id_img_met);
					}
				  });				
				}
				
				
				function caricaMeteoLocal(){
					$.ajax({
						type: "GET",
						url: "/linked_webroots/8100.corriere.it/fornitori/meteo.xml",
						dataType: "xml",
						cache: false,
						success: function(xml) {
							$(xml).find('loc[id='+loc_meteo_xml+']').each(function(){
							  $("#tempo_op a.link-meteo").attr("href","http://"+loc_meteo_xml+".corriere.it");
							  
							  id_img_met = $(this).find("tempo-id").text();
							  id_img_met = "http://static.8100.corriereobjects.it/img/meteo/new/"+id_img_met+".png";
							  $("#tempo_op img.ico-meteo").attr("src",id_img_met);
							  $("#tempo_op img.ico-meteo").css("cursor","pointer");
							  $("#tempo_op img.ico-meteo").click(function(){
                               window.open('http://meteo.corriere.it/meteo/'+loc_meteo_xml);
                               });
							  temp_met = Math.round($(this).find("misurata").text()) + "&deg;";
							  $("#tempo_op a.link-meteo").html(nomeComune + " " + temp_met);
							  
								$("#comune_switch .comune-switch span").text("CAMBIA");
								$("#search_comune span").text(nomeComune);
								$("#search_comune img").attr("src",id_img_met);        
						 	});
						}
					  });
				}
					
				
				
				
				// mostro il comune in testata NEW
				if ($("#tempo_op").length > 0) {
					var cittaLocal = ["milano","bari","belluno","bologna","brescia","caserta","catania","firenze","foggia","lecce","napoli","padova","palermo","roma","rovigo","salerno","treviso","venezia","verona","vicenza"]; // elenco città local
					
					$.inArray("milano", cittaLocal)
					var istatComune = "";
					if (cookieRcsLocalPref.length > 2) {
						istatComune = cookieRcsLocalPref[2];
												
						if($.inArray(loc_meteo_xml, cittaLocal)> -1) {
						//if(cittaLocal.indexOf(loc_meteo_xml) > -1) {
							caricaMeteoLocal();
						} else {
							caricaMeteoIstat();
						}
						
					}
					else {
						$.ajax({
							url: "http://js2.corriereobjects.it/informazione_locale/json/comuni_istat.js",
							async: true,
							dataType: "script",
							cache: true,
							success: function(json) {
								$.each(comuni_it.comuni, function(i, item) {
									if((item.value) == loc_meteo_xml) istatComune = item.ci;
								});
								if($.inArray(loc_meteo_xml, cittaLocal)> -1) {
								//if(cittaLocal.indexOf(loc_meteo_xml) > -1) {
									caricaMeteoLocal();
								} else {
									caricaMeteoIstat();
								}
							}
						});						
					}
				}
				// mostro il comune in testata SEZIONE NEW
				if ($("#tools_menu_sez").length > 0) {			
					$("#tools_menu_sez a.comune_selez").attr("href","http://"+loc_meteo_xml+".corriere.it").text(nomeComune).css("display","block");
					$("#search_comune span").text(nomeComune);
					$("#tools_menu_sez .comune-switch").text("CAMBIA");
				}				
	
			}
		
		} 
	}
	
});