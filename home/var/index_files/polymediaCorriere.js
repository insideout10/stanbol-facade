














//prod
//#############################################
//##########  Global vars            ##########
//#############################################

var basePolymediaShowUrl = "http://static2.video.corriereobjects.it/widget/"; // modify this to the value of your installation
//var basePolymediaShowUrl = "http://localhost-video.gazzetta.it/RCS/Player/trunk/src/CorrierePolymediaShow/bin-debug/"; // modify this to the value of your installation

var allowedDomains="corriere.it,www.corriere.it,social.corriere.it,cinema-tv.corriere.it,video.corriere.it,corrieredelveneto.corriere.it,corrieredelmezzogiorno.corriere.it,roma.corriere.it,milano.corriere.it,corrieredibologna.corriere.it,corrierefiorentino.corriere.it,cucina.corriere.it,motori.corriere.it,olimpiadi.corriere.it";

var countWidget = 0;
var widgetToSynchronize = new Array();

var relJsPath = "js/";
//var relSwfPath = "";
var relSwfPath = "swf/";
var relImgPath = "img/";

var relConfPath = "content/conf/";
var relAdvPath = "content/adv/";
var relPlaylistPath = "content/playlist/";
var relVideoPath = "content/video/rss/";
var sidebarPath = "/widget/content/video/html/sidebar/";

var currentConfig = "";

//##########  Choose User Agent ##########
var ua = navigator.userAgent;
var isiPad = (ua.match(/iPad/i));
var device_event = isiPad ? "touchstart" : "click";
//device_event = "touchstart";

//#############################################
//##########  Nielsen Initialization ##########
//#############################################

var _nolggGlobalParams =
{
    clientid: "it-901600",
    vcid: "b01",
    cisuffix: "",
    sfcode: "it",
    prod: "sc",
	msgint: "10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%"
}

document.write('<script type="text/javascript" src="http://secure-it.imrworldwide.com/novms/js/2/ggcmb390.js"></scr' + 'ipt>'); 


var canUseSWF = false;
var uid = 0;
var gg1 = null;

function playerEventsDispatcher(eventCode, p1, p2, p3, p4) {
	if (gg1 == null)
	{
		try
		{
			gg1 =  new gg();
			gg1.ggInitialize(_nolggGlobalParams, uid, canUseSWF);
		} catch (e) {
		}
	}
    // TODO: dispatch event to other page function
    // dispatch to nielsen script
    if (gg1 != null) gg1.ggPM(eventCode, p1, p2, p3, p4);
    //alert('nielsen: code='+eventCode+', p1='+p1+', p2='+p2+', p3='+p3+', p4='+p4);
    
    /*
    if (document.getElementById("nielsen") != null)
    {
    	document.getElementById("nielsen").innerHTML += ("- gg1.ggPM(code="+eventCode+", p1="+escape(p1)+", p2="+escape(p2)+", p3="+escape(p3)+", p4="+escape(p4)+"); <br/>");
    }
    */
}

var ggs = new Array();

function playerEventsMultiDispatcher(playerId, eventCode, p1, p2, p3, p4) {
	var currentgg;
	currentgg = ggs[playerId];
	if (currentgg == null)
	{
		try
		{
			currentgg =  new gg();
			currentgg.ggInitialize(_nolggGlobalParams, uid, canUseSWF);
			ggs[playerId] = currentgg;
		} catch (e) {
		}
	}
    // TODO: dispatch event to other page function
    // dispatch to nielsen script
    if (currentgg != null) currentgg.ggPM(eventCode, p1, p2, p3, p4);
    //alert('nielsen: code='+eventCode+', p1='+p1+', p2='+p2+', p3='+p3+', p4='+p4);
    
    /*
    if (document.getElementById("nielsen") != null)
    {
    	document.getElementById("nielsen").innerHTML += ("- gg1.ggPM(code="+eventCode+", p1="+escape(p1)+", p2="+escape(p2)+", p3="+escape(p3)+", p4="+escape(p4)+"); <br/>");
    }
    */
}

//#############################################
//##########  Check flash version    ##########
//#############################################
// Major version of Flash required
var requiredMajorVersion = 10;
// Minor version of Flash required
var requiredMinorVersion = 0;
// Minor version of Flash required
var requiredRevision = 0;

// Version check for the Flash Player that has the ability to start Player Product Install (6.0r65)
var hasProductInstall = null;
// Version check based upon the values defined in globals
var hasRequestedVersion = null;

//#############################################
//##########  global functions       ##########
//############################################# 

function getPlaylistUrl(playlistId, playlistOrder)
{
	return basePolymediaShowUrl + relPlaylistPath + "playlist_" + playlistId + (playlistOrder != null ? "_" + playlistOrder : "_dateDesc") + ".rss";
}

function getVideoUrl(videoId)
{
	return basePolymediaShowUrl + relVideoPath + "video_" + videoId + ".rss";
}

