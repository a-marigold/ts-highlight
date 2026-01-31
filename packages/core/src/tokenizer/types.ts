type LiteralTokenType =
    | 'NumberLiteral'
    | 'StringLiteral'
    | 'BooleanLiteral'
    | 'SentinelLiteral';

/**
 * Variety of `Token` types
 */
export type TokenType =
    | 'Identifier'
    | 'Keyword'
    | 'Operator'
    | 'WhiteSpace'
    | 'Comment'
    | 'LineDivision'
    | 'Instruction'
    | LiteralTokenType;

export type Token = {
    type: TokenType;
    value: string;

    /**
     * Start position of token value in source code
     */
    start: number;

    /**
     * The end of token value in source code
     */
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
    ',',
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
    '??',
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
    '??=',
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

    'function',
    'void',
    'delete',

    'this',

    'debugger',
];
export type JSKeyword = JSKeywords[number];
export type TSKeywords = [
    'keyof',
    'abstract',
    'interface',
    'enum',
    'type',
    'implements',
    'declare',
];
export type TSKeyword = TSKeywords[number];

export type Keywords = [...JSKeywords, ...TSKeywords];
export type Keyword = Keywords[number];

type JSInstruction =
    | 'for'
    | 'do'
    | 'while'
    | 'continue'
    | 'break'
    | 'import'
    | 'from'
    | 'export'
    | 'package'
    | 'try'
    | 'catch'
    | 'finally'
    | 'async'
    | 'await'
    | 'yield'
    | 'with'
    | 'assert'
    | 'default'
    | 'throw'
    | 'return';

type TSInstruction = 'as' | 'asserts' | 'is';
export type Instruction = JSInstruction | TSInstruction;

/**
 *
 * Token types, the values of which are like `Identifier` Token
 * Used to determine correct `TokenType` in tokenizer.
 *
 * @example
 *
 *
 *
 *
 * ```typescript
 * undefined; // `undefined` is not an identifier so `undefined` should be `IdentifierLike`
 * ```
 */
export type IdentifierLike = Extract<
    TokenType,
    'Keyword' | 'Instruction' | 'BooleanLiteral' | 'SentinelLiteral'
>;

/**
 *
 *
 * Type that contains `TokenType` values to be checked in tokenizer.
 *
 * @example
 * ```typescript
 * const singleOperatorsInit: SingleOperators = ['=', '+', '-' ...];
 *
 * const singleOperators: TokenSet = new Set(singleOperatorsInit);
 * ```
 */
export type TokenSet = Set<string>;

/**
 * Type of object that contains tokens which values are like `Identifier`
 * Used to determine
 */
export type IdentifierLikeTokens = LanguageConfigProperty<IdentifierLike>;

/**
 * Type of property in {@link LanguageConfig}
 */
type LanguageConfigProperty<T extends string> = { [key: string]: T };

/**
 * Type of `languageConfig` parameter in `tokenize`.
 * Contains main configuration for programming languages syntax
 *
 *
 *
 *
 */
export type LanguageConfig = {
    identifierLikeTokens: IdentifierLikeTokens;

    singleOperators: TokenSet;
    doubleOperators: TokenSet;

    tripleOperators: TokenSet;

    quadrupleOperators: TokenSet;
};
