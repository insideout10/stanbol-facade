/*BOX TERZA COLONNA TROVANNUNCI*/
function getDatiCookie(cookieName){
 cookie=$.cookie(cookieName);
 if(cookie!=null) dati=cookie.split("|") ;
 else dati=false;
 return dati;
}
var chk_div_gplus = 0;
var chk_div_share = 0;
function sharebutton(twaccount,hpSection) {

  typeof twaccount == "undefined" ? twaccount = "Corriereit" : twaccount;
  var count_var = 0;

	$(".pls-container").live(
			'mouseleave',
			function () {
				   chk_div_gplus = 0;
					 window.setTimeout(function() {
						if(chk_div_share == 0) $('.share-balloon').hide();
					 }, 500);
			});
	$(".pls-container").live(
			'mouseenter',
			function () {
				   chk_div_gplus = 1;
			});
	
	
	var config_baloon = {    
		 over: function(){
			count_var++;
			chk_div_share = 1;
			 var urlarticolo=$(this).attr('data-href');
			 var urlarticolo_orig = urlarticolo;
			 var text_articolo= "";	 
			 if($(this).find(".share-balloon ul").length == 0){
				 if($(this).find(".title_art").length > 0) {
					 text_articolo=$(this).find(".title_art").text();
					 text_articolo = encodeURIComponent(text_articolo);
				}
				if(urlarticolo.indexOf("http") == -1) urlarticolo = "http://www.corriere.it" + urlarticolo;
				urlarticolo = encodeURIComponent(urlarticolo);
				var iframe_gplus = '<div class="g-plusone" data-size="tall" data-href="'+urlarticolo_orig+'"></div>';
				 $('.share-balloon', this).html('<ul><li class="share-fb"><iframe src="//www.facebook.com/plugins/like.php?href='+urlarticolo+'&amp;send=false&amp;layout=box_count&amp;width=75&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=90" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:75px; height:90px;" allowTransparency="true"></iframe></li><li class="share-tw"><iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/tweet_button.html?url='+urlarticolo+'&text='+text_articolo+'&amp;count=vertical&amp;via='+twaccount+'" style="width:55px; height:62px;"></iframe></li><li class="share-gplus">'+iframe_gplus+'</li></ul>');
					 window.setTimeout(function() {
						gapi.plusone.go();
					 }, 500);
			 }
			 $sharebaloon = $('.share-balloon', this);
			 window.setTimeout(function() {
				$('.share-balloon .loader-share').hide();
				$sharebaloon.find('ul').show();
			 }, 1500);
			$('.share-balloon', this).show();
		}, // function = onMouseOver callback (REQUIRED)    
		 timeout: 500, // number = milliseconds delay before onMouseOut    
		 out: function(){
				chk_div_share = 0;
				if(chk_div_gplus == 0) $('.share-balloon').hide();			 
			} // function = onMouseOut callback (REQUIRED)    
	};

	if (hpSection == "pediatria") {
		// per pediatria compare solo sull'articolo in apertura
		$('.edizione-straordinaria .share-button').hoverIntent( config_baloon );
	} else {
		$('.share-button').hoverIntent( config_baloon );	
	}

	
}
function setCookieList(i,param){
	defaultStr='standard|data-pubblicazione|desc|offro|*';
	dati=getDatiCookie('annunciRicerca');
	if(!dati) dati=defaultStr.split('|');
	dati[i]=param;
	$.cookie('annunciRicerca',dati.join('|') ,{path:"/",domain:".corriere.it"});
	return false;
}
function submitButtonAnnunciHP(){
	var cosacerchi_annunci = $("#cosacerchi_annunci").val();
	var keyword = $("#parolachiave_annunci").val();
	var param_ann = "cerco";
	var search_annunci_encode ="";
	var search_annunci ="";
	var url_ricerca ="http://annunci.corriere.it";
	var url_annunci = "http://annunci.corriere.it";
	var marcaAuto = $("#marca option:selected").val();
	var modelloAuto = $("#modello").val();
	var provinciaLavoro = $("#selectedSede option:selected").val();
	var categriaLavoro = $("#selectedCategoria").val();
	var provinciaImmobiliare = $("#immobiliareProvincia option:selected").val();
	var comuneImmobiliare = $("#section-3 #immobiliareComune").val();
	var tipologiaImmobiliare = $("#immobiliareTipologia option:selected").val();
	var radio1 = $("input[name='contratto']:checked").val();
	var radio2 = $("input[name='categoria']:checked").val();
	defaultStr_ann='standard|data-pubblicazione|desc|offro|*';
	document.cookie='annunciRicerca=' + defaultStr_ann + "; path=/;domain=.corriere.it";
	if(($("#cosacerchi_annunci").val()).indexOf("Cosa cerchi?") == -1 && ($("#cosacerchi_annunci").val()).replace(/ /g, "") != ""){
		search_annunci = $("#cosacerchi_annunci").val();
		search_annunci_encode =encodeURIComponent(search_annunci);

		if(document.location.toString().contains("cinema-tv")){
			url_annunci += "/"+search_annunci_encode+"-0/tempo-libero-sport-4/film-dvd-5/1-p.htm?search="+search_annunci;
			url_ricerca = "http://clickcorriere.corriere.it/BoxRedirect.shtml?IDGQEVENTO=30&INI=8&TIPOCLICK=0&URL=" + url_annunci;
		} else if(document.location.toString().contains("motori")){
			url_annunci += "/"+search_annunci_encode+"-0/motori-4/1-p.htm?search="+search_annunci;
			url_ricerca = "http://clickcorriere.corriere.it/BoxRedirect.shtml?IDGQEVENTO=31&INI=8&TIPOCLICK=0&URL=" + url_annunci;
		} else if(document.location.toString().contains("spettacoli")){
			url_annunci += "/"+search_annunci_encode+"-0/tempo-libero-sport-4/1-p.htm?search="+search_annunci;
			url_ricerca = "http://clickcorriere.corriere.it/BoxRedirect.shtml?IDGQEVENTO=28&INI=8&TIPOCLICK=0&URL=" + url_annunci;
		} else if(document.location.toString().contains("sport")){
			url_annunci += "/"+search_annunci_encode+"-0/tempo-libero-sport-4/1-p.htm?search="+search_annunci;
			url_ricerca = "http://clickcorriere.corriere.it/BoxRedirect.shtml?IDGQEVENTO=29&INI=8&TIPOCLICK=0&URL=" + url_annunci;
		} else if(document.location.toString().contains("economia")){
			url_annunci += "/"+search_annunci_encode+"-0/offerte-lavoro-4/1-p.htm?search="+search_annunci;
			url_ricerca = "http://clickcorriere.corriere.it/BoxRedirect.shtml?IDGQEVENTO=33&INI=8&TIPOCLICK=0&URL=" + url_annunci;
		} else if(document.location.toString().contains("cultura")){
			url_annunci += "/"+search_annunci_encode+"-0/tempo-libero-sport-4/1-p.htm?search="+search_annunci;
			url_ricerca = "http://clickcorriere.corriere.it/BoxRedirect.shtml?IDGQEVENTO=32&INI=8&TIPOCLICK=0&URL=" + url_annunci;
		} else {
			url_annunci += "/"+search_annunci_encode+"-0/1-p.htm?search="+search_annunci;
			url_ricerca = "http://clickcorriere.corriere.it/BoxRedirect.shtml?IDGQEVENTO=24&INI=8&TIPOCLICK=0&URL=" + url_annunci;
		}

		document.location.href = url_ricerca;
	}
	if(modelloAuto)	{
		url_annunci += "/" + marcaAuto+"-6/" + modelloAuto+"-7/1-p.htm";
		url_ricerca = "http://clickcorriere.corriere.it/BoxRedirect.shtml?IDGQEVENTO=25&INI=8&TIPOCLICK=0&URL=" + url_annunci;
	}
	/*if(keyword){
		url_annunci += "/" + keyword+"-0/" + "offerte-lavoro-4/" + "1-p.htm?search=" + keyword;
		setCookieList(1,'*');
		url_ricerca = "http://clickcorriere.corriere.it/BoxRedirect.shtml?IDGQEVENTO=27&INI=8&TIPOCLICK=0&URL=" + url_annunci;
	}*/
	if(categriaLavoro)	{
		if(keyword){
			url_annunci += "/" + keyword+"-0/" + provinciaLavoro+"-2/offerte-lavoro-4/" +categriaLavoro+"-5/1-p.htm?search=" + keyword;
			setCookieList(1,'*');
		} else {
			url_annunci += "/" + provinciaLavoro+"-2/offerte-lavoro-4/"  + categriaLavoro+"-5/1-p.htm";
		}
		url_ricerca = "http://clickcorriere.corriere.it/BoxRedirect.shtml?IDGQEVENTO=27&INI=8&TIPOCLICK=0&URL=" + url_annunci;
	}

	if(comuneImmobiliare){
		if(!tipologiaImmobiliare){
			alert("Selezionare la tipologia");
			return false;
		} else if((radio1.length > 0) && (radio2.length > 0)){
			url_annunci += "/" + provinciaImmobiliare+"-2/" + comuneImmobiliare+"-3/" + radio2+"-5/" + radio1+"-11/"+ tipologiaImmobiliare+"-12" + "/1-p.htm";
		} else if(radio2.length > 0){
			url_annunci += "/" + provinciaImmobiliare+"-2/" + comuneImmobiliare+"-3/" + radio2+"-5/"+ tipologiaImmobiliare+"-12" +"/1-p.htm";
		} else if(radio1.length > 0){
			url_annunci += "/" + provinciaImmobiliare+"-2/" + comuneImmobiliare+"-3/" + radio1+"-11/"+ tipologiaImmobiliare+"-12" +"/1-p.htm";
		} else {
			url_annunci += "/" + provinciaImmobiliare+"-2/" + comuneImmobiliare+"-3" + tipologiaImmobiliare+"-12" + "/1-p.htm";
		}
		url_ricerca = "http://clickcorriere.corriere.it/BoxRedirect.shtml?IDGQEVENTO=26&INI=8&TIPOCLICK=0&URL=" + url_annunci;

	} else {
		url_ricerca = url_annunci;
	}

	document.location.href = url_ricerca;
}
function resetValoreFreeText(){
	if(($("#cosacerchi_annunci").val()).indexOf("Cosa cerchi?") == -1 && $("#cosacerchi_annunci").val() != ""){
			$("#cosacerchi_annunci").removeAttr("value");
		}
	if($("#cosacerchi_annunci").val() != ""){
			$("#parolachiave_annunci").removeAttr("value");
		}
	if(($("#marca").val()) != "Seleziona una marca"){
		$('#modello option').remove();
	}
	if(($('#immobiliareComune').val()) != "Seleziona una provincia"){
		$('#immobiliareComune option').remove();
	}
	if(($('#selectedSede').val()) != "Seleziona una sede"){
		$('#selectedCategoria option').remove();
	}
}
//function submitButtonAnnunci(){
//	var cat_annuncio = $("#categoriaAnnuncio").val();
//	var sub_cat_annuncio = $("#subCategoriaAnnuncio").val();
//	var cosacerchi_annunci = $("#cosacerchi_annunci").val();
//	var param_ann = "cerco";
//	var search_annunci_encode ="";
//	var search_annunci ="";
//	var url_annunci = "http://annunci.corriere.it";
//	//if($("#tipoAnnuncio2").is(':checked')) param_ann = "offro";
//	/*defaultStr_ann='standard|data-pubblicazione|desc|offro|*';
//	dati_ann=getDatiCookie('annunciRicerca');
//	if(!dati_ann) dati_ann=defaultStr_ann.split('|');
//	dati_ann[3]=param_ann;
//	$.cookie('annunciRicerca',dati_ann.join('|') ,{path:"/",domain:".corriere.it"});*/
//	defaultStr_ann='standard|data-pubblicazione|desc|offro|*';
//	//$.cookie('annunciRicerca',defaultStr_ann ,{path:"/",domain:".corriere.it"});
//	document.cookie='annunciRicerca=' + defaultStr_ann + "; path=/;domain=.corriere.it";
//	if(($("#cosacerchi_annunci").val()).indexOf("Cosa cerchi?") == -1 && $("#cosacerchi_annunci").val() != ""){
//		search_annunci = $("#cosacerchi_annunci").val();
//		search_annunci_encode =encodeURIComponent(search_annunci);
//	}
//
//	if(search_annunci.length > 0) 	url_annunci += "/"+search_annunci_encode+"-0";
//	if(cat_annuncio.length != 0) 	url_annunci += "/"+cat_annuncio+"-4";
//	if(sub_cat_annuncio.length != 0) 	url_annunci += "/"+sub_cat_annuncio+"-5";
//	url_annunci += "/1-p.htm";
//	if(search_annunci.length > 0) 	url_annunci += "?search="+search_annunci;
//	//console.log(url_annunci);
//	document.location.href = url_annunci;
//}

function addCommas(str) {
    var amount = new String(str);
    amount = amount.split("").reverse();
    var output = "";
    for ( var i = 0; i <= amount.length-1; i++ ){
        output = amount[i] + output;
        if ((i+1) % 3 == 0 && (amount.length-1) !== i)output = '.' + output;
    }
    return output;
}

function sendArticleToMail() {
	var urlToSend = window.location.href;
	encodeURIComponent(urlToSend);
	var pageTitleToSend = document.title;
	encodeURIComponent(urlToSend);
	prop="menubar=no,status=no,titlebar=no,toolbar=no,width=450,height=500,scrollbars=no"
	window.open("http://www.corriere.it/smallApp/tellafriend/form.shtml?rr="+urlToSend+"&tit="+pageTitleToSend,"InviaPagina",prop);
}

