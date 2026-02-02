import { IDENTIFIER_START_REGEXP, IDENTIFIER_REGEXP } from './constants';

import type { Token, IdentifierLike, LanguageConfig } from './types';

/**
 *
 * #### *Tokenizer* or *Lexer* function.
 * #### Divides `source` to tokens.
 *
 * @param {string} source javascript or typescript source code to tokenize.
 *
 * @param {LanguageConfig} languageConfig Configuration for programming language syntax with keywords, instructions and the like.
 *
 * @returns {Token[]} Array with tokens from `source`.
 *
 */
export const tokenize = (
    source: string,
    languageConfig: LanguageConfig,
): Token[] => {
    const tokens: Token[] = [];

    const sourceLength = source.length;

    let pos = 0;
    main: while (pos < sourceLength) {
        const char = source[pos];

        if (char === ' ' || char === '\t') {
            const startPos = pos;

            pos++;

            while (
                pos < sourceLength &&
                (source[pos] === ' ' || source[pos] === '\t')
            ) {
                pos++;
            }

            tokens[tokens.length] = {
                type: 'WhiteSpace',

                value: source.slice(startPos, pos),

                start: startPos,

                end: pos,
            };

            continue main;
        }

        if (char === '\n' || char === '\r') {
            const startPos = pos;

            if (char === '\r') {
                pos++;
            }

            pos++;

            tokens[tokens.length] = {
                type: 'LineDivision',

                value: '',

                start: startPos,
                end: pos,
            };

            continue main;
        }

        if (IDENTIFIER_START_REGEXP.test(char)) {
            const startPos = pos;
            pos++;

            while (pos < sourceLength && IDENTIFIER_REGEXP.test(source[pos])) {
                pos++;
            }

            const identifier = source.slice(startPos, pos);

            tokens[tokens.length] = {
                type:
                    languageConfig.identifierLikeTokens[
                        identifier as IdentifierLike
                    ] ?? 'Identifier',
                value: identifier,
                start: startPos,
                end: pos,
            };

            continue main;
        }

        if (char === "'" || char === '"' || char === '`') {
            const startPos = pos;
            const startQuote = char;

            pos++;

            while (pos < sourceLength && source[pos] !== startQuote) {
                pos++;
            }

            pos++;

            tokens[tokens.length] = {
                type: 'StringLiteral',
                value: source.slice(startPos, pos),
                start: startPos,
                end: pos,
            };

            continue main;
        }
        if (char >= '0' && char <= '9') {
            const startPos = pos;

            while (
                pos < sourceLength &&
                ((char >= '0' && char <= '9') || char === '_')
            ) {
                pos++;
            }

            tokens[tokens.length] = {
                type: 'NumberLiteral',
                value: source.slice(startPos, pos),
                start: startPos,
                end: pos,
            };

            continue main;
        }

        // comments
        if (char === '/') {
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
        if (
            languageConfig.quadrupleOperators.has(
                source[pos] +
                    source[pos + 1] +
                    source[pos + 2] +
                    source[pos + 3],
            )
        ) {
            const startPos = pos;

            pos += 4;

            tokens[tokens.length] = {
                type: 'Operator',
                value: source.slice(startPos, pos),
                start: startPos,
                end: pos,
            };

            continue main;
        }

        if (
            languageConfig.tripleOperators.has(
                source[pos] + source[pos + 1] + source[pos + 2],
            )
        ) {
            const startPos = pos;

            pos += 3;

            tokens[tokens.length] = {
                type: 'Operator',
                value: source.slice(startPos, pos),
                start: startPos,
                end: pos,
            };

            continue main;
        }

        if (languageConfig.doubleOperators.has(source[pos] + source[pos + 1])) {
            const startPos = pos;

            pos += 2;

            tokens[tokens.length] = {
                type: 'Operator',
                value: source.slice(startPos, pos),
                start: startPos,
                end: pos,
            };

            continue main;
        }

        if (languageConfig.singleOperators.has(source[pos])) {
            const startPos = pos;

            pos++;

            tokens[tokens.length] = {
                type: 'Operator',
                value: source.slice(startPos, pos),
                start: startPos,
                end: pos,
            };

            continue main;
        }

        pos++;
    }

    return tokens;
};
