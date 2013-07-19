if (typeof require !== 'undefined') {
  expect = require('expect.js');
  parse = require('../index');
}

describe('CSS Font parser', function () {
  it('returns null on invalid css font values', function () {
    expect(parse('')).to.eql(null);
    expect(parse('Arial')).to.eql(null);
    expect(parse('12px')).to.eql(null);
    expect(parse('12px/16px')).to.eql(null);
    expect(parse('bold 12px/16px')).to.eql(null);
  });

  it('ignores non-terminated strings', function () {
    expect(parse('12px "Comic')).to.eql(null);
    expect(parse('12px "Comic, serif')).to.eql(null);
    expect(parse("12px 'Comic")).to.eql(null);
    expect(parse("12px 'Comic, serif")).to.eql(null);
  });

  it('parses a simple font specification correctly', function () {
    expect(parse('12px serif')).to.eql({ 'font-size': '12px', 'font-family': ['serif'] });
  });

  it('returns multiple font families', function () {
    expect(parse('12px Arial, Verdana, serif')).to.eql({ 'font-size': '12px', 'font-family': ['Arial', 'Verdana', 'serif'] });
  });

  it('handles quoted family names correctly', function () {
    expect(parse('12px "Times New Roman"')).to.eql({ 'font-size': '12px', 'font-family': ['"Times New Roman"'] });
    expect(parse("12px 'Times New Roman'")).to.eql({ 'font-size': '12px', 'font-family': ["'Times New Roman'"] });

    expect(parse('12px "Times\\\' New Roman"')).to.eql({ 'font-size': '12px', 'font-family': ["\"Times\\\' New Roman\""] });
    expect(parse("12px 'Times\\\" New Roman'")).to.eql({ 'font-size': '12px', 'font-family': ['\'Times\\\" New Roman\''] });

    expect(parse('12px "Times\\\" New Roman"')).to.eql({ 'font-size': '12px', 'font-family': ['"Times\\\" New Roman"'] });
    expect(parse("12px 'Times\\\' New Roman'")).to.eql({ 'font-size': '12px', 'font-family': ["'Times\\\' New Roman'"] });
  });

  it('handles unquoted identifiers correctly', function () {
    expect(parse('12px Times New Roman')).to.eql({ 'font-size': '12px', 'font-family': ['Times New Roman'] });
    expect(parse('12px Times New Roman, Comic Sans MS')).to.eql({ 'font-size': '12px', 'font-family': ['Times New Roman', 'Comic Sans MS'] });
  });

  // Examples taken from: http://mathiasbynens.be/notes/unquoted-font-family
  it('correctly returns null on invalid identifiers', function () {
    expect(parse('12px Red/Black')).to.eql(null);
    expect(parse("12px 'Lucida' Grande")).to.eql(null);
    expect(parse('12px Ahem!')).to.eql(null);
    expect(parse('12px Hawaii 5-0')).to.eql(null);
    expect(parse('12px $42')).to.eql(null);
  });

  it('correctly parses escaped characters in identifiers', function () {
    expect(parse('12px Red\\/Black')).to.eql({ 'font-size': '12px', 'font-family': ['Red\\/Black'] });
    expect(parse('12px Lucida    Grande')).to.eql({ 'font-size': '12px', 'font-family': ['Lucida Grande'] });
    expect(parse('12px Ahem\\!')).to.eql({ 'font-size': '12px', 'font-family': ['Ahem\\!'] });
    expect(parse('12px \\$42')).to.eql({ 'font-size': '12px', 'font-family': ['\\$42'] });
    expect(parse('12px €42')).to.eql({ 'font-size': '12px', 'font-family': ['€42'] });
  });

  it('correctly parses font-size', function () {
    expect(parse('12px serif')).to.eql({ 'font-size': '12px', 'font-family': ['serif'] });
    expect(parse('xx-small serif')).to.eql({ 'font-size': 'xx-small', 'font-family': ['serif'] });
    expect(parse('s-small serif')).to.eql({ 'font-size': 's-small', 'font-family': ['serif'] });
    expect(parse('small serif')).to.eql({ 'font-size': 'small', 'font-family': ['serif'] });
    expect(parse('medium serif')).to.eql({ 'font-size': 'medium', 'font-family': ['serif'] });
    expect(parse('large serif')).to.eql({ 'font-size': 'large', 'font-family': ['serif'] });
    expect(parse('x-large serif')).to.eql({ 'font-size': 'x-large', 'font-family': ['serif'] });
    expect(parse('xx-large serif')).to.eql({ 'font-size': 'xx-large', 'font-family': ['serif'] });

    expect(parse('larger serif')).to.eql({ 'font-size': 'larger', 'font-family': ['serif'] });
    expect(parse('smaller serif')).to.eql({ 'font-size': 'smaller', 'font-family': ['serif'] });
  });

  it('correctly parses lengths', function () {
    expect(parse('1px serif')).to.eql({ 'font-size': '1px', 'font-family': ['serif'] });
    expect(parse('1em serif')).to.eql({ 'font-size': '1em', 'font-family': ['serif'] });
    expect(parse('1ex serif')).to.eql({ 'font-size': '1ex', 'font-family': ['serif'] });
    expect(parse('1ch serif')).to.eql({ 'font-size': '1ch', 'font-family': ['serif'] });
    expect(parse('1rem serif')).to.eql({ 'font-size': '1rem', 'font-family': ['serif'] });
    expect(parse('1vh serif')).to.eql({ 'font-size': '1vh', 'font-family': ['serif'] });
    expect(parse('1vw serif')).to.eql({ 'font-size': '1vw', 'font-family': ['serif'] });
    expect(parse('1vmin serif')).to.eql({ 'font-size': '1vmin', 'font-family': ['serif'] });
    expect(parse('1vmax serif')).to.eql({ 'font-size': '1vmax', 'font-family': ['serif'] });
    expect(parse('1mm serif')).to.eql({ 'font-size': '1mm', 'font-family': ['serif'] });
    expect(parse('1cm serif')).to.eql({ 'font-size': '1cm', 'font-family': ['serif'] });
    expect(parse('1in serif')).to.eql({ 'font-size': '1in', 'font-family': ['serif'] });
    expect(parse('1pt serif')).to.eql({ 'font-size': '1pt', 'font-family': ['serif'] });
    expect(parse('1pc serif')).to.eql({ 'font-size': '1pc', 'font-family': ['serif'] });
  });

  it('returns null when it fails to parse a font-size', function () {
    expect(parse('1 serif')).to.eql(null);
    expect(parse('xxx-small serif')).to.eql(null);
    expect(parse('1bs serif')).to.eql(null);
    expect(parse('100 % serif')).to.eql(null);
  });

  it('correctly parses percentages', function () {
    expect(parse('100% serif')).to.eql({ 'font-size': '100%', 'font-family': ['serif'] });
  });

  it('correctly parses numbers', function () {
    expect(parse('1px serif')).to.eql({ 'font-size': '1px', 'font-family': ['serif'] });
    expect(parse('1.1px serif')).to.eql({ 'font-size': '1.1px', 'font-family': ['serif'] });
    expect(parse('-1px serif')).to.eql({ 'font-size': '-1px', 'font-family': ['serif'] });
    expect(parse('-1.1px serif')).to.eql({ 'font-size': '-1.1px', 'font-family': ['serif'] });
    expect(parse('+1px serif')).to.eql({ 'font-size': '+1px', 'font-family': ['serif'] });
    expect(parse('+1.1px serif')).to.eql({ 'font-size': '+1.1px', 'font-family': ['serif'] });
    expect(parse('.1px serif')).to.eql({ 'font-size': '.1px', 'font-family': ['serif'] });
    expect(parse('+.1px serif')).to.eql({ 'font-size': '+.1px', 'font-family': ['serif'] });
    expect(parse('-.1px serif')).to.eql({ 'font-size': '-.1px', 'font-family': ['serif'] });
  });

  it('returns null when it fails to parse a number', function () {
    expect(parse('12.px serif')).to.eql(null);
    expect(parse('+---12.2px serif')).to.eql(null);
    expect(parse('12.1.1px serif')).to.eql(null);
    expect(parse('10e3px serif')).to.eql(null);
  });

  it('correctly parses line-height', function () {
    expect(parse('12px/16px serif')).to.eql({ 'font-size': '12px', 'line-height': '16px', 'font-family': ['serif'] });
    expect(parse('12px/1.5 serif')).to.eql({ 'font-size': '12px', 'line-height': '1.5', 'font-family': ['serif'] });
    expect(parse('12px/normal serif')).to.eql({ 'font-size': '12px', 'font-family': ['serif'] });
    expect(parse('12px/105% serif')).to.eql({ 'font-size': '12px', 'line-height': '105%', 'font-family': ['serif'] });
  });

  it('correctly parses font-style', function () {
    expect(parse('italic 12px serif')).to.eql({ 'font-size': '12px', 'font-style': 'italic', 'font-family': ['serif'] });
    expect(parse('oblique 12px serif')).to.eql({ 'font-size': '12px', 'font-style': 'oblique', 'font-family': ['serif'] });
  });

  it('correctly parses font-variant', function () {
    expect(parse('small-caps 12px serif')).to.eql({ 'font-size': '12px', 'font-variant': 'small-caps', 'font-family': ['serif'] });
  });

  it('correctly parses font-weight', function () {
    expect(parse('bold 12px serif')).to.eql({ 'font-size': '12px', 'font-weight': 'bold', 'font-family': ['serif'] });
    expect(parse('bolder 12px serif')).to.eql({ 'font-size': '12px', 'font-weight': 'bolder', 'font-family': ['serif'] });
    expect(parse('lighter 12px serif')).to.eql({ 'font-size': '12px', 'font-weight': 'lighter', 'font-family': ['serif'] });

    for (var i = 1; i < 10; i += 1) {
      expect(parse(i * 100 + ' 12px serif')).to.eql({ 'font-size': '12px', 'font-weight': i * 100, 'font-family': ['serif'] });
    }
  });

  it('correctly parses font-stretch', function () {
    expect(parse('ultra-condensed 12px serif')).to.eql({ 'font-size': '12px', 'font-stretch': 'ultra-condensed', 'font-family': ['serif'] });
    expect(parse('extra-condensed 12px serif')).to.eql({ 'font-size': '12px', 'font-stretch': 'extra-condensed', 'font-family': ['serif'] });
    expect(parse('condensed 12px serif')).to.eql({ 'font-size': '12px', 'font-stretch': 'condensed', 'font-family': ['serif'] });
    expect(parse('semi-condensed 12px serif')).to.eql({ 'font-size': '12px', 'font-stretch': 'semi-condensed', 'font-family': ['serif'] });
    expect(parse('semi-expanded 12px serif')).to.eql({ 'font-size': '12px', 'font-stretch': 'semi-expanded', 'font-family': ['serif'] });
    expect(parse('expanded 12px serif')).to.eql({ 'font-size': '12px', 'font-stretch': 'expanded', 'font-family': ['serif'] });
    expect(parse('extra-expanded 12px serif')).to.eql({ 'font-size': '12px', 'font-stretch': 'extra-expanded', 'font-family': ['serif'] });
    expect(parse('ultra-expanded 12px serif')).to.eql({ 'font-size': '12px', 'font-stretch': 'ultra-expanded', 'font-family': ['serif'] });
  });
});