$(document).ready(function(){	
				   
	if($('#tweetHP_live').length > 0) {
		$('#twit_latest__hp_live').twitread({
			type: 'status',
			limit:2,
			refresh: 150000,
			fade: true,
			entities: true,
			callbackFnk: function(){
				$('#tweetHP_live #twit_latest__hp_live .flusso_twitter').show(); 	
			}
		});
	}
				
	/*FactChecking*/
	if($("#article_sh_box .fact_chk_link").length > 0) {	
		var fact_chk_url = encodeURIComponent(document.URL);
		$.get("http://599051a41179727d6de1-b9f24bdc75e3500a59ef70d3d31fe810.r12.cf2.rackcdn.com/1x1.gif?from="+fact_chk_url);
		if($("#article_sh_box > h2").text().length < 2){$("#article_sh_box").css("padding-top","5px");}
	}
	if($(".homearticle-box .fact_chk_link").length > 0) {	
		$(".homearticle-box .fact_chk_link").each(function(){
			if($(this).parents(".homearticle-box:eq(0)").find("h1").length == 1){
				if($(this).parents(".homearticle-box:eq(0)").find("h2").length == 0 && $(this).parents(".homearticle-box:eq(0)").find("p.subtitle").length == 0){
					$(this).parents(".homearticle-box:eq(0)").css("padding-top","15px");
				}				
			}
			else if($(this).parents(".homearticle-box:eq(0)").find("p.subtitle").length == 0){
				$(this).parents(".homearticle-box:eq(0)").css("padding-top","15px");
			}
		})
	}
                                
/* img panini scheda giocatore */
if ($('.type-risultati .content-scheda #foto_panini').length > 0) {
	console.log('entra');
	/*carica le foto del calcio*/
	function img_onError(){}
	var qualeIMG_calcio= $('.type-risultati .content-scheda #foto_panini').attr("class");
	qualeIMG_calcio = qualeIMG_calcio.toUpperCase();
	var pathToLoad_calcio = 'http://images2.corriereobjects.it/images/static/cms_sport/figurine_panini/'+cmsSquadra+'/';
	// LA RIGA SOTTOSTANTE VIENE COMMENTATA SE SI VUOLE FAR COMPARIRE SOLO L'IMMAGINE DI DEFAULT
	var imgToLoad_calcio = qualeIMG_calcio +'.jpg';
	var completePath_calcio = pathToLoad_calcio + imgToLoad_calcio;
	console.log(completePath_calcio);
	var img = new Image;
	img.onerror = img_onError;
	img.src = completePath_calcio;
	img.onload = function(){
		$(".type-risultati .content-scheda #foto_panini").css("background","url("+completePath_calcio +")");
	}
}

/* testata squadre new */
if ($('.testata-squadra').length > 0) {
	$('.bg_menu_selected').css('border-bottom','0');
	$('.testata-squadra-new').show();
}

/* tabs motomondiale */
if ($('#box-albo-piloti').length > 0) {
	$('.switch-tab li').click(function(){
		$(this).siblings('li').removeClass('tab-active');
		$(this).addClass('tab-active');
		var nomeId= $(this).attr('id');
		$('#box-'+nomeId+'').show();
		$('#box-'+nomeId+'').siblings('div.box-ris').hide();
		var urlTab= $(this).parent('ul').siblings('div.box-ris:visible').find('ul').find('li.list').find('a').attr('href');
		$(this).parent('ul').parent('div').find('a.urlH2').attr('href', urlTab);
	});
}

if ($('.img-graf #cambia').length > 0) {
	var urlImgGraf= $('.img-graf a').attr('href');
	$('.tutte-le-foto-formula1').css('cursor','pointer');
	$('.tutte-le-foto-formula1').click(function(){
		window.location.href= urlImgGraf;
	});
}

/*speciale MONDIALI RUGBY*/
	if($("#box-risultati-classifiche-tabs").length > 0){
		$(".pool-tabs").tabs();
	}
	$("a.zoom-modal").click(function(event){
		event.preventDefault();
		var dim_modal = "dim_modal_620";
		var dim_span = "w610";
		if(($(this).attr("class")).indexOf("dida170") > -1){
			dim_modal = "dim_modal_420";
			dim_span = "w410";
		}
		var span_html = " ";
		if($(this).find(".dida_bt_article").length > 0) span_html = $(this).find(".dida_bt_article").html();
		$.modal('<div id="img_to_zoom" class="'+dim_modal+' '+dim_span+'"><img src="'+$(this).attr("href")+'" />'+span_html+'</div>',{
	containerId:"containerZoom",
	overlayClose:true
});
	})	
/*ambiente LIFEGATE*/
var tesatinaLG = $('#testatina_lifegate');
if(tesatinaLG.length > 0){
    $("#flash-news-testatina").hide();
} else {
    $("#flash-news-testatina").show();
}

/*SECONDA COLONNA ELEZIONI*/
if($("#col-sx .zap_news_elez").length > 0){
	if($("#content-to-read").length > 0){
		var h_ctr = $("#content-to-read").height();
		var h_spalla = $(".article .spalla").height();

		if(h_ctr < h_spalla) $("#content-to-read").height(h_spalla);
	}
}

$("#fanbox4 a").hover(function(){
	$(this).parents("li:eq(0)").find("em").css("display","block");
},
function(){
	$("#fanbox4 em").css("display","none");
});
$("#box_radios_new a").hover(function(){
	$(this).parents("li:eq(0)").find("em").css("display","block");
},
function(){
	$("#box_radios_new em").css("display","none");
});
/*if($("#col-dx #ads_halfpage").length > 0 && $("#box_radios_new").length > 0){
	if($("#col-dx #ads_halfpage").height() < 60) $("#col-dx #ads_halfpage_remove").remove();
}*/
if($("#pushbar2").length > 0 && $("#pushbar2").height() < 10){
	$("#pushbar2").remove();
}


	/*ANNUNCI BOX HP*/
	
	if ($('#box-annunci .ul-cat').length > 0) {
		var myArray = [];
		var txtNum= 0;
		$('#box-annunci .num-cat a').each(function(){
			var numCat= $(this).html();
			txtNum+= numCat.replace('.','')/1;
			myArray.push(numCat + " # " + $(this).parents("li:eq(0)").html());
		});
		var arrSort= myArray.sort();
		var formatNum= addCommas(txtNum);
		arrSort.reverse();
		$("#box-annunci .ul-cat").html("");
		$.each(arrSort, function(i) {
			var text_sorted = "<li>"+((arrSort[i]).split("#"))[1]+"</li>";
			$("#box-annunci .ul-cat").append(text_sorted);
		});
		$("#box-annunci .ul-cat").show();
		//$('#box-annunci .annunci-section a.annunci-pubblicati .format-num').html(formatNum);
	}
	
	$("#box-annunci .annunci-section a.annunci-pubblicati strong").each(function(){
		var valore_var = $(this).html();
		valore_var = valore_var.replace(/,/g,'.');
		$(this).html(valore_var);
	});
	$("#box-annunci .annunci-section div strong").each(function(){
		var valore_var = $(this).html();
		valore_var = valore_var.replace(/,/g,'.');
		$(this).html(valore_var);
	});
	$(".tab-annunci").click(function(){
		resetValoreFreeText();
	});
	$(".tab-auto").click(function(){
		resetValoreFreeText();
	});
	$(".tab-casa").click(function(){
		resetValoreFreeText();
	});
	$(".tab-lavoro").click(function(){
		resetValoreFreeText();
	});
	$("#cosacerchi_annunci").keyup(function(e) {
		if(e.keyCode == 13) {
			submitButtonAnnunciHP();
		}
	});
	$("#marca").keyup(function(e) {
		if(e.keyCode == 13) {
			submitButtonAnnunciHP();
		}
	});
	$("#immobiliareTipologia").keyup(function(e) {
		if(e.keyCode == 13) {
			submitButtonAnnunciHP();
		}
	});
	$("#section-4").keyup(function(e) {
		if(e.keyCode == 13) {
			submitButtonAnnunciHP();
		}
	});
	$("#cosacerchi_annunci").click(function(){
		if(($("#cosacerchi_annunci").val()).indexOf("Cosa cerchi?") > -1 ) $("#cosacerchi_annunci").val("");
	});
	/*if($('#box-annunci').length > 0) {
		$("#box-annunci .annunci-section").addClass("clearfix");
		$('#box-annunci p').each(function(){
			var value_str = $(this).find("strong:eq(1)").html();
			if(value_str.length < 3 && value_str.indexOf("0") > -1) $(this).find("strong:eq(1)").html("Prezzo su richiesta");
		});
		var cont_ann_num = $('#box-annunci .annunci-pubblicati strong').text();
		$('#box-annunci .annunci-pubblicati strong').text(cont_ann_num.replace(/,/,"."));
	}*/

	$("#section-2 .car-selection #marca").change(function(){
        // Post string
        var post_string = "type=" + $(this).val();
 		var selectedMarca = $("#marca option:selected").val();
        // Send the request and update sub category dropdown
        $.ajax({
            type: "POST",
            data: post_string,
            dataType: "json",
            cache: false,
            url: '/linked_webroots/annunci.corriere.it/ssi/boxes/json/modelloAuto/' + selectedMarca + '.json',
            success: function(data) {
                // Clear all options from sub category select
                $("#section-2 .car-selection #modello option").remove();

                // Fill sub category select
                $.each(data, function(i, j){
                    var selectedModello = "<option value=\"" + j.codice + "\">" + j.valore + "</option>";
                    $(selectedModello).appendTo("#section-2 .car-selection #modello");
                });
            }
        });
    });

	$("#section-3 #immobiliareProvincia").change(function(){
        // Post string
        var post_string = "type=" + $(this).val();
 		var selectedProvincia = $("#immobiliareProvincia option:selected").val();
        // Send the request and update sub category dropdown
        $.ajax({
            type: "POST",
            data: post_string,
            dataType: "json",
            cache: false,
            url: '/linked_webroots/annunci.corriere.it/ssi/boxes/json/comuneImmobilare/' + selectedProvincia + '.json',
            success: function(data) {
                // Clear all options from sub category select
                $("#section-3 #immobiliareComune option").remove();

                // Fill sub category select
                $.each(data, function(i, j){
                    var selectedComune = "<option value=\"" + j.codice + "\">" + j.valore + "</option>";
                    $(selectedComune).appendTo("#section-3 #immobiliareComune");
                });
            }
        });
    });

	$("#section-4 #selectedSede").change(function(){
        // Post string
        var post_string = "type=" + $(this).val();
 		var selectedProvincia = $("#selectedSede option:selected").val();
        // Send the request and update sub category dropdown
        $.ajax({
            type: "POST",
            data: post_string,
            dataType: "json",
            cache: false,
            url: '/linked_webroots/annunci.corriere.it/ssi/boxes/json/categoriaLavoro/' + selectedProvincia + '.json',
            success: function(data) {
                // Clear all options from sub category select
                $("#section-4 #selectedCategoria option").remove();

                // Fill sub category select
                $.each(data, function(i, j){
                    var selectedLavoro = "<option value=\"" + j.codice + "\">" + j.valore + "</option>";
                    $(selectedLavoro).appendTo("#section-4 #selectedCategoria");
                });
            }
        });
    });

    // Tasto cambia mio segno dell'oroscopo
var segno_def_sel = "default";	
    if ($("#autocomplete_sign").length > 0) {
        $(".autocomplete_sign-switch").click(function(){
            $(".loc_sign").val("");
            if ($("#autocomplete_sign").data('clicked') != "yes") {
                $.getJSON("/includes2007/static/json/sign.json", function(data){
                    $(".loc_sign").autocomplete(data.sign, {
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
                        newSign = data.value;
                        newSignToShow = data.name;
                    });
                });
            } 	
            var context = "." +$(this).attr("class");
            $(context).parents("div").find(".switch-sign").show();
            $(".loc_sign").focus();
            $("#autocomplete_sign").data('clicked', 'yes');		
            return false;
        });
        $(".close-search-sign").click(function(){
            $(".switch-sign").hide();
            return false;
        });		
        function goTo_sign() {
            if(typeof( window["newSign"]) != "undefined") {
                $.cookie('default_sign_checkbox', newSign + '.' + segno_def_sel, {
                    expires: 30, 
                    path: '/',
                    domain:'.corriere.it'    
                });
                window.location.href = "http://oroscopo.corriere.it/giorno/2011/"+newSign+"/"+server_d_dd+"-"+server_m_mm+"-"+server_yyyy+".shtml";			
            /*$("#autocomplete_sign a").attr("href","http://oroscopo.corriere.it/giorno/2011/"+newSign+"/"+server_d_dd+"-"+server_m_mm+"-"+server_yyyy+".shtml");
				$("#autocomplete_sign span").text(newSignToShow);
				$("#autocomplete_sign a").removeClass("autocomplete_sign-switch");
				$("#autocomplete_sign a").unbind("click");
				$("#switch-sign").hide();*/				
            } else {
                return false;
            }
        };
        $(".loc_sign").keypress(function(e){
            if(e.which == 13){
                goTo_sign();
                return false;
            }
        });
        $(".goto_sign").click(function(){
            goTo_sign();
            return false;
        });			
        // verifico che abbia gi� il cookie per il segno preferito
        var rcsSignPref = $.cookie('default_sign_checkbox'); 
        // se ho un segno preferito settato
        if(rcsSignPref){
            cookieRcsSignPref = rcsSignPref.split(".");
            nomeSegno = (cookieRcsSignPref[0]).substr(0, 1).toUpperCase() + (cookieRcsSignPref[0]).substr(1);
			segno_def_sel = cookieRcsSignPref[1];
            // mostro il comune in testata 
            if ($("#autocomplete_sign").length > 0 && (document.URL).indexOf("oroscopo.corriere.it") == -1) {
                $("#autocomplete_sign a").attr("href","http://oroscopo.corriere.it/giorno/2011/"+nomeSegno.toLowerCase()+"/"+server_d_dd+"-"+server_m_mm+"-"+server_yyyy+".shtml");
                $("#autocomplete_sign span").text(nomeSegno);
                $("#autocomplete_sign a").removeClass("autocomplete_sign-switch");
                $("#autocomplete_sign a").unbind("click");
            }
			else {
				$("#autocomplete_sign a").text("/ Cambia segno");
				$("#autocomplete_sign strong").text(nomeSegno);			
			}
        } 
    }
    // Fine tasto cambia mio segno dell'oroscopo

});

/*FINE BOX TERZA COLONNA TROVANNUNCI*/
/*invio email modernita e territorio*/
function opendEmailClient(){
	location.href = "mailto:corriere.it@rcsdigital.it?subject=Iscrizione a Modernita' e Territorio: Il caso Veneto di Corriere Economia&body=Con la presente e-mail desidero iscrivermi all'evento Modernita' e Territorio: Il caso Veneto promosso da Corriere Economia.%0DI miei dati:%0DNome%0DCognome%0DRuolo%0DSocieta'%0DE-mail%0DTelefono%0DIndirizzo%0DCAP%0DCitta'%0DProvincia%0D%0D%0DConsegnero' la copia stampata dell'e-mail alla segreteria organizzativa per accreditarmi all'evento stesso.%0D%0DDichiaro di aver letto l'informativa  ai sensi del D.Lgs. 196/2003 ('Codice in materia di protezione dei dati personali') e sono consapevole che il trattamento dei dati e' necessario per ottenere il servizio proposto dal sito, dichiaro di essere maggiorenne. Puoi leggere l'informativa completa a questo indirizzo http://www.corriere.it/economia/modernitaeterritorio/informativa.shtml.%0D%0DAutorizzo al trattamento dei miei dati per ricevere informazioni promozionali mediante posta, telefono, posta elettronica, sms, mms, effettuare analisi statistiche, sondaggi d'opinione da parte di Societa' del gruppo RCS.%0D%0DAutorizzo alla comunicazione dei miei dati per ricevere informazioni promozionali mediante posta, telefono, posta elettronica, sms, mms da parte di IBM. Puoi leggere l'informativa relativa a questo indirizzo http://www.corriere.it/economia/modernitaeterritorio/informativa_IBM.shtml.%0D";
}
/*FINE invio email modernita e territorio*/
function traffic_initCallback(carousel)
{
    // Disable autoscrolling if the user clicks the prev or next button.
    carousel.buttonNext.bind('click', function() {
        carousel.startAuto(0);
    });

    carousel.buttonPrev.bind('click', function() {
        carousel.startAuto(0);
    });

    // Pause autoscrolling if the user moves with the cursor over the clip.
    carousel.clip.hover(function() {
        carousel.stopAuto();
    }, function() {
        carousel.startAuto();
    });
};

/*SOPPALCO TEMPOREALE*/

function loadTempoReale() {
	//$('.tr-home-container .tr-header, .tr-home-container #tr-21, .tr-home-container #tr-105').html("");
	$('.tr-home-container').html("");
	var todayDate = server_d_dd + "/" + server_m_mm;
	var idCompetitions = new Array();
	var counterCompetitions = 0;
	var numCompetitions = 0;
	var classeLi = "visible";
	matchStatusClass = "";

	$.ajax({
			url: "/Sport/2010/optasics/xml-temporeale/competitions.xml",

		dataType: "xml",
		cache: false,
		success: function(xml_cont){
			$('.tr-home-container').append('<em class="title"><img src="/images/static/common/temporeale/logo_sponsor.png" /></em><ul class="tr-header"></ul>');
			if ($(xml_cont).find('Comp[comp-id="21"]').attr('active') == "1") {
				idCompetitions[numCompetitions] = "21";
				$('.tr-home-container').append('<ul class="tr-home tr-home-serie-a" id="tr-21"></ul>');
				$('.tr-home-container .tr-header').append('<li class="tab'+numCompetitions+'"><a href="#tr-21">Serie A</a></li>');
				numCompetitions = numCompetitions + 1;
			} else {
				$('#tr-21').hide();
			}

			if ($(xml_cont).find('Comp[comp-id="105"]').attr('active') == "1") {
				 idCompetitions[numCompetitions] = "105";
				 $('.tr-home-container').append('<ul class="tr-home tr-home-serie-b" id="tr-105"></ul>');
				 $('.tr-home-container .tr-header').append('<li class="tab'+numCompetitions+'"><a href="#tr-105">Serie B</a></li>');
				 numCompetitions = numCompetitions + 1;
			} else {
				$('#tr-105').hide();
			}

			if ($(xml_cont).find('Comp[comp-id="5"]').attr('active') == "1") {
				 idCompetitions[numCompetitions] = "5";
				 $('.tr-home-container').append('<ul class="tr-home tr-home-champions" id="tr-5"></ul>');
				 $('.tr-home-container .tr-header').append('<li class="tab'+numCompetitions+'"><a href="#tr-5" class="big">Champions League</a></li>');
			} else {
				$('#tr-5').hide();
			}

			if ($(xml_cont).find('Comp[comp-id="174"]').attr('active') == "1") {
				 idCompetitions[numCompetitions] = "174";
				 $('.tr-home-container').append('<ul class="tr-home tr-super-cup" id="tr-174"></ul>');
				 $('.tr-home-container .tr-header').append('<li class="tab'+numCompetitions+'"><a href="#tr-174" class="big">Super Coppa Europea</a></li>');
			} else {
				$('#tr-174').hide();
			}

			for(var i = 0; i < idCompetitions.length; i ++) {
				$.ajax({
					url: '/Sport/2010/optasics/xml-temporeale/matchdays_'+idCompetitions[i]+'.xml',
					dataType: "xml",
					cache: false,
					success: function(xml_cont){

					//$("#tr-"+idCompetitions[counterCompetitions]).html("");
						dataHtml = "";

						linkHtml = $(xml_cont).find('link').text();


						var linkHtml= linkHtml.replace("2010","2011")



						$(xml_cont).find('result').each(function(){

							// per la champions mostro solo le partite di oggi
							dateGame = $(this).attr('time').split(" ");
							if (dateGame[0] != todayDate && idCompetitions[counterCompetitions] == "5") {
								classeLi = "hidden";
							} else {
								classeLi = "visible";
							}

							matchStatus = $(this).attr('match-status');
							if (matchStatus == "Pregara") {
								matchStatus = $(this).attr('time');
								matchStatusClass = "future";
							} else if (matchStatus == "Finita") {
								matchStatus = "";
							}

							teamCodeHome = $(this).find('home-team').find('team-code').text();
							teamCodeHomeIt = $(this).find('home-team').find('team-code-it').text();
							teamNameHome = $(this).find('home-team').find('team-name').text();

							teamCodeAway = $(this).find('away-team').find('team-code').text();
							teamCodeAwayIt = $(this).find('away-team').find('team-code-it').text();
							teamNameAway = $(this).find('away-team').find('team-name').text();

							scoreHome = $(this).find('home-team').find('score').text();
							scoreAway = $(this).find('away-team').find('score').text();

							periodHomeList = $(this).find('home-team').find('scorer').find('player-code').length;
							periodAwayList = $(this).find('away-team').find('scorer').find('player-code').length;

							periodHome = $(this).find('home-team').find('scorer').attr('period');
							periodAway = $(this).find('away-team').find('scorer').attr('period');


							if (periodHome != null) {
									scoreHomeTot = parseInt(scoreHome)+periodHomeList;

									if(periodHome == "ShootOut"){matchStatus = "T. S.";}
									if(periodHome == "ExtraFirstHalf"){matchStatus = "1° T. S.";}
									if(periodHome == "ExtraSecondHalf"){matchStatus = "2° T. S.";}

								}else{
								scoreHomeTot = $(this).find('home-team').find('score').text();
								}

							if (periodAway != null) {
									scoreAwayTot = parseInt(scoreAway)+periodAwayList;
								}else{
								scoreAwayTot = $(this).find('away-team').find('score').text();
								}



							dataHtml += '<li class="'+classeLi+'"><a href="'+linkHtml+'">';
							dataHtml += '<img src="/images/static/common/temporeale/scudetti/'+teamCodeHome+'.png" class="img-scudetto" alt="'+teamNameHome+'" title="'+teamNameHome+'" />';
							dataHtml += '<span>'+teamCodeHomeIt+'</span>';
							dataHtml += '<strong>'+scoreHomeTot+'</strong>';
							dataHtml += '<img src="/images/static/common/temporeale/scudetti/'+teamCodeAway+'.png" class="img-scudetto" alt="'+teamNameAway+'" title="'+teamNameAway+'" />';
							dataHtml += '<span>'+teamCodeAwayIt+'</span>';
							dataHtml += '<strong>'+scoreAwayTot+'</strong>';
							dataHtml += '<em class="'+matchStatusClass+'">'+matchStatus+'</em>';
							dataHtml += '</a></li>';
						});
						$("#tr-"+idCompetitions[counterCompetitions]).append(dataHtml);
						$("#tr-"+idCompetitions[counterCompetitions]).find("li.visible:last").addClass("last");
						counterCompetitions ++;
					}
				});
			}

			$('.tr-header .tab0').addClass("ui-tabs-selected");
			$('.tr-home').hide();
			$('.tr-home:first').show();

			$('.tr-header .tab0').click(function() {
				$('.tr-home').hide();
				$('.tr-home:eq(0)').show();
				$('.tr-header li').removeClass("ui-tabs-selected");
				$(this).addClass("ui-tabs-selected");
				return false;
			});

			$('.tr-header .tab1').click(function() {
				$('.tr-home').hide();
				$('.tr-home:eq(1)').show();
				$('.tr-header li').removeClass("ui-tabs-selected");
				$(this).addClass("ui-tabs-selected");
				return false;
			});

			$('.tr-header .tab2').click(function() {
				$('.tr-home').hide();
				$('.tr-home:eq(2)').show();
				$('.tr-header li').removeClass("ui-tabs-selected");
				$(this).addClass("ui-tabs-selected");
				return false;
			});

			$('.tr-home-container').show();

		}
	});
}


/*FINE SOPPALCO TEMPOREALE*/
function cercaPagineGialle() {
	$('.search-pgialle').attr('method','get');
	var argomento = (document.searchpgialle.cosa.value);
	var actionForm = "http://paginegialle.corriere.it/pgol/4-"
	document.searchpgialle.action = actionForm + argomento;
}
function getBoxMulino2() {
	$.ajax({
		type: "GET",
		url: "http://www.corriere.it/ilmulino/mulino_150.xml",
		dataType: "xml",
		cache: false,
		success: function(xml_cont) {
			var data = $(xml_cont).find('channel item:eq(0)')
			var title = data.find('title').text();
			var description = data.find('description').text();
			var pubDate = data.find('pubDate').text();
			pubDate = pubDate.substring(5,16);
			var monthNames = [["Jan", "gennaio"], ["Feb", "febbraio"], ["Mar", "marzo"], ["Apr", "aprile"], ["May", "maggio"], ["Jun", "giugno"], ["Jul", "luglio"], ["Aug", "agosto"], ["Sep", "settembre"], ["Oct", "ottobre"], ["Nov", "novembre"], ["Dec", "dicembre"]];
			$.each(monthNames, function(i, month) {
				if (pubDate.indexOf(month[0]) !== -1) {
					pubDate = pubDate.replace(month[0], month[1]);
					return false
				}
			})
			var category = data.find('category').text();
			var link = data.find("link").text();

			$("#box-ilmulino_105 p.subtitle").html(category);
			$("#box-ilmulino_105 h3.hour").html(pubDate);
			$("#box-ilmulino_105 h4.section").html("<a target='_blank' href=\"" + link + "\">" + title + "<\/a>");
			$("#box-ilmulino_105 p.desc-text").html("<a target='_blank' href=\"" + link + "\">" + description + "<\/a>");
			$("#box-ilmulino_105").css("display", "block");
		}
	 });
}


