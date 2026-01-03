import {
    WHITESPACE_REGEXP,
    IDENTIFIER_START_REGEXP,
    IDENTIFIER_REGEXP,
} from './constants';
import type {
    Operator,
    Operators,
    PunctuationMark,
    PuncuationMarks,
    Keyword,
    Keywords,
    Token,
} from './types';

const operatorsInit: Operators = [
    '=',
    '+',
    '-',
    '*',
    '/',
    '|',
    '&',
    '.',
    ':',
    '++',
    '--',
    '&&',
    '?',
    '||',
    '&=',
    '|=',
    '&&=',
    '||=',
];
/**
 * `Set` with javascript operators. Used for tokens
 */
const operators = new Set<Operator>(operatorsInit);

const keywordsInit: Keywords = [
    'var',
    'let',
    'const',
    'typeof',
    'class',
    'in',
    'new',
    'keyof',
    'abstract',

    'interface',

    'enum',

    'type',
];
/**
 * `Set` with javascript and typescript keywords. Used for tokens
 */
const keywords = new Set<Keyword>(keywordsInit);

const punctuationMarksInit: PuncuationMarks = [
    '{',
    '}',
    '[',
    ']',
    '(',
    ')',
    ';',
    ',',
];
/**
 * `Set` with javascript punctuation marks. Used for tokens
 */
const punctuationMarks = new Set<PunctuationMark>(punctuationMarksInit);

export const tokenize = (source: string): Token[] => {
    const tokens: Token[] = [];

    const sourceLength = source.length;

    let pos = 0;
    while (pos < sourceLength) {
        if (WHITESPACE_REGEXP.test(source[pos])) {
            const startPos = pos;

            pos++;

            if (source[pos] === '\n') {
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
                type: keywords.has(identifier as Keyword)
                    ? 'Keyword'
                    : 'Identifier',
                value: identifier,
                start: startPos,
                end: pos,
            });

            continue;
        }

        if (source[pos] === "'" || source[pos] === '"' || source[pos] === '`') {
        }
    }

    return tokens;
};
