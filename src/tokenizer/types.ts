type LiteralTokenType =
    | 'NumberLiteral'
    | 'StringLiteral'
    | 'BooleanLiteral'
    | 'NaNLiteral';

/**
 * Variety of `Token` kinds
 */
export type TokenType =
    | 'Identifier'
    | 'Keyword'
    | 'Operator'
    | 'PunctuationMark'
    | 'WhiteSpace'
    | 'Comment'
    | LiteralTokenType;

/**
 *
 */
export type Token = {
    type: TokenType;
    value: string;
    start: number;
    end: number;
};

export type SingleOperators = [
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
    ','
];
export type SingleOperator = SingleOperators[number];

export type DoubleOperators = [
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
    '??'
];
export type DoubleOperator = DoubleOperators[number];

export type TripleOperators = [
    '===',
    '!==',
    '**=',
    '<<=',
    '>>=',
    '>>>',

    '&&=',
    '||=',
    '??='
];
export type TripleOperator = TripleOperators[number];

export type QuadrupleOperator = '>>>=';

export type JSKeywords = [
    'var',
    'let',

    'const',
    'typeof',

    'class',
    'in',

    'new',
    'instanceof',
    'void',
    'delete'
];
export type JSKeyword = JSKeywords[number];

export type TSKeywords = ['keyof', 'abstract', 'interface', 'enum', 'type'];
export type TSKeyword = TSKeywords[number];

export type Keywords = [...JSKeywords, ...TSKeywords];
export type Keyword = Keywords[number];