function synchronizePlaylist(videoId, playerId) 
{
	for (i=0;i<widgetToSynchronize.length;i++) 
	{		
		widgetToSynchronize[i].sincronizza(videoId);
	}
	
	if(currentConfig == "10")
	{
		loadArticleText(videoId);	
	}

	try 
	{
		switch (playerId) 
		{
			case "1": LoadPlayerText1(videoId); break;
			case "2": LoadPlayerText2(videoId); break;
			case "3": LoadPlayerText3(videoId); break;
			case "4": LoadPlayerText4(videoId); break;
			case "5": LoadPlayerText5(videoId); break;
			case "6": LoadPlayerText6(videoId); break;
			case "7": LoadPlayerText7(videoId); break;
		}
	} catch (e) {}
}

function loadArticleText(videoId) 
{	
	try
	{
		$.ajax(
		{
			url: sidebarPath + 'sidebar_'+videoId+'.html',
			type: 'GET',
			data: 't=' + (new Date()).getTime(),
			dataType: 'html',
			cache: false,
			async: false,
			success: function (data){
							var em = document.getElementById('box_text');
							em.innerHTML = data;},
			error: function (data)
			{
			}
		});
	}
	catch(e)
	{
	}
}

//#############################################
//##########	Widget Player	     ##########
//#############################################