function getBoxMulino() {
	$.ajax({
		type: "GET",
		url: "http://www.corriere.it/ilmulino/mulino.xml",
		dataType: "xml",
		cache: false,
		success: function(xml_cont) {
			var data = $(xml_cont).find('channel item:eq(0)')
			var title = data.find('title').text();
			var description = data.find('description').text();
			var pubDate = data.find('pubDate').text();
			pubDate = pubDate.substring(5,16);
			var monthNames = [["Jan", "gennaio"], ["Feb", "febbraio"], ["Mar", "marzo"], ["Apr", "aprile"], ["May", "maggio"], ["Jun", "giugno"], ["Jul", "luglio"], ["Aug", "agosto"], ["Sep", "settembre"], ["Oct", "ottobre"], ["Nov", "novembre"], ["Dec", "dicembre"]];
			$.each(monthNames, function(i, month) {
				if (pubDate.indexOf(month[0]) !== -1) {
					pubDate = pubDate.replace(month[0], month[1]);
					return false
				}
			})
			var category = data.find('category').text();
			var link = data.find("link").text();

			$("#box-ilmulino p.subtitle").html(category);
			$("#box-ilmulino h3.hour").html(pubDate);
			$("#box-ilmulino h4.section").html("<a target='_blank' href=\"" + link + "\">" + title + "<\/a>");
			$("#box-ilmulino p.desc-text").html("<a target='_blank' href=\"" + link + "\">" + description + "<\/a>");
			$("#box-ilmulino").css("display", "block");
		}
	 });
}

function getNewsNRC() {
		$.ajax({
			type: "GET",
			url: "/english/xml/nrc.xml",
			dataType: "xml",
			success: function(xml_cont) {
			  list_li_nrc="<li class='title'>nrc-handelsblad</li>";
			$(xml_cont).find('item').each(function(i){
			 if(i<5){
				list_li_nrc = list_li_nrc +'<li><a href="'+$(this).find("link").text()+'" target="_blank">'+$(this).find("title").text()+'</a></li>';
        }
      });
			 $('#news_nrc').html(list_li_nrc).show();
			}
		});
}

function getNewsPOLOTIKEN() {
		$.ajax({
			type: "GET",
			url: "/english/xml/politiken.xml",
			dataType: "xml",
			success: function(xml_cont) {
			  list_li_nrc="<li class='title'>politiken</li>";
			$(xml_cont).find('article').each(function(i){
			 if(i<5){
				list_li_nrc = list_li_nrc +'<li><a href="'+$(this).find("linkUrl").text()+'" target="_blank">'+$(this).find("title").text()+'</a></li>';
        }
      });
			 $('#news_politiken').html(list_li_nrc).show();
			}
		});
}
/*function getNewsNOUVELOBS() {
		$.ajax({
			type: "GET",
			url: "/english/xml/nouvelobs.xml",
			dataType: "xml",
			success: function(xml_cont) {
			  list_li_nrc="<li class='title'>Le nouvel OBSERVATEUR</li>";
			$(xml_cont).find('item').each(function(i){
			 if(i<5){
				list_li_nrc = list_li_nrc +'<li><a href="'+$(this).find("link").text()+'" target="_blank">'+$(this).find("title").text()+'</a></li>';
        }
      });
			 $('#news_nouvelobs').html(list_li_nrc).show();
			}
		});
}*/
function getNewsSPIEGEL() {
		$.ajax({
			type: "GET",
			url: "/english/xml/spiegel.xml",
			dataType: "xml",
			success: function(xml_cont) {
			  list_li_nrc="<li class='title'>spiegelonline</li>";
			$(xml_cont).find('item').each(function(i){
			 if(i<5){
				list_li_nrc = list_li_nrc +'<li><a href="'+$(this).find("link").text()+'" target="_blank">'+$(this).find("title").text()+'</a></li>';
        }
      });
			 $('#news_spiegel').html(list_li_nrc).show();
			}
		});
}

function getNewsNOUVELOBS() {
	$.ajax({
		type: "GET",
		url: "/english/xml/nouvelobs.xml",
		dataType: "xml",
		success: function(xml_cont) {
			list_li_nrc="<li class='title'>Le nouvel OBSERVATEUR</li>";
			$(xml_cont).find('item').each(function(i){
				if(i<3){
					list_li_nrc = list_li_nrc +'<li><a href="'+$(this).find("link").text()+'" target="_blank">'+$(this).find("title").text()+'</a></li>';
				}
			});
			$('#news_nouvelobs').html(list_li_nrc).show();
		}
	});
}
		
//POPUP LOGIN
function checkPopUp(){
  $.cookie('advertising-login', 'true' , {path: '/', expires: 30});
  $.modal.close();
  return false;
}
//POPUP LOGIN DI LA TUA
	var htmlLogin = "<div id='popup_log_dlt'><div class='container'><h3>Login</h3><p>Inserisci la tua mail e la password di Corriere.it</p><form id='loginFormBean' method='post' action='http://www.corriere.it/corcommunity/accesso/VerificaLogIn.do'>";
	htmlLogin += "<input type='hidden' value='COR-REG' name='SEP'><input type='hidden' id='localContentPath' value='"+document.URL+"' name='contentPath'><ul class='registrazione-form'><li>email:<input type='text' name='username' tabindex='1' value='' id='username-login' title='Username'></li>";
	htmlLogin += "<li>password:<input type='password' name='password' tabindex='2' value='' id='password-login' title='Password'><br>";
	htmlLogin += "<a href='javascript:popupPassword('/corcommunity/accesso/retpwd.jsp');'>recupera password</a></li>";
	htmlLogin += "<li><input type='submit' alt='INVIA' value='INVIA' class='submit right'></li></ul></form>";
	htmlLogin += "</div></div><a name='scrivicommenti'></a><div id='box_login_dlt'>Per poter commentare i post devi essere registrato al sito di Corriere.it.<br />Ti ricordiamo che puoi commentare i nostri articoli tutti i giorni dalle 8 alle 24<br>";
	htmlLogin += "Se sei gi&agrave; nostro utente esegui il <span onclick='javascript:loginDLT_box();' class='login_dlt' title='login'>login</span> altrimenti <a href='javascript:loginDLT_box();' class='reg_dlt' title='registrati'>registrati</a></div>";
	var count_send_dlt = 0;

	function loadContentDLT(url) {
		$('#content-generated-dlt').load(
		url,
		function() {
			if (count_send_dlt == 0) $("html,body").scrollTop(0);
			count_send_dlt++;
			$("#submit-commento input.titolo_dlt, #submit-commento textarea").blur();
			$('#submit-commento textarea[name*=ugcTesto]').html("Il tuo commento");
			$("#box_send_msg_dlt input.titolo_dlt").click(function(){
				$("#submit-commento .errorTitolo").css("display","none");
				if($(this).val() == "Titolo") $(this).val("");
			});
			$("#box_send_msg_dlt textarea").click(function(){
				$("#submit-commento .errorTesto").css("display","none");
				if($(this).val() == $(this).attr("title")) $(this).val("");
			});
			
			if($("#commenti-free").length > 0) {

				if ($('#submit-commento input[name="disclaimer"]').attr("checked") != true || $('#submit-commento input[name="condizioniGenerali"]').attr("checked") != true){
					$('#submit-commento input[name*=ugcTitolo]').attr("disabled","disabled").css("background-color","#eeeeee");
					$('#submit-commento textarea[name*=ugcTesto]').attr("disabled","disabled").css("background-color","#eeeeee");
				}	
				
				$('#submit-commento input[name="disclaimer"], #submit-commento input[name="condizioniGenerali"]').click(function(){
					if ($('#submit-commento input[name="disclaimer"]').attr("checked") != true || $('#submit-commento input[name="condizioniGenerali"]').attr("checked") != true){
						$('#submit-commento input[name*=ugcTitolo]').attr("disabled","disabled").css("background-color","#eeeeee");
						$('#submit-commento textarea[name*=ugcTesto]').attr("disabled","disabled").css("background-color","#eeeeee");
					} else {
						$('#submit-commento input[name*=ugcTitolo]').removeAttr("disabled").css("background-color","#fff");
						$('#submit-commento textarea[name*=ugcTesto]').removeAttr("disabled").css("background-color","#fff");
						$(".errorCheck").css("display", "none");
					}
				})
			}
			
			
		}
		);
	}
	function submitCommentoDlt() {
		if (validateDLT()) {
			$("#content-generated-dlt").load("/dilatua/invioRecensione.do", {
				"milUgc.ugcTitolo" : htmlEncode($('#submit-commento input[name*=ugcTitolo]').attr("value")),
				"milUgc.ugcTesto" : htmlEncode($('#submit-commento textarea[name*=ugcTesto]').attr("value")),
				"username" : $('#submit-commento input[name=username]').attr("value"),
				"nickname" : $('#submit-commento input[name=nickname]').attr("value"),
				"nomeEventoEntita" : $('#submit-commento input[name=nomeEventoEntita]').attr("value"),
				"returnUrl" : $('#submit-commento input[name=returnUrl]').attr("value"),
				"oggetto" : $('#submit-commento input[name=oggetto]').attr("value"),
				"tipologia" : $('#submit-commento input[name=tipologia]').attr("value"),
				"sezione" : $('#submit-commento input[name=sezione]').attr("value"),
				"disclaimer" : $('#submit-commento input[name=disclaimer]:checked').val(),
				"condizioniGenerali" : $('#submit-commento input[name=condizioniGenerali]:checked').val(),
				"formId" : $('#submit-commento input[name=formId]').attr("value"),
				"preview" : "false" }, function(){openPopMessageLoad("popup_message_dlt");});
		}
	}
	function validateDLT(formData, jqForm, options) {
		var ret = true;
		$(".errorTitolo, .errorTesto").css("display", "none");
		if ($(".disclaimer-salute").length > 0) {
			if ($('#submit-commento input[name="disclaimer"]').attr("checked") != true || $('#submit-commento input[name="condizioniGenerali"]').attr("checked") != true) {
				$(".errorCheck").css("display", "block");
				ret = false;				
			}	
		}
		
		if ($('#submit-commento input[name*=ugcTitolo]').val() == "Titolo" || $('#submit-commento input[name*=ugcTitolo]').val() == "" ) {
			$(".errorTitolo").css("display", "block");
			ret = false;
		}
		if ($('#submit-commento textarea[name*=ugcTesto]').val() == "Il tuo commento" || $('#submit-commento textarea[name*=ugcTesto]').val() == "") {
			$(".errorTesto").css("display", "block");
			ret = false;
		}

		return ret;
	}
	function htmlEncode(source) {
		function special(source)
		{
			var result = '';
			for (var i = 0; i < source.length; i++)
			{
				var c = source.charAt(i);
				if (c < ' ' || c > '~')
				{
					c = '&#' + c.charCodeAt() + ';';
				}
				result += c;
			}
			return result;
		}
		var result = source;
		// ampersands (&)
		result = result.replace(/\&/g,'&amp;');
		// less-thans (<)
		result = result.replace(/\</g,'&lt;');
		// greater-thans (>)
		result = result.replace(/\>/g,'&gt;');
		// Replace quotes if it isn't for display,
		// since it's probably going in an html attribute.
		result = result.replace(new RegExp('"','g'), '&quot;');
		// special characters
		result = special(result);

		return result;
	}

function loginDLT_box(){
		$('html, body').animate({ scrollTop: 0 }, 'slow');
		openLogDLT();
}
function openLogDLT(){
/*	$('#popup_log_dlt').modal({
		containerId : 'modal-login-dlt',
		onClose: function (dialog) {
			dialog.data.fadeOut('slow', function () {

				dialog.container.slideUp('slow', function () {
					dialog.overlay.fadeOut('slow', function () {
						$.modal.close();
					});
				});
			});
		}
	});*/
$("#headBoxLogin .headLogin").click();
}
function openPopMessage(titolo, messaggio){
		$.modal("<div id=\"popup_message_dlt\"><div class=\"container\"><h3>"+titolo+"</h3><p>"+messaggio+"</p></div></div>",{
			overlayClose:true,
			containerId : 'modal-message-dlt',
			onClose: function (dialog) {
				dialog.data.fadeOut('slow', function () {
					dialog.container.slideUp('slow', function () {
						dialog.overlay.fadeOut('slow', function () {
							$.modal.close();
						});
					});
				});
			}
		});
}
function openPopMessageLoad(id_contenitore){
	$('#'+id_contenitore).modal({
		overlayClose:true,
		containerId : 'modal-message-dlt',
		onClose: function (dialog) {
			dialog.data.fadeOut('slow', function () {
				dialog.container.slideUp('slow', function () {
					dialog.overlay.fadeOut('slow', function () {
						$('#content-generated-dlt').html("");
						$.modal.close();
						loadContentDLT($('#commenta').attr('href'));
					});
				});
			});
		}
	});
}
function ismaxlength(obj)
{
var mlength = 1500;
if (obj.getAttribute && obj.value.length>mlength)
obj.value = obj.value.substring(0,mlength)
}

