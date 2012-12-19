var h_oros_m = 0;
function getSignFromDateHP(month, day) {
	var monthNum = parseFloat(month);
	var dayNum = parseFloat(day);
	var sign;
	if((monthNum == 3 && dayNum >= 21) || (monthNum == 4 && dayNum <= 20))
		sign = "ariete";
	else if((monthNum == 4 && dayNum >= 21) || (monthNum == 5 && dayNum <= 20))
		sign = "toro";
	else if((monthNum == 5 && dayNum >= 21) || (monthNum == 6 && dayNum <= 21))
		sign = "gemelli";
	else if((monthNum == 6 && dayNum >= 22) || (monthNum == 7 && dayNum <= 22))
		sign = "cancro";
	else if((monthNum == 7 && dayNum >= 23) || (monthNum == 8 && dayNum <= 23))
		sign = "leone";
	else if((monthNum == 8 && dayNum >= 24) || (monthNum == 9 && dayNum <= 22))
		sign = "vergine";
	else if((monthNum == 9 && dayNum >= 23) || (monthNum == 10 && dayNum <= 22))
		sign = "bilancia";
	else if((monthNum == 10 && dayNum >= 23) || (monthNum == 11 && dayNum <= 22))
		sign = "scorpione";
	else if((monthNum == 11 && dayNum >= 23) || (monthNum == 12 && dayNum <= 21))
		sign = "sagittario";
	else if((monthNum == 12 && dayNum >= 22) || (monthNum == 1 && dayNum <= 20))
		sign = "capricorno";
	else if((monthNum == 1 && dayNum >= 21) || (monthNum == 2 && dayNum <= 19))
		sign = "acquario";
	else if((monthNum == 2 && dayNum >= 20) || (monthNum == 3 && dayNum <= 20))
		sign = "pesci";
	return sign;
}
function ricercaAnnunci_top(ricerca){
	var re = new RegExp("[^A-Za-z0-9]","g");
	if(ricerca.length<3) {
		alert('Inserire almeno 3 caratteri per fare una ricerca')
	}
	else {
		ricerca=ricerca.toLowerCase();
		ricerca=trim(ricerca);
		ricerca_encode=ricerca;
		ricerca=ricerca.replace(re,'-');
		urlRicerca=ricerca+'-0/1-p.htm';
		window.location='http://annunci.corriere.it/'+urlRicerca+'?search='+ricerca_encode;	
	}
}

