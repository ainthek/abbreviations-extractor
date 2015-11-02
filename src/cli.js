var extract = require("./extractor.js").extract;
var es = require("event-stream");
var flag; //avoiding one empty line on result
process.stdin
    .pipe(extract())
    .pipe(
        es.through(
            function write(data) {
                flag = 1;
                this.emit('data', data)
                    //this.pause() 
            },
            function end() { //optional
                flag && process.stdout.write("\n");
                this.emit('end')
            }
        )
    )
    .pipe(process.stdout);