function checkCookieRCSlogin(){
	var usn=jQuery.cookie("rcsLogin");
//console.log("usn: "+usn);
	if(usn!=null){
		usn=usn.substring(0,usn.indexOf("|"));
		if(usn.indexOf("@")==-1){
			//cookie obsoleto lo cancello
			jQuery.cookie("rcsLogin", null,{path: '/', domain  : 'corriere.it'});
			$('#content-generated-dlt').html(htmlLogin);
		}else{
			//console.log("enter");
			usn=usn.substring(0,usn.indexOf("@"));
			$("#user-name").html(usn);
			$("#headBoxLogin .notlogged").css("display", "none");
			$("#headBoxLogin .logged").css("display", "inline");
				//Se l'utente è loggato, chiamo l'applicazione DLT per far comparire il form di invio commento
				if($("#comment_box_article #commenta").length > 0){
					//console.log("loadContentDLT");
					loadContentDLT($('#commenta').attr('href'));
				}
		}
	} else if($("#commenti-free").length > 0) {
		//Se siamo in salute chiamo l'applicazione DLT per far comparire il form di invio commento
		if($("#comment_box_article #commenta").length > 0){
			loadContentDLT($('#commenta').attr('href'));
		}
	}
	else {
		if($("#comment_box_article #commenta").length > 0) {
			$('#content-generated-dlt').html(htmlLogin);
		}
		$("#headBoxLogin .logged").hide();
		$("#headBoxLogin .notlogged").show();
	}
	if($("#box_login_dlt .login_dlt").length > 0){
		//$("#testatina_dlt a[href=#scrivicommenti]").css("display","none");	
	}
	else {
		$("#testatina_dlt a[href=#scrivicommenti]").addClass("login_btn_a");
	}
}
function chkAccordionHP(){
	if($("div.square-bottom").length>0){
    	if($("div.square-bottom").height() < 10){
			$("#ad_home_hide").load("/includes2007/ssi/boxes/accordion_home_meth_2.html");
			$("#ad_home_hide").css({'margin-right':'0','width':'auto','background':'none'});
			$(".asc-lar-0,.asc-lar-1,.asc-lar-2,.asc-lar-3").css("padding-right","13px");
			$("#ascensore-dx-static_large").css("padding-left","0px");
		}
		else{
			$(".square-bottom").css("width","311px");
			$(".square-bottom").css("margin-right","10px");
			$(".asc-lar-0").css("padding-right","4px");
			$(".asc-lar-1").css("padding-right","4px");
			$(".asc-lar-2").css("padding-right","4px");
			$("#ascensore-dx-static_large").css("padding-left","0px");
		}
	}
	$('#ad_home_hide').show();
}
$(document).ready(function(){					   
	$("#box_blog_multi li").each(function(){
		var autore_text = $(this).find(".blog_testo .blog_link_post").attr("title");
		if(autore_text == "LA NUVOLA DEL LAVORO"){
			$(this).find("span").text("a cura " + $(this).find("span").text());
		}
		var html_text = $(this).find(".blog_testo .blog_link_post").html();
		if(html_text.length > 74){
			html_text = html_text.substring(0,74)+" ...";
			$(this).find(".blog_testo .blog_link_post").html(html_text);
		}
		
		if($(this).find(".blog_foto img").length == 0){
			if(autore_text == "SEI GRADI"){
				$(this).find(".blog_foto").append('<img src="http://www.corriere.it/images/static/common/blog/seigradi-blog.png">');
			}else{
				$(this).find(".blog_foto").append('<img src="http://www.corriere.it/images/static/common/generic_blog.jpg">');
			}
		}
	});
	
$("#box_blog_multi li:last").addClass("blog_last");						   
if($("#homepage-corriere").length > 0) {sharebutton("Corriereit");}

/* pag approfondimenti */
if($('.pag-approfondimento').length > 0) {
	$('#m_citta').html('Le citt&agrave;');
	
	if($('.cont-list-mappa').length > 0) {
		$('.cont-list-mappa .list-mappa').each(function(i){
			if(i%2){
				$(this).addClass('odd');
			}else{
				$(this).addClass('even');
			}
		});
		$('.cont-list-mappa .even').wrapAll('<div class="list-mappa-sx" />');
		$('.cont-list-mappa .odd').wrapAll('<div class="list-mappa-dx" />');
		
		$('.cont-list-mappa').show();
	}
}




//POPUP LOGIN
		if($('.popup_advertise').length > 0) {
			if($.cookie('advertising-login') == null || $.cookie('advertising-login')!= "true"){
				$('.popup_advertise').modal({overlayClose:true,
			                         	containerId : 'simplemodal-advertise',
                                onClose: function (dialog) {
                                    	dialog.data.fadeOut('slow', function () {
                                    		dialog.container.slideUp('slow', function () {
                                    			dialog.overlay.fadeOut('slow', function () {
                                    				$.modal.close();
                                    			});
                                    		});
                                    	});
                                    }});

			}
		}
//FINE POPUP LOGIN

  if($("#ppn_check_column").length > 0 && $('#col-sx #mirago-feed-hp-seznew').length == 0){
    $("#ppn_check_column").remove();
      if($("#col-dx").height() >= $("#col-sx").height()){
          $.get("/tools/includes/afc_google_dyn_articolo_std_sez.inc?varPPN=corriere_std_"+sezione_ppn_dyn, function(data){
              $("#col-sx").append(data);
           });
      }
      else {
          $.get("/tools/includes/afc_google_dyn_articolo_spc_sottosez.inc?varPPN=corriere_spc_"+sezione_ppn_dyn, function(data){
              $("#col-dx").append(data);
           });
      }
  }
 if($("#ppn_hp_sez_chk").length > 0){
	 if($("#mirago-feed-hp-seznew").length == 0){
		  $.get("/tools/includes/afc_google_hp_sottosezioni.inc", function(data){
				if($("#box_radios_new").length == 0){															   
				  $("#col-dx").append(data);
				}
				 else {
					$("#box_radios_new").before(data);
				}					
		   });
	 }
  }
	if ($("#col-dx .tablequote-matchlist").length > 0) {
		if (Math.random() > 0.5) {
			$('#col-dx .tablequote-matchlist tr.partita').each(function(){
				var marchio1 = $(this).next('tr');
				var marchio2 = marchio1.next('tr');
				marchio2.insertBefore(marchio1);
			});
		}
	}

	//TROVA ANNUNCI TERZA COLONNA
	if($('#categoriaAnnuncio').length>0){
		$("#cosacerchi_annunci").click(function(){
			if(($("#cosacerchi_annunci").val()).indexOf("Cosa cerchi?") == 0) $("#cosacerchi_annunci").val("");
		});
		$('#categoriaAnnuncio').change(function(){
			url=' /annunci.corriere.it/elenco/sottoCategoria/'+$('#categoriaAnnuncio option:selected').val()+'.htm';
			$.getJSON(url, function(data) {
				$('#subCategoriaAnnuncio').find('option').remove();
				var option = document.createElement("option");
				option.value = '';
				option.text =  'Categoria';
				$('#subCategoriaAnnuncio').get(0)[$('#subCategoriaAnnuncio option').length] = option;
					$.each(data, function(i,item){
						var option = document.createElement("option");
						option.value = item.codice;
						option.text =  item.valore;
						$('#subCategoriaAnnuncio').get(0)[$('#subCategoriaAnnuncio option').length] = option;
					});
			});
		});
	}

	//SALUTE: ESAMI DEL SANGUE
	$(".esami-spalla .list-compressed li").each(function(){
		if($(this).find("ul").length > 0) $(this).find("a:first").css("font-style","italic");
	});
	//FINE SALUTE: ESAMI DEL SANGUE
	//spazio sotto la minipushbar in home
	if ($(".mini-pushbar-home").text().length > 100) {
		$(".mini-pushbar-home").addClass("spacer_bottom")
	}
	
	
	// articoli correlati SALONE RISPARMIO
	if($('#correlati-salonerisparmio').length > 0) {
		var uuidToHide = "uu"+$("body").attr("id");
		$("#"+uuidToHide).remove();
		if($('#correlati-salonerisparmio').length = 4) {
			$('#correlati-salonerisparmio li').eq(3).remove();
		}
	}

	// commenti article toolbar
	if($("#comment_box_article").length > 0){
		text_tool = "";
		text_tool_share = "";
		num_com = $("#body_dlt span.num_dlt").html();
		if( num_com  == 0){
			// se � ancora commentabile
			if($("#box_login_dlt").length > 0){
				text_tool = "<li class='commenti-tool'>&nbsp;<a href='#boxcommenta' title='commenti'>COMMENTA</a></li>";
				text_tool_share = '<div class="comment-box"><a href="#boxcommenta" class="comment">Commenti dei lettori</a><span>---</span></div>';



			}
		} else {
			text_tool = "<li class='commenti-tool'>&nbsp;<a href='#commenti' title='commenti'><strong>"+num_com+"</strong> COMMENTI</a></li>";
			text_tool_share = '<div class="comment-box"><a href="#commenti" class="comment">Commenti dei lettori</a><span>'+num_com+'</span></div>';
		}
		$(".article .toolbar").prepend(text_tool);
		$("#share-article-box .share_box").before(text_tool_share);
	}

	/*controllo se la pubb rectangle è stato caricato*/
	if($("#col-article-option #rectangle").height() < 100) $("#col-article-option #rectangle").remove();

	/*SOPPALCO TEMPOREALE*/
		if ($('.tr-home-container').length > 0) {


			loadTempoReale();
			setInterval("loadTempoReale()", 60000);


		}
	/*FINE SOPPALCO TEMPOREALE*/

	if ($('#box-fb').length > 0) {
		//$('#scroll-box-fb, #scroll-box-fb2').jScrollPane({showArrows:false,scrollbarWidth:18,dragMaxHeight:15});
		$('#box-fb').tabs();
	}

	/*fanbox3*/
	$(".fanbox3 a").hover(function() {
	  $(this).next("em").animate({opacity: "show"}, "slow");
	}, function() {
	  $(this).next("em").animate({opacity: "hide"}, "fast");
	});

	// box ilmulino cultura
	if($("#box-ilmulino").length > 0) {
		getBoxMulino()
	}
	if($("#box-ilmulino_105").length > 0) {
		getBoxMulino2()
	}

	// gazzetta english in terza colonna carico il box NRC Handelsblad (solo le prime 5 news)
	if($("#news_nrc").length > 0) {
		getNewsNRC()
	}

	if($("#news_politiken").length > 0) {
		getNewsPOLOTIKEN()
	}

	if($("#news_spiegel").length > 0) {
		getNewsSPIEGEL()
	}

	if($("#news_nouvelobs").length > 0) {
		getNewsNOUVELOBS()
	}

	$(".input-sbianca").focus(function() {
		if($(this).val() != "") {
			$(this).val(""); //Svuoto il contenuto.
		}
	});
	
	//controlli 3colnew hp
	
	if($("body#homepage-corriere").length > 0) {
		$("#col-dx .bacheca-pub-home div:first").css("border-top","0");
	
		$("#col-dx #tabellino-hp .tablequote-matchlist tr:even").addClass("even")
	
		$("#col-dx .bacheca-mkt").each(function(){
			$(this).find("div.boxmkt-80:last").css("border-bottom","0");
		})
	}
	
	// switch dizionari 3colnew
	$('#switch-dizionari ul#switch-tab li a').click(function(){
		$('#switch-dizionari ul#switch-tab li').removeClass();
		$('#switch-dizionari ul#switch-tab').removeClass();
		$('#switch-dizionari ul#switch-tab').addClass($(this).attr('rel'));
		$(this).parent('li').addClass('selected');
		var containerName= $(this).attr('href');
		$('.cont-tab').hide();
		$(containerName).show();
		return false;
	});

	//box infotraffic
	if($('#mycarousel_traffic').length > 0){
$.ajax({
	url: "http://xml.corriereobjects.it/traffico/xml/traffico.json",
	    async: true,
	    dataType: "script",
	    success: function(json) {
      list_li="";

			$.each(xml_wrap.traffico, function(i, item) {
				list_li = list_li +'<li><a href="http://viaggi.corriere.it/servizi/traffico/"><strong>'+item.auto+'</strong><br />'+item.testo+'</a></li>';
			});

			 $('#mycarousel_traffic').html(list_li);
			$('#mycarousel_traffic').jcarousel({
				auto: 3,
				scroll: 1,
				wrap: 'last',
				initCallback: traffic_initCallback
			});
  }
});

	/*	$.ajax({
				type: "GET",
			url: "/traffico/xml/traffico.xml",
			dataType: "xml",
			success: function(xml_cont) {
			  list_li="";
			$(xml_cont).find('evts evt').each(function(){
				list_li = list_li +'<li><a href="http://viaggi.corriere.it/servizi/traffico/"><strong>'+$(this).attr("auto")+'</strong><br />'+$(this).find('testo').text()+'</a></li>';
			});
			 $('#mycarousel_traffic').html(list_li);
			$('#mycarousel_traffic').jcarousel({
				auto: 3,
				scroll: 1,
				wrap: 'last',
				initCallback: traffic_initCallback
			});
			}
		});*/


	}

	/* disabilita link per risultati classifica 2009*/
	$("table.stab a").css("cursor","default");
	$("table.stab a").click(function() {
			return false;
		}
	);

	//rimpicciolisco la scritta league
	if($("#col-dx #tabellino-hp h3 .title").length > 0){
	  if($("#col-dx #tabellino-hp h3 .title").html().indexOf("league")>-1) {
	   $("#tabellino-hp h3 .title").html($("#tabellino-hp h3 .title").html().replace("league","<span class='sub-title'>league</span>"));
	   $("#tabellino-hp h3 div.title").attr("style","margin:0");
	  }
	}

	//focus motore di ricerca

//	$("#search_val").focus();


	if ($("#square-top").size() > 0) {
		 $("#square-top").addClass("spacer_bottom");
	}



	$("#menu > ul.nav_1st").prepend("<li class=\"first\" style=\"width: 1px; height: 16px\"><!-- elemento generato da libreria_animazioni.js --></li>");

	// eccezione per sport e scienze che dal menu di secondo livello passano al menu di primo livello
	if ($(".sottomenu_scienze").length > 0) {
		$("#menu_news").attr("id","menu_scienze")
	}

	if ($("#sottomenu_sport").length > 0) {
		$("#menu_news").attr("id","menu_sport")
	}

	if ($("#sounds_sum_body").length > 0) {
		$("#menu_news").attr("id","menu_musica")
	}

	// selezione automatica del menu
		var id = "";
		var sezione = "";
	if(dyn_chk_menu == ""){
	if ($(".nav_1st").length > 0) {
		id = $(".nav_1st").attr("id");
		sezione=id.substring(id.indexOf("_")+1);
	}
	if (sezione == "scommesse-lotterie") {
		$("#menu .nav_1st #scommesse").addClass("current");
	}
	if (sezione == "cucinablog") {
		$("#menu .nav_1st #cucina").addClass("current");
	}
	if ((sezione == "giochi")&&(sottosezione="default")) {
		$("#menu .nav_1st #giochi").removeClass("current");
		$("#menu .nav_1st #news").addClass("current");
	}
	else {
		$("#menu .nav_1st #"+sezione).addClass("current");
	}
	}
	// eccezione per economia che nelle pagine del fornitore non viene valorizzato l'id del menu di secondo livello
	if((window.location.href).indexOf("/azioni/xpisapi.dll") > -1) $(".nav_2nd").attr("id","menu_ecoborsa");
	if((window.location.href).indexOf("/fondi/Italiani/xpisapi.dll") > -1 || (window.location.href).indexOf("www.corriere.it/economia/fondi/") > -1) $(".nav_2nd").attr("id","menu_ecofondi");
	if((window.location.href).indexOf("www.corriere.it/economia/mutui/") > -1 || (window.location.href).indexOf("mutui.corriere.it") > -1) $(".nav_2nd").attr("id","menu_ecomutui");
	if((window.location.href).indexOf("http://forum.corriere.it/fisco_dintorni/") > -1 || (window.location.href).indexOf("http://www.corriere.it/economia/template_fisco.shtml") > -1) $(".nav_2nd").attr("id","menu_ecofisco");
	if ($(".nav_2nd").length > 0) {
		var subid = $(".nav_2nd").attr("id");
		var sottosezione=subid.substring(subid.indexOf("_")+1);
		$("#menu .nav_2nd #"+sottosezione).addClass("current");
		$('.nav_2nd li:last').css('background-image','none')
	}

	/*RIDUZIONE DELLA LUNGHEZZA DI UNA SQUADRA NEL TABELLINO DI SCOMMESSE IN PRIMO PIANO*/
		if($("#col-dx .tablequote-matchlist td.partita:contains('bayer leverkusen')").length > 0){
			var this_replace = $(".tablequote-matchlist td.partita:contains('bayer leverkusen')");
			$(this_replace).html(($(this_replace).html()).replace("bayer leverkusen","B Leverkusen"));
		}
	/*FINE RIDUZIONE DELLA LUNGHEZZA DI UNA SQUADRA NEL TABELLINO DI SCOMMESSE IN PRIMO PIANO*/

	if ($("#menu_sport").length > 0) {
		// seleziona il menu dal body cms sport
		// se siamo in tempo reale il controllo è sulla variabile id_c
		if((s.d.URL).indexOf("/sport/speciali/2010/tempo-reale/") > -1){
			if(s.getQueryParam("id_c") == "21"){
					$("#sottomenu_sport #seriea").addClass("current");
					$(".formichina li:eq(1)").after('<li class="root"><a href="/sport/speciali/2010/campionato/">Serie A</a><span> &gt; </span></li>');
				}
			else if(s.getQueryParam("id_c") == "105"){
					$("#sottomenu_sport #serieb").addClass("current");
					$(".formichina li:eq(1)").after('<li class="root"><a href="/sport/speciali/2010/campionato/serieb/risultati_classifiche/index.shtml">Serie B</a><span> &gt; </span></li>');
				}
			else {
					$("#sottomenu_sport #coppe").addClass("current");
					$(".formichina li:eq(1)").after('<li class="root"><a href="/sport/speciali/2010/coppe/">Coppe</a><span> &gt; </span></li>');
				}
		}
		else if ($("body").attr("class") != null) {

			var sportid = ($("body").attr("class")).split(" ")[0];
			var sportsezione=sportid.substring(sportid.indexOf("-")+1);
			$("#sottomenu_sport #"+sportsezione).addClass("current");

			if ($("body").attr("id") == "basket" && $("body").attr("class").indexOf("serie_a2m")>-1){
				$("#sottomenu_sport #legadue").addClass("current");
			} else if ($("body").attr("id") == "basket"){
				$("#sottomenu_sport #basket").addClass("current");
			}

			if (($("body").attr("class")).indexOf("sub-pallavolo")>-1 && ($("body").attr("class")).indexOf("serie_a2m")>-1){
				$("#sottomenu_sport #pallavolo").removeClass("current");
				$("#sottomenu_sport #pallavolo2").addClass("current");
			}

		}

		if ($("#sezione-speciale").length > 0 && $("#sezione-speciale").text() == "coppe") {
			$("#sottomenu_sport #coppe").addClass("current");
		} else if ($("#sezione-speciale").length > 0 && $("#sezione-speciale").text() == "campionato") {
			$("#sottomenu_sport #seriea").addClass("current");
		}
		else if ($(".sub-champions").length > 0 || $(".sub-coppa-italia").length > 0 || $(".sub-europa-league").length > 0 ) {
			$("#sottomenu_sport #coppe").addClass("current");
		}
		else if ($(".a2").length > 0  ) {
			$("#sottomenu_sport #pallavolo2").addClass("current");
			$("#sottomenu_sport #pallavolo").removeClass("current");
		}
	}


	checkCookieRCSlogin();
	
	$("#headBoxLogin a.headUsn").click(function(){
		$("#formModifica").submit();
		return false;
	});
	$("#headBoxLogin a.headLogout").click(function(event){
		event.preventDefault();	
		//$("#formLogout").submit();
		$.ajax({
		  type: "POST",
		  data: {contentPath : ""},
		  cache: false,
		  dataType: "html",
		  url: "http://www.corriere.it/corcommunity/accesso/LogOut.do",
		  success: function(data) {
			if((document.location.href).indexOf("ModificaRegistrazioneSkinoverlay.do") > -1){
				document.location = "/";
			}			  
			checkCookieRCSlogin();
		  },
		  error: function(data) {
			if((document.location.href).indexOf("ModificaRegistrazioneSkinoverlay.do") > -1){
				document.location = "/";
			}			  
			checkCookieRCSlogin();
		  } 		  
		});		
	});

	chkAccordionHP();
	
	lnk_rullo_notizie = $("#xml").attr('name');
	if($('#pane1').length > 0){
		getNews();
		setInterval ( getNews, 30000 );
	}
	getNewsEconomia();
	getNewsElezioni2009();
	getNewsvideochatCor();

	$('#sect_news1, #sect_news2, #sect_news3').removeClass('ui-tabs-hide');

	if (browser_user_ag == "iPad") {
		if($('#pane2, #pane3, #pane4').length > 0){
			$('#pane2, #pane3, #pane4').jScrollPane({showArrows:true,scrollbarWidth:18,dragMaxHeight:15});
		}
	} else {
		if($('#pane2, #pane3, #pane4').length > 0){
			$('#pane2, #pane3, #pane4').jScrollPane({showArrows:false,scrollbarWidth:18,dragMaxHeight:15});
		}
	}
	if($('#commenta-notizia').length > 0){
		$('#commenta-notizia').jScrollPane({showArrows:false,scrollbarWidth:18,dragMaxHeight:15});
	}

	$("#truschino > dd:first").slideDown("slow");

	$("#truschino > dt:first").attr("class","selected");

	$("#truschino > dt > a").mouseover(function(){

		if($(this).parent().attr("class")!="selected"){

			$("#truschino > dd:visible").slideUp("slow");

			$("#truschino > dt.selected").attr("class","");

			$(this).parent().next().slideDown("slow");

			$(this).parent().attr("class","selected");

			return false;

		}

	});

	$("#ascensore-sx > dd:first").slideDown("slow");

	$("#ascensore-sx > dt:first").attr("class","selected");

	$("#ascensore-sx > dt > a").hoverIntent({

		sensitivity:1,

		interval:120,

		over:function(){

			if($(this).parent().attr("class")!="selected"){

				$("#ascensore-sx > dd:visible").slideUp("slow");

				$("#ascensore-sx > dt.selected").attr("class","");

				$(this).parent().next().slideDown("slow");

				$(this).parent().attr("class","selected");

				return false;

			}

		},

		timeout:30,

		out:function(){}

	});

	$("#ascensore-dx > dd:first").slideDown("slow");

	$("#ascensore-dx > dt:first").attr("class","selected");

	$("#ascensore-dx > dt > a").hoverIntent({

		sensitivity:1,

		interval:120,

		over:function(){

			if($(this).parent().attr("class")!="selected"){

				$("#ascensore-dx > dd:visible").slideUp("slow");

				$("#ascensore-dx > dt.selected").attr("class","");

				$(this).parent().next().slideDown("slow");

				$(this).parent().attr("class","selected");

				return false;

			}

		},

		timeout:30,

		out:function(){}

	});

	$("#forum-blog-sx dt:nth("+parseInt(Math.random()*$("#forum-blog-sx dt").length)+")").addClass("default");

	$("#forum-blog-sx dt.default + dd").addClass("default");

	$("#forum-blog-dx dt:nth("+parseInt(Math.random()*$("#forum-blog-dx dt").length)+")").addClass("default");

	$("#forum-blog-dx dt.default + dd").addClass("default");

	$("#forum-blog-sx dt").mouseover(function(){

		mover=$(this).attr("id").substring(3);

	});

	if(eval($("#forum-blog-sx"))!=""){

		$("#forum-blog-sx > dd.default").slideDown("slow");

		$("#forum-blog-sx > dt.default").attr("class","selected");

		$("#forum-blog-sx > dt.selected").each(function(){

			def=$(this).attr("id").substring(3);

			$("#forum-blog-sx > dd.default").load("/includes2007/ssi/boxes/forum_e_blog/contents/"+def+".html");

		});

		$("#forum-blog-sx > dt > a").hoverIntent({

			sensitivity:1,

			interval:120,

			over:function(){

				if($(this).parent().attr("class")!="selected"){

					$("#forum-blog-sx > dd:visible").slideUp("slow");

					$("#forum-blog-sx > dt.selected").attr("class","");

					$(this).parent().next().slideDown("slow");

					$(this).parent().attr("class","selected");

					if($(this).parent().next().html()==""){

						$(this).parent().next().load("/includes2007/ssi/boxes/forum_e_blog/contents/"+mover+".html");

						return false;

					}

				}

			},

			timeout:30,

			out:function(){}

		});

	};

	$("#forum-blog-dx dt").mouseover(function(){

		mover=$(this).attr("id").substring(3);

	});

	if(eval($("#forum-blog-dx"))!=""){

		$("#forum-blog-dx > dd.default").slideDown("slow");

		$("#forum-blog-dx > dt.default").attr("class","selected");

		$("#forum-blog-dx > dt.selected").each(function(){

			def=$("dl#forum-blog-dx > dt.selected").attr("id").substring(3);

			$("#forum-blog-dx > dd.default").load("/includes2007/ssi/boxes/forum_e_blog/contents/"+def+".html");

		});

		$("#forum-blog-dx > dt > a").hoverIntent({

			sensitivity:1,

			interval:120,

			over:function(){

				if($(this).parent().attr("class")!="selected"){

					$("#forum-blog-dx > dd:visible").slideUp("slow");

					$("#forum-blog-dx > dt.selected").attr("class","");

					$(this).parent().next().slideDown("slow");

					$(this).parent().attr("class","selected");

					if($(this).parent().next().html()==""){

						$(this).parent().next().load("/includes2007/ssi/boxes/forum_e_blog/contents/"+mover+".html");

						return false;

					}

				}

			},

			timeout:30,

			out:function(){}

		});

	};

	$("#box-trovolavoro-casa-auto-cor > ul").tabs();
	$("#box-annunci > ul").tabs();

	/* tolgo il random che viene dato a tutti i tabs e forzo l'apertura sul primo */
	$("#box-invio-fotovideo > ul").tabs();
	$("#box-invio-fotovideo #ui-tabs-list").children().removeClass("ui-tabs-selected");
	$("#box-invio-fotovideo #ui-tabs-list li:first").addClass("ui-tabs-selected");
	$("#box-invio-fotovideo #section-2").css("display","none");
	$("#box-invio-fotovideo #section-1").css("display","block");


	$("#box-shopping > ul").tabs();

	$("#box-home-video > ul").tabs();

	$("#agenda_v10 > ul").tabs();

	$("#box-viaggi > ul").tabs();

	$("#box-viaggi-home-cor > ul").tabs({event: 'mouseover'});


	$("#box-viaggi-home-cor >ul >li >a").bind("click", function(){
		location.href = $("#" + $(this).attr("href").split("#")[1] + " a:first").attr("href");
		return false;
	});

	$("#box-tempo > ul").tabs();

	$("#box-dizionari > ul").tabs();

	$("#trovocinema-tabs > ul").tabs();

	$("#player_tabs > ul").tabs();
	$("#tabs_container > ul").tabs();

	$("#info_box_tabs > ul").tabs();

	$("#box-dizionari-compact > ul").tabs();

	$("#box-news > ul").tabs();

	$("#allwebsites").change(function(){

		var loc=$(this).attr("value");

		if(loc!=null){

			document.location.href=loc;

		}

	});

	var offset=0;

	var paginazione=5;

	var totale=$("#corriere-tv-mid ul.corriere-tv-bottom li").length;

	$("#corriere-tv-mid ul.corriere-tv-bottom li").slice(offset,offset+paginazione).show();

	$("#corriere-tv-mid ul.corriere-tv-bottom li:visible:last").addClass("last");

	$('#mycarousel-next').bind('click',function(){

		offset=offset+paginazione;

		if(offset+paginazione>totale){offset=totale-paginazione;}

		$("#corriere-tv-mid ul.corriere-tv-bottom li:visible").hide().removeAttr("class");

		$("#corriere-tv-mid ul.corriere-tv-bottom li").slice(offset,offset+paginazione).show();

		$("#corriere-tv-mid ul.corriere-tv-bottom li:visible:last").addClass("last");

		return false;

	});

	$('#mycarousel-prev').bind('click',function(){

		offset=offset-paginazione;

		if(offset<0){offset=0;}

		$("#corriere-tv-mid ul.corriere-tv-bottom li:visible").hide().removeAttr("class");

		$("#corriere-tv-mid ul.corriere-tv-bottom li").slice(offset,offset+paginazione).show();

		$("#corriere-tv-mid ul.corriere-tv-bottom li:visible:last").addClass("last");

		return false;

	});

	function Aggiorna_frecce(){

		var li_restanti_big=0;

		try{

			li_restanti_big=totale_big-offset_big;

		}

		catch(r){

			li_restanti_big=offset_big;

		}

		if(offset_big==0){

			$("#mycarousel-prev_new").css({

				cursor:"default",

				opacity:"0.5",

				filter:"alpha(opacity=50)"

			});

			if(totale_big>6){

				$("#mycarousel-next_new").css({

				cursor:"pointer"});

			}

			else{

				$("#mycarousel-next_new").css({

					cursor:"default",

					opacity:"0.5",

					filter:"alpha(opacity=50)"

				});

			}

		}

		else{

			$("#mycarousel-prev_new").css({cursor:"pointer"});

			$("#mycarousel-prev_img").attr("src","http://images.corriere.it/images/precedente_att.gif");

			if(li_restanti_big>6){

				$("#mycarousel-next_new").css({cursor:"pointer"});

			$("#mycarousel-next_img").attr("src","http://images.corriere.it/images/successive_att.gif");}

			else{

				$("#mycarousel-next_new").css({cursor:"default"});

			$("#mycarousel-next_img").attr("src","http://images.corriere.it/images/successive_dis.gif");}

		}

	}

	if($("#corriere-tv-mid_new").length!=0){

		var offset_big=0;

		var paginazione_big=6;

		var totale_big=$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li").length;

		Aggiorna_frecce();

		$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li").slice(offset_big,offset_big+paginazione_big).show();

		$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li:visible:last").addClass("last");

		$('#mycarousel-next_new').bind('click',function(){

			offset_big=offset_big+paginazione_big;

			if(offset_big+paginazione_big>totale_big){offset_big=totale_big-paginazione_big;}

			Aggiorna_frecce();

			$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");

			$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li").slice(offset_big,offset_big+paginazione_big).show();

			$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li:visible:last").addClass("last");

			return false;

		});

		$('#mycarousel-prev_new').bind('click',function(){

			offset_big=offset_big-paginazione_big;

			if(offset_big<0){offset_big=0;}

			Aggiorna_frecce();

			$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");

			$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li").slice(offset_big,offset_big+paginazione_big).show();

			$("#corriere-tv-mid_new ul.corriere-tv-bottom_new li:visible:last").addClass("last");

			return false;

	});}

	function Aggiorna_frecce_small(){

		var li_restanti_sm=0;

		try{

			li_restanti_sm=totale_sm-offset_sm;

		}

		catch(r){

			li_restanti_sm=offset_sm;

		}

		if(offset_sm==0){

			$("#mycarousel-prev_new").css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});

			if(totale_sm>4){

				$("#mycarousel-next_new").css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});

			}

			else{

				$("#mycarousel-next_new").css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});

			}

		}

		else{

			$("#mycarousel-prev_new").css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});

			if(li_restanti_sm>4){

				$("#mycarousel-next_new").css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});

			}

			else{

				$("#mycarousel-next_new").css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});

			}

		}

	}

	if($("#corriere-tv-mid_small").length!=0){

		var offset_sm=0;

		var paginazione_sm=4;

		var totale_sm=$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li").length;

		Aggiorna_frecce_small();

		$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li").slice(offset_sm,offset_sm+paginazione_sm).show();

		$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li:visible:last").addClass("last");

		$('#mycarousel-next_new').bind('click',function(){

			offset_sm=offset_sm+paginazione_sm;

			if(offset_sm+paginazione_sm>totale_sm){offset_sm=totale_sm-paginazione_sm;}

			Aggiorna_frecce_small();

			$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");

			$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li").slice(offset_sm,offset_sm+paginazione_sm).show();

			$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li:visible:last").addClass("last");

			return false;

		});

		$('#mycarousel-prev_new').bind('click',function(){

			offset_sm=offset_sm-paginazione_sm;

			if(offset_sm<0){offset_sm=0;}

			Aggiorna_frecce_small();

			$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");

			$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li").slice(offset_sm,offset_sm+paginazione_sm).show();

			$("#corriere-tv-mid_small ul.corriere-tv-bottom_new li:visible:last").addClass("last");

			return false;

		});

	}

	if($("#corriere-motori-mid_small").length!=0){

		var offset_sm=0;

		var paginazione_sm=4;

		var totale_sm=$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li").length;

		Aggiorna_frecce_small();

		$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li").slice(offset_sm,offset_sm+paginazione_sm).show();

		$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li:visible:last").addClass("last");

		$('#mycarousel-next_new').bind('click',function(){

			offset_sm=offset_sm+paginazione_sm;

			if(offset_sm+paginazione_sm>totale_sm){offset_sm=totale_sm-paginazione_sm;}

			Aggiorna_frecce_small();

			$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");

			$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li").slice(offset_sm,offset_sm+paginazione_sm).show();

			$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li:visible:last").addClass("last");

			return false;

		});

		$('#mycarousel-prev_new').bind('click',function(){

			offset_sm=offset_sm-paginazione_sm;

			if(offset_sm<0){offset_sm=0;}

			Aggiorna_frecce_small();

			$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");

			$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li").slice(offset_sm,offset_sm+paginazione_sm).show();

			$("#corriere-motori-mid_small ul.corriere-tv-bottom_new li:visible:last").addClass("last");

			return false;

		});

	}

	function Aggiorna_frecce_auto(tipo_vaschetta,num_elementi,id_frecce_prev,id_frecce_next){

		var li_restanti_sm_v=0;

		var li_restanti_sm_f=0;

		try{

			li_restanti_sm_v=totale_sm_v-offset_sm_v;

			li_restanti_sm_f=totale_sm_f-offset_sm_f;

}

catch(r){

	li_restanti_sm_v=offset_sm_v;

	li_restanti_sm_f=offset_sm_f;

}

if(tipo_vaschetta==0){

	if(offset_sm_v==0){

		$(id_frecce_prev).css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});

		if(totale_sm_v>num_elementi){

			$(id_frecce_next).css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});

		}

		else{

			$(id_frecce_next).css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});

		}

		}

		else{

			$(id_frecce_prev).css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});

			if(li_restanti_sm_v>num_elementi){

				$(id_frecce_next).css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});

			}

			else{

				$(id_frecce_next).css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});

			}

		}

}