function cercanelsito() {
	var value_ricerca_header = $("#searchtool #search_val").val();
	if(value_ricerca_header.indexOf("Cerca") > -1) value_ricerca_header = "";        
	var valore="http://sitesearch.corriere.it/forward.jsp?q="+value_ricerca_header;
	document.searchtool.action=valore;
}
function cercanelsitoMulti() {
	var value_search_wh = $("#search_box_option input:checked").val();
	var value_ricerca_header = $("#searchtool_box #search_val").val();
	if(value_search_wh == "sito"){
		var valore="http://sitesearch.corriere.it/forward.jsp?q="+value_ricerca_header;
		window.location=valore;
	}
	else if(value_search_wh == "archivio"){
		$("#archivioStorico").attr("action","http://sitesearch.corriere.it/archivioStoricoEngine?q="+value_ricerca_header)
		$("#archivioStorico #queryString").val(value_ricerca_header);
		$("#archivioStorico").submit();
	}	
	else if(value_search_wh == "annunci"){
		ricercaAnnunci_top(value_ricerca_header);
	}
	else if(value_search_wh == "viaggi"){
		$("#send_form_viaggi #text_search_viaggi").val(value_ricerca_header);
		$("#send_form_viaggi").submit();
	}
	else if(value_search_wh == "dizionario"){
		$("#searchDizPar #lemma").val(value_ricerca_header);
		$("#searchDizPar").submit();
	} 	
}					
function openBoxSearchMulti(){
	$("#searchtool_box").css("display","block");
	if($("#searchtool_box #search_val").length > 0 && ($("#searchtool_box #search_val").val()).indexOf("Cerca") > -1) $("#searchtool_box #search_val").val("");
	$("#searchtool_box #search_val").focus();					
}
var hover_str = 0;
function createHpMenuCOR(){
		$("#menu_hp_cor a").attr("title","");
		$("#menu_hp_cor a.menu_first").click(function(event){
			window.location.href = $(this).attr("href");
			return false;
		});
		
		$("#menu_hp_cor > li").not(".submenu_no").hover(function(){
				$("#menu_hp_cor > li").removeClass("hover_click");
				$("#menu_hp_cor > li").removeClass("li_zindex_less");
				if(!$(this).hasClass('submenu_no')){
					$(this).addClass("li_zindex_less hover_click");
				}
				//$("#menu_hp_cor .submenu a,#menu_hp_cor .submenu strong").removeClass("w_sub_menu_hover");
				$("#menu_hp_cor .w_sub_menu_hover").removeClass("w_sub_menu_hover");
				if($(this).find(".submenu > ul > li:eq(0)").find(".sub_menu_sec").length > 0){
					$(this).find(".submenu > ul > li:eq(0)").find(".sub_menu_sec").css("display","block");
					$(this).find(".submenu > ul > li:eq(0) a, .submenu > ul > li:eq(0) strong.title_sub:eq(0)").addClass("w_sub_menu_hover"); 
				}		
		},function(){
			$("#menu_hp_cor > li").removeClass("hover_click");
			$("#menu_hp_cor > li").removeClass("li_zindex_less");			
		});		
		
		$("#menu_hp_cor .sub_menu_sec").each(function(){
			//$(this).parents("li:eq(0)").find("a").not($("#menu_hp_cor .sub_menu_sec a")).append("<span> &gt; </span>").addClass("w_sub_menu");
			$(this).find("a, strong.title_sub").addClass("not_hover");
			//$(this).parents("li:eq(0)").find("strong.title_sub").not($("#menu_hp_cor .sub_menu_sec strong")).append("<span> &gt; </span>").addClass("w_sub_menu");
			$(this).prev().append("<span> &gt; </span>").addClass("w_sub_menu");
		});
		
		var left_pos_elem = 0;
		$("#menu_hp_cor a.menu_first").each(function(){
													 
			if($(this).parents("li:eq(0)").find(".sub_menu_sec").length == 0) {
				$(this).parents("li:eq(0)").addClass("submenu_sm");
			}
			if($(this).parents("li:eq(0)").find(".submenu").length == 0) {
				$(this).parents("li:eq(0)").addClass("submenu_no");
			}			
			var pos_left = $(this).parents("li:eq(0)").position().left;

			if(pos_left > 652 || left_pos_elem == 1) {
				$(this).parents("li:eq(0)").find(".submenu").addClass("submenu_right");
				$(this).parents("li:eq(0)").find("a.menu_first").addClass("submenu_right");
				left_pos_elem = 1;
			}
			if($(this).parents("li:eq(0)").find(".submenu").length == 0){
				$(this).find("span.cont_arrow, span.close_menu").remove();
			}			
		});
		$("#menu_hp_cor li .submenu a, #menu_hp_cor li .submenu strong.w_sub_menu").not("a.not_hover, strong.not_hover").hover(function(){
			$("#menu_hp_cor .submenu a.w_sub_menu_hover, #menu_hp_cor .submenu strong.w_sub_menu_hover").removeClass("w_sub_menu_hover");
			$(this).addClass("w_sub_menu_hover");
			$("#menu_hp_cor .submenu .sub_menu_sec").css("display","none");
			$(this).parents("li:eq(0)").find(".sub_menu_sec").css("display","block");
		},function(){

		});	
		$("#menu_hp_cor > li a.menu_first strong.button_m, #menu_hp_cor > li a.menu_first .close_menu").mouseover(function() {
			$(this).parents("a:eq(0)").addClass("no_under");
		});
		$("#menu_hp_cor > li a.menu_first strong.button_m, #menu_hp_cor > li a.menu_first .close_menu").mouseout(function() {
			$(this).parents("a:eq(0)").removeClass("no_under");
		});		
}
jQuery.fn.outerHTML = function() {
	return $('<div></div>').append( this.clone() ).html();
}
var cont_menu_footer = "";
var title_sub_menu = "";
function createSectionMenuCOR(){
	if((document.URL).indexOf("corriere.it/chinese") > -1 ){
		$("a[id = 'm_home_#20013;#25991;#29256;#26412;']").attr("id","m_home_chinese");
		$("a[id = 'm_home_#20013;#25991;#29256;#26412;_#31038;#35770;']").attr("id","m_home_chinese_editoriale");
		sezione_sel = "home";
		sottosezione_sel = "chinese";
		subsection_sel = "default";
	}
	$("#menu_hp_cor .submenu .sub_menu_sec .text_box").each(function(){
		$(this).parents("ul.sub_menu_sec:eq(0)").remove();
	});
	$("#menu_hp_cor .submenu li strong.title_sub").not("strong.w_sub_menu").each(function(){
		$(this).parents("li:eq(0)").remove();
	});
	$("#menu_hp_cor > li").unbind();
	var sub_menu_class = "sub_menu";
	var father_title = "";
	$("#menu_hp_cor > li a span, #menu_hp_cor > li strong.title_sub span").remove();
	if(subsection_sel.indexOf("default") > -1 ) subsection_sel = "";

	$("#menu_hp_cor a#m_"+sezione_sel).addClass("sel_link").unbind();
	$("#menu_hp_cor a#m_"+sezione_sel).append("<div class='top_sx'></div><div class='top_dx'></div>");
	jQuery("#menu_hp_cor a.menu_first").not(".sel_link").each(function(){
		jQuery(this).parents("li:eq(0)").find(".submenu").remove();
	})

	//creazione sub menu bottom
		cont_menu_footer = $("#menu_hp_cor a#m_"+sezione_sel).parents("li:eq(0)").find("ul:eq(0)").clone();
		title_sub_menu = $("#menu_hp_cor a#m_"+sezione_sel).html();
	//fine submenu bottom

	if($("#menu_hp_cor a#m_"+sezione_sel).parents("li:eq(0)").find(".submenu").length == 0){
		$("#menu_hp_cor a#m_"+sezione_sel).addClass("sel_link_single");
	}
	else if((sottosezione_sel == "default" && tipologia_sel == "_home") || (sottosezione_sel == "default" && subsection_sel == "")){
		$("#menu_hp_cor .submenu li strong.title_sub").each(function(){
			$(this).parents("li:eq(0)").remove();
		});		
		$("#menu_hp_cor a#m_"+sezione_sel).parents("li:eq(0)").find("ul:eq(0)").addClass("bg_menu_selected").find("ul").remove();
		$("#menu_hp_cor").after($("#menu_hp_cor a#m_"+sezione_sel).parents("li:eq(0)").find("ul.bg_menu_selected"));
	}
	else {
			var title_sub_menu_sel_num = 0;
			var title_sub_menu_sel = "";
			var content_ul_sub_menu = "";
			var sottosez_var = "_"+sottosezione_sel;
			if(sottosezione_sel == "default") {sottosez_var = "";}
			var link_father = $("#menu_hp_cor #m_"+sezione_sel+sottosez_var+subsection_sel).parents("li:eq(1)").find("a:eq(0)");
			if($(link_father).length == 0) link_father = $("#menu_hp_cor #m_"+sezione_sel+sottosez_var+subsection_sel);
			
			var href_back = $(link_father).attr("href");
			var link_up_elem = $("#menu_hp_cor #m_"+sezione_sel+sottosez_var+subsection_sel);
			var link_up = $(link_up_elem).outerHTML();
			var link_up_clone = link_up;
			var link_up_text = $(link_up_elem).text();
			
			var sub_menu_sel = "";
			
			if($("#menu_hp_cor #m_"+sezione_sel+sottosez_var+subsection_sel).parents("li:eq(0)").find("strong.title_sub:eq(0)").length > 0){
				href_back = $("#menu_hp_cor #m_"+sezione_sel).attr("href");
				link_up_elem = $("#menu_hp_cor #m_"+sezione_sel);
			    link_up = $(link_up_elem).outerHTML();
				link_up_clone = $("#menu_hp_cor #m_"+sezione_sel+sottosez_var).outerHTML();
				link_up_text = $(link_up_elem).text();
				
				sub_menu_sel = "<li class='sub_menu_last'>"+$("#menu_hp_cor #m_"+sezione_sel+sottosez_var+subsection_sel).outerHTML()+"</li>";
			}
			else if( subsection_sel != "" && ($("#menu_hp_cor #m_"+sezione_sel+sottosez_var+subsection_sel).parents("li:eq(1)").find(":first-child").attr("class")).indexOf("title_sub") > -1){
				href_back = $("#menu_hp_cor #m_"+sezione_sel).attr("href");
				link_up_elem = $("#menu_hp_cor #m_"+sezione_sel);
			    link_up = $(link_up_elem).outerHTML();
				link_up_clone = $("#menu_hp_cor #m_"+sezione_sel+sottosez_var).outerHTML();
				link_up_text = $(link_up_elem).text();
				
				sub_menu_sel = "<li class='sub_menu_last'>"+$("#menu_hp_cor #m_"+sezione_sel+sottosez_var+subsection_sel).outerHTML()+"</li>";				
			}			
			else if($(link_up_elem).parents("li:eq(0)").find("ul").length > 0){
				$(link_up_elem).parents("li:eq(0)").find("ul:eq(0)").find("ul").remove();
				if($(link_up_elem).parents("li:eq(0)").find("ul li").length < 10){
					sub_menu_sel = $(link_up_elem).parents("li:eq(0)").find("ul").html();
				}
			}
			else {
				sub_menu_class = "sub_menu_last";
				father_title = "<li class='sub_menu'>"+$(link_father).outerHTML()+"</li>";
			}
			title_sub_menu_sel_num = 1;
			content_ul_sub_menu = '<ul class="bg_menu_selected"><li class="sub_menu_back"><a href="'+href_back+'" class="menu_first" title="">&lt;</a></li>'+father_title+'<li class="'+sub_menu_class+'">'+link_up_clone+'</li>'+sub_menu_sel+'</ul>';
			$("#menu_hp_cor").after(content_ul_sub_menu);
	}
	title_sub_menu_sel = $("#menu_hp_cor a.sel_link").text();
	var link_top_menuCor = $("#menu_hp_cor a.sel_link").attr("href");
	if(title_sub_menu_sel_num == 1){
		title_sub_menu_sel = link_up_text;
		link_top_menuCor = $(link_up).attr("href");
	}
	
	$("#header_menu_meth .bg_menu_selected span:contains('>')").remove();
	title_sub_menu_sel = title_sub_menu_sel.replace(/>/g,"");
	if(typeof(dyn_title)!="undefined" && dyn_title.length > 0){
		$("#header_menu_meth .top_header #testata-dinamica-new li.sezione-sottosezione").html('<strong>'+dyn_title+'</strong>');
	}
	else if(typeof(no_title_show)!="undefined" && no_title_show.length > 0){
		
	}
	else{
		if($("#header_menu_meth .top_header #testata-dinamica-new li.sezione-sottosezione *").length == 0){
			$("#header_menu_meth .top_header #testata-dinamica-new li.sezione-sottosezione").html('<strong><a href="'+link_top_menuCor+'">'+title_sub_menu_sel+'</a></strong>');
		}
	}
}

