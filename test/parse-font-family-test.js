import expect from "unexpected";
import { parseFontFamily } from "../src/parser.js";

describe("Font Family Parser", function () {
  it("parses a font description with only font family names", function () {
    expect(parseFontFamily("Arial, sans-serif"), "to equal", [
      "Arial",
      "sans-serif",
    ]);
  });

  it("should parse a family name with an escaped space", function () {
    expect(parseFontFamily("Font Awesome\\ 5 Free"), "to equal", [
      "Font Awesome 5 Free",
    ]);
  });

  it("should parse with an escaped backslash", function () {
    expect(parseFontFamily("Foo\\\\Bar"), "to equal", ["Foo\\Bar"]);
  });

  it("should parse unquoted multi-word font family names", function () {
    expect(
      parseFontFamily("Helvetica Neue, Helvetica, Open   Sans, sans-serif"),
      "to equal",
      ["Helvetica Neue", "Helvetica", "Open Sans", "sans-serif"]
    );
  });

  it("should parse font family names with quotes", function () {
    expect(
      parseFontFamily('"Helvetica Neue", Helvetica, sans-serif'),
      "to equal",
      ["Helvetica Neue", "Helvetica", "sans-serif"]
    );
  });

  it("should parse font family names without spaces", function () {
    expect(parseFontFamily("Helvetica,sans-serif"), "to equal", [
      "Helvetica",
      "sans-serif",
    ]);
  });
});
