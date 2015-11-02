

var extract=require("./extractor.js").extract();
process.stdin.pipe(extract);



