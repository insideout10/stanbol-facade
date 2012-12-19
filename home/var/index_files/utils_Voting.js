/*
	Voting
*/
var Voting = Class.extend({
	// configuration
	voteUrl: 'http://services.rcs.it:80/community/WriteNewVote',
	getVotingUrlTemplate: new Template('http://services.rcs.it:80/community/GetContentData?Domain=#{dom}&ContentKey=#{ckey}&Counter=#{ctype}&OutFormat=js'),
	updateInterval: 0,
	cookieNameTemplate: new Template('vmcComm1_voto_#{dom}_#{ckey}_#{ctype}'),
	cookieExpireTime: 5 * 60 * 1000,
	
	// fields
	domain: null,
	contentKey: null,
	countType: null,
	votaDivId: null,
	risDivId: null,
	
	numVotiId: null,
	textDivId: null,
	readOnly: false,
	
	// internal fields
	context: null,
	getVotingUrl: null,
	//updater: null,
	votaElm: null,
	risElm: null,
	
	numVotiElm: null,
	vote: null,
	votes: null,
	voting: false,
	
	// methods
	init: function (options) {
		$.extend(this, options);
				
		this.votaElm = $('#' + this.votaDivId);
		this.risElm = $('#' + this.risDivId);

			
		if (this.votaElm.length == 0 || this.risElm.length == 0) {
			return;
		}

		
		//this.getVotingUrl = 'http://services.rcs.it:80/community/GetContentData?Domain='+this.domain+'&ContentKey='+this.contentKey+'&Counter='+this.countType+'&OutFormat=js';
		this.getVotingUrl = 'http://services.rcs.it:80/community/GetContentData?Domain='+this.domain+'&ContentKey='+this.contentKey+'&OutFormat=js';
		/*
		this.getVotingUrlTemplate.evaluate({
			dom: this.domain,
			ckey: this.contentKey,
			ctype: this.countType
		});
		*/
		this.updateVoting(true);
	},
	
	updateVoting: function (initialize) {
		var curKey = this.contentKey;
		var ctype = this.countType;
		$.ajax({
			url: this.getVotingUrl,
			async: false,
			cache: false,
			type: 'get',
			dataType: "script",
			success: function () {
				var data = response;
				var votes = 0;
				if (data.ErrorCode == 0) {
					$.each(data.Contents,function(i,content) {
						if (content != undefined) {
							if (content.ContentKey === curKey) {
								$.each(content.Fields,function(index,field) {
									if (field != undefined) {
										if (field.Id === ctype) {
											votes = field.Votes;
										}
									}
								});
							}
						}
					});
					this.votes = votes;
					this.draw();
				}
			}.proto_bind(this),
			error: function () {
				if (initialize) {
					this.draw();
				}
			}.proto_bind(this)
		});

	},
	
	doVote: function () {
		var curKey = this.contentKey;
		var ctype = this.countType;
		
		if (this.voting) return;		// se c'e il cookie this.voting e' false
		this.voting = true;
		
		//controllo l'esistenza del cookie di votazione
		if(this.getUserVote()!=null)return;
		
		var params = '';
		params += 'Domain='+ this.domain;
		params += '&ContentKey='+ this.contentKey;
		params += '&Counter='+ this.countType;
		params += '&Output=yes';
		params += '&OutFormat=js';
				
		$.ajax({
			url: this.voteUrl,
			data: params,
			async: false,
			type: 'get',
			dataType: "script",
			success: function () {
				var data = response;
				var votes = 0;
				if (data.ErrorCode == 0) {
					$.each(data.Contents,function(i,content) {
						if (content != undefined) {
							if (content.ContentKey === curKey) {
								$.each(content.Fields,function(index,field) {
									if (field != undefined) {
										if (field.Id === ctype) {
											votes = field.Votes +1;
										}
									}
								});
							}
						}
					});
					this.readonly= true;
					this.votes = votes;
					this.setCookie();
					this.draw();
				}
				else if (votes.duplicate) {
					if (this.vote == null) {
						this.vote = 'n/a';
					}
					this.draw();
				}
			}.proto_bind(this),
			complete: function () {
				this.voting = false;
			}.proto_bind(this)
		}); 
	},
	
	getUserVote: function () {
		var cookieName = 'vmcComm1_voto_'+this.domain+'_'+this.contentKey+'_'+this.countType;;
		/*this.cookieNameTemplate.evaluate({
			dom: this.domain,
			ckey: this.contentKey,
			ctype: this.countType
		});*/
		
		var regexp = new RegExp(cookieName + '=([^ ;]+)');
		var result = regexp.exec(document.cookie);
		
		if (result == null) {
			return null;
		}
		
		this.vote = result[1];
	},
	
	setCookie: function () {
		var cookieName = 'vmcComm1_voto_'+this.domain+'_'+this.contentKey+'_'+this.countType;
		/*
		this.cookieNameTemplate.evaluate({
			dom: this.domain,
			ckey: this.contentKey,
			ctype: this.countType
		});
		*/
		
		
		var expireDate = new Date();
		expireDate.setTime(expireDate.getTime() + this.cookieExpireTime);
		
		var cookieValue = parseInt(this.votes) + 1; //this.vote;
		
		document.cookie = cookieName + '=' + cookieValue + '; expires=' + expireDate.toGMTString();  
	},
	
	draw: function () {
		//codice di scrittura degli elementi
		this.risElm.html(this.votes);
		
	},

	updateNumVoti: function(){	},
	
	destroy: function() {}
});
