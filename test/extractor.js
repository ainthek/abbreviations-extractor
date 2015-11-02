var extractor = require("../src/extractor.js");
var _extract = extractor._extract;
var extract = extractor.extract;
var assert = require("assert");
var through = require('through');

describe("abbreviations-extractor unit tests", function() {
    describe("string API", function() {
        it("single line - positive", function() {
            var line = "Abbreviations Extractor (AE)";
            assert.equal(_extract(line), "Abbreviations Extractor (AE)");
        });
        it("single line - negative (lowercased)", function() {
            var line = "Abbreviations extractor (AE)";
            assert.equal(_extract(line), undefined);
        });
        it("single line - negative (no braces match)", function() {
            var line = "Some Text";
            assert.equal(_extract(line), undefined);
        });
        it("single line - negative (braces but no capitals)", function() {
            var line = "some text (AE)";
            var r = _extract(line);

            assert.equal(r, undefined);
        });
        it("single line - positive (mixed case, lowercased only allowed words) ", function() {
            var line = "some text Super Extractor of the Abbreviations (SEA)";
            var r = _extract(line);
            assert.equal(r, "Super Extractor of the Abbreviations (SEA)");
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
            assert.equal(_extract(line), "International Classification of Procedures in Medicine (ICPM)");
        });
        it("real world sample 1 - positive", function() {
            var line = 'Health Interventions (ICHI)">Health Interventions (ICHI)'
            assert.deepEqual(_extract(line), ["Health Interventions (ICHI)", "Health Interventions (ICHI)"]);
        });
        it("multi line", function() {
            var line = "The first International\nClassification of Procedures in Medicine (ICPM)"
            assert.equal(_extract(line), "International Classification of Procedures in Medicine (ICPM)");
        });
        it("coma", function() {
            var line = "International Classification of Functioning, Disability and Health (ICF)"
            assert.equal(_extract(line), "International Classification of Functioning, Disability and Health (ICF)");
        });
        it("ends with whitelist-ed", function() {
            // original bug: AssertionError: 'and (LH)' 
            var line = "Left hand (LH) - Hand ends with 'and'"
            assert.equal(_extract(line), undefined);
        });
    });

    describe("stream API", function() {
        // https://github.com/substack/stream-handbook
        function mockInput() {
            var Readable = require('stream').Readable;
            var input = new Readable;
            for (var i = 0; i < arguments.length; i++) {
                input.push(arguments[i] + '\n');
            }
            input.push(null);
            return input;
        }

        it.skip("stream", function(done) {

            mockInput(1, 2, 3, 4)
                //.pipe(extractor) //TODO: implement extractor as through stream
                .pipe(through(
                	/*
                    function write(data) {
                        this.emit('data', data)

                    },
                    */
                    function end() {
                        this.emit('end');
                        // TODO: asserts
                        done();
                    }
                ));

        });
    });


});