function CTVPlayer(configId, mainPlaylistId, mainPlaylistOrder, mainVideoId,  autoplay, showLogo, urlLogo, context, advChannel, playerId, writeOnDocument, popout, startAudioEnabled)
{
	this.idWidget = 'PolymediaCorriere'+(countWidget++);

	/* operazioni di creazione player */
	if (configId == null)
	{
		alert("Missing mandatory parameter");
	}
	
	currentConfig = configId;
	
	var width = 636;
	var height = 388;
	var flashVars = null;
	var configIdMod = configId;
	var configAdvLabel = "article";
	var configNielsenLabel = "article";
	//TODO: valorizzare flashvars configId e configLabel in accordo con la matrice fornita da RCS
	switch (configId)
	{
		case 0: case "0": width = 636; height = 388; configId="1"; configAdvLabel = "tv"; configNielsenLabel = "tv"; break; // TV
		case 1: case "1": width = 621; height = 380; configId="2"; break; // 620 article
		case 2: case "2": width = 300; height = 198; configId="3"; configAdvLabel = "mini"; configNielsenLabel = "mini"; break; // 300 mini
		case 3: case "3": width = 400; height = 255; configId="2"; break; // 400 article
		case 4: case "4": width = 398; height = 223; configId="4"; configAdvLabel = "embed"; configNielsenLabel = "embed"; break; // Facebook
		case 5: case "5": width = 636; height = 388; configId="6"; configAdvLabel = "livePopup"; configNielsenLabel = "livePopup"; break; // Live
		case 6: case "6": width = 400; height = 254; configId="2"; break; // Europei
		case 7: case "7": width = 300; height = 200; configId="5"; configAdvLabel = "live"; configNielsenLabel = "live"; break; // Live 300
		case 8: case "8": width = 400; height = 255; configId="5"; configAdvLabel = "live"; configNielsenLabel = "live"; break; // Live 400
		case 9: case "9": width = 620; height = 380; configId="6"; configAdvLabel = "livePopup"; configNielsenLabel = "livePopup"; break; // Live 620
		case 10: case "10": width = 622; height = 380; configId="1"; configIdMod = "0"; configAdvLabel = "tv"; configNielsenLabel = "tv"; break; // NightLive2012
		case 11: case "11": width = 398; height = 223; configId="4"; configAdvLabel = "embed"; configNielsenLabel = "embed"; basePolymediaShowUrl = "https://social.corriere.it/linked_webroots/video.corriere.it/widget/"; break; // Social
		case 12: case "12": width = 403; height = 256; configId="3_b"; configAdvLabel = "sport"; configNielsenLabel = "sport"; break; // CorriereSport	
	}
	
	if(device_event == "touchstart")
	{
		var loadUrl;
		if (mainVideoId != null &&  mainVideoId != "null" && mainVideoId != "")
		{
			loadUrl = getVideoUrl(mainVideoId);
			
		}else{
			if (mainPlaylistId != null && mainPlaylistId != "null" && mainPlaylistId != "")
			{
				loadUrl = getPlaylistUrl(mainPlaylistId, mainPlaylistOrder);
			}
		}
		if(loadUrl != null && loadUrl != "null" && loadUrl != "")
		{
			createPlayerHtml5(this.idWidget, loadUrl, width, height, autoplay);
		}
		
	}else{

		flashVars = "configId=" + configId;
		flashVars += "&configUrl=" + basePolymediaShowUrl + relConfPath + "PolymediaCorriere_" + configIdMod + ".xml";
		flashVars += "&allowDomains=" + allowedDomains;
		flashVars += "&configAdvLabel=" + configAdvLabel; 
		flashVars += "&configNielsenLabel=" + configNielsenLabel;
		if (mainPlaylistId != null && mainPlaylistId != "null")
		{
			flashVars += "&feedId=" + mainPlaylistId;
			flashVars += "&feedUrl=" + getPlaylistUrl(mainPlaylistId, mainPlaylistOrder);
		}
		if (mainVideoId != null && mainVideoId != "null" && mainVideoId != '')
		{
			flashVars += "&videoId=" + mainVideoId;
			flashVars += "&videoUrl=" + getVideoUrl(mainVideoId);
		}

		if (startAudioEnabled != null && startAudioEnabled != "null") flashVars += "&startAudioEnabled=" + startAudioEnabled;

		if (autoplay != null && autoplay != "null") flashVars += "&autostart=" + autoplay; 
		
		if (showLogo == null /* logo is visible for default */ || showLogo == true || showLogo == "true") 
		{
			if (urlLogo != null && urlLogo != "null")
			{
				flashVars += "&logo=" + urlLogo;
			}
			else
			{
				flashVars += "&logo=" + basePolymediaShowUrl + relImgPath + "logocorriere.png";
			}
		}
			
		if (context != null && context != "null")
		{
			if (context.indexOf('/') >= 0)
			{
				flashVars += "&channelName=" + context.substring(0, context.indexOf('/'));
				flashVars += "&subChannelName=" + context.substring(context.indexOf('/') + 1);
			}
			else flashVars += "&channelName=" + context;
		}

		if (advChannel != null && advChannel != "null") flashVars += "&advChannel=" + advChannel;
		if (popout != null) flashVars += "&popout=" + popout;
		var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
		if (isIE) flashVars += "&IEbrowser=" + isIE;
		
		var pid = "1";
		if(playerId != null) {
			pid = playerId;
		}
		
		flashVars += "&playerId=" + pid;
		
		flashVars += "&logoEmbed=" + basePolymediaShowUrl + relImgPath + "logocorriere.png";
		flashVars += "&baseVideoUrl=" + basePolymediaShowUrl + relVideoPath;
		flashVars += "&swfUrl=" + basePolymediaShowUrl + relSwfPath + "PolymediaCorriere.swf";
		
	//	HIDE DATE AND CHANNEL

	//	flashVars += "&showDateInfo="+"true";
	//	flashVars += "&showChannelInfo="+"false";

	//	RELATED TEXT

	//	flashVars += "&relatedText="+"PROVA CAMBIO";

		try {
			if (playerSessionUUID != null) flashVars += "&usession=" + playerSessionUUID;
		} catch (e) {}

		if (writeOnDocument != null && (writeOnDocument == false || writeOnDocument == "false")) {
			this.creationString = createWidget(this.idWidget, basePolymediaShowUrl + relSwfPath + 'PolymediaCorriere?v=20121213100923', flashVars, width, height, "string");
	//		this.creationString = createWidget(this.idWidget, basePolymediaShowUrl + relSwfPath + 'PolymediaCorriere', flashVars, width, height, "string");
		} else {
			createWidget(this.idWidget, basePolymediaShowUrl + relSwfPath + 'PolymediaCorriere?v=20121213100923', flashVars, width, height);
	//		createWidget(this.idWidget, basePolymediaShowUrl + relSwfPath + 'PolymediaCorriere', flashVars, width, height);
		}

		this.pause = function () {
			var _pl = document.getElementById(this.idWidget);
			if (_pl != null && _pl != undefined) _pl.pauseCommand();
		};
		this.resume = function () {
			var _pl = document.getElementById(this.idWidget);
			if (_pl != null && _pl != undefined) _pl.playCommand();
		};
		this.playVideo = function (videoId, autoPlay) {
			var _pl = document.getElementById(this.idWidget);
			if (_pl != null && _pl != undefined && videoId != null)
			{
				_pl.loadVideo(videoId, getVideoUrl(videoId), autoPlay);
			}
		};
		this.cambiaPlaylist = function (playlistId, playlistOrder, startVideoId) {
			var _pl = document.getElementById(this.idWidget);
			if (_pl != null && _pl != undefined && playlistId != null)
			{
				if (startVideoId != null) _pl.loadPlaylist(playlistId, getPlaylistUrl(playlistId, playlistOrder), startVideoId, getVideoUrl(startVideoId));
				else  _pl.loadPlaylist(playlistId, getPlaylistUrl(playlistId, playlistOrder));
			}
		};
		this.cambiaSfondo = function (bgColorDark, bgColorLight, bgColorAlpha) {
			var _pl = document.getElementById(this.idWidget);
			if (_pl != null && _pl != undefined) _pl.changeBackground(bgColorDark, bgColorAlpha, bgColorLight, bgColorAlpha);
		};
		
		this.getEmbedTag = function(width,height) {
			try {
				var _pl = document.getElementById(this.idWidget);
				return _pl.getEmbedCode(width,height);
			} catch (e) {
				return "";
			}
		};
	}
}

