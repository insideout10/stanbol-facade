$(document).ready(function(){
/*	$("#searchtool").submit(function(){
		var search = $.trim($("#searchtool > #search_val").attr("value"));
		if(search.length==0){
			alert("Inserire un criterio di ricerca");
			return false;
		}
		return true;
	});
*/
	$("#sbcolleft .serchfilter ul").each(function(){
		var num_li = $(this).find("li").length;
		$(this).find("li:lt(6)").css("display","block");
		if(num_li > 6){
			var id_ul = $(this).attr("id");
			var other_li = num_li - 6;
			$(this).after("<div class=\"opExt\"><a id=\"more-"+id_ul+"\" onclick=\"\" href=\"javascript:toggleMore('"+id_ul+"','more-"+id_ul+"','altri <span>(<strong>"+other_li+"</strong>)</span>','primi 5');\">altri <span>(<strong>"+other_li+"</strong>)</span></a></div>");		
		}
	});
});
function toggleMore(id, linkId, more, less) {
	var num_li_vis = $("#"+id).find("li:visible").length;
	var link = $("#"+linkId);
	if (num_li_vis < 7) {
		$("#"+id).find("li").css("display","block");
		if (link) {
			$(link).html(less);
		}
	} else {
		$("#"+id).find("li").css("display","none");
		$("#"+id).find("li:lt(6)").css("display","block");
		if (link) {
			$(link).html(more);
		}
	}
}
function cercanelsito() {
	/*var argomento = (self.document.forms['cerca'].q.value);
	var actionForm = (self.document.forms['siteSearch1'].action);
 	document.siteSearch1.ricerca_par.value=argomento;
	document.siteSearch1.action= actionForm + "?q=" + argomento;	
	document.siteSearch1.submit();*/
var valore="http://sitesearch.corriere.it/forward.jsp?q="+document.searchtool.search_val.value;
document.searchtool.action=valore;

}

//sull onLoad setSiteSearch per settare il valore del form superiore e inferiore (se c'è)

function mouseover(messaggio)
{
	window.status=messaggio;		    	
}
function loadAds(adsUrl)
{
	document.location.href = adsUrl;
}

function reOrder(order,direction) {
	document.siteSearchInternal.offsetss_par.value = 0;
	document.siteSearchInternal.ordss_par.value=order;
	document.siteSearchInternal.submit();
}

function changePage(page)
 {
 	displayForPage = document.siteSearchInternal.numss_par.value;
 	offset = (page * displayForPage) - displayForPage -1;
 	if(offset<0){
 		offset = 0;
 	}
	document.siteSearchInternal.adpage.value = page;
	document.siteSearchInternal.offsetss_par.value= offset;
	document.siteSearchInternal.submit();
}

function mediacenter_ricerca(str) {
 self.location = "http://mediacenter.corriere.it/MediaCenter/action/player?uuid="+str;
}

function LTrim( value ) {
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}
function RTrim( value ) {
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}
function trim( value ) {
	return LTrim(RTrim(value));
}

function mouseover(messaggio)
{
	window.status=messaggio;		    	
}
function loadAds(adsUrl)
{
	document.location.href = adsUrl;
}

function submitForm(formName){
	//alert("submitForm:"+formName);
	readyToGo=false;
	fullsearch=true;
	err=0
	if (parseDate(formName,"src_dal_giorno","src_dal_mese","src_dal_anno") && parseDate(formName,"src_al_giorno","src_al_mese","src_al_anno")){
		readyToGo=true
	}
	fulltext(formName);
	if((readyToGo && fullsearch==false) || (readyToGo==false && fullsearch && err==0) || (readyToGo==true && fullsearch==true) ){
		//eval("document."+formName+".submit()");
		return true
	}
	else{
		if(readyToGo==true){
			alert("E' necessario specificare un criterio di ricerca o un intervallo di tempo")
		}	
		
		if(readyToGo==false && err == 0 && fullsearch==false){
			alert("E' necessario specificare un criterio di ricerca o un intervallo di tempo")	
		}
		return false;
	}
}

function parseDate (formname,day,month,year) {
	dateOk=false;
	//test 
	monthfv=eval("document."+formname+"."+month+".options[document."+ formname +"."+month+".selectedIndex].value");
	dayfv=eval("document."+formname+"."+day+".value");
	yearbfv=eval("document."+formname+"."+year+".options[document."+formname+"."+year+".selectedIndex].value/4");

	if(eval("document."+formname+"."+year+".options[document."+formname+"."+year+".selectedIndex].value.length")!=0 || year=="eyear"){
		dateOk=true;
	if(eval("document."+formname+"."+day+".value.length")!=0){
		if(dayfv>31 || dayfv<1){
			alert("Controllare il valore immesso nel campo gg")
			err++;
			dateOk=false;
			return;
		}
		if(dayfv>28 && monthfv==2 && yearbfv!=parseInt(yearbfv)){
			err++;
			alert("Data errata");
			dateOk=false;
			return;
		}
		if(dayfv>29 && monthfv==2 && yearbfv==parseInt(yearbfv)){
			err++;
			alert("Data Errata");
			dateOk=false;
			return;
		}
		if(dayfv>30){
			if (monthfv==11 || monthfv==4 || monthfv==6 || monthfv==9){
				err++;
				dateOk=false;
				alert("Controllare il valore immesso nel campo gg");
				return;
			}
		}
	}
	}else{
		dateOk=false;
	}
	return dateOk;
}

function fulltext(formName){
	objForm = eval("document."+formName);
	//alert(formName + "  " + objForm)
	if (trim(objForm.searchand.value).length==0 && trim(objForm.searchor.value).length==0
		&& trim(objForm.searchtext.value).length==0 && trim(objForm.searchsign.value).length==0){
		fullsearch=false
	}
}