var nomeSegno_orig = "";
function caricaOroscopoBox(){
		$("#box_oros_zap img").attr("src","http://images2.corriereobjects.it/images/static/common/oroscopo/hp_cor/"+nomeSegno_orig+"_zapping.png");
		$("#box_oros_zap a").attr("href","http://oroscopo.corriere.it/giorno/"+server_yyyy+"/"+nomeSegno_orig+"/"+server_d_dd+"-"+server_m_mm+"-"+server_yyyy+".shtml");
		if($("#box_oros_zap a").length > 0){
			$("#box_oros_zap a").load("/linked_webroots/oroscopo.corriere.it/giorno/"+server_yyyy+"/"+nomeSegno_orig+"/widget/"+server_d_dd+"-"+server_m_mm+"-"+server_yyyy+".shtml",function(){
				$("#box_oros_zap").show();
			});
		}
		$("#box_oros_zap").click(function(){
			window.location.href = $(this).find("a").attr("href");
		});
}
$(window).load(function() {
	var marg_left_m = (991 - $("#menu_hp_cor").width()) / 2;
	$("#menu_hp_cor").css("margin-left",marg_left_m+"px");
});
$(document).ready(function(){
	var marg_left_m = (991 - $("#menu_hp_cor").width()) / 2;
	$("#menu_hp_cor").css("margin-left",marg_left_m+"px");
	
	if($("#header_menu_meth .top_header_sez").length > 0 && $("#header_menu_meth .bg_menu_selected").length == 0){
		$("#menu_hp_cor").css("padding-bottom","12px");
	}
	
	if($("#header_menu_meth .bg_menu_selected").length > 0){
		$("#sub_menu_footer").html(cont_menu_footer);
		$("#sub_menu_footer").prepend("<span>"+title_sub_menu+"</span>");
		$("#sub_menu_footer ul").find("ul, span").remove();
		$("#sub_menu_footer").find("a").attr("id","");
		$("#sub_menu_footer li:last").addClass("last");
		$("#sub_menu_footer strong.title_sub").each(function(){
			$(this).parents("li:eq(0)").remove();
		})
		$("#sub_menu_footer").css("display","block");
		$("#footer").removeClass("clearfix");
	}
	else {
		if($("#sub_menu_footer span").length == 0){
			$("#sub_menu_footer, #menu_separatore").remove();
		}
		else {
			$("#sub_menu_footer").css("display","block");
			$("#footer").removeClass("clearfix");		
		}
	}
	
	$("#menu_hp_cor a[href*=http]").each(function(){
		if($(this).attr("href").indexOf("corriere.it") == -1){
			$(this).attr("target","_blank");
		}
	});	
	
	//if($("#header_menu_meth .wide-pushbar").height() < 10) {$("#header_menu_meth .wide-pushbar").css("display","none")};
	if($("#leaderboard").height() < 10) {$("#leaderboard").css("display","none")};
	var ac_menu_footer = 0;
	$("#menu_separatore a").click(function(){
		if(ac_menu_footer == 0){
			$("#menu_separatore a").attr("title","Chiudi");
			ac_menu_footer = 1;
			  $("#menu_footer .cont_m_footer").animate({
				marginTop: "0"
			  }, 500 );			
		}
		else {
			$("#menu_separatore a").attr("title","Apri");
			ac_menu_footer = 0;
			  $("#menu_footer .cont_m_footer").animate({
				marginTop: "-450px"
			  }, 500 );			
		}
		return false;
	})
	
	if($("#menu_link_external").length > 0){
		var segno_def_sel = "default";
		nomeSegno_orig = getSignFromDateHP(server_m_mm,server_d_dd);
		var nomeSegno = nomeSegno_orig.substr(0, 1).toUpperCase() + nomeSegno_orig.substr(1);
	   // verifico che abbia gia il cookie per il segno preferito
		var rcsSignPref = getDatiCookie('default_sign_checkbox'); 
		// se ho un segno preferito settato
		if(rcsSignPref){
			cookieRcsSignPref = rcsSignPref[0].split(".");
			nomeSegno_orig = cookieRcsSignPref[0];
			nomeSegno = (cookieRcsSignPref[0]).substr(0, 1).toUpperCase() + (cookieRcsSignPref[0]).substr(1);
			segno_def_sel = cookieRcsSignPref[1];
		}
		caricaOroscopoBox();		
		$("#header_menu_meth #menu_link_external a[title=OROSCOPO]").attr("id","box_oros_menu").attr("href","http://oroscopo.corriere.it/giorno/"+server_yyyy+"/"+nomeSegno_orig+"/"+server_d_dd+"-"+server_m_mm+"-"+server_yyyy+".shtml").append('<img src="http://images2.corriereobjects.it/images/static/common/oroscopo/hp_cor/'+nomeSegno_orig+'_ico.png" onmouseover="javascript:h_oros_m = 1;" onmouseout="javascript:h_oros_m = 0;" alt="'+nomeSegno+'" />');
		$("#switch-signs .selected-sign").attr("src","http://images2.corriereobjects.it/images/static/common/oroscopo/hp_cor/"+nomeSegno_orig+"_ico.png");
		$("#switch-signs .selected-sign").attr("alt",nomeSegno);
		var pos_oros = null;
		if($("#header_menu_meth #box_oros_menu").length > 0){
			pos_oros = ($("#header_menu_meth #box_oros_menu").position().left) - 56;
			$("#header_menu_meth #switch-signs").css("left",pos_oros+"px");		
		}
		$("#header_menu_meth #switch-signs").hover(function(){
		},
		function(){
			$("#header_menu_meth #switch-signs").hide();
			$("#switch-signs div.title").attr("id","").text("Scegli il segno");
		})
		$("#box_oros_menu img").hover(function(){
			$("#box_oros_menu").append("<em>Cambia Segno</em>");
		},
		function(){
			$("#box_oros_menu em").remove();
		});
		$("#switch-signs div.cont_sign a").hover(function(){
			var name_sign = $(this).attr("title");
			$("#switch-signs div.title").attr("id","title_sel").text(name_sign);
		},
		function(){
			$("#switch-signs div.title").attr("id","").text("Scegli il segno");
		})
		$("#switch-signs div.cont_sign a").click(function(){
			var name_sign = $(this).attr("class");
			$.cookie('default_sign_checkbox', name_sign + '.' + segno_def_sel, {
				expires: 30, 
				path: '/',
				domain:'.corriere.it'    
			});
			window.location.href = "http://oroscopo.corriere.it/giorno/"+server_yyyy+"/"+name_sign+"/"+server_d_dd+"-"+server_m_mm+"-"+server_yyyy+".shtml";
			return false;
		});
		$("#header_menu_meth #menu_link_external a#box_oros_menu").click(function(){
			if(h_oros_m==0){
				window.location.href = $(this).attr("href");
			}
			else {
				$("#header_menu_meth #switch-signs").show();
			}
			return false;
		});
	}
})