if(tipo_vaschetta==1){

	if(offset_sm_f==0){

		$(id_frecce_prev).css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});

		if(totale_sm_f>num_elementi){

			$(id_frecce_next).css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});

		}

		else{

			$(id_frecce_next).css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});

		}

	}

	else{

		$(id_frecce_prev).css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});

		if(li_restanti_sm_f>num_elementi){

			$(id_frecce_next).css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});

		}

		else{

			$(id_frecce_next).css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});

		}

	}

}

}

if($("#corriere-motori-slim-slv").length!=0){

	var id_button_prev_v="#mycarousel-prev_slv";

	var id_button_next_v="#mycarousel-next_slv";

	var offset_sm_v=0;

	var paginazione_sm_v=6;

	var totale_sm_v=$("#corriere-motori-slim-slv ul.corriere-tv-bottom_new li").length;

	Aggiorna_frecce_auto(0,paginazione_sm_v,id_button_prev_v,id_button_next_v);

	$("#corriere-motori-slim-slv ul.corriere-tv-bottom_new li").slice(offset_sm_v,offset_sm_v+paginazione_sm_v).show();

	$("#corriere-motori-slim-slv ul.corriere-tv-bottom_new li:visible:last").addClass("last");

	carica_title_video();

	$('#mycarousel-next_slv').bind('click',function(){

		offset_sm_v=offset_sm_v+paginazione_sm_v;

		if(offset_sm_v+paginazione_sm_v>totale_sm_v){offset_sm_v=totale_sm_v-paginazione_sm_v;}

		Aggiorna_frecce_auto(0,paginazione_sm_v,id_button_prev_v,id_button_next_v);

		$("#corriere-motori-slim-slv ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");

		$("#corriere-motori-slim-slv ul.corriere-tv-bottom_new li").slice(offset_sm_v,offset_sm_v+paginazione_sm_v).show();

		$("#corriere-motori-slim-slv ul.corriere-tv-bottom_new li:visible:last").addClass("last");

		carica_title_video();

		return false;

	});

	$('#mycarousel-prev_slv').bind('click',function(){

		offset_sm_v=offset_sm_v-paginazione_sm_v;

		if(offset_sm_v<0){offset_sm_v=0;}

		Aggiorna_frecce_auto(0,paginazione_sm_v,id_button_prev_v,id_button_next_v);

		$("#corriere-motori-slim-slv ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");

		$("#corriere-motori-slim-slv ul.corriere-tv-bottom_new li").slice(offset_sm_v,offset_sm_v+paginazione_sm_v).show();

		$("#corriere-motori-slim-slv ul.corriere-tv-bottom_new li:visible:last").addClass("last");

		carica_title_video();

		return false;

	});

}

function carica_title_foto(){

	var img_src_motori=$("#corriere-motori-slim-slf ul.corriere-tv-bottom_new li:visible img");

	for(var i_motori=0;i_motori<img_src_motori.length;i_motori++){

		var arg_motori=img_src_motori[i_motori];

		$(arg_motori).attr("src",$(arg_motori).attr("title"));

	}

}

function carica_title_video(){

	var img_src_motori=$("#corriere-motori-slim-slv ul.corriere-tv-bottom_new li:visible img");

	for(var i_motori=0;i_motori<img_src_motori.length;i_motori++){

		var arg_motori=img_src_motori[i_motori];

		$(arg_motori).attr("src",$(arg_motori).attr("title"));

	}

}

if($("#corriere-motori-slim-slf").length!=0){

	var id_button_prev_f="#mycarousel-prev_slf";

	var id_button_next_f="#mycarousel-next_slf";

	var offset_sm_f=0;

	var paginazione_sm_f=6;

	var totale_sm_f=$("#corriere-motori-slim-slf ul.corriere-tv-bottom_new li").length;

	Aggiorna_frecce_auto(1,paginazione_sm_f,id_button_prev_f,id_button_next_f);

	$("#corriere-motori-slim-slf ul.corriere-tv-bottom_new li").slice(offset_sm_f,offset_sm_f+paginazione_sm_f).show();

	$("#corriere-motori-slim-slf ul.corriere-tv-bottom_new li:visible:last").addClass("last");

	carica_title_foto();

	$('#mycarousel-next_slf').bind('click',function(){

		offset_sm_f=offset_sm_f+paginazione_sm_f;

		if(offset_sm_f+paginazione_sm_f>totale_sm_f){offset_sm_f=totale_sm_f-paginazione_sm_f;}

		Aggiorna_frecce_auto(1,paginazione_sm_f,id_button_prev_f,id_button_next_f);

		$("#corriere-motori-slim-slf ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");

		$("#corriere-motori-slim-slf ul.corriere-tv-bottom_new li").slice(offset_sm_f,offset_sm_f+paginazione_sm_f).show();

		$("#corriere-motori-slim-slf ul.corriere-tv-bottom_new li:visible:last").addClass("last");

		carica_title_foto();

		return false;

	});

	$('#mycarousel-prev_slf').bind('click',function(){

		offset_sm_f=offset_sm_f-paginazione_sm_f;

		if(offset_sm_f<0){offset_sm_f=0;}

		Aggiorna_frecce_auto(1,paginazione_sm_f,id_button_prev_f,id_button_next_f);

		$("#corriere-motori-slim-slf ul.corriere-tv-bottom_new li:visible").hide().removeAttr("class");

		$("#corriere-motori-slim-slf ul.corriere-tv-bottom_new li").slice(offset_sm_f,offset_sm_f+paginazione_sm_f).show();

		$("#corriere-motori-slim-slf ul.corriere-tv-bottom_new li:visible:last").addClass("last");

		carica_title_foto();

		return false;

	});

}

function Aggiorna_frecce_small(){

	var li_restanti_sm=0;

	try{

		li_restanti_sm=totale_sm-offset_sm;

	}

	catch(r){

		li_restanti_sm=offset_sm;

	}

	if(offset_sm==0){

		$("#mycarousel-prev_new").css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});

		if(totale_sm>3){

			$("#mycarousel-next_new").css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});

		}

		else{

			$("#mycarousel-next_new").css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});

		}

	}

	else{

		$("#mycarousel-prev_new").css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});

		if(li_restanti_sm>3){

			$("#mycarousel-next_new").css({cursor:"pointer",opacity:"1",filter:"alpha(opacity=100)"});

		}

		else{

			$("#mycarousel-next_new").css({cursor:"default",opacity:"0.50",filter:"alpha(opacity=50)"});

		}

	}

}

if($("#vaschetta-ibm").length!=0){

	var offset_sm=0;

	var paginazione_sm=3;

	var totale_sm=$("#vaschetta-ibm ul.vaschetta-ibm-bottom li").length;

	Aggiorna_frecce_small();

	$("#vaschetta-ibm ul.vaschetta-ibm-bottom li").slice(offset_sm,offset_sm+paginazione_sm).show();

	$("#vaschetta-ibm ul.vaschetta-ibm-bottom li:visible:last").addClass("last");

	$('#mycarousel-next_new').bind('click',function(){

		offset_sm=offset_sm+paginazione_sm;

		if(offset_sm+paginazione_sm>totale_sm){offset_sm=totale_sm-paginazione_sm;}

		Aggiorna_frecce_small();

		$("#vaschetta-ibm ul.vaschetta-ibm-bottom li:visible").hide().removeAttr("class");

		$("#vaschetta-ibm ul.vaschetta-ibm-bottom li").slice(offset_sm,offset_sm+paginazione_sm).show();

		$("#vaschetta-ibm ul.vaschetta-ibm-bottom li:visible:last").addClass("last");

		return false;

	});

	$('#mycarousel-prev_new').bind('click',function(){

		offset_sm=offset_sm-paginazione_sm;

		if(offset_sm<0){offset_sm=0;}

		Aggiorna_frecce_small();

		$("#vaschetta-ibm ul.vaschetta-ibm-bottom li:visible").hide().removeAttr("class");

		$("#vaschetta-ibm ul.vaschetta-ibm-bottom li").slice(offset_sm,offset_sm+paginazione_sm).show();

		$("#vaschetta-ibm ul.vaschetta-ibm-bottom li:visible:last").addClass("last");

		return false;

	});

}

var d=$("#media-daytop ul").attr("class");

$("#ctv-"+d).addClass("active");
if(d != "video") $("#media-daytop .go-ctv,#media-daytop .go-ctv-new").addClass("hide");

$("#media-daytop ul li").click(function(){

	$("#media-daytop .go-ctv,#media-daytop .go-ctv-new").addClass("hide");

	var sel=$(this).attr("id").substring(4);

	$("#media-daytop ul li").removeClass("active");

	$(this).addClass("active");

	$("#media-daytop .cap, #media-daytop .preview").addClass("hide");

	$("#"+sel+"top-caption, #daily-"+sel).removeClass("hide");

	if(sel=="video"){

		$("#media-daytop .go-ctv,#media-daytop .go-ctv-new").removeClass("hide");

	}

	return false;

});

if($("#article_sh_box").length > 0){
	$("#smaller-text, #smaller-text-bt").click(function(){
		var size=parseInt($("#content-to-read").css("font-size"))-2+"px";
		if(parseInt(size)>=10){
			$("#content-to-read").css("font-size",size);
		}
		return false;
	});
	$("#bigger-text, #bigger-text-bt").click(function(){
		var size=parseInt($("#content-to-read").css("font-size"))+2+"px";
		if(parseInt(size)<26){
			$("#content-to-read").css("font-size",size);
		}
		return false;
	});
	$("#send-mail-bt").click(function(){
		sendArticleToMail();		
		return false;
	});	
}
else {
	$("#smaller-text, #smaller-text-bt").click(function(){
		var size=parseInt($(".article p").css("font-size"))-2+"px";
		if(parseInt(size)>=10){
			$(".article p").css("font-size",size);
		}
		return false;
	});
	$("#bigger-text, #bigger-text-bt").click(function(){
		var size=parseInt($(".article p").css("font-size"))+2+"px";
		if(parseInt(size)<26){
			$(".article p").css("font-size",size);
		}
		return false;
	});	
}
/* nuova pagina multimedia */
if ($("#article-multimedia").length > 0){
	$("#article-multimedia .open-widget-video").click(function () {
		$("#article-multimedia .container-video-player").html("");
		$("#article-multimedia .video-wrapper").removeClass("video-wrapper-open");
		var wrapperDiv = $(this).parents("div.multimedia-wrapper");
		var wrapperVideo = $(wrapperDiv).find("div.container-video-player");
		var wrapperVideoPath = $(wrapperVideo).attr("rel");
		$(wrapperDiv).addClass("video-wrapper-open");
		$.ajax({
			type: "GET",
			url: "/linked_webroots/video.corriere.it/widget/players/shtml/PolymediaCorriere620ajax.shtml?"+wrapperVideoPath+"&autoplay=true&playlistorder=dateDesc&",
			dataType: "html",
			success: function(data) {
				setTimeout(function() {$(wrapperVideo).writeCapture().html(data);},2000);
			}	
		})
		return false;
	});
	
	if ($("#article-multimedia .multimedia-wrapper:first").hasClass("video-wrapper")){
   		$("#article-multimedia .multimedia-wrapper:first").find(".open-widget-video").click();
	}	
	$.writeCapture.autoAsync();
}

$("#form-sondaggio > button[type='button']").click(function(){

	var url=$("#form-sondaggio").attr("action");

	var destinaz=url.indexOf('/appsSondaggi/pages/corriere/d_')+31;

	var id_sond=url.substring(destinaz,destinaz+4);

	location="http://www.corriere.it/appsSondaggi/votazioneDispatch.do?method=risultati&idSondaggio="+id_sond;

});

