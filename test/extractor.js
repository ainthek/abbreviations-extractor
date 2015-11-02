var extractor = require("../src/extractor.js");
var _extract = extractor._extract;
var extract = extractor.extract;
var assert = require("assert");
var es = require("event-stream");

describe("abbreviations-extractor unit tests", function() {
    describe("string API", function() {
        it("single line - positive", function() {
            var line = "Abbreviations Extractor (AE)";
            assert.deepEqual(_extract(line), ["Abbreviations Extractor (AE)"]);
        });
        it("single line - negative (lowercased)", function() {
            var line = "Abbreviations extractor (AE)";
            assert.deepEqual(_extract(line), []);
        });
        it("single line - negative (no braces match)", function() {
            var line = "Some Text";
            assert.deepEqual(_extract(line), []);
        });
        it("single line - negative (braces but no capitals)", function() {
            var line = "some text (AE)";
            var r = _extract(line);

            assert.deepEqual(r, []);
        });
        it("single line - positive (mixed case, lowercased only allowed words) ", function() {
            var line = "some text Super Extractor of the Abbreviations (SEA)";
            var r = _extract(line);
            assert.deepEqual(r, ["Super Extractor of the Abbreviations (SEA)"]);
        });
        it("single line - multiple matches", function() {
            var line = "prefix AB (AB) some text CD (CD) suffix";
            assert.deepEqual(_extract(line), ["AB (AB)", "CD (CD)"]);
        });
        it("single line - multiple matches - duplicates", function() {
            var line = "prefix AB (AB) some text AB (AB) suffix";
            assert.deepEqual(_extract(line), ["AB (AB)", "AB (AB)"]);
        });
        it("real world sample 1 - positive", function() {
            var line = "The first International Classification of Procedures in Medicine (ICPM)"
            assert.deepEqual(_extract(line), ["International Classification of Procedures in Medicine (ICPM)"]);
        });
        it("real world sample 1 - positive", function() {
            var line = 'Health Interventions (ICHI)">Health Interventions (ICHI)'
            assert.deepEqual(_extract(line), ["Health Interventions (ICHI)", "Health Interventions (ICHI)"]);
        });
        it("multi line", function() {
            var line = "The first International\nClassification of Procedures in Medicine (ICPM)"
            assert.deepEqual(_extract(line), ["International Classification of Procedures in Medicine (ICPM)"]);
        });
        it("coma", function() {
            var line = "International Classification of Functioning, Disability and Health (ICF)"
            assert.deepEqual(_extract(line), ["International Classification of Functioning, Disability and Health (ICF)"]);
        });
        it("ends with whitelist-ed", function() {
            // original bug: AssertionError: 'and (LH)' 
            var line = "Left hand (LH) - Hand ends with 'and'"
            assert.deepEqual(_extract(line), []);
        });
    });

    describe("stream API", function() {


        it("streaming - new lines check", function(done) {
            es.readArray(["Sample One (SO)", "Sample Two (ST)"])
                .pipe(extract())
                .pipe(es.writeArray(function(err, arr) {
                    if (err) done(err);
                    else {
                        assert.deepEqual(arr, ["Sample One (SO)", "Sample Two (ST)"]);
                        done();
                    }
                }));
        });
        it("streaming - empty result", function(done) {
            es.readArray(["asdasdf", "sdfadaddsdas"])
                .pipe(extract())
                .pipe(es.writeArray(function(err, arr) {
                    if (err) done(err);
                    else {
                        assert.deepEqual(arr, []);
                        done();
                    }
                }));
        });
        it("streaming - multiple matches", function(done) {
            var line = "prefix AB (AB) some text CD (CD) suffix";
            es.readArray([line])
                .pipe(extract())
                .pipe(es.split())
                .pipe(es.writeArray(function(err, arr) {
                    if (err) done(err);
                    else {
                        assert.deepEqual(arr, ["AB (AB)", "CD (CD)"]);
                        done();
                    }
                }));
        });
    });


});
