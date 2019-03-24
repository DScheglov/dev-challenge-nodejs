/**
 * CSV Format
 *
 * Common Format and MIME Type for Comma-Separated Values (CSV) Files
 *
 * ref: https://tools.ietf.org/html/rfc4180
 */

const CRLF = '\x0D\x0A';
const COMMA = '\x2C';

const shouldQuote = value => typeof value === 'string' && /[,\n"]/.test(value);

const quoted = value => (
  value == null ? '' :
  shouldQuote(value) ? `"${value.replace(/"/g, '""')}"` :
  typeof value !== 'string' ? JSON.stringify(value) :
  value.toString()
);

const toRecord = fields => fields.map(quoted).join(COMMA);

const toCsv = data => data.map(toRecord).join(CRLF);

module.exports = toCsv;