function invia(args){
	document.ricerca.action.value=args;
	document.ricerca.submit(); 
}  


function submitFormTestata(formName){
	readyToGo=false;
	fullsearch=true;
	err=0
	if (parseDate(formName,"src_dal_giorno","src_dal_mese","src_dal_anno") && parseDate(formName,"src_al_giorno","src_al_mese","src_al_anno")){
		readyToGo=true
	}

	if (trim(eval("document."+formName+".ricerca_par.value")).length==0){
		fullsearch=false;
	}


	if((readyToGo && fullsearch==false) || (readyToGo==false && fullsearch && err==0) || (readyToGo==true && fullsearch==true) ){
		return true
	}else{
		if(readyToGo==true){
			alert("E' necessario specificare un criterio di ricerca o un intervallo di tempo")
		}	
		if(readyToGo==false && err == 0 && fullsearch==false){
			alert("E' necessario specificare un criterio di ricerca o un intervallo di tempo")	
		}
		return false;
	}
}

function loadAdvancedSearch(){
	document.archivioTop.action = "http://archivio.corriere.it/archivio/index.jsp";
	document.archivioTop.submit();
}

function reOrderArchivio(order,direction) {
	document.archivioTop.ordas_par.value=order;
	document.archivioTop.ordasdir_par.value=direction;
	document.archivioTop.submit();
}

function changePageArchivio(page)
{
	displayForPage = document.archivioTop.numas_par.value;
	offset = (page * displayForPage) - displayForPage;

	if(offset<0){
		offset = 0;
	}

	document.archivioTop.adpage.value = page;
	document.archivioTop.offsetas_par.value= offset;
	document.archivioTop.submit();
}

function setOrderArchivio(sortby,direction){
	document.archivioTop.offsetas_par.value = 0;
	document.archivioTop.ordas_par.value = sortby;
	document.archivioTop.ordasdir_par.value = direction;
}

function clearFormArchivio(formName)
{
	objForm = eval("document."+formName);

	objForm.offsetas_par.value=0;
	objForm.src_testata_01.value="";
	objForm.src_testata_02.value="";
	objForm.src_testata_03.value="";
	objForm.src_testata_04.value="";
	objForm.src_testata_05.value="";
	objForm.src_testata_06.value="";
	objForm.searchor.value="";
	objForm.searchand.value="";
	objForm.searchtext.value="";
	objForm.searchsign.value="";
}



function submitFormNew(formName){
	//alert("submitForm:"+formName);
	readyToGo=false;
	fullsearch=true;
	err=0
	if (parseDate(formName,"src_dal_giorno","src_dal_mese","src_dal_anno") && parseDate(formName,"src_al_giorno","src_al_mese","src_al_anno")){
		readyToGo=true
	}
	fulltextnew(formName);
	if((readyToGo && fullsearch==false) || (readyToGo==false && fullsearch && err==0) || (readyToGo==true && fullsearch==true) ){
		objForm = eval("document."+formName);
		objForm.searchor.value="";
		objForm.searchand.value="";
		objForm.searchtext.value="";
		objForm.offsetas_par.value = 0;
		objForm.start.value = 0;

		if(objForm.dove_cercare[1].checked){
			objForm.searchor.value=objForm.cosa_cercare.value;
		}
		if(objForm.dove_cercare[0].checked){
			objForm.searchand.value=objForm.cosa_cercare.value;
		}
		if(objForm.dove_cercare[2].checked){
			objForm.searchtext.value=objForm.cosa_cercare.value;
		}
		//alert("" + objForm.searchor.value+" " + objForm.searchand.value +" " +objForm.searchtext.value)
		return true;
	}
	else{
		if(readyToGo==true){
			alert("E' necessario specificare un criterio di ricerca o un intervallo di tempo")
		}	
		
		if(readyToGo==false && err == 0 && fullsearch==false){
			alert("E' necessario specificare un criterio di ricerca o un intervallo di tempo")	
		}
		return false;
	}
}


function fulltextnew(formName){
	objForm = eval("document."+formName);
	//alert(formName + "  " + objForm)
	if (trim(objForm.cosa_cercare.value).length==0 &&  trim(objForm.searchsign.value).length==0){
		fullsearch=false;
	}
}


function changePageArchivioNew(page)
{
	objForm = eval("document.archivioTop");
	displayForPage = document.archivioTop.numas_par.value;
	offset = (page * displayForPage) - displayForPage;

	if(objForm.dove_cercare[1].checked){
			objForm.searchor.value=objForm.cosa_cercare.value;
		}
	if(objForm.dove_cercare[0].checked){
			objForm.searchand.value=objForm.cosa_cercare.value;
		}
	if(objForm.dove_cercare[2].checked){
			objForm.searchtext.value=objForm.cosa_cercare.value;
		}

	if(offset<0){
		offset = 0;
	}

	document.archivioTop.adpage.value = page;
	document.archivioTop.offsetas_par.value= offset;
	document.archivioTop.submit();
}


function setOrderArchivioNew(sortby,direction){
	document.archivioTop.offsetas_par.value = 0;
	document.archivioTop.ordas_par.value = sortby;
	document.archivioTop.ordasdir_par.value = direction;
}

function submitArchivioFormBox(formName){
	objForm = eval("document."+formName);
	objForm.searchor.value=objForm.cosa_cercare.value;

	if (objForm.cosa_cercare.value == "") {
		alert("E' necessario specificare almeno un carattere");
		return false;
	} else {
		return true;
	}
}