/*
$("#searchtool").submit(function(){

	var search=$.trim($("#searchtool > #search_val").attr("value"));

	if(search.length==0){

		alert("Inserire un criterio di ricerca");

		return false;

	}

	return true;

});
*/
try {
	$("#col-sx table[width='95%']").addClass("clear");
} catch (e) {}


$("#box-trovolavoro-casa-auto-cor a.tab-casa").click(function(){

	initForm();

	viewField();

});

$('#col-sx div.article ul.toolbar li.macro-section').click(function(){

	if($("#col-sx div.article ul.toolbar li.macro-section a").attr('href')){

		window.location.href=$("#col-sx div.article ul.toolbar li.macro-section a").attr('href')

	}

});

if(($.browser.mozilla)||($.browser.opera)){

}else{

	$("ul.italiaoggi li:last").css({backgroundImage:"none"});

}

$("div#col-sx > a > img:first").addClass("pushbar-bare-img");

if(($.browser.msie)&&((navigator.userAgent.indexOf("MSIE 6.0")!=-1))){

	$("#main").removeClass("clearfix").addClass("clearfix");

}

var nuova_finestra=null;

function closeWin(){

	if(nuova_finestra!=null){

		if(!nuova_finestra.closed)

			nuova_finestra.close();

	}

}

function popUpWin(url,type,strWidth,strHeight){

	closeWin();

	type=type.toLowerCase();

	if(type=="full-screen"){

		strWidth=screen.availWidth;

		strHeight=screen.availHeight;

	}

	var tools="";

	if(type=="standard")tools="resizable,toolbar=yes,location=yes,scrollbars=yes,menubar=yes,width="+strWidth+",height="+strHeight+",top=0,left=0";

	if(type=="console"||type=="fullscreen")tools="resizable,toolbar=no,location=no,scrollbars=yes,width="+strWidth+",height="+strHeight+",left=0,top=0";

	nuova_finestra=window.open(url,'nuova_finestra',tools);

	nuova_finestra.focus();

}

$("a[rel*=popup]")

.click(function(){

	var t="standard";

	var w="780";

	var h="580";

	attribs=$(this).attr("rel").split(" ");

	if(attribs[1]!=null){t=attribs[1];}

	if(attribs[2]!=null){w=attribs[2];}

	if(attribs[3]!=null){h=attribs[3];}

	popUpWin($(this).attr("href"),t,w,h);

	return false;

})

.each(function(){

	if($(this).attr("rel").indexOf("noicon")==-1){

		$(this).addClass("new-window").attr("title",$(this).attr("title")+"  [Apre una nuova finestra]");

	}

});

$("#box-annunci").css("display","block");

$("a[rel*=expand_li]")
	.each(function() {
		var destinazioneLink = $(this).attr("href");
		var target_var = $(this).attr("target");
		var cliccato=0;
		$(this).unbind("click").click(function() {
                                       cliccato=1;
			})
			.parents("li:eq(0)")
			.unbind("click")
			.click( function() {
				if(cliccato==0){
					if(target_var=="_blank") window.open(destinazioneLink,'sponsor');
					else window.location = destinazioneLink;
				}
				cliccato=0;
			})
			.hover(function () {
				$(this).css({cursor: "pointer"});
			}, function () {
				$(this).css({cursor: "default"});
		});
});


});
	var lnk_rullo_notizie ="";
function getNews(){
	if(lnk_rullo_notizie == "news_lifegate.xml"){
		$.ajax({
			type:"GET",
			url:"/notizie-ultima-ora/"+lnk_rullo_notizie,
			dataType:"xml",
			success:function(xml){
				var testo="";
				if($(xml).find('notizia').length > 0){
					$(xml).find('notizia').each(function(){
						var id_text=$(this).attr('id')
						var titolo_text=$(this).find('titolo').text()
						var data_text=$(this).find('data').text()
						var url_text=$(this).find('url').text()
						var section_text=$(this).find('categoria').text()
						var ora_text=$(this).find('ora').text()
						testo+='<li class="nota-flash">';
						testo+='<a href="http://www.corriere.it'+url_text+'"><span class="dot-flash"></span>';
						testo+='<span class="testo-flash">'+titolo_text+'</span>';
						testo+='</a>'
						testo+='</li>'
					});
					$('#pane1 > ul').remove();
					$('#pane1').append($('<ul></ul>').html(testo)).jScrollPane({showArrows:false,scrollbarWidth:18,dragMaxHeight:15});
					if(($.browser.msie)&&((navigator.userAgent.indexOf("Windows NT 5.0")!=-1)||(navigator.userAgent.indexOf("Windows NT 5.01")!=-1))){
						$("#main").removeClass("clearfix").addClass("clearfix");
					}
				}
			}
		});
	} else if(lnk_rullo_notizie){
		$.ajax({
			type:"GET",
			url:"/notizie-ultima-ora/"+lnk_rullo_notizie,
			dataType:"xml",
			success:function(xml){
				var testo="";
				if($(xml).find('notizia').length > 0){
					$(xml).find('notizia').each(function(){
						var id_text=$(this).attr('id')
						var titolo_text=$(this).find('titolo').text()
						var data_text=$(this).find('data').text()
						var url_text=$(this).find('url').text()
						var section_text=$(this).find('categoria').text()
						var ora_text=$(this).find('ora').text()
						testo+='<li class="nota-flash">';
						testo+='<a href="http://www.corriere.it'+url_text+'"><span class="time-flash">'+ora_text+'</span>&nbsp;|&nbsp;';
						testo+='<span class="testo-flash">'+titolo_text+'</span>';
						testo+='</a>'
						testo+='</li>'
					});
					$('#pane1 > ul').remove();
					$('#pane1').append($('<ul></ul>').html(testo)).jScrollPane({showArrows:false,scrollbarWidth:18,dragMaxHeight:15});
					if(($.browser.msie)&&((navigator.userAgent.indexOf("Windows NT 5.0")!=-1)||(navigator.userAgent.indexOf("Windows NT 5.01")!=-1))){
						$("#main").removeClass("clearfix").addClass("clearfix");
					}
				} else {
				  lnk_rullo_notizie = "news_hp_corsera.xml";
				  getNews();
        		}
			}
		});

	}
}

//news dichiarazione redditi
  function getNewsEconomia(){

	var lnk=$("#newseconomia").attr('name');
	if(lnk){
		$.ajax({
			type:"GET",
			url:"/economia/dichiarazione_redditi/"+lnk,
			dataType:"xml",
			success:function(xml){
				var testo="";

				$(xml).find('DOC').each(function(){

					var url_text=$(this).find('ALLEGATO').attr('href');
					var estensione=$(this).find('ALLEGATO').attr('tipofile');
					var section_text=$(this).find('categoria').text()
					var ora_text=$(this).find('ora').text()
					var titolo=$(this).find('TITOLO').text()
					var fonte=$(this).find('FONTE').text()
					var data=$(this).find('VISIBILE_DA').text()

					testo+='<li class="nota-flash">';
					testo+='<img src="/economia/dichiarazione_redditi/'+estensione+'.gif" /><a href="/Primo_Piano/Economia/ipsoa/2009/'+estensione+'/'+url_text+'" target="_blank"><span class="time-flash">'+data+'</span></a>&nbsp;|&nbsp;';
					testo+='<a href="/Primo_Piano/Economia/ipsoa/2009/'+estensione+'/'+url_text+'" target="_blank"><span class="luogo-flash">'+titolo+' |</span></a>';
					testo+='<span class="testo-flash">'+fonte+'</span>';
					testo+='</li>'

				});

				$('#pane1 > ul').remove();

				$('#pane1').append($('<ul></ul>').html(testo)).jScrollPane({showArrows:false,scrollbarWidth:18,dragMaxHeight:15});

				if(($.browser.msie)&&((navigator.userAgent.indexOf("Windows NT 5.0")!=-1)||(navigator.userAgent.indexOf("Windows NT 5.01")!=-1))){

					$("#main").removeClass("clearfix").addClass("clearfix");
				}
			}
		});
		var newsTimeout=setTimeout(getNewsEconomia,30000);
	}
}


//news elezioni 2009
  function getNewsElezioni2009(){
	var lnk=$("#elezioni2009").attr('name');
	if(lnk){
		$.ajax({
			type:"GET",
				url:"http://videochat.corriere.it/new/notizie-ultima-ora/"+lnk,
			dataType:"xml",
			success:function(xml){
				var testo="";
				$(xml).find('notizia').each(function(){

					var url_text=$(this).find('url').text()
					var ora_text=$(this).find('ora').text()
					var titolo=$(this).find('titolo').text()
					var section_text=$(this).find('testo').text()

					//var ora=ora_text.substring(ora_text.indexOf('2009',0)+4,ora_text.length-9);
					var section_text=section_text.substring(0,150) +"...";

					testo+='<li class="nota-flash">';
					testo+='<span class="time-flash">'+ora_text+'</span>&nbsp;<a href="http://www.corriere.it'+url_text+'" target="_blank"><span class="luogo-flash">'+titolo+'</span></a>';
					testo+='<br/>'
					//testo+='<a href="'+url_text+'" target="_blank"><span class="testo-flash">'+section_text+'</span></a>';
					testo+='</li>'
				});
				$('#pane1 > ul').remove();
				$('#pane1').append($('<ul></ul>').html(testo)).jScrollPane({showArrows:false,scrollbarWidth:10,dragMaxHeight:15});
				if(($.browser.msie)&&((navigator.userAgent.indexOf("Windows NT 5.0")!=-1)||(navigator.userAgent.indexOf("Windows NT 5.01")!=-1))){
					$("#main").removeClass("clearfix").addClass("clearfix");
				}
			}
		});
		var newsTimeout=setTimeout(getNewsElezioni2009,30000);
	}

}

function mcNews(id){

	document.location.href="http://www.corriere.it"+id;

}

function mcPiuVisti(pathURL){

	document.location.href=""+pathURL;

}

function mcPiuCommentati(pathURL){

	document.location.href=""+pathURL;

}

function allNews(id){

	document.location.href="/notizie-ultima-ora/index.shtml";

}


//news videochat corriere
  function getNewsvideochatCor(){
	var lnk=$("#videochatCor").attr('name');
	if(lnk){
		$.ajax({
			type:"GET",
			url:"/notizie-ultima-ora/"+lnk,
			dataType:"xml",
			success:function(xml){
				var testo="";
				$(xml).find('notizia').each(function(){

					var url_text=$(this).find('url').text()
					var ora_text=$(this).find('ora').text()
					var titolo=$(this).find('titolo').text()
					var section_text=$(this).find('testo').text()

					//var ora=ora_text.substring(ora_text.indexOf('2009',0)+4,ora_text.length-9);
					var section_text=section_text.substring(0,150) +"...";

					testo+='<li class="nota-flash">';
					testo+='<span class="time-flash">'+ora_text+'</span>&nbsp;<a href="http://www.corriere.it'+url_text+'" target="_blank"><span class="luogo-flash">'+titolo+'</span></a>';
					testo+='<br/>'
					//testo+='<a href="'+url_text+'" target="_blank"><span class="testo-flash">'+section_text+'</span></a>';
					testo+='</li>'
				});
				$('#pane1 > ul').remove();
				$('#pane1').append($('<ul></ul>').html(testo)).jScrollPane({showArrows:false,scrollbarWidth:10,dragMaxHeight:15});
				if(($.browser.msie)&&((navigator.userAgent.indexOf("Windows NT 5.0")!=-1)||(navigator.userAgent.indexOf("Windows NT 5.01")!=-1))){
					$("#main").removeClass("clearfix").addClass("clearfix");
				}
			}
		});
		var newsTimeout=setTimeout(getNewsvideochatCor,30000);
	}

}

function mcNews(id){

	document.location.href="http://www.corriere.it"+id;

}

function mcPiuVisti(pathURL){

	document.location.href=""+pathURL;

}

function mcPiuCommentati(pathURL){

	document.location.href=""+pathURL;

}

function allNews(id){

	document.location.href="/notizie-ultima-ora/index.shtml";

}




search="rcsLogin=";

function verificaPWD(){

	if(document.invioPasswordForm.femail.value==""){

		alert("Inserire l'indirizzo email");

		return false;

	}

	return true;

}

function submitPWD(){

	if(verificaPWD())

		document.invioPasswordForm.submit();

}

function goSubmit(){

	document.utenteAnagFormBean.submit();

}

function popupPassword(url){

	window.open(url,"","toolbar=no,width=380,height=240,top=50,left=50,directories=no,status=no,statusbar=no,resizable=1,menubar=no,scrollbars=no");

}

function Popup2(url){

	window.open(url,"","toolbar=no,width=380,height=240,top=50,left=50,directories=no,status=no,statusbar=no,resizable=1,menubar=no,scrollbars=no");

}

function modifica(){

	document.modifica.submit();

}

function logout(){

	document.logout.submit();

}

function verifica(){

	document.login.url.value=document.location.href;

	if(document.login.username.value==""||document.login.password.value==""){

		alert("Impostare Username e Password");

		return false;

	}

	return true;

}

function logon(urlKo){

	document.login.username.value=document.loginFormBean.username.value;

	document.login.password.value=document.loginFormBean.password.value;

	document.login.urlKo.value=urlKo

	document.login.submit();

}

function submitNickname(){

	document.utenteFormBean.submit();

}

function iscrizione(){

	document.iscrizione.url.value=document.location.href;

	document.iscrizione.submit();

}

function getLoginValue(){

	var value="notFound";

	if(document.cookie.length>0){

		offset=document.cookie.indexOf(search);

		if(offset!=-1)

		{

			offset+=search.length;

			end=document.cookie.indexOf(";",offset);

			if(end==-1)

				end=document.cookie.length;

			value=document.cookie.substring(offset,end);

			if(value.indexOf("|")>-1)

				value=value.substring(0,value.indexOf("|"));

		}

	}

	return value;

}

function getIsLoginValid(){

	var value=getLoginValue();

	if(value=="notValid")

		return false;

	else

		return true;

}

function getIsCookieValid(){

	var value=""+getLoginValue();

	if(value=="notFound"||value=="undefined"||value=="notValid"){

		return false;

	}else{

		return true;

	}

}

function verifica(){

	if(document.login.username.value==""||document.login.password.value==""){

		alert("Impostare Username e Password");

		return false;

	}

	return true;

}

function formLogin(url,operation){

	document.write('<form name="login" method="post" action="http://www.corriere.it/corcommunity/accesso/VerificaLogIn.do" onsubmit="return verifica();">');

	document.write('<input type="hidden" name="contentPath" value="'+url+'">');

	document.write('<input type="hidden" name="urlKo" value="">');

	document.write('<input type="hidden" name="username">');

	document.write('<input type="hidden" name="password">');

	document.write('</form>');

}

function formLogout(){

	document.write('<form name="logout" method="post" action="http://www.corriere.it/corcommunity/accesso/LogOut.do" onsubmit="return verifica();">');

	document.write('<input type="hidden" name="contentPath" value="">');

	document.write('</form>');

}

function formModifica(){

	document.write('<form name="modifica" method="post" action="http://www.corriere.it/corcommunity/accesso/ModificaRegistrazioneSkinoverlay.do">');

	document.write('</form>');

}

function galleria(path,n_galleria){

	pathcompleta="/speciali/"+path+"/galleria/sopra.html?"+n_galleria;

	path_sin="/speciali/popup/foto.html";

	path_des="/speciali/popup/vuoto.html";

	newWin=open("","","menubar=no,location=no,toolbar=yes,status=no,scrollbars=yes,resizable=no,width=680,height=480");

	newWin.document.write('<html><head><title>Galleria di immagini</title>');

	newWin.document.write('</head>');

	newWin.document.write('<frameset rows="45,*" border="0" frameborder="NO" framespacing="0">');

	newWin.document.write('<frame src="'+pathcompleta+'" name="sopra" scrolling="NO" marginheight="5" marginwidth="5">');

	newWin.document.write('<frameset cols="120,*" border="0" frameborder="NO" framespacing="0">');

	newWin.document.write('<frame src="'+path_sin+'" name="sin">');

	newWin.document.write('<frame src="'+path_des+'" name="des">');

	newWin.document.write('</frameset></frameset>');

	newWin.document.write('<noframes><body>Per visualizzare questa pagina &egrave; necessario un browser che supporti i frames</body></noframes>');

	newWin.document.write('</html>');

}

function apriInviaPost(miourl){

	var miourl_s=miourl.split("&");

	var loc="";

	for(i in miourl_s)

		loc+=miourl_s[i]+"!*";

	loc=loc.substr(0,loc.length-2)

	tit=document.title

	prop="menubar=no,status=no,titlebar=no,toolbar=no,width=450,height=450,scrollbars=yes"

	window.open("http://www.corriere.it/cf/tellafriend/form.cfm?rr="+loc+"&tit="+tit,"InviaPagina",prop);

}

function apriInviaPagina(){

	var miourl=window.location.href;

	var miourl_s=miourl.split("&");

	var loc="";

	for(i in miourl_s)

		loc+=miourl_s[i]+"!*";

	loc=loc.substr(0,loc.length-2)

	tit=document.title

	prop="menubar=no,status=no,titlebar=no,toolbar=no,width=450,height=500,scrollbars=no"

	window.open("http://www.corriere.it/smallApp/tellafriend/form.shtml?rr="+loc+"&tit="+tit,"InviaPagina",prop);

}

function apriPermalinkPagina(){

	var ref=window.location.href;

	prop="menubar=no,status=no,titlebar=no,toolbar=no,width=450,height=450,scrollbars=yes"

	window.open("http://www.corriere.it/tools/includes/permalink.shtml?rr2="+ref,"PermalinkPagina",prop);

}

function galleriaN(str,str2){

	var larghezza=screen.availWidth;

	if(larghezza>=1024){

		window.open('http://www.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=670,status=no');

	}else{

		window.open('http://www.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=540,status=no');

	}

}

function getCookieP(key)
{
	return key.toString();
}
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