//######################################################
//##########  Utils function used by player   ##########
//######################################################

function getChannelIdByFeedName(feed)
{
	var channel = FEED_CHANNEL[feed];
	if (channel) 
	return channel.id;
	else
	return null;
}

function getChannelLabelByFeedName(feed)
{
	var channel = FEED_CHANNEL[feed];
	if (channel) 
	return channel.label;
	else
	return null;
}

//#####################################################################################
//##########  Resolve template id	    								     ##########
//##########  context_channel_label is optional  							 ##########
//##########  require a getNewsPaper function that return current newspaper  ##########
//#####################################################################################

function getAdvTemplate(feed, context_channel_label)
{
	var template_id, channel_id;
	template_id = FEED_TEMPLATE[feed];
	if(typeof(template_id)=="undefined"){ 
		if (typeof(context_channel_label)!="undefined" && context_channel_label!=null)
		{
			try {
				template_id = CHANNEL_TEMPLATE[context_channel_label];
			} catch (e) {}
		}		
		if(typeof(template_id)=="undefined") 
		{
			var channel = FEED_CHANNEL[feed];
			if (typeof(channel)!="undefined" && channel!=null)
			{
				try {
					template_id = CHANNEL_TEMPLATE[channel.label];
				} catch (e) {}
			}
			if(typeof(template_id)=="undefined") 
			{
				try {
					var np = getSite();
					template_id = NEWSPAPER_TEMPLATE[np];
				} catch (e) {}
					
				if(typeof(template_id)=="undefined") 
				{
					template_id = null;
				}
			}
		}
	}
	return template_id;
}

//#############################################
//######  Player HTML 5 creation utils   ######
//#############################################

function createPlayerHtml5(idWidget, loadVideoUrl, width, height, autoplay)
{
	var out = "";
	out = "<video id='"+idWidget+"' width='"+width+"' height='"+height+"' controls/></video>";
	document.write(out);
	initPlayer(idWidget, loadVideoUrl, autoplay);
}

//#############################################
//##########  Flash creation utils   ##########
//#############################################

var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function PolymediaWidgetControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function PolymediaWidgetGetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");			
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			} else if (versionRevision[0] == "b") {
				versionRevision = versionRevision.substring(1);
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = PolymediaWidgetControlVersion();
	}
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function PolymediaWidgetDetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = PolymediaWidgetGetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function PolymediaWidgetAC_AddExtension(src, ext)
{
  var qIndex = src.indexOf('?');
  if ( qIndex != -1)
  {
    // Add the extention (if needed) before the query params
    var path = src.substring(0, qIndex);
    if (path.length >= ext.length && path.lastIndexOf(ext) == (path.length - ext.length))
      return src;
    else
      return src.replace(/\?/, ext+'?'); 
  }
  else
  {
    // Add the extension (if needed) to the end of the URL
    if (src.length >= ext.length && src.lastIndexOf(ext) == (src.length - ext.length))
      return src;  // Already have extension
    else
      return src + ext;
  }
}

function PolymediaWidgetAC_Generateobj(objAttrs, params, embedAttrs) 
{ 
    var str = '';
    if (isIE && isWin && !isOpera)
    {
  		str += '<object ';
  		for (var i in objAttrs)
  			str += i + '="' + objAttrs[i] + '" ';
  		str += '>';
  		for (var i in params)
  			str += '<param name="' + i + '" value="' + params[i] + '" /> ';
  		str += '</object>';
    } else {
  		str += '<embed ';
  		for (var i in embedAttrs)
  			str += i + '="' + embedAttrs[i] + '" ';
  		str += '> </embed>';
    }

    return str;
}

function PolymediaWidgetAC_FL_RunContent(){
  var ret = 
    PolymediaWidgetAC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  return PolymediaWidgetAC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function PolymediaWidgetAC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = PolymediaWidgetAC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "id":
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}

