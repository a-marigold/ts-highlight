import {
    WHITESPACE_REGEXP,
    IDENTIFIER_START_REGEXP,
    IDENTIFIER_REGEXP,
    NUMBER_REGEXP,
    singleOperators,
    doubleOperators,
    tripleOperators,
    quadrupleOperator,
    keywords,
} from './constants';

import type { Token } from './types';

/**
 * *Tokenizer* or *Lexer* function.
 *
 *
 * Divides `source` to tokens.
 *
 * @param {string} source - javascript or typescript source code to tokenize.
 *
 * @returns {Token[]} array with tokens from `source`.
 */
export const tokenize = (source: string): Token[] => {
    const tokens: Token[] = [];

    const sourceLength = source.length;

    let pos = 0;
    while (pos < sourceLength) {
        // TODO: rewrite with handle matching instead of regexp
        if (WHITESPACE_REGEXP.test(source[pos])) {
            const startPos = pos;

            pos++;

            while (pos < sourceLength && WHITESPACE_REGEXP.test(source[pos])) {
                pos++;
            }

            tokens.push({
                type: 'WhiteSpace',
                value: source.slice(startPos, pos),
                start: startPos,
                end: pos,
            });

            continue;
        }

        if (IDENTIFIER_START_REGEXP.test(source[pos])) {
            const startPos = pos;

            pos++;

            while (pos < sourceLength && IDENTIFIER_REGEXP.test(source[pos])) {
                pos++;
            }

            const identifier = source.slice(startPos, pos);

            tokens.push({
                type: keywords.has(identifier) ? 'Keyword' : 'Identifier',
                value: identifier,
                start: startPos,
                end: pos,
            });

            continue;
        }

        if (source[pos] === "'" || source[pos] === '"' || source[pos] === '`') {
            const startPos = pos;
            const startQuote = source[pos];

            pos++;

            while (pos < sourceLength && source[pos] !== startQuote) {
                pos++;
            }

            pos++;

            tokens.push({
                type: 'StringLiteral',
                value: source.slice(startPos, pos),
                start: startPos,
                end: pos,
            });

            continue;
        }

        if (NUMBER_REGEXP.test(source[pos])) {
            const startPos = pos;

            while (pos < sourceLength && NUMBER_REGEXP.test(source[pos])) {
                pos++;
            }

            tokens.push({
                type: 'NumberLiteral',
                value: source.slice(startPos, pos),
                start: startPos,
                end: pos,
            });

            continue;
        }

        if (singleOperators.has(source[pos])) {
            const startPos = pos;

            pos++;

            tokens.push({
                type: 'Operator',
                value: source.slice(startPos, pos),
                start: startPos,
                end: pos,
            });

            continue;
        }

        if (doubleOperators.has(source[pos] + source[pos + 1])) {
            const startPos = pos;

            pos += 2;

            tokens.push({
                type: 'Operator',
                value: source.slice(startPos, pos),
                start: startPos,
                end: pos,
            });

            continue;
        }

        if (
            tripleOperators.has(source[pos] + source[pos + 1] + source[pos + 2])
        ) {
            const startPos = pos;

            pos += 3;

            tokens.push({
                type: 'Operator',
                value: source.slice(startPos, pos),
                start: startPos,
                end: pos,
            });

            continue;
        }

        if (
            source[pos] +
                source[pos + 1] +
                source[pos + 2] +
                source[pos + 3] ===
            quadrupleOperator
        ) {
            const startPos = pos;

            pos += 4;

            tokens.push({
                type: 'Operator',
                value: source.slice(startPos, pos),
                start: startPos,
                end: pos,
            });

            continue;
        }

        pos++;
    }

    return tokens;
};

const __source = `
let a = 100; 
const b  = a instanceof Number;


abstract class ABC {};

type a = abstract new() => string;
`;

console.log(tokenize(__source));
