// Converts a value and mantissaRest to scientific notation string, e.g., '6.53 × 10⁻⁵'
export function toSup(value: number, mantissaRest?: number): string {
  if (typeof value !== 'number' || value === 0) return '0';

  // Use mantissaRest if provided, otherwise use value
  let mantissa: number;
  let exponent: number;

  if (typeof mantissaRest === 'number') {
    // Count digits in mantissaRest
    const mantissaStr = mantissaRest.toString();
    mantissa = parseFloat(mantissaStr[0] + '.' + mantissaStr.slice(1));
    exponent = -1 * (mantissaStr.length - 1);
  } else {
    // Use value to get mantissa and exponent
    const exp = value.toExponential();
    const match = exp.match(/([\d.]+)e([-+]?\d+)/);
    if (match) {
      mantissa = parseFloat(match[1]);
      exponent = parseInt(match[2], 10);
    } else {
      return value.toString();
    }
  }

  // Convert exponent to superscript
  const superscriptMap: Record<string, string> = {
    '-': '⁻',
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
  };
  const sup = String(exponent)
    .split('')
    .map((c) => superscriptMap[c] || c)
    .join('');

  return `${mantissa.toPrecision(3)} × 10${sup}`;
}
