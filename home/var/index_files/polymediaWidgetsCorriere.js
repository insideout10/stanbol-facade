














//#############################################
//##########	Widget Player	     ##########
//#############################################

function Player(configId, mainPlaylistId, mainPlaylistOrder, mainVideoId, bgColorDark, bgColorLight, bgColorAlpha, enabledArrow, disabledArrow, autoplay, showLogo, urlLogo, showHeader, showPlaylist, showCorrelati, context, advChannel, playerId, writeOnDocument, popout, startAudioEnabled)
{
	this.idWidget = 'CorrierePolymediaShow'+(countWidget++);

	/* operazioni di creazione player */
	if (configId == null)
	{
		alert("Missing mandatory parameter");
	}
	
	currentConfig = configId;
	
	var width = 650;
	var height = 642;
	var flashVars = null;
	var configIdMod = configId;
	var configAdvLabel = "article";
	var configNielsenLabel = "article";
	//TODO: valorizzare flashvars configId e configLabel in accordo con la matrice fornita da RCS
	switch (configId)
	{
		case 0: case "0": width = 650; height = 480; configAdvLabel = "tv"; configNielsenLabel = "ricerca"; configId="1"; break;
		case 1: case "1": 
			width = 650; 
			height = 642; 
			configAdvLabel = "tv"; 
			configNielsenLabel = "tv"; 
			configId="1"; 
			if (showPlaylist != null && (showPlaylist == false || showPlaylist == "false")) {
				height = 471; 
				configIdMod = "1a";
			}
			break;
		case 2: case "2": 
			width = 190; 
			if (showHeader != null && (showHeader == true || showHeader == "true")) { 
				height = 140;
				configIdMod = "2b";
			} else {
				height = 124;
				configIdMod = "2a";
			} 
			configId="2";
			break;
		case 3: case "3":
			width = 300; 
			if (showHeader != null && (showHeader == true || showHeader == "true")) { 
				height = 212;
				configIdMod = "3b";
			} else {
				height = 191;
				configIdMod = "3a";
			}
			if (showPlaylist != null && (showPlaylist == true || showPlaylist == "true")) {
				height += 64;
				configIdMod += "p";
				configAdvLabel = "mini"; 
				configNielsenLabel = "mini";
				configId="3";
			} else configId="2";
			break;
		case 4: case "4":
			width = 400; 
			if (showHeader != null && (showHeader == true || showHeader == "true")) { 
				height = 269;
				configIdMod = "4b";
			} else {
				height = 246;
				configIdMod = "4a";
			}
			configId="2";
			break;
		case 5: case "5":
			width = 620; 
			if (showHeader != null && (showHeader == true || showHeader == "true")) { 
				height = 399;
				configIdMod = "5b";
			} else {
				height = 370;
				configIdMod = "5a";
			}
			configId="2";
			break;
		case 6: case "6": 
			width = 618; 
			height = 376; 
			configId="3_b"; 
			configAdvLabel = "mini"; 
			configNielsenLabel = "mini";
			break;
		case "6p": 
			width = 618; 
			height = 376; 
			configId="3_b"; 
			configAdvLabel = "mini"; 
			configNielsenLabel = "mini";
			break;
		case 7: case "7": 
			width = 302; 
			height = 195; 
			configId="3"; 
			configAdvLabel = "mini"; 
			configNielsenLabel = "mini";
			break;
		case "7p": 
			width = 302; 
			height = 195; 
			configId="3"; 
			configAdvLabel = "mini"; 
			configNielsenLabel = "mini";
			break;
		case 8: case "8": case "audio": 
			width = 300; 
			height = 48; 
			configIdMod = "audio";
			configAdvLabel = "audio"; 
			configNielsenLabel = "audio";
			configId="2";
			break;
		case 9: case "9":
			width = 512;
			height = 307;
			configIdMod = "4a";
			configId="2";
			break;
		case "9s":
			width = 471;
			height = 282;
			configIdMod = "4a";
			configId="2";
			break;
		case 10: case "10":
			width = 636;
			height = 382;
			configIdMod = "10";
			configId="10";
			break;
		case 11: case "11": 
			width = 618; 
			height = 376; 
			configId="11"; 
			configAdvLabel = "mini"; 
			configNielsenLabel = "mini";
			break;	
		case 12: case "12": 
			width = 620; 
			height = 370; 
			configAdvLabel = "tv"; 
			configNielsenLabel = "tv"; 
			configId="1"; 
			break;
		case "levoni": 
			width = 294; 
			height = 197; 
			configId="3"; 
			configAdvLabel = "mini"; 
			configNielsenLabel = "mini";
			break;
		case "live2": 
			width = 190; 
			if (showHeader != null && (showHeader == true || showHeader == "true")) { 
				height = 140;
				configIdMod = "live_2b";
			} else {
				height = 124;
				configIdMod = "live_2a";
			} 
			configId="5";
			break;
		case "live3":
			width = 300; 
			if (showHeader != null && (showHeader == true || showHeader == "true")) { 
				height = 212;
				configIdMod = "live_3b";
			} else {
				height = 191;
				configIdMod = "live_3a";
			}
			configId="5";
			break;
		case "live4":
			width = 400; 
			if (showHeader != null && (showHeader == true || showHeader == "true")) { 
				height = 269;
				configIdMod = "live_4b";
			} else {
				height = 246;
				configIdMod = "live_4a";
			}
			configId="5";
			break;
		case "live5":
			width = 620; 
			if (showHeader != null && (showHeader == true || showHeader == "true")) { 
				height = 399;
				configIdMod = "live_5b";
			} else {
				height = 370;
				configIdMod = "live_5a";
			}
			configId="5";
			break;
		case "nightlive": 
			width = 670; 
			height = 664; 
			configAdvLabel = "tv"; 
			configNielsenLabel = "tv"; 
			configId="1"; 
			configIdMod = "nightlive";
			break;
		case "masterChef": 
			width = 650; 
			height = 642; 
			configAdvLabel = "tv"; 
			configNielsenLabel = "tv"; 
			configId="1"; 
			configIdMod = "masterChef";
			break;
	}

	flashVars = "configId=" + configId;
	flashVars += "&configUrl=" + basePolymediaShowUrl + relConfPath + "CorrierePolymediaShow_" + configIdMod + ".xml";
	flashVars += "&allowDomains=" + allowedDomains;
	flashVars += "&configAdvLabel=" + configAdvLabel; 
	flashVars += "&configNielsenLabel=" + configNielsenLabel;
	if (mainPlaylistId != null)
	{
		flashVars += "&feedId=" + mainPlaylistId;
		flashVars += "&feedUrl=" + getPlaylistUrl(mainPlaylistId, mainPlaylistOrder);
	}
	if (mainVideoId != null)
	{
		flashVars += "&videoId=" + mainVideoId;
		flashVars += "&videoUrl=" + getVideoUrl(mainVideoId);
	}

	if (bgColorDark != null) flashVars += "&background=" + bgColorDark;
	else flashVars += "&background=#CECECE";
	if (bgColorAlpha != null) flashVars += "&backgroundAlpha=" + bgColorAlpha;
	else flashVars += "&backgroundAlpha=100";
	if (bgColorLight != null) flashVars += "&background2=" + bgColorLight;
	else flashVars += "&background2=#FFFFFF";
	if (bgColorAlpha != null) flashVars += "&background2Alpha=" + bgColorAlpha;
	else flashVars += "&background2Alpha=100";

	if (enabledArrow != null) flashVars += "&enabledArrowColor=" + enabledArrow;
	if (disabledArrow != null) flashVars += "&disabledArrowColor=" + disabledArrow;
	
	if (startAudioEnabled != null) flashVars += "&startAudioEnabled=" + startAudioEnabled;

	if (autoplay != null) flashVars += "&autostart=" + autoplay; 
	if(startAudioEnabled != null) flashVars += "&startAudioEnabled=" + startAudioEnabled;
	if (showLogo == null /* logo is visible for default */ || showLogo == true || showLogo == "true") 
	{
		if (urlLogo != null)
		{
			flashVars += "&logo=" + urlLogo;
		}
		else
		{
			flashVars += "&logo=" + basePolymediaShowUrl + relImgPath + "logocorriere.png";
		}
		showHeader = false;
	}
	
	if (showCorrelati == false || showCorrelati == "false") 
	{
		flashVars += "&showRelatedPanel=false";
	}
		
	if (context != null)
	{
		if (context.indexOf('/') >= 0)
		{
			flashVars += "&channelName=" + context.substring(0, context.indexOf('/'));
			flashVars += "&subChannelName=" + context.substring(context.indexOf('/') + 1);
		}
		else flashVars += "&channelName=" + context;
	}

	if (advChannel != null) flashVars += "&advChannel=" + advChannel;
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
	flashVars += "&swfUrl=" + basePolymediaShowUrl + relSwfPath + "CorrierePolymediaShow.swf";
	
	if (writeOnDocument != null && (writeOnDocument == false || writeOnDocument == "false")) {
		this.creationString = createWidget(this.idWidget, basePolymediaShowUrl + relSwfPath + 'CorrierePolymediaShow?v=20121031145127', flashVars, width, height, "string");
//		this.creationString = createWidget(this.idWidget, basePolymediaShowUrl + relSwfPath + 'CorrierePolymediaShow', flashVars, width, height, "string");
	} else {
		createWidget(this.idWidget, basePolymediaShowUrl + relSwfPath + 'CorrierePolymediaShow?v=20121031145127', flashVars, width, height);
//		createWidget(this.idWidget, basePolymediaShowUrl + relSwfPath + 'CorrierePolymediaShow', flashVars, width, height);
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
}