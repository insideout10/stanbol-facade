var precML = 0;

function init() {
	$("#succ").unbind("click");
	$("#prec").unbind("click");
	$(".page").unbind("click");

	//$("#listPages").css("visibility", "visible");

	$("#succ").css("visibility", "hidden");
	$("#prec").css("visibility", "hidden");
	if (parseInt($("#pageSelected").html()) > 1)
		$("#succ").css("visibility", "visible");

	//if (parseInt($("#listPages").css("marginLeft")) < 0)
    if (parseInt($("#pageSelected").html()) < $("#listPages").children().length)
		$("#prec").css("visibility", "visible");

	$("#prec").bind("click", function () {
		$("#succ").css("visibility", "visible");
		var ml = parseInt($("#listPages").css("marginLeft"));
		var iw = $(".itemPage").width();
		var cw = $("#container").width();
		var child = $("#listPages").children().length;
		var lp_ml = ml - iw;
		if (cw < ml + (child * iw)) {
			$("#listPages").animate({"marginLeft" : lp_ml }, 500, function () {
				/* la paginazione simula il click */
				var idx = parseInt($("#pageSelected").html()) + 1;
				//console.log("p idx:" + idx);
				$("#p_" + idx).click();
			});
		}
		if (cw == ml + ((child - 1) * iw))   $(this).css("visibility", "hidden");
		//return false;
	});

	$("#succ").bind("click", function () {
		$("#prec").css("visibility", "visible");		
		var lp_ml = parseInt($("#listPages").css("marginLeft")) + $(".itemPage").width();
		if (lp_ml <= 0) {
			$("#listPages").animate({"marginLeft" : lp_ml }, 500, function () {
				/* la paginazione simula il click */
				var idx = parseInt($("#pageSelected").html()) - 1;
				//console.log("s idx:" + idx);
				$("#p_" + idx).click();
			
			});
		}
		if (lp_ml == 0)   $(this).css("visibility", "hidden");
		//return false;
	});
	
	$(".page").bind("click", function () {
		precML = parseInt($("#listPages").css("marginLeft"));
		var page = parseInt($(this).html()) - 1;

		$("#contentSondaggi").load(getURL(page), "",  function () {
			$("#prec").css("visibility", "hidden");
			$("#succ").css("visibility", "hidden");
			$("#listPages").css("marginLeft", precML);
			init();
		});
		//return false;
	});

	$(".link_titolo").bind("click", function () {
		precML = parseInt($("#listPages").css("marginLeft"));
		$("#contentSondaggi").load(getURL(page), "", function () {
			$("#prec").css("visibility", "hidden");
			$("#succ").css("visibility", "hidden");
			$("#listPages").css("marginLeft", precML);
			init();
		});
	});
	
	
	if ( typeof idSondaggio != "undefined" ) {
		$("#sond_"+idSondaggio).css("display","none");
	}

	function getURL(page) {
		s = document.location.href.toString();
		var id = "0";
		if (s.indexOf("d_") > -1)
			id = "" + s.substring(s.indexOf("d_") + 2, s.lastIndexOf("."));
		if (s.indexOf("idSondaggio=") > -1)
			id = "" + s.substring(s.indexOf("idSondaggio=") + 12, s.lastIndexOf("#"));

		var url = "/appsSondaggi/sondaggiDispatch.do?method=loadN&id=" + id + "&page=" + page;
		if ( typeof path != "undefined" ) {
			url = "/appsSondaggi/" + path + "paginazione/page_" + idCategoria + "_" + page + ".shtml";
			if ( typeof from != "undefined" ) {
				url += "?from=" + from;
			}
		}
		return url;
	}
}



function reBind() {  // Non usiamo .live() perché nelle pagine dei sondaggi abbiamo jQuery 1.2.x
	$("#prec, #succ").unbind("click").bind("click", function() {
		$.ajax({
			url: $(this).attr("href"),
			success: function(html) {
				var htmlCorretto = html.replace(/[\u2018|\u2019|\u201A]/g, "\'");
				$("#contentSondaggi").html(htmlCorretto);
				aggiornaPrecSucc();
			}
		})
		return false;
	})
}
	$("#prec, #succ").unbind("click").live("click", function() {
		$.ajax({
			url: $(this).attr("href"),
			success: function(html) {
				var htmlCorretto = html.replace(/[\u2018|\u2019|\u201A]/g, "\'");
				$("#contentSondaggi").html(htmlCorretto);
				aggiornaPrecSucc();
			}
		})
		return false;
	})
function aggiornaPrecSucc() {
	var attuale = (parseInt($("#pageSelected").text() - 1)); // 0, 1, 2, 3
	if (attuale === 0) {
		$("#prec").show().attr("href", "/appsSondaggi/pages/corriere/paginazione/page_"+idCategoria+"_" + (attuale + 1) + ".shtml");
		$("#succ").hide();
	} else if (attuale === 3) {
		$("#prec").hide();
		$("#succ").show().attr("href", "/appsSondaggi/pages/corriere/paginazione/page_"+idCategoria+"_" + (attuale + 1) + ".shtml");
	} else {
		$("#prec").show().attr("href", "/appsSondaggi/pages/corriere/paginazione/page_"+idCategoria+"_" + (attuale + 1) + ".shtml");
		$("#succ").show().attr("href", "/appsSondaggi/pages/corriere/paginazione/page_"+idCategoria+"_" + (attuale + 1) + ".shtml");
	}
	//reBind();
}

if ($("#contentSondaggi").length > 0) {
	$.ajax({
		url: "/appsSondaggi/pages/corriere/paginazione/page_"+idCategoria+"_0.shtml",
		success: function(html) {
		var htmlCorretto = html.replace(/[\u2018|\u2019|\u201A]/g, "\'");
			$("#contentSondaggi").html(htmlCorretto);
			aggiornaPrecSucc();
			init();
		}
	})
}

// gestione dell'icona stampa in sperimentazione3.jsp
if (window.location.href.indexOf('sperimentazione3') > -1){
	$('a#print_tba').click(function(){
	var a = new String(window.location);
	a = a.replace('sperimentazione3','print_sperimentazione3');
	$('a#print_tba').attr({'href':a,'target':'_blank'});
	});
};
// gestione dell'icona stampa in psiconcologia
if (window.location.href.indexOf('psiconcologia') > -1){
	$('a#print_tba').click(function(){
	var p = new String(window.location);
	p = p.replace('shtml','html');
	$('a#print_tba').attr({'href':p,'target':'_blank'});
	});
};


// se ci son dei dd vuoti ci mette un a capo cosi non  appaio chiusi
$(function(){
		$('.anagrafica_centro dd').append('&nbsp;');
		$('div.box_psiconcologia_wide span.dato_reg').append(' /');
});