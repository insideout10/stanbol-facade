document.write("<style type='text/css'> ");
document.write("#rspopup {margin: 3px; font-size: 12px; font-family: Arial; width: 160px; border-top: 1px solid #a4cbff; }");
document.write("#rspopup a { display:block; width:161px;color: black; text-decoration: none; } ");
document.write("#rspopup ul { margin: 0px;  } #rspopup li { list-style-type:none; margin:  0px; padding: 0px; padding-left: 2px; padding-top: 2px; } ");
document.write("#rspopup li.head {  width:160px;font-weight: 600;  text-align:left;  text-decoration:none;  background:#ffffff;  color:#000;  padding:0.25em;  margin-left:1px;  } ");
document.write("#rspopup .act { font-weight:bold; color:#000; } ");
document.write("#rspopup ul { margin: 0px; padding: 0px; } #rspopup a, #rspopup a:visited { background:#ffffff; color:#000; display:block; width:160px;  border:2px solid #a4cbff;  text-align:left;  text-decoration:none;  padding:0.25em;  } #rspopup a:hover { background-color: #a4cbff; }");
document.write("#rspopup a.actlink {  color:#000; background-image: url('http://media.readspeaker.com/images/enterprise/default/check.png'); background-repeat: no-repeat; background-position: 98% 3px; } ");
document.write("#bottomlinks { font-family:Arial;color:#333;font-size:11px; } #bottomlinks a {color:black;text-decoration : none;padding : 2px;} #bottomlinks a:hover {color:black;text-decoration : none;padding : 2px;background-color: #a4cbff; }");
document.write("</style>");

var defaultvalue="wordsent";
var defaultsurvive=360000000;

document.write("<style type='text/css'>");
document.write(" .sync_word_highlighted { background-color: #a4cbff; }");
document.write(" .sync_sent_highlighted { background-color: #beffd6; }");
document.write("</style>");

var readid=null;
var restorehtml=null;
var newhtml="";
var oldwordhl=null;
var oldsenthl=null;

function rshlsetContent(thecontent) {
  newhtml+=thecontent;
}

function rshlsetId(theid) {
  readid=theid;
}

function rshlinit() {
  var x=null;
  if (readid!=null) {
    x=document.getElementById(readid);
  }
  if (x!=null) {
    restorehtml=x.innerHTML;
    x.innerHTML=newhtml;
    newhtml="";
  }
}

function rshltidy() {
  var x=null;
  if (readid!=null) {
    x=document.getElementById(readid);
  }
  if (x!=null && restorehtml!=null) {
    x.innerHTML=restorehtml;
    restorehtml=null;
    readid=null;
  }
}

function rshlexit() {
  closepage('xpl');
}

function rshlsync(type,id) {
  var newEl = document.getElementById("sync"+id);
  if (newEl && newEl.className=="sync_sent") {
    if (oldsenthl) {
      oldsenthl.className = 'sync_sent';
    }
    oldsenthl=newEl;
    newEl.className = 'sync_sent_highlighted';
  }
  else if (newEl && newEl.className=="sync_word") {
    if (oldwordhl) {
      oldwordhl.className = 'sync_word';
    }
    oldwordhl=newEl;
    newEl.className = 'sync_word_highlighted';
  }
}