function createWidget(idWidget,src,params,width,height,outputFormat)
{
	if (hasProductInstall == null) hasProductInstall = PolymediaWidgetDetectFlashVer(6, 0, 65) ;
	if (hasRequestedVersion == null) hasRequestedVersion = PolymediaWidgetDetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);
	
	var out = "";
	
	// Check to see if a player with Flash Product Install is available and the version does not meet the requirements for playback
	if (hasProductInstall && !hasRequestedVersion ) {
	   // MMdoctitle is the stored document.title value used by the installation process to close the window that started the process
	   // This is necessary in order to close browser windows that are still utilizing the older version of the player after installation has completed
	   // DO NOT MODIFY THE FOLLOWING FOUR LINES
	   // Location visited after installation is complete if installation is required
	   var MMPlayerType = (isIE == true) ? "ActiveX" : "PlugIn";
	   var MMredirectURL = encodeURI(window.location);
	   document.title = document.title.slice(0, 47) + " - Flash Player Installation";
	   var MMdoctitle = document.title;

	   out = PolymediaWidgetAC_FL_RunContent(
		   "src", basePolymediaShowUrl + relSwfPath + "playerProductInstall",
		   "flashVars", "MMredirectURL="+MMredirectURL+"&MMplayerType="+MMPlayerType+"&MMdoctitle="+MMdoctitle+"",
		   "width", "100%",
		   "height", "100%",
		   "align", "middle",
		   "id", "playerProductInstall",
		   "quality", "high",
		   "bgcolor", "#869ca7",
		   "name", "playerProductInstall",
		   "allowScriptAccess","sameDomain",
		   "type", "application/x-shockwave-flash",
		   "pluginspage", "http://www.adobe.com/go/getflashplayer"
	   );
	} else if (hasRequestedVersion) {
	   // if we've detected an acceptable version
	   // embed the Flash Content SWF when all tests are passed
		out = PolymediaWidgetAC_FL_RunContent(
				"src", src,
				"FlashVars", params,
				"width", width,
				"height", height,
				"align", "middle",
				"id", idWidget,
				"quality", "high",
				"name", idWidget,
				"wmode", "transparent",
				"bgcolor","#000000",
				"allowFullScreen", "true",
				"allowScriptAccess","always",
				"type", "application/x-shockwave-flash",
				"pluginspage", "http://www.adobe.com/go/getflashplayer"
		);
	 } else {  // flash is too old or we can't detect the plugin
	   out = 'Questo contenuto richiede Adobe Flash Player. '
		  + '<a href=http://www.adobe.com/go/getflash/>Clicca QUI per installare Flash</a>';
	 }
	 if (outputFormat != null && outputFormat == "string") {
		 return out;
	 } else {
		 document.write(out);
	 }
}




/* OLD FUNCTIONS */

//#########################################
//##########	Widget Vetrina	 ##########
//#########################################
function Vetrina(confId, title, playlistId, playlistOrder, bgColorDark, bgColorLight, bgAlpha, bgTitColor, bgTitFont, enabledArrow, disabledArrow) {
	this.idWidget = 'CorriereShowcaseWidget'+(countWidget++);
	this.confId = (confId == null ? 4 : confId);
	this.title = title;
	this.playlist = playlistId;
	this.order = playlistOrder;
	this.alpha = "FF";
	if (bgAlpha != null)
	{
		var per = (bgAlpha/100) * 255;
		var first = (per / 16);
		var second = (per % 16);
		switch (first) {
			case 15: this.alpha = "F"; break;
			case 14: this.alpha = "E"; break;
			case 13: this.alpha = "D"; break;
			case 12: this.alpha = "C"; break;
			case 11: this.alpha = "B"; break;
			case 10: this.alpha = "A"; break;
			default: this.alpha = "" + first; break;
		}
		switch (second) {
			case 15: this.alpha += "F"; break;
			case 14: this.alpha += "E"; break;
			case 13: this.alpha += "D"; break;
			case 12: this.alpha += "C"; break;
			case 11: this.alpha += "B"; break;
			case 10: this.alpha += "A"; break;
			default: this.alpha += second; break;
		}
	}
	
	if (bgColorDark!=null)
		this.bgColorDark = bgColorDark + this.alpha;
	else
		this.bgColorDark = "#cececeff";
	if (bgColorLight!=null)
		this.bgColorLight = bgColorLight + this.alpha;	
	else
		this.bgColorLight = "#ffffffff";
	if (bgTitColor!=null)
		this.bgTitColor = bgTitColor;
	else
		this.bgTitColor = "#8C8C8C";
	if (bgTitFont!=null)
		this.bgTitFont = bgTitFont;	
	else
		this.bgTitFont = "#424141";	
	if(enabledArrow!=null)
		this.enabledArrow = enabledArrow;
	else
		this.enabledArrow = "#383939";
	if(disabledArrow!=null)
		this.disabledArrow = disabledArrow;
	else
		this.disabledArrow = "#b4b4b4";
	
	var click = 'local://page/clickVideo?$[video_id]%26$[channel_name]';
	
	var srcFlash = basePolymediaShowUrl+relSwfPath+'CorriereShowcaseWidget?v=20120531040944';
	var params = 'numItem='+this.confId+'&title='+this.title+'&bgColorDark='+this.bgColorDark+'&bgColorLight='+this.bgColorLight+'&titleBackground='+this.bgTitColor+'&titleColor='+this.bgTitFont+'&onClickFunction='+click+'&ArrowColorSelected='+this.enabledArrow+'&ArrowColorUNSelected='+this.disabledArrow;
	params += "&allowDomains=" + allowedDomains;
	if (playlistId != null) params += '&playlist='+getPlaylistUrl(playlistId, playlistOrder);
	
	var width = (this.confId == 4 ? 980 : 650);
	var height = 190;

	createWidget(this.idWidget,srcFlash,params,width,height);	

	this.cambiaTitolo = function (title) {		
		if (title != this.title) {					
			document.getElementById(this.idWidget).changeTitle(title);
			this.title = title;
		}
	};
	this.cambiaPlaylist = function (playlistId, playlistOrder) {
		if (playlistId != this.playlist || (playlistOrder != null && playlistOrder != this.order)) {
			if (playlistOrder == null) playlistOrder = 'dateDesc';
			var playlist = getPlaylistUrl(playlistId, playlistOrder);
			document.getElementById(this.idWidget).changePlaylist(playlist);		
			this.playlist = playlistId;
		}
	};
	this.cambiaSfondo = function (bgColorDark, bgColorLight, bgAlpha) {
		this.alpha = "FF";
		if (bgAlpha != null)
		{
			var per = (bgAlpha/100) * 255;
			var first = (per / 16);
			var second = (per % 16);
			switch (first) {
				case 15: this.alpha = "F"; break;
				case 14: this.alpha = "E"; break;
				case 13: this.alpha = "D"; break;
				case 12: this.alpha = "C"; break;
				case 11: this.alpha = "B"; break;
				case 10: this.alpha = "A"; break;
				default: this.alpha = "" + first; break;
			}
			switch (second) {
				case 15: this.alpha += "F"; break;
				case 14: this.alpha += "E"; break;
				case 13: this.alpha += "D"; break;
				case 12: this.alpha += "C"; break;
				case 11: this.alpha += "B"; break;
				case 10: this.alpha += "A"; break;
				default: this.alpha += second; break;
			}
		}
		
		if (bgColorDark!=null)
			this.bgColorDark = bgColorDark + this.alpha;
		else
			this.bgColorDark = "#cececeff";
		if (bgColorLight!=null)
			this.bgColorLight = bgColorLight + this.alpha;	
		else
			this.bgColorLight = "#ffffffff";

		document.getElementById(this.idWidget).changeBackground(this.bgColorDark,this.bgColorLight);
	};
}

