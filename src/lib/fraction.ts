/**
 * Exact rational number implementation using BigInt for zero-precision-loss arithmetic.
 */
export class Fraction {
  readonly num: bigint;
  readonly den: bigint;

  constructor(numerator: bigint | number | string, denominator: bigint | number | string = BigInt(1)) {
    let n = typeof numerator === "bigint" ? numerator : BigInt(Math.round(Number(numerator)));
    let d = typeof denominator === "bigint" ? denominator : BigInt(Math.round(Number(denominator)));

    if (d === BigInt(0)) {
      throw new Error("Division by zero in Fraction");
    }

    if (d < BigInt(0)) {
      n = -n;
      d = -d;
    }

    const g = Fraction.gcd(n < BigInt(0) ? -n : n, d);
    this.num = n / g;
    this.den = d / g;
  }

  static zero(): Fraction {
    return new Fraction(BigInt(0), BigInt(1));
  }

  static one(): Fraction {
    return new Fraction(BigInt(1), BigInt(1));
  }

  static gcd(a: bigint, b: bigint): bigint {
    while (b !== BigInt(0)) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a === BigInt(0) ? BigInt(1) : a;
  }

  /**
   * Parse a number, integer, decimal or string like "3", "-2", "0.5", "3/4"
   */
  static from(value: number | string | Fraction): Fraction {
    if (value instanceof Fraction) return value;
    if (typeof value === "number") {
      if (Number.isInteger(value)) {
        return new Fraction(BigInt(value), BigInt(1));
      }
      // Decimal conversion to fraction
      const s = value.toString();
      if (s.includes(".")) {
        const parts = s.split(".");
        const decimals = parts[1].length;
        const den = BigInt(10) ** BigInt(Math.min(decimals, 10));
        const num = BigInt(Math.round(value * Number(den)));
        return new Fraction(num, den);
      }
      return new Fraction(BigInt(Math.round(value)), BigInt(1));
    }

    const str = value.trim();
    if (!str) return Fraction.zero();

    // Check fraction "a/b"
    if (str.includes("/")) {
      const [numPart, denPart] = str.split("/");
      const n = Number(numPart.trim());
      const d = Number(denPart.trim());
      if (isNaN(n) || isNaN(d) || d === 0) throw new Error(`Invalid fraction: ${str}`);
      return new Fraction(BigInt(n), BigInt(d));
    }

    // Check decimal "1.25"
    if (str.includes(".")) {
      const val = parseFloat(str);
      if (isNaN(val)) throw new Error(`Invalid number: ${str}`);
      return Fraction.from(val);
    }

    const n = parseInt(str, 10);
    if (isNaN(n)) throw new Error(`Invalid integer: ${str}`);
    return new Fraction(BigInt(n), BigInt(1));
  }

  add(other: Fraction | number | string): Fraction {
    const o = Fraction.from(other);
    return new Fraction(this.num * o.den + o.num * this.den, this.den * o.den);
  }

  sub(other: Fraction | number | string): Fraction {
    const o = Fraction.from(other);
    return new Fraction(this.num * o.den - o.num * this.den, this.den * o.den);
  }

  mul(other: Fraction | number | string): Fraction {
    const o = Fraction.from(other);
    return new Fraction(this.num * o.num, this.den * o.den);
  }

  div(other: Fraction | number | string): Fraction {
    const o = Fraction.from(other);
    if (o.isZero()) throw new Error("Division by zero");
    return new Fraction(this.num * o.den, this.den * o.num);
  }

  neg(): Fraction {
    return new Fraction(-this.num, this.den);
  }

  abs(): Fraction {
    return new Fraction(this.num < BigInt(0) ? -this.num : this.num, this.den);
  }

  isZero(): boolean {
    return this.num === BigInt(0);
  }

  isOne(): boolean {
    return this.num === BigInt(1) && this.den === BigInt(1);
  }

  isNegative(): boolean {
    return this.num < BigInt(0);
  }

  isInteger(): boolean {
    return this.den === BigInt(1);
  }

  toNumber(): number {
    return Number(this.num) / Number(this.den);
  }

  toString(): string {
    if (this.den === BigInt(1)) return this.num.toString();
    return `${this.num}/${this.den}`;
  }

  toTex(): string {
    if (this.den === BigInt(1)) return this.num.toString();
    if (this.num < BigInt(0)) {
      return `-\\frac{${-this.num}}{${this.den}}`;
    }
    return `\\frac{${this.num}}{${this.den}}`;
  }
}
