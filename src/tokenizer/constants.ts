import type {
    SingleOperators,
    DoubleOperators,
    TripleOperators,
    QuadrupleOperator,
    PunctuationMark,
    PuncuationMarks,
    Keyword,
    Keywords,
} from './types';

// operators

const singleOperatorsInit: SingleOperators = [
    '=',
    '+',
    '-',
    '*',
    '/',
    '%',
    '~',
    '^',
    '.',
    ':',
    '|',
    '&',
    '?',
    '!',
    '<',
    '>',
];
const doubleOperatorsInit: DoubleOperators = [
    '==',
    '!=',

    '<=',
    '>=',

    '++',
    '--',
    '**',

    '*=',
    '/=',
    '%=',

    '^=',
    '&=',
    '|=',

    '&&',
    '||',
    '??',
];
const tripleOperatorsInit: TripleOperators = [
    '===',
    '!==',

    '**=',
    '<<=',
    '>>=',
    '>>>',
    '&&=',
    '||=',
    '??=',
];

/**
 * `Set` with all javascript one-symbol operators
 *
 * @example '='
 */
export const singleOperators = new Set<string>(singleOperatorsInit);

/**
 * `Set` with all javascript two-symbol operators.
 *
 * @example '++'
 */
export const doubleOperators = new Set<string>(doubleOperatorsInit);

/**
 * `Set` with all javascript three-symbol operators
 *
 * @example '>>>'
 */
export const tripleOperators = new Set<string>(tripleOperatorsInit);

/**
 * The javascript four-symbol operator.
 *
 * Always equals '>>>=' on December 18, 2025 ECMAScript Specification
 */
export const quadrupleOperator: QuadrupleOperator = '>>>=';

// punctuation marks

const puntuactionMarksInit: PuncuationMarks = [
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
 *
 */
export const puncuationMarks = new Set<string>(puntuactionMarksInit);

/**
 * RegExp that matches any whitespace
 *
 */

export const WHITESPACE_REGEXP: RegExp = /\s/;

/**
 * RegExp that is used to match javascript identifier start symbol
 *
 */

export const IDENTIFIER_START_REGEXP: RegExp = /^[a-zA-Zа-яА-Я_$]$/;

/**
 * RegExp that is used to match javascript identifier symbols after the first symbol
 */
export const IDENTIFIER_REGEXP: RegExp = /^[a-zA-Zа-яА-Я_$0-9]$/;

/**
 * RegExp that is used to match any number
 */
export const NUMBER_REGEXP: RegExp = /^[0-9]$/;
