## CSS font value parser

A simple parser for parsing CSS font values in JavaScript.

## Usage

    > parse('15px sans-serif');
    
    {
      'font-family': ['sans-serif'],
      'font-size': '15px'
    }

    > parse('15px/18px "Neue Helvetica", Helvetica, sans-serif');

    {
      'font-family': ['Neue Helvetica', 'Helvetica', 'sans-serif'],
      'font-size': '15px',
      'line-height': '18px'
    }

## License

Licensed under the three-clause BSD license.
