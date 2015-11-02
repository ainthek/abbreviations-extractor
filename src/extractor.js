function _extract(str) {
    // TODO: implement me	
    var matches = str.match(/((\b([A-Z][A-Za-z]*|in|of|the|and|or)[,]?\s+){1,}\([A-Z]+\))/g);
    //console.error(matches);
    return (matches || []).map(removeLines);

    function removeLines(m) {
        return m.replace(/(\r\n|\n|\r)/gm, " ");
    }

}
module.exports = {

    _extract: _extract,

    extract: function() {

        var es = require("event-stream");
        var flag; //avoiding empty results
        return es.split()
            .pipe(es.mapSync(__extract))
            //.pipe(es.split()) // this breaks everything, why ? I want to split data from __extract
            

        function __extract(line) {
            var r = _extract(line + "");
            if (!r || !r.length) {
                return;
            }
            // join resouts from one line
            return r.join("\n");
            //cb(null,data);
        }
    }
}
