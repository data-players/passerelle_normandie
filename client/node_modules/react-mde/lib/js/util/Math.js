"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Calculates modulus, like %, except that it works with negative numbers
 */
function mod(n, m) {
    return ((n % m) + m) % m;
}
exports.mod = mod;