function setCookieP(key, val)
{
    if (key)
    {
        var date = new Date();

            // expires in 2 hours
            date.setTime(date.getTime() + 2*(60*60*1000));
            document.cookie = key + "=" + val + "; expires=" + date.toGMTString();


    }
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

// FINE COOKIE VIDEO PLAYER AKAMAI

function init() {



if (!document.getElementById) return

var imgOriginSrc;

var imgTemp = new Array();

var imgarr = document.getElementsByTagName('img');

for (var i = 0; i < imgarr.length; i++) {

if (imgarr[i].getAttribute('hsrc')) {

imgTemp[i] = new Image();

imgTemp[i].src = imgarr[i].getAttribute('hsrc');

imgarr[i].onmouseover = function() {

imgOriginSrc = this.getAttribute('src');

this.setAttribute('src',this.getAttribute('hsrc'))

}

imgarr[i].onmouseout = function() {

this.setAttribute('src',imgOriginSrc)

}

}

}

}

// onload=init;



function addLoadEvent(func) {

      var oldonload = window.onload;

      if (typeof window.onload != 'function') {

	      window.onload = func;

      } else {

		  window.onload = function() {

			  oldonload();

			  func();

		  }

	  }

}



addLoadEvent(init);





function Calendario(xlink){

	window.open('/Speciali/Politica/Calendario/Calendario.shtml?/Speciali/Politica/Calendario/'+xlink+'index.shtml','pp','width=750,height=520');void(0);

}

function pr99(rif){

	var largh=295;

	var hpos=screen.width-largh-20;

	var vpos=0;

	if(rif==undefined)rif='';

	mywindow=window.open('http://www.rtsi.ch/iraq/miniplayer.cfm?rif='+rif,'miniplayer','resizable=no,width=295,height=550,left='+hpos+',top=8,screenX=0,screenY=0');

}

function openlink(xlink){

	window.open("/openxlink.shtml?"+xlink,"xpage");

}

function openlink2(xlink){

	window.open("http://www.corriere.it/openxlink.shtml?"+xlink,"xpage");

}

function pr1(filename){window.open(filename,'Test1','menubar=no,location=no,toolbar=no,status=no,scrollbars=yes,resizable=no,width=730,height=540')

}

function pr2(filename){window.open(filename,'','menubar=yes,location=no,toolbar=no,status=no,scrollbars=yes,resizable=no,width=450,height=480')}

function pr3(filename){window.open(filename,'','menubar=yes,location=yes,toolbar=no,status=no,scrollbars=yes,resizable=no,width=400,height=420')}

function pr5(nomefile,larghezza,altezza){

	parametri="menubar=no,location=no,toolbar=no,status=no,scrollbars=no,resizable=no,width=";

	parametri=parametri+larghezza+",height="+altezza;

	newWin=open('','',parametri);

	newWin.location.href=nomefile;

}

function pr6(nomefile,larghezza,altezza){

	var pathToRemove="/Corriere della Sera";

	var lenPathToRemove=pathToRemove.length;

	if(nomefile.indexOf(pathToRemove)>-1)nomefile=nomefile.substring(lenPathToRemove);

	if(nomefile.indexOf(".xml")>-1)nomefile=nomefile.substring(0,nomefile.indexOf(".xml"))+".shtml";

	parametri="menubar=no,location=no,toolbar=no,status=no,scrollbars=yes,resizable=no,width=";

	parametri=parametri+larghezza+",height="+altezza;

	newWin=open('','',parametri);

	newWin.location.href=nomefile;

}

function pr7(nomefile,larghezza,altezza){

	var pathToRemove="/Corriere della Sera";

	var lenPathToRemove=pathToRemove.length;

	if(nomefile.indexOf(pathToRemove)>-1)nomefile=nomefile.substring(lenPathToRemove);

	if(nomefile.indexOf(".xml")>-1)nomefile=nomefile.substring(0,nomefile.indexOf(".xml"))+".shtml";

	parametri="menubar=no,location=no,toolbar=no,status=no,scrollbars=no,resizable=no,width=";

	parametri=parametri+larghezza+",height="+altezza;

	newWin=open('','',parametri);

	newWin.location.href=nomefile;

}


/*FUNZIONE POP UP UNIVERSALE*/

function pr4(nomefile,larghezza,altezza) {

if (nomefile.indexOf("/Corriere della Sera") > -1)

{

	pathToRemove = "/Corriere della Sera";

    urlPrefix = "http://www.corriere.it";

}



if (nomefile.indexOf("/Corriere della Sera") == -1)

{

	pathToRemove = "";

    urlPrefix = "";

}

if (nomefile.indexOf("/Roma/") > -1)

{


	 pathToRemove = "/Roma";

    urlPrefix = "http://roma.corriere.it";

}

if (nomefile.indexOf("/ViviMilano") > -1)

{

	pathToRemove = "/ViviMilano";

	urlPrefix = "";

}



var lenPathToRemove = pathToRemove.length;

if (nomefile.indexOf(pathToRemove) > -1) nomefile = nomefile.substring(lenPathToRemove);

if (nomefile.indexOf(".xml") > -1)  nomefile = nomefile.substring(0, nomefile.indexOf(".xml")) + ".shtml";

                parametri="menubar=no,location=yes,toolbar=yes,status=no,scrollbars=yes,resizable=yes,width=";

                parametri=parametri+larghezza+",height="+altezza;

                newWin=open('','',parametri);

                newWin.location.href=urlPrefix+nomefile;

}



function gall(str){

	finestra=window.open('http://www.corriere.it/gallery/'+str+'/?1','gallery','width=870,height=650,status=no');

	if(window.focus){

		finestra.focus();

	}

}

function galleriaN(str,str2){

	var larghezza=screen.availWidth;

	if(larghezza>=1024){

		if(str=="Campania") {

			window.open('http://corrieredelmezzogiorno.corriere.it/campania/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=670,status=no');

		}

		else {

		window.open('http://www.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=670,status=no');

		}

	}

	else {

		if(str=="Campania") {

			window.open('http://corrieredelmezzogiorno.corriere.it/campania/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=540,status=no');

		} else {

			window.open('http://www.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=540,status=no');

	}

	}

}



function galleriaVN(str,str2){

	var larghezza=screen.availWidth;

	if(larghezza>=1024){

		if(str=="Milano") {

			window.open('http://milano.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=670,status=no');

		}

		else {

			window.open('http://corrierefiorentino.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=670,status=no');

		}

	}else{

		if(str=="Milano") {

			window.open('http://milano.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=540,status=no');

		}

		else {

			window.open('http://corrierefiorentino.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=540,status=no');

		}



	}

}

function galleriaRM(str,str2){

	var larghezza=screen.availWidth;

	if(larghezza>=1024){

			window.open('http://roma.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=670,status=no');

	}

	else{

			window.open('http://roma.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=540,status=no');

	}

}

function galleriaME(str,str2){

	var larghezza=screen.availWidth;

	if(larghezza>=1024){

			window.open('http://corrieredelmezzogiorno.corriere.it/campania/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=670,status=no');

	}

	else{

			window.open('http://corrieredelmezzogiorno.corriere.it/campania/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=540,status=no');

	}

}

function galleriaFI(str,str2){

	var larghezza=screen.availWidth;

	if(larghezza>=1024){

			window.open('http://corrierefiorentino.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=670,status=no');

	}

	else{

			window.open('http://corrierefiorentino.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=540,status=no');

	}

}

function galleriaBO(str,str2){

	var larghezza=screen.availWidth;

	if(larghezza>=1024){

			window.open('http://corrieredibologna.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=670,status=no');

	}

	else{

			window.open('http://corrieredibologna.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=540,status=no');

	}

}

function galleriaVE(str,str2){

	var larghezza=screen.availWidth;

	if(larghezza>=1024){

			window.open('http://corrieredelveneto.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=670,status=no');

	}

	else{

			window.open('http://corrieredelveneto.corriere.it/gallery/'+str+'/vuoto.shtml?'+str2+'','gallery','width=740,height=540,status=no');

	}

}

function getParameter_uuid(whichOne){

	var r="";

	if(whichOne!=null){

		var tp=new Array();

		tp=whichOne.split('=');

		r=unescape(tp[1].replace(/\+/g," "));

	}

	return r;

}

function getParameter_url(whichOne){

	var pairs=location.search.substring(1).split('&');

	var r="";

	var tp=new Array();

	for(var i=0;i<pairs.length;i++){

		tp=pairs[i].split('=');

		if(whichOne==tp[0])

			r=unescape(tp[1].replace(/\+/g," "));

	}

	return r;

}

function flash(id,src,w,h,flashVersion,flashVars){

	document.write(

	getFlashObject(

	id,

	src,

	w,

	h,

	flashVersion,

	flashVars

	)

	);

}

function getFlashObject(id,src,w,h,flashVersion,flashVars){

	var flash=

	'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+

	'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+flashVersion+'" '+

	'width="'+w+'" '+

	'height="'+h+'">'+

	'<param name="allowScriptAccess" value="sameDomain" />'+

	'<param name="allowFullScreen" value="true" />'+

	'<param name="movie" value="'+src+'" />'+

	'<param name="quality" value="high" />'+

	'<param name="bgcolor" value="#ffffff" />'+

	'<param name="salign" value="t" />'+

	'<param name="FlashVars" value="'+flashVars+'" />'+

	'<embed src="'+src+'" '+

	'quality="high" '+

	'bgcolor="#ffffff" '+

	'width="'+w+'" '+

	'height="'+h+'" '+

	'name="'+id+'" '+

	'align="middle" '+

	'salign="t" '+

	'allowScriptAccess="sameDomain" '+

	'allowFullScreen="true" '+

	'type="application/x-shockwave-flash" '+

	'pluginspage="http://www.macromedia.com/go/getflashplayer"'+

	'FlashVars="'+flashVars+'"/>'+

	'</object>';

	return flash;

}

function carica_flash_motori(uuid){

	var flashVars="sezione=motori_piu_visti";

	var chiaveFlash=new Date();

	if(uuid!=null)flashVars+="&uuid="+uuid;

	flashVars+='&testata=COL';

	flashVars+='&cssPath='+escape('http://www.corriere.it/motori/');

	flashVars+='&numRisultati=5';

	flashVars+='&chiaveFlash='+chiaveFlash.getTime();

	flashVars+='&screenW='+screen.availWidth;

	flashVars+='&screenH='+screen.availHeight;

	$("#mc-player-motori")[0].innerHTML=getFlashObject("mc-player-motori-flv","playerMotori.swf","620px","328px","9",flashVars);

}

function carica_href_video_mc(){

	var video_motori_mc=$("#corriere-motori-slim-slv ul.corriere-tv-bottom_new a");

	for(var i_motori_mc=0;i_motori_mc<video_motori_mc.length;i_motori_mc++){

		var arg_motori_mc=video_motori_mc[i_motori_mc];

		var href_mc_uuid=getParameter_uuid($(arg_motori_mc).attr("href"));

		var new_j_href_mc="javascript:carica_flash_motori('"+href_mc_uuid+"')";

		$(arg_motori_mc).attr("href",new_j_href_mc);

	}

}



$(document).ready(function(){

/*if($(".article .Embed-Player").length > 0 && $(".article .spalla").length > 0){
$(".article .Embed-Player").each(function(){
    $(this).css("float","none");
});
}		*/

	if($("#mc-player-motori").length>0){

		carica_href_video_mc();

		var uuid="";

		uuid=getParameter_url("uuid");

		carica_flash_motori(uuid);

	}





});



// Slide Down per Accordion Elezioni 2008



$(document).ready(function(){



$("#accordion-vaschetta-bottom a").click(function () {

  if ($("#accordion-floating-cont:first").is(":hidden")) {

	$("#accordion-floating-cont").slideDown("normal");

	$("#accordion-vaschetta-bottom").addClass("vaschetta-open");

	return false;

  } else {

	$("#accordion-floating-cont").hide();

	$("#accordion-vaschetta-bottom").removeClass("vaschetta-open");

	return false;

  }

});

});

function mycarousel_initCallback(){
  jQuery('.carosello-article').css("opacity","1");
  jQuery('.carosello-article').css("filter","alpha(opacity=100)");
}
$(document).ready(function(){
  jQuery('.article-carousel').jcarousel({
          initCallback:   mycarousel_initCallback
      });

// GALLERIA ARTICOLO
			$('.gallery_slide_new').cycle({fx: 'scrollLeft'});
			$('.gallery_slide_new img').each(function (i) {
				//alert($(this).height());
				if ($(this).height() < $('.gallery_slide_new').height()) {
					var margin_top = ($('.gallery_slide_new').height() - $(this).height()) / 2;
					$(this).css('margin-top', margin_top);
				}
			});
});
// COMBO FOOTER: NASCONDE IL BUTTON SUBMIT

$(document).ready(function(){

$("#allwebsites_vai").css('display','none');

$("#footer .websites").css('right','40px');







});



//allineo le immagini della galleria del cncorso viaggi

$("#diario-video-pagina .box-img-140 img").each(function(){

 var top = (140 - $(this).height() ) / 2;

    $(this).css('margin-top', top);

})



// LINK ARCHIVIO PER MESE DI CONSULTAZIONE

$(function() {

	var mesi = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

	$(".linkNotizie").click(function () {

		var url = $(this).attr("href");

		var pclass = $(this).attr("class");

		var numPage = pclass.substring(12);

		var now = new Date();

		var idxMese = now.getMonth();

		var anno = now.getFullYear();

		/*if (now.getDate() < 2) {

			if (idxMese > 0) {

				idxMese--;

			} else {

				idxMese = 11;

				anno--;

			}

		}*/

		url = url + mesi[idxMese] + "_" + anno + "_" + numPage + ".html";

		document.location.href = url;

		return false;

	});

});



// PAGINAZIONE SETTIMANALE PER CLASSIFICHE CULTURA

$(function(){

	var prefix = "http://www.corriere.it/cultura/libri/classifiche_";

	$("#cultura_prec").bind("click", function () {

		var now = (new Date()).parseData($(this).attr("href").substring(1), -7);

		document.location.href = prefix + now.getDateString() + ".shtml";

		return false;

	});

	$("#cultura_succ").bind("click", function () {

		var now = (new Date()).parseData($(this).attr("href").substring(1), +7);

		document.location.href = prefix + now.getDateString() + ".shtml";

		return false;

	});



	if ($("#cultura_succ").attr("href") != undefined) {

		if ((new Date()).parseData($("#cultura_succ").attr("href").substring(1), +7) > new Date()) {

			$("#cultura_succ").hide();

		};

	}



	if ($("#cultura_prec").attr("href") != undefined) {

		if ((new Date()).parseData($("#cultura_prec").attr("href").substring(1), -7) < (new Date()).parseData("20080704", 0)) {

			$("#cultura_prec").hide();

		};

	}

});

//CAROUSEL GIOCHI ONLINE

(function($){
  $.fn.shufflegiochi = function() {
    return this.each(function(){
      var items = $(this).children();
      return (items.length)
        ? $(this).html($.shufflegiochi(items))
        : this;
    });
  }

  $.shufflegiochi = function(arr) {
    for(
      var j, x, i = arr.length; i;
      j = parseInt(Math.random() * i),
      x = arr[--i], arr[i] = arr[j], arr[j] = x
    );
    return arr;
  }
})(jQuery);




/*carosello giochi online*/
$(document).ready(function() {
$('#giochi_carousel ul').shufflegiochi();
    $('#carousel').jcarousel({
		size:9,
		scroll:3
    });
});


/*CAROSELLO HALLOWWEN*/

$(document).ready(function() {
    $('#halloween_carousel ul').jcarousel({
		size:4,
		scroll:3
    });
});

/*BOX ULTIMO TWEET*/
$(document).ready(function(){
    if ($('#twit_latest_debortoli').length > 0) {

        $.getScript('/includes2007/static/js_libs/twit_reader.js', function(){
             twitter('/opinioni/tweet-debortoli/flusso.json', 'latest', 'twit_latest_debortoli','Ferruccio de Bortoli',true);
        });
    }

});


// BOX 8100 PAGINE INTERNE
if ($('#box8100').length > 0 ) {

	var elencoLocal = new Array("milano","roma","bologna","firenze","napoli","caserta","salerno","bari","lecce","venezia","padova","verona","treviso","vicenza","belluno","rovigo","palermo");
	var elencoLocalMonoCitta = new Array("milano","roma","bologna","firenze");

	$.getJSON("/informazione_locale/json/comuni.json", function(data){
		$(".loc_politici").autocomplete(data.comuni, {
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
		});
	});

	function goTo(pagina) {
		// se � uno delle 16 citt� dei local va sempre in homepage
		//if ($.inArray(newLoc,elencoLocal) > -1) {
		//	pagina = "";
		//}
		// se � uno dei 4 local monocitt� devo aggiungere la citt� davanti
		if ($.inArray(newLoc,elencoLocalMonoCitta) > -1) {
			citta = "/"+newLoc;
		} else {
			citta = "";
		}
		var pathExtra = "";
		if (pagina == "aria") {
			pathExtra = citta + "/qualita-aria/giorno-1.shtml?id=1?q=" + newLoc + ""
		} else if (pagina == "politici") {
			pathExtra = citta + "/rappresentanti.shtml#comune?q=" + newLoc + ""
		} else if (pagina == "farmacie") {
			pathExtra = citta + "/farmacie.shtml?q=" + newLoc + ""
		}

		if(typeof( window["newLoc"]) != "undefined") {
			tmp = window.location = "http://" + newLoc + ".corriere.it" + pathExtra;
		} else {
			return false;
		}
	};

	$("#gotoloc").click(function(){
		var pagina = $("#box8100 input[name=pagina]").val();
		goTo(pagina);
		return false;
	});

	$(".loc_politici").keypress(function(e){
		if(e.which == 13){
			var pagina = $("#box8100 input[name=pagina]").val();
			goTo(pagina);
			return false;
		}
	});

	// sbianca text input
	$('.example-input').example(function() {
		return $(this).attr('title');
	});

}

/*DIRETTA SMS*/
if($("#diretta_sms_container").length > 0){
	$("a.aggiorna_all").click(function(){
		location.reload();
		return false;
	});
}
/*FINE DIRETTA SMS*/
/*economia radiocorsa*/
	var rullaup_rc = 20;
	var hover_radiocorsa = 0;
	var hg_radiocorsa = 0;
	var rc_IntervalId = 0;
	function rulloRadioCorsaN(){
		if(hover_radiocorsa == 0){
			rullaup_rc--;
			$('#radiocorsa_container ul').css("top",rullaup_rc+"px");
		}
		if(rullaup_rc == (hg_radiocorsa*-1)){
			rullaup_rc = 20;
			hover_radiocorsa = 0;
			$('#radiocorsa_container ul').fadeOut("fast").stop().css("top",rullaup_rc+"px").stop().fadeIn("slow");
		}
	}
	function readXmlRadioCorsa(){
		rullaup_rc = 20;
		hover_radiocorsa = 0;
		clearInterval (rc_IntervalId);
		$('#radiocorsa_container ul').fadeOut("slow").stop().css("top",rullaup_rc+"px");
		 $.ajax({
		   type:"GET",
		   url:"/notizie-ultima-ora/news_corsera_economia.xml",
		   dataType:"xml",
		   cache: false,
		   success:function(xml){
			   var testo="";
			   if($(xml).find('notizia').length > 0){
				   $(xml).find('notizia').each(function(){
					 var titolo_text=$(this).find('titolo').text();
					 var url_text=$(this).find('url').text();
					 var ora_text=$(this).find('ora').text();
					 testo+='<li><a href="http://www.corriere.it'+url_text+'"><strong>'+ora_text+'</strong>&nbsp;|&nbsp;'+titolo_text+'</a></li>';
				   });
				   $('#radiocorsa_container ul li').remove();
				   $('#radiocorsa_container ul').html(testo);
					hg_radiocorsa = $('#radiocorsa_container ul').height();
					if(hg_radiocorsa > 415){
						rc_IntervalId = setInterval ( "rulloRadioCorsaN()", 100 );
					 }
					 $('#radiocorsa_container ul').fadeIn("slow");
				}
		   }
		 });
	}
	function readXmlRadioCorsaNew(){
		$('#radiocor-small ul').fadeOut("fast").stop().css("top",rullaup_rc+"px");
		 $.ajax({
		   type:"GET",
		   url:"/notizie-ultima-ora/news_corsera_economia.xml",
		   dataType:"xml",
		   cache: false,
		   success:function(xml_new){
			   var testo="";
			   if($(xml_new).find('notizia').length > 0){
				   $(xml_new).find('notizia').each(function(){
					 var titolo_text=$(this).find('titolo').text();
					 var url_text=$(this).find('url').text();
					 var ora_text=$(this).find('ora').text();
					 testo+='<li><a href="http://www.corriere.it'+url_text+'"><strong>'+ora_text+'</strong>&nbsp;|&nbsp;'+titolo_text+'</a></li>';
				   });
				   $('#radiocor-small ul li').remove();
				   $('#radiocor-small ul').html(testo);
				   $('#rc_cont_body').jScrollPane({showArrows:false,scrollbarWidth:17,dragMaxHeight:17});
				   $('#radiocor-small ul').fadeIn("slow");
				}
		   }
		 });
	}
var num_link_pager_rc = 0;
	function onAfterRC(){
		num_link_pager_rc = $("#list_rd_column #pagination_rc a").length;
		var height_container_rc = $("#rc_list_container ul:visible").height();
		$("#rc_list_container").css("height", height_container_rc+"px");
		$("#list_rd_column .pag_rc_list").css("display","block");
	}

	function showHideRC_pager(zeroBasedSlideIndex){
			if(zeroBasedSlideIndex == 0){
				$("#list_rd_column #rc_prev").addClass("rc_button_dis");
				$("#list_rd_column #rc_first").addClass("rc_button_dis");
			}
			else {
				$("#list_rd_column #rc_prev").removeClass("rc_button_dis");
				$("#list_rd_column #rc_first").removeClass("rc_button_dis");
			}
			if(zeroBasedSlideIndex == (num_link_pager_rc-1)){
				$("#list_rd_column #rc_next").addClass("rc_button_dis");
				$("#list_rd_column #rc_last").addClass("rc_button_dis");
			}
			else {
				$("#list_rd_column #rc_next").removeClass("rc_button_dis");
				$("#list_rd_column #rc_last").removeClass("rc_button_dis");
			}
	}
function chkBlogForumHP(){
	if($("#blogforum-gf").length > 0){
		var altezzablog = $("#blogbox-gf").height();
		var altezzablocco = altezzablog+90;
		$("#blogforum-gf").height(altezzablocco);
		$('#blogbox-gf-1 li:nth-child(odd)').addClass('alternate');
		$('#blogbox-gf-2 li:nth-child(even)').addClass('alternate');
		$('#forumbox-gf li:nth-child(odd)').addClass('alternate');
		$('#blogforum-gf ul li a').attr('title', 'blog&forum');
	}
}
function callForumBlogAjax(){
	$("#box_forumblog_ajax").load("/includes2007/ssi/boxes/forum_e_blog/forum_e_blog3.html",function(){
		chkBlogForumHP();
	});			
}
var bottomScrollHp = 8000;
function scrollWindowHp(){
	if (($('body').height() <= ($(window).height() + $(window).scrollTop() + bottomScrollHp) || browser_user_ag == "iPad")) {
		if (alreadyloading == false) {
			if (navigator.appName == 'Microsoft Internet Explorer'){
				$("#homepagelista_ajax").css("display","block");
			}
			else {
				$("#homepagelista_ajax").fadeIn("slow");
			}
			$("#homepagelista_ajax").load("/includes2007/ssi/boxes/hpl_2part.shtml",function(){
				chkAccordionHP();
				caricaOroscopoBox();
				callForumBlogAjax();
				sharebutton("Corriereit");				
				$("#rectangle").writeCapture().html('<scr'+'ipt type="text/javascript">OAS_AD("Bottom1");</scr'+'ipt>');
			});
			alreadyloading = true;
		}
	}	
}
$(document).ready(function() {
/*GESTIONE FORUM & BLOG HP*/
	chkBlogForumHP();
/*FINE GESTIONE FORUM & BLOG HP*/
	if($("#homepagelista_ajax").length >0){
		alreadyloading = false;
		$("#homepagelista_ajax").html("<img style='margin:20px 0 20px 177px;' src='http://images2.corriereobjects.it/images/static/common/ajax-loader-hp.gif' alt='' />").css("display","none");
		if(browser_user_ag == "iPad"){
			bottomScrollHp = 6000;
			scrollWindowHp();
		}
		else {
			$(window).scroll(function() {
				scrollWindowHp();
			});
		}
	}
	if($('#radiocorsa_container ul').length >0){
		$('#radiocorsa_container ul').hover(
		   function(){
			hover_radiocorsa = 1;
		},
		  function () {
			hover_radiocorsa = 0;
		});
		 readXmlRadioCorsa();
		 setInterval ( readXmlRadioCorsa, 30000 );
	}
	if($('#rc_cont_body ul').length >0){
		 readXmlRadioCorsaNew();
		 setInterval ( readXmlRadioCorsaNew, 30000 );
	}
	if($('#rc_list_container').length >0){
				$('#rc_list_container').cycle({
					fx:     'scrollHorz',
					timeout: 0,
					pager:  '#pagination_rc',
					after:   onAfterRC,
					pagerClick: function(zeroBasedSlideIndex, slideElement) {
						showHideRC_pager(zeroBasedSlideIndex);
					}
				});
				$("#list_rd_column").css("visibility","visible");
				num_link_pager_rc = $("#list_rd_column #pagination_rc a").length;

					$("#list_rd_column #rc_prev").addClass("rc_button_dis");
					$("#list_rd_column #rc_first").addClass("rc_button_dis");

				    if(num_link_pager_rc == 1) {
						$("#list_rd_column #rc_next, #list_rd_column #rc_prev, #list_rd_column #rc_last, #list_rd_column #rc_first").css("display","none");
					}
				$("#rc_first").click(function(){
					if($(this).attr("class") != "rc_button_dis"){
						$("#pagination_rc a:first").click();
						showHideRC_pager(0);
					}
					return false;
				});
				$("#rc_last").click(function(){
					if($(this).attr("class") != "rc_button_dis"){
						$("#pagination_rc a:last").click();
						showHideRC_pager(num_link_pager_rc-1);
					}
					return false;
				});
				$("#list_rd_column #rc_prev").click(function(){
					if($('#list_rd_column #pagination_rc a.activeSlide').prev().length > 0)	$('#list_rd_column #pagination_rc a.activeSlide').prev().click();
					return false;
				});
				$("#list_rd_column #rc_next").click(function(){
					if($('#list_rd_column #pagination_rc a.activeSlide').next().length > 0) $('#list_rd_column #pagination_rc a.activeSlide').next().click();
					return false;
				});
	}
});
/*fine economia radiocorsa*/
/*PPN home page*/
	function addPpn() {
	var urlPpn = document.location.href;
		   if(urlPpn=='http://www.corriere.it/index.shtml?refresh_ce'){
		   }else{
					if($('.ppn_box').length > 0){
						$('.ppn_box').load('http://www.corriere.it/tools/includes/afc_google_hp.inc');
					}
		   }
	};
   setTimeout('addPpn()',5000);
/*fine PPN home page*/


	if($("#bannerone").height()==0){
		// $("#bannerone").css("width","250px");
		  //$("#bannerone").css("display","none");
		// Head Loghi Disabilitato 20090430
		// $("#bigbox").css("width","750px");
		// $("#boxmiddle").css("borderColor","#ffffff");
		// $("#boxbottom").css("padding","5px 0 0 3px");
	}
function newWindow(a_str_windowURL, a_str_windowName, a_int_windowWidth, a_int_windowHeight, a_bool_scrollbars, a_bool_resizable, a_bool_menubar, a_bool_toolbar, a_bool_addressbar, a_bool_statusbar, a_bool_fullscreen) {

	var int_windowLeft = (screen.width - a_int_windowWidth) / 2;
	var int_windowTop = (screen.height - a_int_windowHeight) / 2;
	var str_windowProperties = 'height=' + a_int_windowHeight + ',width=' + a_int_windowWidth + ',top=' + int_windowTop + ',left=' + int_windowLeft + ',scrollbars=' + a_bool_scrollbars + ',resizable=' + a_bool_resizable + ',menubar=' + a_bool_menubar + ',toolbar=' + a_bool_toolbar + ',location=' + a_bool_addressbar + ',statusbar=' + a_bool_statusbar + ',fullscreen=' + a_bool_fullscreen + '';
	var obj_window = window.open(a_str_windowURL, a_str_windowName, str_windowProperties)
obj_window.creator=self;
	if (parseInt(navigator.appVersion) >= 4) {
		obj_window.window.focus();
	}
};
/*27esima ora
function LogInVentisette(){
	var urlParameter = "http://www.corriere.it/corcommunity/accesso/Login.do?contentPath=" + document.location;
	$("#cliccaQuiLoginCorriere").attr("href", urlParameter);

	$('#body_blog_tom #modal-login-container').modal({
			containerId: "simplemodal-27ora-login",
			onClose: function(dialog){
				dialog.data.fadeOut('slow', function () {
					dialog.container.slideUp('slow', function () {
						dialog.overlay.fadeOut('slow', function () {
							$.modal.close();
						});
					});
				});
				return false;
			}});
};

var cookieRcs = $.cookie("rcsLogin");
var cookieFb = $.cookie("fb_token");

if(cookieFb){
	var urlParameter = "http://www.corriere.it/corcommunity/accesso/Login.do?contentPath=" + document.location;

	$('.facebook_connect').click(function(){
		//alert("Hai gia' effettuato il login con Facebook!");
		$('#modal-fbAlert-container').modal({
		containerId: "simplemodal-27ora-fbAlert",
		onShow: function(){
			$('#modal-fbAlert-container div p').html("Hai gia' effettuato il login con Facebook!");
			$('#modal-fbAlert-container div a').click(function(){
					$.modal.close();
				});
			},
		onClose: function(dialog){
			dialog.data.fadeOut('slow', function () {
				dialog.container.slideUp('slow', function () {
					dialog.overlay.fadeOut('slow', function () {
						$.modal.close();
					});
				});
			});
			return false;
		}});
	});

	$("#headBoxLogin a.headLogin").click(function(event){
		event.preventDefault();
		$('#modal-fbAlert-container').modal({
		containerId: "simplemodal-27ora-fbAlert",
		onShow: function(){
			$('#modal-fbAlert-container div p').html("Sei autenticato come utente Facebook, continuando procederai al login di Corriere.it");
			$('#modal-fbAlert-container div a').click(function(){
					$(this).attr("href", urlParameter);
				});
			},
		onClose: function(dialog){
			dialog.data.fadeOut('slow', function () {
				dialog.container.slideUp('slow', function () {
					dialog.overlay.fadeOut('slow', function () {
						$.modal.close();
					});
				});
			});
			return false;
		}});
	});
} else if(!cookieRcs){
	$('.facebook_connect').click(function(){
		$(this).attr("href","http://www.corriere.it/corcommunity/FBRedirect.do");
		newWindow(this.href, 'popup', 600, 500, 1, 1, 0, 0, 0, 1, 0);
		return false;
	});
} else if(cookieRcs){
	$('.facebook_connect').click(function(){
		$('#modal-fbAlert-container').modal({
		containerId: "simplemodal-27ora-fbAlert",
		onShow: function(){
			$('#modal-fbAlert-container div p').html("Sei autenticato come utente di Corriere.it, continuando procederai al login di Facebook");
			$('#modal-fbAlert-container div a').click(function(){
					$(this).attr("href","http://www.corriere.it/corcommunity/FBRedirect.do");
					newWindow(this.href, 'popup', 600, 500, 1, 1, 0, 0, 0, 1, 0);
					return false;
				});
			},
		onClose: function(dialog){
			dialog.data.fadeOut('slow', function () {
				dialog.container.slideUp('slow', function () {
					dialog.overlay.fadeOut('slow', function () {
						$.modal.close();
					});
				});
			});
			return false;
		}});
	});
}
fine 27esima ora*/

/* Removed from javascript_bottom.shtml */
$("#cycle_container ." + $("#first_box_entry_cinema").attr("class")).remove();
$("#cycle_container").cycle({
	fx: "fade",
	timeout: 3500
});

$(document).ready(function(){
						   
	/* slide-hp */
	if ($("#slide-hp").length > 0) {
		
		var posLeftSlide = 0;
		var posTopSlide = 0;
		var scrolly = 0;
		var posTopMain = 0;
		var posCenterLoading = 0;

		if ($("#main-top").length > 0) {
			posTopMain = Math.round($("#main-top").offset().top);
		} else if ($("#main_extra_large_nobg").length > 0) {
			posTopMain = Math.round($("#main_extra_large_nobg").offset().top);
		} else {
			posTopMain = Math.round($("#main").offset().top);
		} 

		function slidePosition(scrolly,start) {
			posLeftSlide = Math.round($("#header_menu_meth").offset().left);
			posTopSlide = Math.round($(window).height()/2);
			posCenterLoading =Math.round($(window).width()/2) - 20;
			
			if (posTopSlide < posTopMain) {
				posTopSlideCss = posTopMain+scrolly;
			} else {
				posTopSlideCss = posTopSlide+scrolly;
			}
			
			$("#slide-hp").css({"left": posLeftSlide+"px", "top": posTopSlideCss+"px"});
			$(".loading-hp-next").css({"left": posCenterLoading+"px", "top": posTopSlideCss+"px"});
			
			if (start == true) {
				$(window).scroll();
				$("#slide-hp").show();	
			}
		}
		
		var scroll = false;
		$(window).scroll(function (event) {
			scrolly = Math.round($(this).scrollTop());	
			slidePosition(scrolly);
		}); 
		
		
		$(window).resize(function() {
			scrolly = 0;	
			slidePosition(scrolly);
		});
			
		slidePosition(scrolly,true);		
			
		$("#slide-hp-sx").click(function(){
			$("body").css("overflow","hidden").addClass("slide-nobg");
			$("#testata_tkv").hide();
			$("#main").css("position","relative");
			$("#header_menu_meth, #main, #main_extra_large_nobg, #main-top, #slide-hp, #fascia-primarie-centrosin").animate({"left": "+=1300px"}, 400, function() {
				$("body").addClass("slide-bgdefault");
				$(".loading-hp-next").show();
				document.location.href = $("#slide-hp-sx").attr("href");
			});
			return false;
		});
		
		$("#slide-hp-dx").click(function(){
			$("body").css("overflow","hidden").addClass("slide-nobg");
			$("#testata_tkv").hide();
			$("#main").css("position","relative");
			$("#header_menu_meth, #main, #main_extra_large_nobg, #main-top, #slide-hp, #fascia-primarie-centrosin").animate({"left": "-=1300px"}, 400, function() {
				$("body").addClass("slide-bgdefault");
				$(".loading-hp-next").show();
				document.location.href = $("#slide-hp-dx").attr("href");
			});
			return false;
		});
		
	}	

	/* PPN home sez */
	
	/*
if ($('#ppn-hp-seznew').length > 0) {
		$.get("/tools/includes/afc_google_hpsez-new.inc", function(data){
              $("#col-dx").append(data);
           });
	}
*/

	if($("#ctv3a").length > 0){
		var tabs_class = "";
		if($("#ctv3a-tabs-new").length > 0) {tabs_class = "-new";}
		//CTV 3a col
		function activate(){
			var activeTab = $("#ctv3a-tabs"+tabs_class+" li.active").attr("id");
			$(".ctv3a-container").hide();
			$(".ctv3a-container[rel="+activeTab+"]").show();

			//corriere night live adv
			if($("#ctv3a-live a.ntv").lenght != -1) {
				if($("#ctv3a-foto").attr("class") == "active" || $("#ctv3a-video").attr("class") == "active") {
					$("#ctv3a-livebanner").hide();
				} else {
					$("#ctv3a-livebanner").show();
				}
			}
		}activate();


		$("#ctv3a-tabs"+tabs_class+" li").click(function(){
			return false;
		});
		$("#ctv3a-tabs"+tabs_class+" li").hover(function(){
			if($(this).find("a").attr("class") != "off"){
				$("#ctv3a-tabs"+tabs_class+" li").removeClass("active");
				$(this).addClass("active");
				activate();
			}
		},function(){});

		//disable the "live" tab
		$("#ctv3a-live a.off").unbind("click");

		//disable "live" tab for ipad
		if(navigator.platform.indexOf("iPad") != -1){
			$("#ctv3a-live").hide();
			$("#ctv3a-foto").click();
		}
	}

});

var new_top_hp = (screen.height - (635)) / 2;
var new_left_hp = (screen.width - 865) / 2;
var stile_popup_vc = "top="+new_top_hp+", left="+new_left_hp+", width=865, height=635, buttons=no,scrollbars=yes,location=no,menubar=no,resizable=no,status=no,directories=no,toolbar=no,fullscreen=no";
function apriPopupVideochat(url) {
	if(url.indexOf("http://videochat.corriere.it") == -1) url = "http://videochat.corriere.it"+url;
		window.open(url, "", stile_popup_vc);
}

		if(navigator.appName.indexOf('Micro')!=-1){
			var contentDiv = (document.getElementById('col-dx'))? document.getElementById('col-dx'):null;
			if(contentDiv) var object = (contentDiv.getElementsByTagName('object')[0])? contentDiv.getElementsByTagName('object')[0]:null;
			if(object && object.width==300) object.width=299;
		}

		$(document).ready(function(){
			// ---------- gestione menu 3rd level (a comparsa) ----------
			function showMenu(obj){
				var mmId = $(this).attr("id");
		var mmSm = "#submenu3-" + mmId;
		var newMenuId = mmId;
		//mmCurrId = $('#sublevels-main-menu ul li.current').attr("id");

		$('#sublevels-main-menu ul li').removeClass("selected");
		$("div.nav-3rd-nuvoletta").hide();
		//$(mmSm).slideDown(1);
		$(mmSm).show();

		$('#sublevels-main-menu ul li#' + newMenuId).addClass("selected");
		$(this).addClass("selected");

			}

			function hideMenu (obj) {
				$('#sublevels-main-menu ul li').removeClass("selected");
				$("div.nav-3rd-nuvoletta").hide();
				openCurrentMenu();
			}

			function foo(obj) {
				//$(visibleMenuId).removeClass("current");
			};

			function openCurrentMenu () {
				var currentNuvoletta = $("div.nav-3rd-nuvoletta.current");
				if (currentNuvoletta) currentNuvoletta.show();
			}

			var config = {
				sensitivity: 3, 	// number = sensitivity threshold (must be 1 or higher)
				interval: 20, 		// number = milliseconds for onMouseOver polling interval
				over: showMenu, 	// function = onMouseOver callback (REQUIRED)
				timeout: 500, 		// number = milliseconds delay before onMouseOut
				out: foo 			// function = onMouseOut callback (REQUIRED)
			};
			$("#sublevels-main-menu ul li").hoverIntent(config);

			var config2 = {
				sensitivity: 1,
				interval: 10,
				over: foo,
				timeout: 0,
				out: hideMenu
			};
			$("#sublevels-menu-bar").hoverIntent(config2);

			openCurrentMenu();
		});


/*		$("li.box-forum-desc h6").css("display", "none");
*/		var boxBlog = $("li.box-forum-desc h5 span.blog");
		var boxForum = $("li.box-forum-desc h5 span.forum");
		var iBlog = Math.round((boxBlog.length - 1) * Math.random());
		var iForum = Math.round((boxForum.length -1) * Math.random());
		$(boxBlog[iBlog]).parent().parent().next().css("display", "block");
		$(boxForum[iForum]).parent().parent().next().css("display", "block");
		function switchboxhome(){
			var ora = server_hour;
			if (ora > 6 && ora < 10) {

				$('#box-viaggi-home-cor').hide();
				$('#box_mobile_mattino').show();
			} else {

				$('#box-viaggi-home-cor').show();
				$('#box_mobile_mattino').hide();
			}
			setTimeout("switchboxhome()", 60000);
		}
		$(document).ready(function() {
			if($('#vincitori-diari ul li a').length > 0){
				$('#vincitori-diari ul li a').tooltip({
					showURL: false,
					track: true,
					delay: 0,
					showURL: false,
					fixPNG: true,
					extraClass: "vincitori-diari",
					top: 20,
					left: -90
				});
			}


			$('#box-viaggi-home-cor ul li a').eq(Math.floor(Math.random()*3)).trigger('mouseover');
			
			if($('#box-viaggi-home-cor').length > 0 && $('#box_mobile_mattino').length > 0){
				switchboxhome();
			}


			//gestione box promo
			if ( $(".boxpub").height() == 0) {

				$(".boxpub").css('display','none');

			}
			
			/* Motori new (oct 2011) spostato nel javascript_bottom per ovviare all'errore slides*/
			
			/*if($('#slides').length > 0){
				$('#slides').slides({
					preload: true,
					preloadImage: '/motori/images/loading.gif',
					play: 5000,
					pause: 2500,
					hoverPause: true
				});
				$(".pagination li:first").css("margin-left","270px");
			}	
			if($('#motori_gallery').length > 0){
				$('#motori_gallery').slides({
					prev: 'prev',
					next: 'next',
					generatePagination: false
				});
			}*/
		});
		


//cache4