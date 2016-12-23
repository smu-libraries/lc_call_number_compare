/**
 * Functions to compare and sort call numbers.
 * @module
 */

/**
 * The default options for comparisons.
 * @constant {object}
 * @default
 */
const DEFAULT_OPTIONS = {
  /** Indicates whether string comparisons should be case-sensitive. */
  case_sensitive: false
};

/**
 * The regular expression pattern to use for matching LC call numbers.
 */
const LC_REGEXP = /^([A-Z]+)\s*([0-9]+(\.[0-9]+)?)(\s*\.\s*([A-Z])([0-9]+)([A-Z]*))*(\s*([A-Z])([0-9]+)([A-Z]*))*(\s+([0-9]{4})([A-Z]*)-?)?(.*?)$/i;

/**
 * A LC call number broken up into its components, ready for sorting. Alphabetical components default to empty strings. Numerical components default to 0. The numerical portions of cutter numbers are converted into fractional decimals (0.xxx).
 * @typedef {object} sortable_components
 * @property {string} pristine - The pristine copy of the call number.
 * @property {string} class_alpha - The alphabetical portion of the class number.
 * @property {number} class_numeric - The numerical portion of the class number.
 * @property {string} first_cutter_alpha - The alphabetical portion of the first cutter.
 * @property {number} first_cutter_numeric - The numerical portion of the first cutter.
 * @property {string} first_cutter_work_letters - The work letters appended to the first cutter.
 * @property {string} second_cutter_alpha - The alphabetical portion of the second cutter.
 * @property {number} second_cutter_numeric - The numerical portion of the second cutter.
 * @property {string} second_cutter_work_letters - The work letters appended to the second cutter.
 * @property {number} date_of_publication - The date of publication.
 * @property {string} date_of_publication_work_letters - The work letters appended to the date of publication.
 * @property {string} suppl - The supplementary information.
 */

/**
 * Breaks up a LC call number into its sortable components.
 * @param {string} call_number - The call number to parse.
 * @param {boolean} case_sensitive - Indicates whether the string components should be prepared for case-sensitive comparison.
 * @returns {sortable_components} The components of the call number that are ready for comparison.
 */
function _parse(call_number, case_sensitive) {
  let components = {
    pristine: call_number,
    class_alpha: '',
    class_numeric: 0,
    first_cutter_alpha: '',
    first_cutter_numeric: 0,
    first_cutter_work_letters: '',
    second_cutter_alpha: '',
    second_cutter_numeric: 0,
    second_cutter_work_letters: '',
    date_of_publication: 0,
    date_of_publication_work_letters: '',
    suppl: ''
  };

  if (!case_sensitive) { call_number = call_number.toUpperCase(); }

  let m = call_number.match(LC_REGEXP);
  if (!m) {
    /** Handle bad call numbers by dumping everything into suppl */
    components.suppl = call_number;
  } else {
    components.class_alpha = m[1];
    components.class_numeric = parseFloat(m[2]) || 0;
    components.first_cutter_alpha = m[5];
    components.first_cutter_numeric = parseFloat('0.' + m[6]);
    components.first_cutter_work_letters = m[7];
    components.second_cutter_alpha = m[9];
    components.second_cutter_numeric = parseFloat('0.' + m[10]);
    components.second_cutter_work_letters = m[11];
    components.date_of_publication = parseInt(m[13]) || 0;
    components.date_of_publication_work_letters = m[14];
    components.suppl = m[15];
  }

  return components;
}

/**
 * Compares two values that are of the same type.
 * @param {string|number} x - The first value.
 * @param {string|number} y - The second value.
 * @returns {number} A positive value if x is greater than y, a negative value if x is less than y, and 0 if x is equals to y.
 */
function _cmp(x, y) {
  return x < y ? -1 : +(x > y);
}

/**
 * A collection of options that can alter comparison behavior.
 * @typedef {object} options
 * @property {boolean} case_sensitive - Comparison of strings should be case-sensitive.
 */

/**
 * Compares two strings that are LC call numbers. Can be used as the sorting function in Array.prototype.sort(comparefn).
 * @param {string} x - The first call number.
 * @param {string} y - The second call number.
 * @param {options} opt - The options for the comparison.
 * @returns {number} A positive value if x is greater than y, a negative value if x is less than y, and 0 if x is equals to y.
 */
function cmp(x, y, opt) {
  opt = Object.assign(DEFAULT_OPTIONS, opt);

  /** See http://www.ecma-international.org/ecma-262/6.0/#sec-sortcompare */
  if (x === undefined && y === undefined) { return 0; }
  if (x === undefined) { return 1; }
  if (x === undefined) { return -1; }
  x = x.toString();
  y = y.toString();

  x_components = _parse(x, opt.case_sensitive);
  y_components = _parse(y, opt.case_sensitive);

  return _cmp(x_components.class_alpha, y_components.class_alpha)
    || _cmp(x_components.class_numeric, y_components.class_numeric)
    || _cmp(x_components.first_cutter_alpha, y_components.first_cutter_alpha)
    || _cmp(x_components.first_cutter_numeric, y_components.first_cutter_numeric)
    || _cmp(x_components.first_cutter_work_letters, y_components.first_cutter_work_letters)
    || _cmp(x_components.second_cutter_alpha, y_components.second_cutter_alpha)
    || _cmp(x_components.second_cutter_numeric, y_components.second_cutter_numeric)
    || _cmp(x_components.second_cutter_work_letters, y_components.second_cutter_work_letters)
    || _cmp(x_components.date_of_publication, y_components.date_of_publication)
    || _cmp(x_components.date_of_publication_work_letters, y_components.date_of_publication_work_letters)
    || _cmp(x_components.suppl, y_components.suppl);
}

/**
 * Compares two strings that are LC call numbers.
 * @param {string} x - The first call number.
 * @param {string} y - The second call number.
 * @param {options} opt - The options for the comparison.
 * @returns {boolean} True if x is equals to y, and false if otherwise.
 */
function eq(x, y, opt) { return cmp(x, y, opt) == 0; }

/**
 * Compares two strings that are LC call numbers.
 * @param {string} x - The first call number.
 * @param {string} y - The second call number.
 * @param {options} opt - The options for the comparison.
 * @returns {boolean} True if x is greater than y, and false if otherwise.
 */
function gt(x, y, opt) { return cmp(x, y, opt) > 0; }

/**
 * Compares two strings that are LC call numbers.
 * @param {string} x - The first call number.
 * @param {string} y - The second call number.
 * @param {options} opt - The options for the comparison.
 * @returns {boolean} True if x is greater than or equals to y, and false if otherwise.
 */
function gte(x, y, opt) { return cmp(x, y, opt) >= 0; }

/**
 * Compares two strings that are LC call numbers.
 * @param {string} x - The first call number.
 * @param {string} y - The second call number.
 * @param {options} opt - The options for the comparison.
 * @returns {boolean} True if x is less than y, and false if otherwise.
 */
function lt(x, y, opt) { return cmp(x, y, opt) < 0; }

/**
 * Compares two strings that are LC call numbers.
 * @param {string} x - The first call number.
 * @param {string} y - The second call number.
 * @param {options} opt - The options for the comparison.
 * @returns {boolean} True if x is less than or equals to y, and false if otherwise.
 */
function lte(x, y, opt) { return cmp(x, y, opt) <= 0; }

module.exports = { cmp, eq, gt, gte, lt, lte };
