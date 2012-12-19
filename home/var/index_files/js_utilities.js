/* ARTICLE EXPANDER	*/
var divContentMinHeight = 0;
$(function() {
	checkArticleHeight();
});

$('.js_Article_Opener').live("click", function () {
	if ($(this).parents(".js_Article").find(".js_Article_Opener").hasClass("js_Article_Expanded")) {
		$(this).parents(".js_Article").find(".js_Article_Container").animate({height: divContentMinHeight+"px"}, "slow");
	} else {
		var divContentHeight = $(this).parents(".js_Article").find(".js_Article_Content").height();
		$(this).parents(".js_Article").find(".js_Article_Container").animate({height: divContentHeight+"px"}, "slow");
	}
	$(this).parents(".js_Article").find(".js_Article_Opener").toggleClass("js_Article_Expanded");
});

/* CONTENT OPENER */
$('.js_Content_Opener').live("click", function () {
	$(this).parents(".js_Content_Container").find(".js_Content").slideToggle("slow");
	$(this).parents(".js_Content_Container").find(".js_Content_Opener").toggleClass("el_Opened");
});


/* REMOVE INTERNAL LABEL FROM FORM ELEMENT	*/
$(document).ready(function() {
	$('.js_IL_Element').each(function(index) {
		if ($(this).val() != "") {
			$(this).parents(".js_Internal_Label").find("label").removeClass("lbl_Visible");
		}
	});

	$(".js_Internal_Label .js_IL_Element").focus(function() { 
		$(this).parents(".js_Internal_Label").find("label").removeClass("lbl_Visible");
	//	$(this).parents(".js_Description").find(".js_Description_Container").css("display", "none");
	});
	$(".js_Internal_Label .js_IL_Element").blur(function() { 
		if ($(this).val() == "") {
			$(this).parents(".js_Internal_Label").find("label").addClass("lbl_Visible");
		}
	});
	$(".js_Internal_Label label").click(function() { 
		$(this).removeClass("lbl_Visible");
		$(this).parents(".js_Internal_Label").find(".js_IL_Element").focus();
	//	$(this).parents(".js_Description").find(".js_Description_Container").css("display", "none");
	});
	
	$(".btn_Submit").click(onEmbedClick);
	
	var button = $(".box_InteractiveTools").find(".btn_Submit");
	$(button).click({pId:1}, onEmbedClick);
	
	var input_txt = $(".box_InteractiveTools").find(".inp_Text");
	addOverlayToInputText(input_txt);
	
	$(input_txt).click(onInputTextClick);
	
	$("#btn_zapping_1").live("click",function(){
		$("#btn_zapping_1").hide();
		$("#js_StepCarousel_108_Paginate").show();
		return false;
	});
	$("#btn_zapping_2").live("click",function(){
		$("#btn_zapping_2").hide();
		$("#js_StepCarousel_109_Paginate").show();
		return false;
	});
	$("#btn_zapping_3").live("click",function(){
		$("#btn_zapping_3").hide();
		$("#js_StepCarousel_110_Paginate").show();
		return false;
	});
	
	$(".write_comment_pagination").live("click",function(){
		//var prova = ${this}.text();
		
		return false;
	});
	
	initEuropeanPlaylist();
	
	//reportTime utility
	  var backgroundColor;
	  $("li.box_ReportTime").mouseover(function() {
		$("div.box_Img", this).hide();
		$(".tit_Title_reportTime", this).hide();
		$(".txt_Date", this).hide();

		try
		{
			var a_tags = $(".tit_Description_reportTime", this)
			var tags = a_tags.find('a');
			var value_ = tags[0].outerHTML;
			$(value_).html($(value_).text());
			if (tags.length > 1)
			{
				value_ = tags[0].outerHTML;
				value_ = tags[1].outerHTML;
				var realHREF = $(tags[0]).attr("href");
				$(tags[1]).attr("href",realHREF);
				$(tags[1]).attr("target","");
				$(tags[1]).attr("style","");
			}
		}
		catch(e){}
		backgroundColor = $(this).css("background-color");
		$(this).css("background-color", "#DB002E");
		$(this).css("padding", "5px");
		$(this).css("width", "141px");
		$(this).css("height", "165px");
		
		$(".tit_Title_reportTimeWhite", this).show();
		$(".tit_Description_reportTime", this).show();
		$(".txt_Date_reportTime", this).show();
	  });
	  
	  $("li.box_ReportTime").mouseout(function() {
		$(".tit_Description_reportTime", this).hide();
		$(".txt_Date_reportTime", this).hide();
		$(".tit_Title_reportTimeWhite", this).hide();
		
		$(this).css("background-color",  backgroundColor);
		$(this).css("padding", "0px");
		$(this).css("width", "151px");
		$(this).css("height", "175px");
		
		$("div.box_Img", this).show();
		$(".txt_Date", this).show();
		$(".tit_Title_reportTime", this).show();
	  });
	
});

