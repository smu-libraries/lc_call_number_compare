# LC Call Number Compare

LC Call Number Compare is a simple ES6 module that provides functions to compare and sort Library of Congress Classification (LC) call numbers.

# Usage

## Installation

```
$ npm install --save lc_call_number_compare
```

## Example
```
var lc = require('lc_call_number_compare');

var x = 'HF5381 .S5145 2008',
    y = 'PE1479 .B87 O93 1993',
    z = 'AM101 .S3533 L58 1987b',
    result;

result = lc.cmp(x, y);  /* a negative value */
result = lc.cmp(y, x);  /* a positive value */
result = lc.cmp(x, x);  /* 0 */

result = lc.eq(x, y);   /* false */
result = lc.gt(x, y);   /* false */
result = lc.gte(x, y);  /* false */
result = lc.lt(x, y);   /* true */
result = lc.lte(x, y);  /* true */

result = [x, y, z].sort(lc.cmp);  /* [z, x, y] */

result = [x, y, z].sort((x, y) => {
  return lc.cmp(x, y, { case_sensitive: true });
});
```

## Common options

Options can passed to the functions as an additional argument:

```
result = lc.cmp(a, b, { case_sensitive: true });
```

### case_sensitive: boolean

Indicates whether comparisons should be case-sensitive. Defaults to false.

## Functions

### `cmp`

Compares two strings that are LC call numbers.

Returns a positive value if the first call number is greater than the second call number.

Returns a negative value if the first call number is less than the second call number.

Return 0 if the first call number is equal to the second call number.

### `eq`, `gt`, `gte`, `lt`, `lte`

Compares two strings that are LC call numbers.

`eq` returns true if the first call number is equal to the second call number, false if otherwise.

`gt` returns true if the first call number is greater than the second call number, false if otherwise.

`gte` returns true if the first call number is greater than or equal to the second call number, false if otherwise.

`lt` returns true if the first call number is less than the second call number, false if otherwise.

`lte` returns true if the first call number is less than or equal to the second call number, false if otherwise.

# Expected call number format

The library expects the LC call number to look like:

|Part|Description
|---|---
|QH91.75|Class number
|.C2|First cutter
|C38|Second cutter
|2005b|Date of publication
|Suppl.|Supplementary information

The call number should be written as a single string with no newlines e.g. `'QH91.75.C2 C38 2005b Suppl.'`.

Whitespace between the class number and the first cutter is optional.

Whitespace between the first and second cutters and the supplement information is mandatory.

The cutter numbers and the date of publication can have work letters appended.

The code does its best to match as long a sequence as possible. In the case of a partial match (e.g. only the class number is matched) the remainder of the call number will be regarded as supplementary information, which is sorted in simple alphabetical order.

# License

Except where otherwise stated, this project is released under the [MIT License](LICENSE.md).
