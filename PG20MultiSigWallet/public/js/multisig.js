var INFURA_API_KEY = "";
var HTTP_PROVIDER_URL = "https://ropsten.infura.io/";

var DEFAULT_MULTI_SIG_WALLET_ADDRESS = "0x1370f0273a409a01b36989b8c5ff8c3e42989e14";

function getUrlParams() {
	var params  = new Object;
	const url = location.search.substring(1).split('&');
	for(i=0; url[i]; i++) {
	    var p = url[i].split('=');
	    params[p[0]] = p[1];
	}
	return params;
}

$(document).ready(function(){
	const params = getUrlParams();
	if (params.address) {
		$('#address').val(params.address);
	} else {
		$('#address').val(DEFAULT_MULTI_SIG_WALLET_ADDRESS);
	}
});


