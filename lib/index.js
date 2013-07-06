/**
 * @param {string} input
 */
function parse(input) {
  var state = 'VARIATION',
      buffer = '',
      result = {
        'font-family': []
      };

  for (var c, i = 0; c = input.charAt(i); i += 1) {
    if (state === 'FONT_FAMILY' && (c === "'" || c === '"')) {
      var index = i + 1;

      // consume the entire string
      do {
        index = input.indexOf(c, index) + 1;
      } while (input.charAt(index - 2) === '\\');

      buffer += input.slice(i + 1, index - 1).replace('\\' + c, c);
      i = index - 1;
    } else if (state === 'FONT_FAMILY' && c === ',') {
      result['font-family'].push(buffer);
      buffer = '';
    } else if (c === ' ' || c === '/') {
      if (/italic|oblique/.test(buffer)) {
        result['font-style'] = buffer;
      } else if (/small-caps/.test(buffer)) {
        result['font-variation'] = buffer;
      } else if (/bold(er?)|lighter|[1-9]00/.test(buffer)) {
        result['font-weight'] = buffer;
      } else if (/((ultra|extra|semi)-)?(condensed|expanded)/.test(buffer)) {
        result['font-stretch'] = buffer;
      } else if (/((xx|x)-)?large|((xx|s)-)?small|medium/.test(buffer) ||
                 /(larg|small)er/.test(buffer) ||
                 /[+-]?([0-9]*\.)?[0-9]+(em|ch|rem|vh|vw|vmin|vmax|px|mm|cm|in|pt|pc|%)/.test(buffer) ||
                 /[+-]?([0-9]*\.)?[0-9]+/.test(buffer)) {
        if (state === 'VARIATION') {
          state = c === '/' ? 'LINE_HEIGHT' : 'FONT_FAMILY';
          result['font-size'] = buffer;
        } else if (state === 'LINE_HEIGHT') {
          state = 'FONT_FAMILY';
          result['line-height'] = buffer;
        }
      }
      buffer = '';
    } else {
      buffer += c;
    }
  }

  if (state === 'FONT_FAMILY') {
    result['font-family'].push(buffer);
  }
  return result;
}

module.exports = parse;