function readpage(rscall,playerid) {
  var thesync=loadSettings("ReadSpeakerHL");
  if (thesync=="")
    thesync=defaultvalue;
  var audioformat="mp3";

  if (thesync!='none')
    audioformat="swf";
  origrscall=rscall;
  rscall=rscall+"&audioformat="+audioformat+"&sync="+thesync;
  newrscall=escape(rscall);

  the_player="<table style='border:1px solid #aeaeae; font-size: 10px;'><tr><td>";
  the_player+="<OBJECT classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' style='height:20px; width:250px;'>";
  the_player+="<param name='movie' value='http://media.readspeaker.com/flash/readspeaker20.swf?"+audioformat+"="+newrscall+"&rskin=simple&autoplay=1&tips=1'>";
  the_player+="<param name='quality' value='high'><param name='autostart' value='true'>";
  the_player+="<param name='allowScriptAccess' value='always'><param name='bgcolor' value='#FFFFFF'>";
  the_player+="<param name='loop' value='false'>";
  the_player+="<EMBED src='http://media.readspeaker.com/flash/readspeaker20.swf?"+audioformat+"="+newrscall+"&rskin=simple&autoplay=1&tips=1'";
  the_player+=" allowScriptAccess='always' quality='high' autostart='true' bgcolor='#FFFFFF' style='height:20px; width:250px;' loop='false' type='application/x-shockwave-flash'";
  the_player+=" pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash' swliveconnect='true'>";
  the_player+="</EMBED></OBJECT>";
  the_html="<div id='bottomlinks'><a href='#' onclick='showcontrols(\""+origrscall+"\",\""+playerid+"\");return false'>Settaggi</a> | <a href='"+origrscall+"&save=1' target='rs'>Scarica l&apos;audio</a> | Vocalizzato da <a href='http://www.readspeaker.com'>ReadSpeaker</a></div>";
  the_html+="<div id='controls'></div>";
  the_html+="</td><td style='vertical-align: top;'><a href='#' onclick='closepage(\""+playerid+"\");return false'><img id='closebr' src='http://graphics.rspeak.com/images/wr/close.gif' border='0' alt='Chiudi il player'></a></td></tr></table>";
  var x=document.getElementById(playerid);
  if (x) {
    x.innerHTML=the_player+the_html;
  }
}

function closepage(playerid) {
  var x=document.getElementById(playerid);
  if (x) {
    x.innerHTML='';
  }
  rshltidy();
}

function saveSettings(name, content, lifetime) {
  lifetime=parseInt(eval(lifetime));  
  if (lifetime+""=="NaN") {
    tmpdate="";
  }
  else {
    var thedate = new Date();
    thedate.setTime(thedate.getTime() + lifetime);
    thedate=thedate.toGMTString();
    tmpdate="; expires="+thedate;
  }
  document.cookie=name+"="+escape(content)+tmpdate;
}

function loadSettings(ckname) {
  ckarr=document.cookie;
  cks=ckarr.split("; ");
  for (i=0;i<cks.length;i++) {
    cknameval=cks[i].split("=");
    if (cknameval[0]==ckname) {
      return unescape(cknameval[1]);
    }
  }
  return "";          
}

function setstyle(style) {
  saveSettings("ReadSpeakerHL",style,defaultsurvive);
  var x=document.getElementById('controls');
  if (x!=null)
    x.innerHTML="";
}

function showcontrols(rscall,playerid) {
  var x=document.getElementById('controls');
  if (x!=null && x.innerHTML!="") {
    x.innerHTML="";
    return false;
  }
  var thevalue=loadSettings("ReadSpeakerHL");
  if (thevalue=="")
    thevalue=defaultvalue;
  thestring="<div id='rspopup'><ul><li class='head'>Opzioni di highlighting</li>";
  thestring+="<li class="; if (thevalue=="wordsent") thestring+="'act'";
  thestring+="><a href='#' onclick='setstyle(\"wordsent\");closepage(\""+playerid+"\");readpage(\""+rscall+"\",\""+playerid+"\");return false;'"; if (thevalue=="wordsent") thestring+="class='actlink'"; thestring+=">Parole e frasi</a></li>";
  thestring+="<li class="; if (thevalue=="sent") thestring+="'act'";
  thestring+="><a href='#' onclick='setstyle(\"sent\");closepage(\""+playerid+"\");readpage(\""+rscall+"\",\""+playerid+"\");return false;'"; if (thevalue=="sent") thestring+="class='actlink'"; thestring+=">Solo frasi</a></li>";
  thestring+="<li class="; if (thevalue=="word") thestring+="act";
  thestring+="><a href='#' onclick='setstyle(\"word\");closepage(\""+playerid+"\");readpage(\""+rscall+"\",\""+playerid+"\");return false;'"; if (thevalue=="word") thestring+="class='actlink'"; thestring+=">Solo parole</a></li>";
  thestring+="<li class="; if (thevalue=="none") thestring+="act";
  thestring+="><a href='#' onclick='setstyle(\"none\");closepage(\""+playerid+"\");readpage(\""+rscall+"\",\""+playerid+"\");return false;'"; if (thevalue=="none") thestring+="class='actlink'"; thestring+=">Nessuna evidenziazione</a></li></ul></div>";
  var x=document.getElementById('controls');
  if (x!=null)
    x.innerHTML=thestring;
}

