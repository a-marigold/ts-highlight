/**
 * Variety of `Token` kinds
 */
export type TokenType =
    | 'Identifier'
    | 'Keyword'
    | 'Operator'
    | 'PunctuationMark'
    | 'WhiteSpace'
    | 'Comment';

/**
 *
 */
export type Token = {
    type: TokenType;
    value: string;
    start: number;
    end: number;
};

export type Operators = [
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
    '||='
];
export type Operator = Operators[number];

export type PuncuationMarks = ['{', '}', '[', ']', '(', ')', ';', ','];
export type PunctuationMark = PuncuationMarks[number];

export type JSKeywords = [
    'var',
    'let',

    'const',
    'typeof',

    'class',
    'in',

    'new'
];
export type JSKeyword = JSKeywords[number];

export type TSKeywords = ['keyof', 'abstract', 'interface', 'enum', 'type'];
export type TSKeyword = TSKeywords[number];

export type Keywords = [...JSKeywords, ...TSKeywords];
export type Keyword = Keywords[number];
