/**
 * Last moment of today (23:59:59.999).
 * 
 * @returns {Date}
 */
function lastMoment() {
	var date = new Date();
	date.setHours(23, 59, 59, 999);	// end of this day
	return date;
}

/**
 * Write the FC cookie.
 * 
 * @param simply_fc_cookie
 * @param content
 */
function packFCC(simply_fc_cookie, dict) {

	var content = "";
	for(var key in dict) {
		var imps = dict[key];
		var parts = key.split("-");
		var cmp = parts[0];
		var label = parts[1];
		content += cmp + " " + imps + " " + label + "_";
	}
	
	createCookie(simply_fc_cookie, content, lastMoment());	// expires this midnight
}

/**
 * Read the FC cookie.
 * 
 * @param dict
 */
function unpackFCC(simply_fc_cookie) {
	
	var dict = {};
	var cntnt = readCookie(simply_fc_cookie);
	if (cntnt != null) {	// does the cookie exist?
		var rows = cntnt.split('_');
		for(var idx in rows) {
			
			var cols = rows[idx].split(" ");
			if (cols == null || cols.length != 3) {
				continue;	// bad fc cookie row
			}

			var cmp = parseInt(cols[0]);
			var imps = parseInt(cols[1]);
			var label = parseInt(cols[2]);
			var key = cmp + "-" + label;
			
			// update
			if (dict[key] != null) { 
				dict[key] += imps;
			}
			else {
				dict[key] = imps;
			}
		}
	}
	
	return dict;
}

/**
 * Setup the FC cookie.
 * 
 * @param simply_cid
 * @param simply_label
 * @param simply_fc_cookie
 */
function freqCap(simply_cid, simply_label, simply_fc_cookie) {
	
	// read the FC cookie content
	var dict = unpackFCC(simply_fc_cookie);
	
	// count the current impression
	var content = simply_cid  + "-" + simply_label;
	if (dict[content] != null)
		dict[content] += 1;
	else 
		dict[content] = 1;
	
	// write the new FC cookie content
	packFCC(simply_fc_cookie, dict);
}

function createCookie(name,value,expireDate) {
	if (expireDate) {
		var expires = "; expires="+expireDate.toUTCString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
