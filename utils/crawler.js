var Crawler = require("node-webcrawler");
var url = require('url');

var l = [];
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page 
    callback : function (error, result, $) {
        // $ is Cheerio by default 
        //a lean implementation of core jQuery designed specifically for the server 
        if(error) return console.log(error);

        try {
            var k = {
                question: '',
                keys: []
            };
            
            // title contains question
            var q = $("caption");
            k.question = q.text().replace(/[\t\r\n]/gi, '');
            
            // answer table
            var rows = $('#DataGridQADetail tr');
            for(var j = 1; j < rows.length; j++){
                var cells = rows.eq(j).find('td');
                var d = cells.first().text().trim();
                var p = parseInt(cells.eq(1).text().trim());
                
                k.keys.push({ d: d, p: p });
            }

            // totals must meet 90+
            var totes = 0;
            for(var g = 0; g < k.keys.length; g++){
                totes += k.keys[g].p;
            }
            if(totes > 85 && k.keys.length >= 5){
                l.push(k);
            }
        }
        catch(ex) {
            // ignore
        }
        
    },

    onDrain: function(pool){
        console.log('found', l.length, 'valid questions');
        console.log(JSON.stringify(l));
    }
});

var urls = [];
for(var i = 1; i < 1050; i++){
    urls.push('http://familyfeudfriends.arjdesigns.com/?Question=' + i.toString());
}

c.queue(urls);