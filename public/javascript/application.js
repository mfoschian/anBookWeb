
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
	
	return null;
};



var NET = {
	http_get: function( uri, name, parms ) {
		return new Promise( function( resolve, reject ) {
			var opts = {
				type: "get",
				url: uri,
				//data: get_parms,
				success: function(data) {
					resolve( data );
				},
				error:function(error) {
					console.log(error);
					reject( error );
				}
			};
			if( parms )
				opts.data = parms;

			$.ajaxSetup({ cache: false });
			$.ajax(opts);
		});
	}
};

var theBook = new AnBook();

var GUI = {

    setAnswer: function( text ) {
        $('#theAnswer').text( text );
    },
    setTitle: function( text ) {
        $('#bookTitle').text( text );
    }
};

function getAnAnswer() {
    var answer = theBook.answer();
    if( answer == null )
        answer = "No answers in this book :-(";
    
    GUI.setAnswer( answer );
}


$(document).ready( function() {

    var book = getUrlParameter( 'book' );
    if( !book ) {
        GUI.setTitle( "No book loaded");
        GUI.setAnswer( "" );
        return;
    }

    theBook = new AnBook();
    $('#theAnswer').on('click', getAnAnswer);


    NET.http_get('/books/' + book + '/book.txt')
    .then( function( content ) {
        theBook.decode( content );
        GUI.setTitle( theBook.title || 'No title in this book' );
    });
});