//########################################
//##########	Widget Visti	##########
//########################################
function Visti(confId, playlistId, bgColorDark, bgColorLight, bgAlpha, bgTitColor, bgTitFont, bgTitFontSelected, enabledArrow, disabledArrow) {
	
	this.idWidget = 'Visti'+(countWidget++);
	this.playlist = playlistId;
	this.confId = (confId!=null) ? confId : 3;
	
	this.alpha = "FF";
	if (bgAlpha != null)
	{
		var per = (bgAlpha/100) * 255;
		var first = (per / 16);
		var second = (per % 16);
		switch (first) {
			case 15: this.alpha = "F"; break;
			case 14: this.alpha = "E"; break;
			case 13: this.alpha = "D"; break;
			case 12: this.alpha = "C"; break;
			case 11: this.alpha = "B"; break;
			case 10: this.alpha = "A"; break;
			default: this.alpha = "" + first; break;
		}
		switch (second) {
			case 15: this.alpha += "F"; break;
			case 14: this.alpha += "E"; break;
			case 13: this.alpha += "D"; break;
			case 12: this.alpha += "C"; break;
			case 11: this.alpha += "B"; break;
			case 10: this.alpha += "A"; break;
			default: this.alpha += second; break;
		}
	}
	
	this.bgAlpha = (bgAlpha != null) ? bgAlpha : 100;
	
	if (bgColorDark!=null)
		this.bgColorDark = bgColorDark + this.alpha;
	else 
		this.bgColorDark = "#cececeff";
	if (bgColorLight!=null)
		this.bgColorLight = bgColorLight + this.alpha;	
	else
		this.bgColorLight = "#FFFFFFff";
	
	if (bgTitColor!=null)
		this.bgTitColor = bgTitColor;
	else
		this.bgTitColor = "#8C8C8C";
		
	if (bgTitFont!=null)
		this.bgTitFont = bgTitFont;	
	else
		this.bgTitFont = "#D6D2D2";
		
	if (bgTitFontSelected!=null)
		this.bgTitFontSelected = bgTitFontSelected;
	else
		this.bgTitFontSelected = "#424141";
	
	if(enabledArrow!=null)
		this.enabledArrow = enabledArrow;
	else
		this.enabledArrow = "#383939";
	if(disabledArrow!=null)
		this.disabledArrow = disabledArrow;
	else
		this.disabledArrow = "#b4b4b4";	
	
	var click = 'local://page/clickVideo?$[video_id]%26$[channel_name]';

	var srcFlash = basePolymediaShowUrl+relSwfPath+'CorrierePiuVistiPiuVotatiWidget?v=20120531040943';	
	var params = 'confID='+this.confId+'&bgColorDark='+this.bgColorDark+'&bgColorLight='+this.bgColorLight+'&bgAlpha='+this.bgAlpha+'&bgTitColor='+this.bgTitColor+'&TitColor='+this.bgTitFont+'&TitColorSelected='+this.bgTitFontSelected+'&onClickFunction='+click+'&ArrowColorSelected='+this.enabledArrow+'&ArrowColorUNSelected='+this.disabledArrow;
	params += "&allowDomains=" + allowedDomains;
	if (playlistId != null) {
		params += '&playlist1='+getPlaylistUrl(playlistId, "viewsDesc");
		params += '&playlist2='+getPlaylistUrl(playlistId, "votesDesc"); 		
	}	
	
	var width;
	var height;
	
	switch(this.confId)
	{
		case 2:
			width=320;
			height=190;
		break;
		case 3:
			width=320;
			height=255;
		break;
		case 4:
			width=320;
			height=321;
		break;
		case 7:
			width=320;
			height=511;
		break;
	}
	
	createWidget(this.idWidget,srcFlash,params,width,height);	
	
	this.cambiaPlaylist = function (playlistId) {
		if (playlistId != this.playlist) {
			var playlist1 = getPlaylistUrl(playlistId, "viewsDesc");
			var playlist2 = getPlaylistUrl(playlistId, "votesDesc"); 			
				
			document.getElementById(this.idWidget).changePlaylist(playlist1,playlist2);		
			this.playlist = playlistId;
		}
	};	
	this.cambiaSfondo = function (bgColorDark, bgColorLight, bgAlpha) {
		this.alpha = "FF";
		if (bgAlpha != null)
		{
			var per = (bgAlpha/100) * 255;
			var first = (per / 16);
			var second = (per % 16);
			switch (first) {
				case 15: this.alpha = "F"; break;
				case 14: this.alpha = "E"; break;
				case 13: this.alpha = "D"; break;
				case 12: this.alpha = "C"; break;
				case 11: this.alpha = "B"; break;
				case 10: this.alpha = "A"; break;
				default: this.alpha = "" + first; break;
			}
			switch (second) {
				case 15: this.alpha += "F"; break;
				case 14: this.alpha += "E"; break;
				case 13: this.alpha += "D"; break;
				case 12: this.alpha += "C"; break;
				case 11: this.alpha += "B"; break;
				case 10: this.alpha += "A"; break;
				default: this.alpha += second; break;
			}
		}
		
		if (bgColorDark!=null)
			this.bgColorDark = bgColorDark + this.alpha;
		else
			this.bgColorDark = "#cececeff";
		if (bgColorLight!=null)
			this.bgColorLight = bgColorLight + this.alpha;	
		else
			this.bgColorLight = "#ffffffff";

		document.getElementById(this.idWidget).changeBackground(this.bgColorDark,this.bgColorLight);
	}
}

