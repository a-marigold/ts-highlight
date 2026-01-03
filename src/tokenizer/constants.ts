import type {
    TokenSet,
    SingleOperators,
    DoubleOperators,
    TripleOperators,
    QuadrupleOperator,
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
    '{',
    '}',
    '[',
    ']',
    '(',
    ')',
    ';',
    ',',
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
export const singleOperators: TokenSet = new Set(singleOperatorsInit);

/**
 * `Set` with all javascript two-symbol operators
 *
 * @example '++'
 */
export const doubleOperators: TokenSet = new Set(doubleOperatorsInit);

/**
 * `Set` with all javascript three-symbol operators
 *
 * @example '>>>'
 */
export const tripleOperators: TokenSet = new Set(tripleOperatorsInit);

/**
 * The javascript four-symbol operator.
 *
 * Always equals '>>>=' on December 18, 2025 ECMAScript Specification
 */
export const quadrupleOperator: QuadrupleOperator = '>>>=';

// keywords

const keywordsInit: Keywords = [
    'var',
    'let',
    'const',
    'typeof',
    'class',
    'in',
    'new',
    'instanceof',
    'void',
    'delete',
    'keyof',
    'abstract',
    'interface',
    'enum',
    'type',
    'implements',
];

/**
 * `Set` with javascript and typescript keywords
 */
export const keywords: TokenSet = new Set(keywordsInit);

// regular expresions (RegExp)

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
