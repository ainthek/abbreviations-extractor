var extractor = require("../src/extractor.js");
var extract=extractor.extract;
var assert=require("assert");
describe("abbreviations-extractor unit tests", function() {
    it("shall extract from single line", function() {
    	var line="some text Abbreviations Extractor (AE) some text";
    	assert.equal(extract(line),"Abbreviations Extractor (AE)");
    });
});