function initEuropeanPlaylist()
{
	$('.js_ScrollPane_03').jScrollPane(
		{
			verticalDragMinHeight: 19,
			verticalDragMaxHeight: 19,
			horizontalDragMinWidth: 19,
			horizontalDragMaxWidth: 19
		}
	);
		
	$('.box_Element_European').live('click',function(e){
		var target_clicked = $(e.target).parents(".box_Element_European");
		var selectedId = target_clicked.attr("videoid");
		var selectedChannel = target_clicked.attr("channelname");
		playListCallback(selectedId, selectedChannel);
		return false;
	});
}


/* PLAYERS FUNCTION*/
var players_link_array = {
   1: "",
   2: "",
   3: "",
   4: "",
   5: "",
   6: ""
};

function titleLoaded(playerid, videoid)
{
	console.log("Title loaded", playerid, videoid);
}

function resetAddThis(){
	var ADDTHIS_URL = "http://s7.addthis.com/js/250/addthis_widget.js#domready=1";
	removeAddThis();
	$.getScript( ADDTHIS_URL, function() 
		{ 
			addthis.init();
			console.log("init addthis")
		}
	);
}

function removeAddThis()
{
	if (window.addthis){
		with (window) {
			addthis = null;
			_ate = null;
		    __twitterIntentHandler = null;
		    __twttrlr = null;
			_adr  = null;
			//_ate = null;
		    _at_plusonecallback = null;
		    _atc = null;
		    _atd = null;
		    _atn = null;
		    _atr = null;
			_atw = null;
		    _duc = null;
		    _euc = null;
		    addthis_close = null;
		    addthis_conf = null;
		    addthis_open = null;
		    addthis_pub = null;
		    addthis_sendto = null;
		    addthis_share = null;
			addthis_url = null;
			addthis_title = null;
		    at_pco = null;
		    at_st = null;
		    at_xt = null;
		    bundle = null;
		    define = null;
		    domReady = null;
		    fb_ref = null;
		    handler = null;
		    loadrunner = null;
		    passthrough = null;
		    provide = null;
		    q_at_st = null;
		    twttr = null;
		    using = null;
		}
		window.addthis = null;
	}
}



function checkArticleHeight()
{
	divContentMinHeight = $(".js_Article_Container").height();
	$(".js_Article_Container").each(function() {
		var divContentHeight = $(this).find(".js_Article_Content").height();
		if (divContentHeight <= divContentMinHeight) {
			$(this).parents(".js_Article").find(".js_Article_Opener").hide();	
			$(this).parents(".js_Article").find(".js_Article_Container").animate({height: divContentHeight+"px"}, "slow");
		}
	});
}

function descriptionLoaded(playerid, videoid, playerInstance)
{
	var form_embed = $(".box_InteractiveTools").find(".box_Embed");
	form_embed.attr("accept-charset","utf-8");

	var button = $(".box_InteractiveTools").find(".btn_Submit");
	$(button).click({pId:playerid,pInstance:playerInstance}, onEmbedClick);
		
	
	var input_txt = $(".box_InteractiveTools").find(".inp_Text");
	addOverlayToInputText(input_txt);
	
	var addthis_btn = $(".box_InteractiveTools").find(".box_AddThis");
	var url = input_txt.val();
	var a_tag = addthis_btn.find("a").attr("addthis:url",url);
	//window.addthis.button(addthis_btn, {}, {url: url, title: "The 25th post"});
	$(input_txt).click(onInputTextClick);
	setAddThisUrls();
	resetAddThis();
}

