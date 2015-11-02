var extractor = require("../src/extractor.js");
var extract = extractor.extract;
var assert = require("assert");
describe("abbreviations-extractor unit tests", function() {
    it("single line - positive", function() {
        var line = "some text Abbreviations Extractor (AE) some text";
        var r = extract(line);
    
        assert.equal(r, "Abbreviations Extractor (AE)");
    });
    it("single line - negative (no braces)", function() {
        var line = "some text";
        var r = extract(line);
  
        assert.equal(r, undefined);
    });
    it("single line - negative (braces but no capitals)", function() {
        var line = "some text (AE)";
        var r = extract(line);
     
        assert.equal(r, undefined);
    });
    it("single line - positive (mixed case) ", function() {
        var line = "some text Super Extractor of the Abbreviations (SEA)";
        var r = extract(line);
   
        assert.equal(r, "Super Extractor of the Abbreviations (SEA)");
    });
    it("single line - multiple matches ", function() {
        var line = "prefix AB (AB) some text CD (CD) suffix";
        var r = extract(line);
    
        assert.deepEqual(r, ["AB (AB)","CD (CD)"]);
    });
});
