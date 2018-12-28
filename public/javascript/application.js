
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
    },
    setBookIcon: function( image ) {
        $('#bookIcon').attr('src', image );
        $('#bookIcon').show();
    },
    hideBookIcon: function() {
        $('#bookIcon').hide();
    }
};

function getAnAnswer() {
    var answer = theBook.answer();
    if( answer == null )
        answer = "No answers in this book :-(";
    
    GUI.setAnswer( answer );
}

var Paths = {
    base_book_dir: function( book_name ) { return 'books/' + book_name; },
    book: function( book_name ) { return Paths.base_book_dir( book_name ) + '/book.txt'; },
    icon: function( book_name, icon ) { return Paths.base_book_dir( book_name ) + '/images/' + icon; }
};

$(document).ready( function() {

    var book = getUrlParameter( 'book' );
    if( !book ) {
        GUI.setTitle( "No book loaded");
        GUI.setAnswer( "" );
        return;
    }

    theBook = new AnBook();
    $('.click_zone').on('click', getAnAnswer);


    NET.http_get( Paths.book( book ) )
    .then( function( content ) {
        theBook.decode( content );
        GUI.setTitle( theBook.title || 'No title in this book' );
        if( theBook.icon )
            GUI.setBookIcon( Paths.icon( book, theBook.icon ) );
        else
            GUI.hideBookIcon();
    });
});
