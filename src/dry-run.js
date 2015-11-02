var byline = require("byline");
var stream = byline(process.stdin, {
    keepEmptyLines: true
});
var extract = require("./extractor.js").extract;
var found = {};
stream.on("data", function(line) {
    line+="";
    var matches = line.match(/\(([A-Z]+\))/g);
    if(matches){
        matches.forEach(function(m){
            console.log(m);
        });
    }
});


