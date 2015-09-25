# abbreviations-extractor

Running:

	curl http://www.who.int/classifications/ichi/en/ |\
	# lets simplify and parse markdown (or use text if you want)
	pandoc -f html -t markdown |\ 
	# TODO this is what you have to code
	abbrev-extract

Shall produce:

	...
	...
	International Classification of Procedures in Medicine (ICPM)
	Australian Modification of the International Classification of Diseases, 10th revision (ICD-10-AM)
	International Classification of Health Interventions (ICHI)
	...
	...
	...


So the goal is to extract abbrevs in as many forms as you can support.

But I need the first dummy version ASAP.

See also <https://github.com/ainthek/nconv> for

- project structure
- test style
- view history and older commits to see how the tool has advanced in time (I want the same on this project)
- find as many real time examples for URLs and use them in tests (local copy)