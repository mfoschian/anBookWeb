var AnBook;

(function() {

function anBook( filecontent ) {

    this.decode(filecontent);
};

anBook.prototype.decode = function(filecontent) {
    this.title = '';
    this.icon = null;
    this.id = null;
    this.answers = [];

    if( filecontent == null )
        return;

    var rex = /^\[(.+)\](.*)$/i
    var prex = ['title', 'icon', 'id', 'author', 'version'];

    var lines = filecontent.split('\n');
    for( var i=0; i<lines.length; i++ ) {
        var line = lines[i].trim();
        if( line == "" )
            continue;

        var m = line.match(rex);
        if( m == null || m.length != 3 ) {
            this.answers.push( line );
        }
        else {
            var token = m[1].lowerCase();
            var text = m[2];
            if( prex.indexOf(token) >= 0 ) {
                this[token] = text;
            }
        }
    }
};

anBook.prototype.isEmpty = function() {
    return this.answers.length == 0;
};

AnBook = anBook;

})();