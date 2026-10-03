// Amounts travel in minor units (cents) and are formatted once, here.
const formats = new Map<string, Intl.NumberFormat>();

export function money(cents: number, currency = 'EUR', locale = 'en-IE'): string {
  const key = `${locale}:${currency}`;
  let format = formats.get(key);
  if (!format) {
    format = new Intl.NumberFormat(locale, { style: 'currency', currency });
    formats.set(key, format);
  }
  return format.format(cents / 100);
}