//########################################
//######  Playlist Ridotta Sport	######
//########################################

function SportPlaylistRidotta(playlistId, playlistOrder, writeOnDocument, version) {
	
	this.idWidget = 'PlaylistRidotta'+(countWidget++);	
	widgetToSynchronize[widgetToSynchronize.length] = this;
	this.playlist = playlistId;
	this.order = playlistOrder;	
	
	var click = 'local://page/clickVideo?$[video_id]%26$[channel_name]';
	
	//var srcFlash = basePolymediaShowUrl+relSwfPath+'SportPlaylistRidotta?v=20120531040949';
	var srcFlash = basePolymediaShowUrl+relSwfPath+'SportPlaylistRidotta';
	var params = 'onClickFunction='+click+"&allowDomains=" + allowedDomains;
	if (playlistId != null) params += '&playlist='+getPlaylistUrl(playlistId, playlistOrder);
	if (version != null) {
		switch (version) {
			case "levoni":
				params += "&colorArrow=#339966&colorBoxTitle=#339966&colorTextHighlight=#ffffff&colorItemSelectedHighlight=#ababab";
				break;
		}
	}
	
	if (writeOnDocument != null && (writeOnDocument == false || writeOnDocument == "false")) {
		this.creationString = createWidget(this.idWidget,srcFlash,params,'294','79',"string");
	} else {
		createWidget(this.idWidget,srcFlash,params,'294','79');
	}
			
	this.cambiaPlaylist = function (playlistId, playlistOrder) {
		if (playlistId != this.playlist && playlistOrder != this.order && playlistId != null) {
			var playlist = getPlaylistUrl(playlistId, playlistOrder);
			document.getElementById(this.idWidget).changePlaylist(playlist);
			this.playlist = playlistId;
			this.order = playlistOrder;		
		}
	};
	this.sincronizza = function (videoId) {
		document.getElementById(this.idWidget).synchronizePlaylist(videoId);
	}
}

//########################################
//######  Playlist Estesa Sport	    ######
//########################################

