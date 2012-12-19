var social_selected = null;
var context_domain = "www.corriere.it";
var context_images = "images2.corriereobjects.it";
var context_ssi = "/includes2007/ssi/";
var context_title = "Corriere.it";
var context_community = "/corcommunity/accesso/";
var chkReplaceUrl = 0;

String.prototype.capitalize = function(){
    return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){
        return p1+p2.toUpperCase();
    } );
};

function getQuerystringPar(key, default_)
{
  if (default_==null) default_="";
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}
function openDisclaimer(url) {
   var w = 500;
  var h = 550;
   var l = Math.floor((screen.width-w)/2);
   var t = Math.floor((screen.height-h)/2);
      window.open('http://'+context_domain+'/'+url,'','width=' + w + ',height=' + h + ',top=' + t + ',left=' + l +', scrollbars=yes'); 
}
function checkCookieCor(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return true;
	}
	return false;
}
function openFBbox(url){
	if(url == context_ssi+"boxes/fb/login.shtml"){
		var add_var = "";
		if($("#header_menu_meth .top_header_hp").length > 0) add_var = "?hp_log_fb";
		url = url+add_var;
	}
	$.ajax({
	  url: url,
	  success: function(data){
		  try{
			$.modal(data,{
						containerId: "fbConnectBox",		
						position: [50,100],
						position: 'absolute',
						onShow: function(dialog){
							setFBoption();
							dialog.container.css("height", "auto");
							$("#fbConnectBox .modalCloseImg").show();
						}						
			});
		  }
		  catch(e){
				$.getScript("/includes2007/static/js_libs/jquery.simplemodal.1.4.1.min.js", function() {
					$.modal(data,{
								containerId: "fbConnectBox",		
								position: [50,100],
								position: 'absolute',
								onShow: function(dialog){
									setFBoption();
									dialog.container.css("height", "auto");
									$("#fbConnectBox .modalCloseImg").show();
								}								
					});
				});			 
			}
	  }
	});
}
function setFBoption(){
	//	this check is mandatory because this function is invoked in case of normal or connect registration 
	if (social_selected)
		callOmnitureTracing('event46','COR/registrazione/step1');

	$("#fb_connect_big .opacity_wait_05, #fb_connect_cor .opacity_wait_05").removeClass("opacity_wait_05");
	$('#fb_connect_cor .rowElem input[name=email]').keypress(function(event) {
		if (event.keyCode == '13') {
			return false;
		}
	});
	$('#fb_connect_cor .rowElem input[name=email]').keyup(function(event) {
		if (event.keyCode == '13') {
			return false;
		}
		else if(!$(this).attr("readonly")){
			var hasError = false;
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			var emailaddressVal = $(this).val();
			if(emailReg.test(emailaddressVal) && emailaddressVal != "" && $('#fb_connect_cor input[name=submitComplete]').length == 0) {
				clearTimeout(timeoutSocial);
				timeoutSocial = setTimeout(function() {
					$("#fb_connect_cor .error_dyn").remove();
					callFormSocialAjax();
				}, 1000);
			 }
			 else{
				clearTimeout(timeoutSocial);
				$("#fb_connect_cor #social_connect .clearSN img.waitBT").remove();
			}
		}
	});	
	if($("#fb_connect_cor .input_margin input[name=DNaaaa]").length > 0){
		$("#fb_connect_cor .input_margin input[name=DNgg],#fb_connect_cor .input_margin input[name=DNmm]").attr("maxlength","2");
		$("#fb_connect_cor .input_margin input[name=DNaaaa]").attr("maxlength","4");
		$("#fb_connect_cor .input_margin input[name=DNgg],#fb_connect_cor .input_margin input[name=DNmm],#fb_connect_cor .input_margin input[name=DNaaaa]").keyup(function(){
		var string_input = $(this).val();
		$(this).val(string_input.match(/\d+/));
			if (isNaN(string_input)) {
				$("#fb_connect_cor .error_date").remove();
				if($("#fb_form_iscriviti").length > 0){
					$("#fb_connect_cor input[name=DNgg]").parents("div.input_text_sm:eq(0)").before('<em class="error_dyn error_date">*la data pu&ograve; contenere solo numeri</em>');
				}
				else{
					$("#fb_connect_cor input[name=DNgg]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_date">*la data pu&ograve; contenere solo numeri</em>');
				}		
			}
			else{
			  $("#fb_connect_cor .error_date").remove();
			}
		})
	}	
	if($("#fb_connect_cor #social_connect input[name=password]").length > 0){
		$("#fb_connect_cor #social_connect .clearSN").append('<img alt="Ok" src="http://'+context_images+'/images/static/common/fb/ok.gif" class="okBT">');
		$("#fb_connect_cor #social_connect .clearSN").append('<div class="okText">Ottimo! Con questa mail<br>hai gi&agrave; un account '+context_title+'</div>');
	}
	else if($("#fb_connect_cor #social_connect input[name=nickname]").length > 0){
		$("#fb_connect_cor #social_connect .clearSN").append('<img alt="Ok" src="http://'+context_images+'/images/static/common/fb/ok.gif" class="okBT">');		
	}
	else if($("#fb_connect_cor #social_connect .link_social_bt").length > 0 && $("#fb_connect_cor #social_connect input[name=submitComplete]").length == 0){
		$("#fb_connect_cor #social_connect .clearSN").append('<img class="clearBT" src="http://'+context_images+'/images/static/common/fb/cancel.gif" alt="Cancella" />');		
	}
	$("#fb_connect_cor input[type=text]").attr( "autocomplete", "off" );
	if($("#fb_form_iscriviti").length == 0) $("#registrazione-fb-err").remove();
	$("#social_connect input.check_value[readonly=readonly]").addClass("setExample");
	$("#fb_connect_cor .check_value,#fb_connect_big .check_value,#fb_form_cambia .check_value").not(".setExample").example(function() {
		return $(this).attr('title');
	});
	$("#fb_connect_cor .check_value,#fb_connect_big .check_value,#fb_form_cambia .check_value").addClass("setExample");
	$("#fb_disclaimer .input, #fb_newsletter .input").click(function(){
		if($(this).hasClass("input_on")){
			$(this).removeClass("input_on");
			$(this).find("input").attr('checked', false);
		}
		else {
			$(this).addClass("input_on");
			$(this).find("input").attr('checked', true);
		}
	});
	$("#fb_connect_cor #fb_form_iscriviti .rowElem .radio_bt,#social_connect .rowElem .radio_bt,#fb_connect_big .rowElem .radio_bt,#fb_form_cambia .rowElem .radio_bt").click(function(){
		if($(this).hasClass("radio_bt_on")){		
		}
		else {
			$(this).parents(".rowElem:eq(0)").find(".radio_bt").removeClass("radio_bt_on");
			$(this).addClass("radio_bt_on");
			$(this).find("input").click();
		}
	});
	$("#fb_connect_cor #fb_form_iscriviti .rowElem .radio_bt input,#social_connect .rowElem .radio_bt input,#fb_connect_big .rowElem .radio_bt input,#fb_form_cambia .rowElem .radio_bt input").each(function(){
		if($(this).is(":checked")){
			$(this).parents(".radio_bt:eq(0)").addClass("radio_bt_on");
		}
	});
	$("#fb_connect_cor #fb_newsletter input,#fb_connect_cor #fb_disclaimer input,#fb_connect_big #fb_newsletter input,#fb_connect_big #fb_disclaimer input,#fb_form_cambia #fb_newsletter input,#fb_form_cambia #fb_disclaimer input").each(function(){
		if($(this).is(":checked")){
			$(this).parents(".input:eq(0)").addClass("input_on");
		}
	});		
	$("#fb_connect_cor #fb_form_iscriviti .rowElem input.display_on_blur,#fb_connect_big .rowElem input.display_on_blur,#fb_form_cambia .rowElem input.display_on_blur").each(function(){
		if($(this).attr("value") != ""){
			$(this).parents(".rowElem:eq(0)").find(".display_on_focus").hide();
			$(this).show();
		}
	});
	
	$("#fb_connect_cor .select_text, #fb_connect_big .select_text, #fb_form_cambia .select_text").jqTransform();
	$('#fb_connect_cor .display_on_focus,#fb_connect_big .display_on_focus,#fb_form_cambia .display_on_focus').focus(function() {
	    $(this).hide();
	    $(this).next().show().focus();
	});
	$('#fb_connect_cor .display_on_blur,#fb_connect_big .display_on_blur,#fb_form_cambia .display_on_blur').blur(function() {
	    if($(this).val() == '') {
	        $(this).prev().show();
	        $(this).hide();
	    }
	});
	if($("#fb_connect_cor .control_captcha").length >0) showRecaptcha();

	$('#fb_form_iscriviti').ajaxForm({
		target:        '#fb_connect_cor',
		success:		function(){
			setFBoption();
			$('html, body').animate({ scrollTop: 0 }, 0);
		}
	});
	$('#fb_form_iscriviti .accetto').click(function(event){
		event.preventDefault();
		if(!$(this).hasClass("opacity_wait_05")){
			$(this).addClass("opacity_wait_05");		
			$("#fb_connect_cor .error_dyn").remove();		
			if(chkValidForm()){
				clearFormExample();
			}
		}
	})
	$('#social_connect .rec_socialn_pwd').click(function(event){
		event.preventDefault();
		openPWDlost();
	})
	$("#fb_connect_cor input[name=provincia]").parents(".jqTransformSelectWrapper:eq(0) a").click(function(){
		$("#fb_connect_cor .error_provincia").remove();
	});
	$("#fb_connect_cor input[name=sesso]").parents(".radio_bt:eq(0)").click(function(){
		$("#fb_connect_cor .error_sesso").remove();
	});
	$("#fb_connect_cor input[name=autUGC1]").parents(".input:eq(0)").click(function(){
		if($(this).hasClass("input_on")) $("#fb_connect_cor .error_autUGC1").remove();
		else $("input[name=autUGC1]").parents("li:eq(0)").prepend('<em class="error_dyn error_autUGC1">*campo obbligatorio</em>');
	});
	$("#fb_connect_cor input[name=autUGC2]").parents(".input:eq(0)").click(function(){
		if($(this).hasClass("input_on")) $("#fb_connect_cor .error_autUGC2").remove();
		else $("input[name=autUGC2]").parents("li:eq(0)").prepend('<em class="error_dyn error_autUGC2">*campo obbligatorio</em>');
	});
	if($("#loginFormBean").length == 0){
		$("#fb_connect_cor input[type=text],#fb_connect_cor input[type=password]").blur(function(){
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			var regexNum = /\d/g;
			var regexString = /[A-z]/g;
			var name_input = $(this).attr("name");
			var title_input = $(this).attr("title");
			var val_input = $(this).val();
			if(title_input == val_input) val_input = "";
			$("#fb_connect_cor .error_"+name_input).remove();
			if(name_input == "DNaaaa" || name_input == "DNmm" && name_input == "DNgg") {$("#fb_connect_cor .error_date").remove();}
			if(name_input == "DNgg" && val_input != "" && val_input != "Giorno"){
				val_input = val_input/1;
				if(val_input  == 0 || val_input  > 31) {
					if($("#fb_form_iscriviti").length > 0){
						$("#fb_connect_cor input[name=DNgg]").parents("div.input_text_sm:eq(0)").before('<em class="error_dyn error_date">*il giorno non &egrave; corretto</em>');
					}
					else{
						$("#fb_connect_cor input[name=DNgg]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_date">*il giorno non &egrave; corretto</em>');
					}			
				}
			}
			else if(name_input == "DNmm" && val_input != "" && val_input != "Mese"){
				val_input = val_input/1;
				if(val_input == 0 || val_input > 12) {
					if($("#fb_form_iscriviti").length > 0){
						$("#fb_connect_cor input[name=DNgg]").parents("div.input_text_sm:eq(0)").before('<em class="error_dyn error_date">*il mese non &egrave; corretto</em>');
					}
					else{
						$("#fb_connect_cor input[name=DNgg]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_date">*il mese non &egrave; corretto</em>');
					}				
				}
			}
			else if(name_input == "DNaaaa" && val_input != "" && val_input != "Anno"){
				val_input = val_input/1;
				if(val_input == 0 || val_input > server_yyyy || val_input < 1900) {
					if($("#fb_form_iscriviti").length > 0){
						$("#fb_connect_cor input[name=DNgg]").parents("div.input_text_sm:eq(0)").before('<em class="error_dyn error_date">*l\'anno non &egrave; corretto</em>');
					}
					else{
						$("#fb_connect_cor input[name=DNgg]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_date">*l\'anno non &egrave; corretto</em>');
					}				
				}
			}
			else if(val_input != "Scegli il tuo nome utente" && name_input == "nickname" && val_input != ""){
				if(val_input.length < 6) {
					$("#fb_connect_cor input[name=nickname]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_nickname">*campo obbligatorio (min 6 caratteri)</em>');
				}
			}
			else if(val_input != "Email" && name_input == "email" && val_input != ""){
				if(!emailReg.test(val_input)){
					$("#fb_connect_cor input[name=email]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_email">*formato email non corretto</em>');	
				}
			}
			else if(val_input != "Inserisci il tuo indirizzo email" && name_input == "utenza" && val_input != ""){
				if(!emailReg.test(val_input)){
					$("#fb_connect_cor input[name=utenza]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_utenza">*formato email non corretto</em>');	
				}
			}		
			else if(name_input == "password" && val_input != ""){
				if($("#fb_form_iscriviti").length > 0){
					if(val_input.length < 8){
						$("#fb_connect_cor input[name=password]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_password">*password non corretta (min 8 caratteri)</em>');	
					}
					else if(!(regexNum.test(val_input) && regexString.test(val_input))){
						$("#fb_connect_cor input[name=password]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_password">*password deve contenere almeno una lettera e un numero</em>');	
					}
				}
			}			
			else if(name_input == "confpwd" && val_input != ""){
				if($("#fb_form_iscriviti").length > 0){
					var val_password = $("#fb_connect_cor input[name=password]").val();
					if(val_password != "" && val_input != val_password){
						$("#fb_connect_cor input[name=confpwd]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_confpwd">*la conferma password &egrave; diversa da quella inserita</em>');	
					}	
				}
			}		
		})
	}
}
function clearFormExample(){
	$('#fb_form_iscriviti .check_value').each(function(){
		if($(this).val() == $(this).attr("title")) $(this).val("");
	});
	$('#fb_form_iscriviti').submit();
}
function showRecaptcha() {
	$.getScript("http://www.google.com/recaptcha/api/js/recaptcha_ajax.js",function(){
		Recaptcha.create("6Ler5c0SAAAAAHYmj8petY4luLyPG6eqyqg32qKP", 'captchadiv', {
			tabindex: 1,
			theme: "custom",
			callback: Recaptcha.focus_response_field
		});
	})
}
function verificaRegOK(){
	$.modal.close();
	setTimeout(function(){
		openFBbox(context_ssi+"boxes/fb/verifica_ok.shtml");
	}, 500);
	callOmnitureTracing('event48','COR/registrazione/step2','Corriere');
}
function verificaSubOK(){
	$.modal.close();
	setTimeout(function(){
		openFBbox(context_ssi+"boxes/fb/verifica_ok_nomail.shtml");
	}, 500);
	callOmnitureTracing('event48','COR/registrazione/step2','Corriere');
}
function validateEmail(elementValue){  
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
	return emailPattern.test(elementValue);  
 }
function callErrorFB(errorToShow){
	$("#registrazione-fb-err").remove();
	$("#loginFormBeanIframe").prepend('<div class="clearfix left" id="registrazione-fb-err"><h6>ATTENZIONE</h6><p>'+errorToShow+'</p></div>');
}
function callErrorSocial(errorToShow){
	$("#registrazione-social-err").remove();
	$("#fb_connect_cor .container_socialn").prepend('<div class="clearfix left" id="registrazione-social-err"><h6>ATTENZIONE</h6><p>'+errorToShow+'</p></div>');
}
function closeRefresh(usertype){
	if (usertype){
		if(usertype == 'social-reg'){
			//	fine registrazione social
			callOmnitureTracing('event48,event3','COR/registrazione/step2');
		}
		//	login tramite social
		callOmnitureTracing('event7','COR/login');
	}else{
		callOmnitureTracing('event7','COR/login','Corriere');
	}
	$.modal.close();
	if((document.URL).indexOf("rcsconnect=1") > -1 && (document.URL).indexOf("contentPath") > -1){
		window.location.href = unescape(getQuerystringPar("contentPath"));
	}
	else window.location.reload(true);
}
function closeConnect(usertype){
	$.modal.close();
	setTimeout(function(){
		$.ajax({
		  url: context_ssi+"boxes/fb/connected.shtml?name_social="+social_selected,
		  success: function(data){
				$.modal(data,{
					containerId: "fbConnectBox",		
					position: [50,100],
					position: 'absolute',
					onShow: function(dialog){
						dialog.container.css("height", "auto");
						$("#fbConnectBox .modalCloseImg").show();
					},
					onClose: function (dialog) {
						closeRefresh("social-reg");
					}					
				}); 
		  }
		});
	}, 500);
}
function openModalEmail(){
	setTimeout(function(){
		openFBbox(context_ssi+"boxes/fb/cor_email.shtml");
	}, 500);
}
function openModalAuthTwLi(social){
		var url_call_aj = "http://"+context_domain+context_community+"authenticateNoMail-"+social+".do?popup=true&contentPath=http://"+context_domain+context_ssi+"boxes/fb/connect_ok_social.shtml";
		if(social == "google" || social == "facebook"){
			url_call_aj = "http://"+context_domain+context_community+"authenticate-"+social+".do?popup=true&contentPath=http://"+context_domain+context_ssi+"boxes/fb/connect_ok_social.shtml";
		}
		$.ajax({
		  url: url_call_aj,
		  success: function(data){
				$.modal(data,{
								containerId: "fbConnectBox",
								onShow: function(dialog){
								setFBoption();
								$("#fb_connect_cor #social_connect .accetto_btn").show();
								dialog.container.css("height", "auto");
								$("#fbConnectBox .modalCloseImg").show();
								url_ajax =  $("#social_connect").attr("action");
							}			
				}); 
		  }
		});
}
function closeWinOpenModal(data){
	setTimeout(function(){
				$.modal(data,{
						containerId: "fbConnectBox",
						onShow: function(dialog){
						setFBoption();
						dialog.container.css("height", "auto");
						$("#fbConnectBox .modalCloseImg").show();
						url_ajax =  $("#social_connect").attr("action");
						if($("#ajax_container #fb_disclaimer").length > 0){
							$("#social_connect .box_socialn").after($("#ajax_container #fb_disclaimer"));
						}								
					}			
				});
	}, 500);
}
function openPWDlost(){
	$.modal.close();
	setTimeout(function(){
		openFBbox(context_ssi+"boxes/fb/password.shtml");
	}, 500);
}
function openModalCompleta(){
	$("#fbConnectBox").css("top","50px");
	$("#fbConnectBox h5").html('<h5 class="small">Connetti il tuo profilo <img src="http://'+context_images+'/images/static/common/fb/facebook.gif"  alt="Facebook" /> con '+context_title+'</h5>');
	$("#fbConnectBox iframe").height("435px");
}
function openRegfromPop(){
	social_selected = null;
	$.modal.close();
	setTimeout(function(){
		openFBbox("http://"+context_domain+context_community+"RegistrazioneSkinoverlay.do?openreg=false&contentPath="+encodeURIComponent(document.URL));
	}, 500);
	var eventToCall = (typeof alreadyRcsUser != 'undefined')?'event51':'event46';
	callOmnitureTracing(eventToCall,'COR/registrazione/step1','Corriere');
}

/**
** Invoke Omniture for page event tracing asynchronously
**/
function callOmnitureTracing(eventCode,pageName,eVar68){
	try{
		s.events=eventCode;
		s.pageName = pageName;
		s.eVar68= eVar68 || social_selected.capitalize();
		s.eVar11="D=pageName";
		void(s.t());
	}catch(e){}
}

$("#headBoxLogin a.headLogin").live("click",function(){
	openFBbox(context_ssi+"boxes/fb/login.shtml");
	return false;
});

$("#headBoxLogin a.headRegistrazione,#popup_footer_privacy a.headRegistrazione").live("click",function(){
	openFBbox(context_ssi+"boxes/fb/login.shtml");
	return false;
});
var usn_cor = checkCookieCor("rcsLogin");
var open_over_var = 0;
var url_ajax = "";
var timeoutSocial = undefined;
var count_show_log = 0;

var usn_cor_chk = checkCookieCor("rcsLogin");
var usn_FB_cor = checkCookieCor("rcsFBConnected");
var usn_LINK_cor = checkCookieCor("rcsLNKINConnected");
var usn_TWEET_cor = checkCookieCor("rcsTWEETConnected");
var usn_GOOGLE_cor = checkCookieCor("rcsGOOGLConnected");

function show_login_status(network, status){
	if(count_show_log == 0){
		social_selected = network;
		$("body").append("<iframe src='http://"+context_domain+context_community+network+"/redirect_overlay.jsp?contentPath=http://"+context_domain+context_ssi+"boxes/fb/connect_ok_social_no_popup.shtml' width='1' height='1' scrolling='no' style='display:none'></iframe>");
		count_show_log++;
	}	
}
function chkLinkedInFN(){
	if(IN.User.isAuthorized()) show_login_status('linkedin', true);
}
function connect_rcs_fb(response) {
  if (response.status == "unknown") {
      //console.log("NON loggato");
  }
  else {
		if(open_over_var == 0 && usn_cor_chk == false && usn_FB_cor == true){
			show_login_status('facebook', true);
		}
  }
}
//Facebook connect
if($("#fb-root").length == 0){
	$("body").append("<div id='fb-root'></div>");
}
if(typeof social_connect_type == "undefined") social_connect_type = "corriere";
if(social_connect_type == "corriere"){
	$.getScript(context_ssi+"boxes/fb/facebook.js");
}
else if(social_connect_type == "sport"){
	$.getScript(context_ssi+"boxes/fb/facebook_sport.js");
}
if(usn_cor_chk == false && open_over_var == 0){
	//Twitter connect
	if(usn_TWEET_cor == true){
		$("body").append('<img style="display:none;" src="https://twitter.com/login?redirect_after_login=%2Fimages%2Fspinner.gif" onload="show_login_status(\'twitter\', true)" />');
	}
	//Google connect
	else if(usn_GOOGLE_cor == true){
		$("body").append('<img style="display:none;" onload="show_login_status(\'google\', true)"  src="https://accounts.google.com/CheckCookie?continue=https://www.google.com/intl/en/images/logos/accounts_logo.png" />');
	}
	//LinkedIN connect
	else if(usn_LINK_cor == true){
		$.getScript("http://platform.linkedin.com/in.js?async=true", function success() {
				IN.init({
					onLoad: "chkLinkedInFN"
				});
		});		
	}
}
function silentFBconnect(){
	checkCookieRCSlogin();
	callOmnitureTracing('event7','COR/login');
}
function checkSubmitLog(e)
{
   if(e && e.keyCode == 13)
   {
      document.forms[0].submit();
   }
}

function callFormSocialAjax(){ 
	$("#fb_connect_cor #social_connect .clearSN").append('<img alt="" src="http://'+context_images+'/images/static/common/fb/ajax-loader_sm.gif" class="waitBT">');
	$("#fb_connect_cor #social_connect .clearSN .okBT, #fb_connect_cor #social_connect .clearSN .okText, #fb_connect_cor #social_connect .clearSN .clearBT, #fb_disclaimer,#fb_connect_cor .container_socialn #registrazione-social-err").remove();	
	var email_val = $('#fb_connect_cor .rowElem input[name=email]').val();
	$("#fb_connect_cor #ajax_container").html("");
	var temp_url_ajax = url_ajax;
	if(chkReplaceUrl == 1){
		temp_url_ajax = temp_url_ajax.replace("profiler","bind");
	}
	else {
		temp_url_ajax = url_ajax;
	}
	chkReplaceUrl = 0;
	$.ajax({
	  type: 'POST',
	  data: {email:email_val},
	  url: temp_url_ajax,
	  success: function(data){
		  	if($("#fb_connect_cor #social_connect input[name=submitComplete]").length > 0){
			 	$("#fb_connect_cor").html(data);
			 }
			 else {
				$("#fb_connect_cor #ajax_container").html($(data).find("#ajax_container").html());
			 }
			if($("#ajax_container #fb_disclaimer").length > 0){
				$("#social_connect .box_socialn").after($("#ajax_container #fb_disclaimer"));
			}
			$("#fb_connect_cor #social_connect .accetto_btn").show();
			$("#fb_connect_cor #social_connect .clearSN img.waitBT").remove();
			setFBoption();
		}
	});
}
function getContentIframe(cont_html){
	$("#fb_disclaimer").remove();
	if($("#fb_connect_cor #social_connect input[name=submitComplete]").length > 0){
		$("#fb_connect_cor").html(cont_html);
	 }
	 else {	
		$("#fb_connect_cor #ajax_container").html(cont_html);
	 }
	if($("#ajax_container #fb_disclaimer").length > 0){
		$("#social_connect .box_socialn").after($("#ajax_container #fb_disclaimer"));
	}
	$("#fb_connect_cor #social_connect .clearSN img.waitBT").remove();
	if($("#fb_connect_cor .container_socialn #registrazione-social-err").length > 0){
		$("#fb_connect_cor .container_socialn").prepend($("#fb_connect_cor .container_socialn #registrazione-social-err"));
	}
	setFBoption();
}
function callAjaxIframe(){
			var val_action = $("#fb_connect_cor #social_connect input[name=act_value]").val();
			var queryString = $("#fb_connect_cor #social_connect").formSerialize();	
			$.ajax({
			  type: "POST",
			  url: val_action,
			  data: queryString,
			  success:function(data){
					$("#fb_disclaimer").remove();
					if($("#fb_connect_cor #social_connect input[name=submitComplete]").length > 0){
						$("#fb_connect_cor").html(data);
					 }
					 else {						
						$("#fb_connect_cor #ajax_container").html($(data).find("#ajax_container").html());
					 }
					if($("#ajax_container #fb_disclaimer").length > 0){
						$("#social_connect .box_socialn").after($("#ajax_container #fb_disclaimer"));
					}
					$("#fb_connect_cor #social_connect .clearSN img.waitBT").remove();
					if($("#fb_connect_cor .container_socialn #registrazione-social-err").length > 0){
						$("#fb_connect_cor .container_socialn").prepend($("#fb_connect_cor .container_socialn #registrazione-social-err"));
					}
					setFBoption();	 
				}
			});	
}
function chkValidForm(){
	var chk_val = true;
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	var emailaddressVal = $("#fb_connect_cor input[name=email]").val();
	var emailutenzaVal = $("#fb_connect_cor input[name=utenza]").val();
	if($("#fb_connect_cor input[name=email]").length > 0 && (!emailReg.test(emailaddressVal) || emailaddressVal=="")){
		chk_val = false;
		$("#fb_connect_cor input[name=email]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_email">*formato email non corretto</em>');	
	}
	if($("#fb_connect_cor input[name=utenza]").length > 0 && (!emailReg.test(emailutenzaVal) || emailutenzaVal=="")){
		chk_val = false;
		$("#fb_connect_cor input[name=utenza]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_utenza">*formato email non corretto</em>');	
	}	
	if($("#fb_connect_cor input[name=nickname]").length > 0){
		var val_chk = $("#fb_connect_cor input[name=nickname]").val();
		if(val_chk == "" || val_chk == "Scegli il tuo nome utente" || val_chk.length < 6){
			chk_val = false;
			$("#fb_connect_cor input[name=nickname]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_nickname">*campo obbligatorio (minimo 6 caratteri)</em>');	
		}
	}
	if($("#fb_connect_cor input[name=DNgg]").length > 0){
		var val_chk_gg = $("#fb_connect_cor input[name=DNgg]").val();
		var val_chk_mm = $("#fb_connect_cor input[name=DNmm]").val();
		var val_chk_aaaa = $("#fb_connect_cor input[name=DNaaaa]").val();
		if(val_chk_gg == "Giorno" || val_chk_mm == "Mese" || val_chk_aaaa == "Anno"){
			chk_val = false;
			$("#fb_connect_cor .error_date").remove();
			if($("#fb_form_iscriviti").length > 0){
				$("#fb_connect_cor input[name=DNgg]").parents("div.input_text_sm:eq(0)").before('<em class="error_dyn error_date">*giorno mese anno sono obbligatori</em>');
			}
			else{
				$("#fb_connect_cor input[name=DNgg]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_date">*giorno mese anno sono obbligatori</em>');
			}
		}
	}
	if($("#fb_connect_cor input[name=sesso]").length > 0 && $("input[name=sesso]:checked").length == 0){
		chk_val = false;
		$("#fb_connect_cor input[name=sesso]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_sesso">*campo obbligatorio</em>');
	}
	if($("#fb_connect_cor select[name=provincia]").length > 0 && $("select[name=provincia]").val() == ""){
		chk_val = false;
		if($("#fb_form_iscriviti").length > 0){
			$("#fb_connect_cor select[name=provincia]").parents("div.select_text:eq(0)").before('<em class="error_dyn error_provincia">*campo obbligatorio</em>');
		}
		else{
			$("#fb_connect_cor select[name=provincia]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_provincia">*campo obbligatorio</em>');
		}
	}
	if($("#fb_form_iscriviti").length > 0){
		if($("#fb_connect_cor input[name=password]").length > 0 && $("input[name=password]").val() == ""){
			chk_val = false;
			$("#fb_connect_cor input[name=password]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_password">*campo obbligatorio</em>');
		}
		if($("#fb_connect_cor input[name=confpwd]").length > 0 && $("input[name=confpwd]").val() == ""){
			chk_val = false;
			$("#fb_connect_cor input[name=confpwd]").parents("div.rowElem:eq(0)").prepend('<em class="error_dyn error_confpwd">*campo obbligatorio</em>');
		}
	}
	if($("#fb_disclaimer").length > 0){
		if(!$("input[name=autUGC1]").is(":checked")){
			chk_val = false;
			$("input[name=autUGC1]").parents("li:eq(0)").prepend('<em class="error_dyn error_autUGC1">*campo obbligatorio</em>');
		}		
		if(!$("input[name=autUGC2]").is(":checked")){
			chk_val = false;
			$("input[name=autUGC2]").parents("li:eq(0)").prepend('<em class="error_dyn error_autUGC2">*campo obbligatorio</em>');
		}
	}
	if(chk_val == false) $("#fb_connect_big .opacity_wait_05, #fb_connect_cor .opacity_wait_05").removeClass("opacity_wait_05");
	return chk_val;
}
$(document).ready(function() {
	if((document.URL).indexOf("corrieresocial=1") > -1) usn_cor = false;
	$("#fbConnectBox .modalCloseImg").live('click',function(event){
		if((document.URL).indexOf("rcsconnect=1") > -1 && (document.URL).indexOf("contentPath") > -1){
			window.location.href = unescape(getQuerystringPar("contentPath"));
		}															
	});
	$("#fb_connect_cor #social_connect .clearBT").live('click',function(event){
		event.preventDefault();
		$('#fb_connect_cor .rowElem input[name=email]').val("");
		$("#fb_connect_cor #social_connect .clearSN .okBT, #fb_connect_cor #social_connect .clearSN .okText, #fb_connect_cor #social_connect .clearSN .clearBT, #fb_disclaimer,#fb_connect_cor .container_socialn #registrazione-social-err").remove();
		$("#fb_connect_cor #ajax_container").html("");
	})
	$("#fb_connect_cor #social_connect .link_social_bt").live('click',function(event) {
		event.preventDefault();
		var val_rel = $(this).attr("rel");
		social_selected = val_rel;
		$.modal.close();
		if((document.URL).indexOf("corrieresocial=1") > -1) val_rel = "corrieresocial";
		setTimeout(function(){
			newWindow("http://"+context_domain+context_community+val_rel+"/redirect_overlay.jsp?contentPath=http://"+context_domain+context_ssi+"boxes/fb/connect_ok_social.shtml", 'popupCloseFB', 600, 500, 1, 1, 0, 0, 0, 1, 0);
		}, 500);		
	})
	$("#fb_connect_cor #social_connect .accetto_btn").live('click', function(event){
		event.preventDefault();
		if($("#fb_connect_cor #social_connect .link_social_bt").length > 0){
			chkReplaceUrl = 1;
		}
		else {
			chkReplaceUrl = 0;
		}
		if(!$(this).hasClass("opacity_wait_05")){
		$(this).addClass("opacity_wait_05");
		$("#fb_connect_cor .container_socialn #registrazione-social-err, iframe[src='ajaxIframeSocial'],#fb_connect_cor #social_connect input[name=checkIframeContent],#fb_connect_cor .error_dyn").remove();
		if(chkValidForm()){
			$("#fb_connect_cor #social_connect .clearSN .okBT, #fb_connect_cor #social_connect .clearSN .okText, #fb_connect_cor #social_connect .clearSN .clearBT").remove();
			$("#fb_connect_cor #social_connect .clearSN").append('<img alt="" src="http://'+context_images+'/images/static/common/fb/ajax-loader_sm.gif" class="waitBT">');			
			$("#fb_connect_cor #social_connect").append('<input type="hidden" name="checkIframeContent" />');
			if($("#fb_connect_cor #social_connect input[name=act_value]").length > 0 || $("#fb_connect_cor #social_connect input[name=submitComplete]").length > 0){
				var val_action = $("#fb_connect_cor #social_connect input[name=act_value]").val();
				var queryString = $("#fb_connect_cor #social_connect").formSerialize();
				$('#social_connect').ajaxForm({
					url:val_action,
					iframe: true,
					iframeSrc:"#ajaxIframeSocial",
					success:       function(data){
	
					}
				});
				$('#social_connect').submit();		
			}
			else{
				var hasError = false;
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				var emailaddressVal = $('#fb_connect_cor .rowElem input[name=email]').val();
				if(emailReg.test(emailaddressVal) && emailaddressVal != "") {
					clearTimeout(timeoutSocial);
					timeoutSocial = setTimeout(function() {
						callFormSocialAjax();
					}, 1000);
				 }
				 else{
					clearTimeout(timeoutSocial);
					$("#fb_connect_cor #social_connect .clearSN img.waitBT").remove();
					alert("Inserire un e-mail valido");
				}		
			}
		}
		}
	});
	if((document.URL).indexOf("rcsconnect=1") > -1 && usn_cor == false){
		open_over_var = 1;
		openFBbox(context_ssi+"boxes/fb/login.shtml");
	}						   
	$("#fb_connect_cor #loginFormBean input").keypress(function(event){
		checkSubmitLog(event);
	});				   
	$("#fb_connect_big .box_disconnetti a").live("click",function(event){
		event.preventDefault();
		var val_action_unb = $("form[name=unbind]").attr("action");
		var queryString = $("form[name=unbind]").formSerialize();
		var name_social = $(".box_disconnetti img:eq(0)").attr("alt");
		
		$.post(val_action_unb, queryString, function(data){
			if(data.indexOf("errore") > -1){
				alert("Causa un errore del server non è stato possibile scollegare la tua utenza da "+name_social+".\n Ti chiediamo di riprovare tra pochi minuti.");
			}
			else{
				alert("La tua utenza è stata scollegata da "+name_social);
				$("#fb_connect_big .box_disconnetti").remove();
			}
		})
	})						   
	$("#fb_connect_big .select_text").each(function(i){
		$(this).css("z-index", 100 - i);
	});
	$("#fb_connect_cor .fb_iscriviti,#login_connect_cor .subscription_box a").live("click",function(event){
		event.preventDefault();
		openRegfromPop();
	})
	$("#fb_connect_cor .facebook,#fb_connect_cor .twitter,#fb_connect_cor .linkedin,#fb_connect_cor .google,#login_connect_cor .list_button a").live("click",function(event){
		event.preventDefault();
		social_selected =  $(this).attr("title");
		var val_rel = $(this).attr("class");
		$.modal.close();
		newWindow("http://"+context_domain+context_community+val_rel+"/redirect_overlay.jsp?contentPath=http://"+context_domain+context_ssi+"boxes/fb/connect_ok_social.shtml", 'popupCloseFB', 600, 500, 1, 1, 0, 0, 0, 1, 0);
	})	
	$("#fb_connect_cor .lost_pwd").live("click",function(event){
		event.preventDefault();	
		try{
			try{
				window.opener.openPWDlost();
			}
			catch(e){
				top.openPWDlost();
			}	
		}
		catch(e){
			try{
				document.domain = "corriere.it";
				window.parent.openPWDlost();
			}
			catch(e){
				document.domain = "corriere.it";
				top.parent.openPWDlost();
			}
		}		
	})	
	$(".loginFB_form #fb_connect_cor .entra").live("click",function(event){
		event.preventDefault();
		var allOK = true;
		var message_error = "";
		if($("#loginFormBean input[name=username]").val() == "" || $("#loginFormBean input[name=username]").val() == $("#loginFormBean input[name=username]").attr("title")){
			allOK = false;
			message_error = "Email utente mancante\n";
		}
		else if(!validateEmail($("#loginFormBean input[name=username]").val())){
			allOK = false;
			message_error = "Email utente non corretta\n";		
		}
		if($("#loginFormBean input[name=password]").val() == ""){
			allOK = false;
			message_error = "Password mancante\n";
		}
		if(!allOK) alert(message_error);
		else{
			$("#loginFormBean_form form").submit();
		}
	})
	$("#fb_pwd_email .invia").live("click",function(event){
		event.preventDefault();
		var allOK = true;
		var message_error = "";
		if($("#fb_pwd_email input[name=email]").val() == ""){
			allOK = false;
			message_error = "Email mancante\n";
		}
		else if(!validateEmail($("#fb_pwd_email input[name=email]").val())){
			allOK = false;
			message_error = "Email non corretta\n";		
		}		
		if(!allOK) alert(message_error);
		else{
			$.post($("#fb_pwd_email").attr("action"),{email: $("#fb_pwd_email input[name=email]").val()}, function(data){
				$("#email_error, #email_ok").remove();
				$("#fb_pwd_email").before(data);
			})
		}
	})	
	$("#fb_form_email .entra").live("click",function(event){
		event.preventDefault();
		var allOK = true;
		var message_error = "";
		if($("#fb_form_email input[name=password]").val() == ""){
			allOK = false;
			message_error = "Password mancante\n";
		}
		if(!allOK) alert(message_error);
		else{
			$("#fb_form_email").submit();
		}
	})	
	if($("#loginFormBean_form, #fb_form_cambia").length > 0){
		setFBoption();
	}
});
