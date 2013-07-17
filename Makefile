JS := $(shell find src -type f -name "*.js")
TEST_JS := $(shell find test -type f -name "*.js")

COMPILER := ./node_modules/closure-compiler/lib/vendor/compiler.jar

build/parser.js: $(JS) compiler-options
	-mkdir -p build
	java -jar $(COMPILER) --flagfile ./compiler-options --common_js_entry_module=src/parser.js $(JS) > $@

build/parser.debug.js: $(JS) compiler-options
	-mkdir -p build
	java -jar $(COMPILER) --flagfile ./compiler-options --debug=true --common_js_entry_module=src/parser.js --formatting=PRETTY_PRINT --formatting=PRINT_INPUT_DELIMITER $(JS) > $@

.PHONY: clean
clean:
	-rm -rf build