function commentsLoaded(playerid, videoid, commentsPresent)
{
	// DISABLE WRITE BUTTON
	try {
			startDate = startDate.replace(".", " ");
			startDate = Date.parse(startDate); // gia in millisecondi
			
			//var username = data.user[0].username;
			//var email = data.user[0].email;
			var now = new Date();
			var canComment = true;
			var closedTime = false;
			var closeForDifferenceTime = false;
			
			var hours = now.getHours();
			
			var hourDifference = Math.round((now.getTime() - startDate) / (1000*60*60));
			
			if(hourDifference > 12) {
				closeForDifferenceTime = true;
			}
			
			if(hours >= 20)
			{
				closedTime = true;
			}
			else if(hours < 9 )
			{
				closedTime = true;
			}
			
			if(closedTime)
			{
				var box_comm = $(".box_AllComments");
				if (box_comm.length > 0)
				{
					box_comm.hide();
				}
			}
			
			
			if(enableComment == false || canComment == false || closeForDifferenceTime == true) {
				var btn = $(".box_More_Contents").find(".btn_Write_Comment");
				btn.hide();
			}
			
		/* check if article or blog are present */
			var article_correlated = $(".box_More_Contents").find(".list_Article_Correlated");
			var article_present = article_correlated.length;
			
			var blog_correlated = $(".box_More_Contents").find(".list_Correlated_Links");
			var blog_present = blog_correlated.length;
			
			var left_column = $(".box_More_Contents").find(".box_LeftColumn");
			var right_column = $(".box_More_Contents").find(".box_RightColumn");
		/* ------------------------ */
		
			if(commentsPresent != 1 && commentsPresent != "1" && (enableComment == false || closeForDifferenceTime == true))
			{
				left_column.hide();
				
				if(article_present > 0)
				{
					var article_number = adaptArticlesHeight(right_column,630);
					
					if( parseInt(article_number) <= parseInt(0) )
					{
						$(".box_More_Contents").hide();
					}
				}
				else if(blog_present > 0)
				{	
					right_column.css("float","left");
					right_column.css("width","630");
				}
				else
				{
					$(".box_More_Contents").hide();
				}
			}
			else
			{
				if(article_present > 0)
				{
					adaptArticlesHeight(right_column);
				}
			}			
			
		} catch(err) {
			var txt = "Error: " + err.message + "\n\n";
			console.log(txt);
		}
}

function adaptArticlesHeight(column,newWidth)
{
	var articles = column.find('.list_Article_Correlated');
	var li_arr = articles.children();
	var total_height = 0;
	var pane_api = $(column).find(".box_Contents_Correlated").data('jsp');
	pane_api.destroy();
	var pane = $(column).find(".box_Contents_Correlated");
	if(newWidth)
	{
		column.css("float","left");
		column.css("width",newWidth);
		pane.width(newWidth);
	}
	
	for (var i = 0; i < li_arr.length; i++)
	{
		var current_height = li_arr[i].clientHeight;
		total_height += current_height;
	}
	
	if( parseInt('145') < parseInt(total_height) )
	{
		pane.jScrollPane({verticalDragMinHeight: 19, verticalDragMaxHeight: 19, horizontalDragMinWidth: 19, horizontalDragMaxWidth: 19});
	}
	else
	{
		var gap = parseInt('10') * (li_arr.length - 1);
		var new_height = parseInt(total_height) + parseInt(gap);
		pane.height(new_height);
		console.log(pane.height());
	}
	
	return li_arr.length;
}



function infoLoaded(playerid, videoid, htmlLoaded)
{
	setTagCloudPosition();
	checkArticleHeight();
	setAddThisUrls();

	if(window.location.href != "http://video.corriere.it" && window.location.href != "http://video.corriere.it/" && window.location.href != "http://video.corriere.it/index.shtml")
	{
		console.log(window.location.href+", not in home");
		//$(".box_Featured_00").removeClass("box_Color_01");
		$(".box_Featured_00").addClass("box_Color_00");
	}
}

function setTagCloudPosition()
{
	var cloud_height=$(".box_Color_01 .box_Tags .box_Main").height();
	cloud_height=(61 - cloud_height)/2;
	$(".box_Color_01 .box_Tags .box_Main").css({"padding-top":cloud_height+"px"});
	$(".box_Color_01 .box_Tags .box_Main").css({"padding-bottom":cloud_height+"px"});
	$(".box_Tags .box_Top").css({"height":"0px"});
	$(".box_Tags .box_Bottom").css({"height":"0px"});
}