function SportPlaylistEstesa(playlistId, playlistOrder, teamImage, sintesiId, sintesiOrder, writeOnDocument) {
	
	this.idWidget = 'PlaylistEstesa'+(countWidget++);	
	widgetToSynchronize[widgetToSynchronize.length] = this;
	this.teamImage = teamImage;
	this.playlist = playlistId;
	this.order = playlistOrder;	
	this.sintesiId = sintesiId;
	this.sintesiOrder = sintesiOrder;
	if (sintesiId != null) this.type = 'sintesi';
	else if (teamImage != null) this.type = 'squadra';
	else { 
		alert('Missing parameter!');
		return;
	}
	
	var click = 'local://page/clickVideo?$[video_id]%26$[channel_name]';
	
	//var srcFlash = basePolymediaShowUrl+relSwfPath+'SportPlaylistEstesa?v=20120531040948';
	var srcFlash = basePolymediaShowUrl+relSwfPath+'SportPlaylistEstesa';
	var params = 'urlImage='+teamImage+'&sintesi='+(this.type == 'sintesi' ? 'si' : 'no')+'&onClickFunction='+click+"&allowDomains=" + allowedDomains;
	if (playlistId != null) params += '&playlist='+getPlaylistUrl(playlistId, playlistOrder);
	if (sintesiId != null) params += '&playlistSintesi='+getPlaylistUrl(sintesiId, sintesiOrder);
	
	if (writeOnDocument != null && (writeOnDocument == false || writeOnDocument == "false")) {
		this.creationString = createWidget(this.idWidget,srcFlash,params,'618','140',"string");
	} else {
		createWidget(this.idWidget,srcFlash,params,'618','140');
	}	
	
	this.cambiaPlaylistSquadra = function (teamImage, playlistId, playlistOrder) {
		if (teamImage != this.teamImage) {
			document.getElementById(this.idWidget).changeImage(teamImage);
			this.teamImage = teamImage;					
		}
		if (playlistId != null && (playlistId != this.playlist || playlistOrder != this.order)) {
			var playlist = getPlaylistUrl(playlistId, playlistOrder);
			document.getElementById(this.idWidget).changePlaylist(playlist);		
			this.playlist = playlistId;
			this.order = playlistOrder;
		}
		this.type = 'squadra';
		document.getElementById(this.idWidget).changeSintesi('no');
	};
	this.cambiaPlaylistSerie = function (playlistId, playlistOrder, sintesiId, sintesiOrder) {
		if (playlistId != null && (playlistId != this.playlist || playlistOrder != this.order)) {
			var playlist = getPlaylistUrl(playlistId, playlistOrder);
			document.getElementById(this.idWidget).changePlaylist(playlist);		
			this.playlist = playlistId;
			this.order = playlistOrder;
		}
		if (sintesiId != null && (sintesiId != this.sintesiId || sintesiOrder != this.sintesiOrder)) {
			var playlist = getPlaylistUrl(sintesiId, sintesiOrder);
			document.getElementById(this.idWidget).changePlaylistSintesi(playlist);		
			this.sintesiId = sintesiId;
			this.sintesiOrder = sintesiOrder;
		}
		this.type = 'sintesi';
		document.getElementById(this.idWidget).changeSintesi('si');
	};
	this.sincronizza = function (videoId) {
		document.getElementById(this.idWidget).synchronizePlaylist(videoId);
	}
}

//########################################
//######  Playlist Estesa Sport	Premier ##
//########################################

function SportPlaylistEstesaPremier(playlistId, playlistOrder, writeOnDocument) {
	
	this.idWidget = 'PlaylistEstesaPremier'+(countWidget++);	
	widgetToSynchronize[widgetToSynchronize.length] = this;
	this.playlist = playlistId;
	this.order = playlistOrder;	
		
	var click = 'local://page/clickVideo?$[video_id]%26$[channel_name]';
	
	var srcFlash = basePolymediaShowUrl+relSwfPath+'SportPlaylistEstesaPremier?v=[an error occurred while processing this directive]';
	//var srcFlash = "http://localhost-video.gazzetta.it/RCS/Widgets/trunk/src/CorriereSportPlaylistEstesaPremier/bin-debug/"+relSwfPath+'SportPlaylistEstesaPremier';
	var params = 'onClickFunction='+click+"&allowDomains=" + allowedDomains;
	if (playlistId != null) params += '&playlist='+getPlaylistUrl(playlistId, playlistOrder);
	
	if (writeOnDocument != null && (writeOnDocument == false || writeOnDocument == "false")) {
		this.creationString = createWidget(this.idWidget,srcFlash,params,'618','140',"string");
	} else {
		createWidget(this.idWidget,srcFlash,params,'618','140');
	}	
	
	this.cambiaPlaylist = function (playlistId, playlistOrder) {
		if (playlistId != this.playlist && playlistOrder != this.order && playlistId != null) {
			var playlist = getPlaylistUrl(playlistId, playlistOrder);
			document.getElementById(this.idWidget).changePlaylist(playlist);
			this.playlist = playlistId;
			this.order = playlistOrder;		
		}
	};
	this.sincronizza = function (videoId) {
		document.getElementById(this.idWidget).synchronizePlaylist(videoId);
	}
}
