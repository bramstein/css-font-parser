## CSS font value parser

A simple parser for parsing CSS font values in JavaScript. It has a parser for the font shorthand syntax and the font-family syntax.

## Installation

You can install the parser using:

```bash
npm install css-font-parser
```

## Usage

```javascript
import { parseFont, parseFontFamily } from 'css-font-parser';

parseFont('15px sans-serif');

> {
>   'font-family': ['sans-serif'],
>   'font-size': '15px'
> }

parseFont('15px/18px "Neue Helvetica", Helvetica, sans-serif');

> {
>   'font-family': ['Neue Helvetica', 'Helvetica', 'sans-serif'],
>   'font-size': '15px',
>   'line-height': '18px'
> }

parseFontFamily('"Neue Helvetica", Helvetica, system-ui, sans-serif');

> ['Neue Helvetica', 'Helvetica', 'system-ui', 'sans-serif']
```

## License

Licensed under the three-clause BSD license.
