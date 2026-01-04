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

    // TODO: rewrite tokens.push in the loop on tokens[tokens.length]
    let pos = 0;
    main: while (pos < sourceLength) {
        // TODO: rewrite with handle matching instead of regexp

        if (source[pos] === ' ' || source[pos] === '\t') {
            const startPos = pos;

            pos++;

            while (
                pos < sourceLength &&
                (source[pos] === ' ' || source[pos] === '\t')
            ) {
                pos++;
            }

            tokens.push({
                type: 'WhiteSpace',

                value: source.slice(startPos, pos),

                start: startPos,

                end: pos,
            });

            continue main;
        }

        if (source[pos] === '\n' || source[pos] === '\r') {
            const startPos = pos;

            if (source[pos] === '\r') {
                pos++;
            }

            pos++;

            tokens[tokens.length] = {
                type: 'LineDivision',

                value: '\n',

                start: startPos,
                end: pos,
            };

            continue main;
        }

        // literals
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

            continue main;
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

            continue main;
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

            continue main;
        }
        // comments
        if (source[pos] === '/') {
            const startPos = pos;

            pos++;

            if (source[pos] === '/') {
                pos++;

                while (
                    pos < sourceLength &&
                    source[pos] !== '\r' &&
                    source[pos] !== '\n'
                ) {
                    pos++;
                }

                if (source[pos] === '\r') {
                    pos += 2;
                }

                tokens[tokens.length] = {
                    type: 'Comment',

                    value: source.slice(startPos, pos),
                    start: startPos,
                    end: pos,
                };

                tokens[tokens.length] = {
                    type: 'LineDivision',

                    value: '\n',

                    start: startPos,
                    end: pos,
                };

                continue main;
            }

            if (source[pos] === '*') {
                pos++;

                let lastCommentStart = startPos;

                while (
                    pos < sourceLength &&
                    !(source[pos] === '*' && source[pos + 1] === '/')
                ) {
                    // console.log(`${pos}`, source[pos]);
                    if (source[pos] === '\n' || source[pos] === '\r') {
                        tokens[tokens.length] = {
                            type: 'Comment',

                            value: source.slice(lastCommentStart, pos),

                            start: startPos,
                            end: pos,
                        };
                        tokens[tokens.length] = {
                            type: 'LineDivision',

                            value: '\n',

                            start: pos,
                            end: pos + 1,
                        };

                        if (source[pos] === '\r') {
                            pos++;
                        }

                        pos++;
                        lastCommentStart = pos;
                    }

                    pos++;
                }

                pos += 2;

                tokens[tokens.length] = {
                    type: 'Comment',
                    value: source.slice(lastCommentStart, pos),
                    start: startPos,
                    end: pos,
                };

                continue main;
            }
        }

        // operators
        if (singleOperators.has(source[pos])) {
            const startPos = pos;

            pos++;

            tokens.push({
                type: 'Operator',
                value: source.slice(startPos, pos),
                start: startPos,
                end: pos,
            });

            continue main;
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

            continue main;
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

            continue main;
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

            continue main;
        }

        pos++;
    }

    return tokens;
};
