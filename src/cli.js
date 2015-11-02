var byline = require("byline");
var stream = byline(process.stdin, {
    keepEmptyLines: true
});
var extract = require("./extractor.js").extract;
var found = {};
stream.on("data", function(line) {
    var r = extract(line+"");
    if (!r) {
    	return;
	}
    Array.isArray(r) || (r = [r]);
    r.forEach(function(r) {
        
        if (!found[r]) {
            console.log(r);
        }
        found[r] = 1;
    });
});


