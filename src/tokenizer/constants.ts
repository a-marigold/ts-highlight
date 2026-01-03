import type {
    SingleOperator,
    SingleOperators,
    DoubleOperator,
    DoubleOperators,
    TripleOperator,
    TripleOperators,
    QuadrupleOperator,
} from './types';

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
export const singleOperators = new Set<string>(singleOperatorsInit);

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

export const doubleOperators = new Set<string>(doubleOperatorsInit);

const tripleOperatorsInit: TripleOperators = [
    '===',
    '!==',
    '**=',
    '<<=',
    '>>=',
    '>>>',
];
export const tripleOperators = new Set<string>(tripleOperatorsInit);

export const quadrupleOperator: QuadrupleOperator = '>>>=';

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