function setAddThisUrls()
{
	var input_txt = $(".box_InteractiveTools").find(".inp_Text");
	var url = input_txt.val();
	
	var box_tweet = $(".box_Socials").find(".addthis_button_tweet");
	box_tweet.attr("addthis:url",url);
	
	var g_plus = $(".box_Socials").find(".addthis_button_google_plusone");
	g_plus.attr("addthis:url",url);
	
	var box_face = $(".box_Socials").find(".addthis_button_facebook_like");
	box_face.attr("addthis:url",url);
}

function relatedLoaded(playerid, videoid)
{
	//add event listener to call clickVideo
	$(".js_Related").live("click",function(e){
		var target_clicked = $(e.target).parents(".js_Related");
		var selectedId = target_clicked.attr("videoid");
		var selectedChannel = target_clicked.attr("channelname");
		playListCallback(selectedId, selectedChannel);
		return false;		
	});

	console.log("Related loaded", playerid, videoid);
}
/*------------------------------------------------*/

function onInputTextClick()
{
	var attr = $(this).attr('disabled');
	
	if(typeof attr !== 'undefined' && attr !== false)
	{
		$(this).removeAttr("disabled");
		
		var form = $(this).parents().find(".box_Embed");
		var removable_div = $(form).find('#polymedia_overlay');
		if(removable_div)
			$(removable_div).css('width','0');
	}		
}

function onEmbedClick(event)
{
	var form = $(this).parents().find(".box_Embed");
	var txt_label = form.find(".lbl_Label");
	var input_text = form.find(".inp_Text");
	var btn_label = $(this).val();
	var current_player_id = event.data.pId;
	var current_player_instance = event.data.pInstance;
	
	if (btn_label == "Embed")
	{
		$(this).val('Link');
		$(txt_label).text('Embed');
		
		if( players_link_array[current_player_id] == "" )
			players_link_array[current_player_id] = input_text.val();
		
		input_text.removeAttr("disabled");
		
		var embed_code = current_player_instance.getEmbedTag(398,223);
			
		input_text.val(embed_code);
	}
	else
	{
		$(this).val('Embed');
		$(txt_label).text('Link');
		input_text.val(players_link_array[current_player_id]);
	}
	
	var removable_div = $(form).find('#polymedia_overlay');
	if(removable_div)
		$(removable_div).css('width','0');
	
	return false;
}

function addOverlayToInputText(disabledInput)
{
	// find the disabled elements
  var $disabled = disabledInput;

  // loop through each of the disable elements and create an overlay
  $disabled.each(function (){
    // get the disabled element
    var $self = $(this)
      // get it's parent form element
      , $parent = $self.closest("form")
      // create an overlay
      , $overlay = $("<div id='polymedia_overlay' />");

    // style the overlay
    $overlay.css({
      // position the overlay in the same real estate as the original parent element 
        position: "absolute"
      , top: $parent.position().top
      , right: $parent.position().right
      , width: $self.outerWidth() + 20
      , height: $self.outerHeight()
      , zIndex: 10000
      // IE needs a color in order for the layer to respond to mouse events
      , backgroundColor: "#fff"
      // set the opacity to 0, so the element is transparent
      , opacity: 0
    })
    // attach the click behavior
    .click(function (){
      // trigger the original event handler
      return $self.trigger("click");
    });

    // add the overlay to the page  
    $parent.append($overlay);
	});
}


// callback for onpanelClick() callback
function playListCallback(videoid,channel) 
{
	clickVideo(videoid, channel);
	return false;
} 
// callbac for oninit() callback
function playListInitCallback(container) 
{
	return false;
}
// callback for onpanelClick() callback nelle liste a 2 righe

/* CONTENT OPENER */
$('.box_Form_Comment .btn_Send').live("click", function () {
	alert("Grazie per aver inviato il tuo commento.");
	$('#textcommento').val('');
	
});

// callback for clicca qui (playerLive)

$('div.box_Note > a').live("click", function() {
	console.log('OK CLICK');
	$("#infoPlayer").modal();
		return false;
});

