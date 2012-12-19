//   LIBRERIA PUBBLICITA' (/includes2007/static/js_libs/libreria_pubblicita-0.x.js)

/*  MJX.JS
    preso da /tools/includes/ads/mjx.js   */

/* 
if ((window.location != 'http://www.corriere.it/index.shtml?refresh_ce' ) && (window.location != 'http://www.corriere.it/' )) {
SCOMMENTARE  JS  IN CASO D I  SOVRACCARICO  ADS  PER DISATTIVARE ADS SU HP  */

//begin OAS Analytics

//configurazione
OAS_url = 'http://oas.rcsadv.it/RealMedia/ads/';
OAS_query = '?kw1='+location.href;
//fine configurazione


  var d=document;
  var OAS_rdl = '';
  var OAS_CA = 'N';
  if((d.referrer)&&(d.referrer!="[unknown origin]")) {
  	if(d.referrer.indexOf("?") == -1) {
    	OAS_rdl += '&tax23_RefDocLoc='+d.referrer.toString();
    }
	else {
    	var rdl=d.referrer;
        var rdl1=rdl.indexOf("?");
    	var rdl2=rdl.substring(0,rdl1);
    	OAS_rdl += '&tax23_RefDocLoc='+rdl2;
    }
  }

  function cookie_check(ifd,ife) {
  	var s=ife.indexOf(ifd);
    if(s==-1) return "";
    s+=ifd.length;
   	var e=ife.indexOf(";",s);
    if(e==-1)
    	e=ife.length;
    	return ife.substring(s,e);
  }
  
  function write_cookie() {
  	var d=new Date();
    var m=d.getTime();
    document.cookie="OAS_SC1="+m.toString()+";path=/;";
    var v=cookie_check("OAS_SC1=",document.cookie);
    if(v!=m.toString())
	   return false;
    d.setTime(m+3600000);
    	return true;
  }

  if(write_cookie())OAS_CA="Y";

if ((typeof(OAS_ADMX) != "undefined")|| (typeof(OAS_ADMX) != "undefined") ) {
mep1 = OAS_ADMX+'XE&'+ OAS_taxonomy + OAS_rdl + "&if_nt_CookieAccept=" + OAS_CA + OAS_ADMX2 +'&XE';
OAS_query += '&'+mep1;   
}else{
mep1 = 'XE&' + OAS_taxonomy + OAS_rdl + "&if_nt_CookieAccept=" + OAS_CA + '&XE';
OAS_query += '&'+mep1; 
}

OAS_rn = '001234567890'; OAS_rns = '1234567890';
OAS_rn = new String (Math.random()); OAS_rns = OAS_rn.substring (2, 11);
function OAS_NORMAL(pos) { 
document.write('<A HREF="' + OAS_url + 'click_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + OAS_query + '" TARGET=_x011>');
document.write('<IMG SRC="' + OAS_url + 'adstream_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + OAS_query + '" BORDER=0 ALT="Click!"></'+'A>');
}

JS_version = 11;
if (navigator.userAgent.indexOf('Mozilla/3') != -1) JS_version = 10;
if (JS_version >= 11) document.write('<sc'+'ript type="text/javascript" src="' + OAS_url + 'adstream_mjx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + OAS_query + '"></script>');
function OAS_AD(pos) {
if (JS_version >= 11) OAS_RICH(pos);
else OAS_NORMAL(pos);
}



//end of configuration

//end OAS Analytics


/*    }     SCOMMENTARE  JS  IN CASO D I  SOVRACCARICO  ADS  PER DISATTIVARE ADS SU HP  */


/*  fine MJX.JS  */



/*  FUNZIONE GSF PRESA DA VECCHI FOOTER PRE-2007 */
	var r = Math.random(); 
	var t = new Date(); 
	document.write("<img class='img_gsf_px' src='http://gsf.rcs.it/content/780.gif?t="+ t.getTime() + ";r=" + r + "'/>");

