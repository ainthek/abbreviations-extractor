module.exports = {
    _extract: function(str) {
        // TODO: implement me	
        var matches = str.match(/((\b([A-Z][A-Za-z]*|in|of|the|and|or)[,]?\s+){1,}\([A-Z]+\))/g);
        //console.error(matches);
        if (matches) {
            matches = matches.map(function(m) {
                return m.replace(/(\r\n|\n|\r)/gm, " ");
            })
            if (matches.length == 1) {
                return matches[0];
            } else {
                return matches;
            }

        } else {
            return undefined;
        }
    },
    extract: function(inputStream) {
        // TODO: this shell be implemented as through stream
        // https://github.com/substack/stream-handbook

        var _extract = this._extract;
        var found = {};
        var es = require("event-stream");
        inputStream.pipe(es.split())
            .on("data", function(line) {
                var r = _extract(line + "");
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
    }
}
