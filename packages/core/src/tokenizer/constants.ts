import type {
    TokenSet,
    SingleOperators,
    DoubleOperators,
    TripleOperators,
    QuadrupleOperator,
    IdentifierLikeTokens,
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

// identifier like token types
/**
 * Object with Identifier like literals and their TokenType.
 *
 * Used to determine correct TokenType.
 *
 *
 *
 * @example
 * ```typescript
 * const unknownIdentifier = 'function';
 *
 * const tokenTypeOfUnknownIdentifier = identifierLikeMap[unknownIdentifier as IdentifierLike];
 *
 * // Output:
 *
 * 'Keyword';
 *
 * ```
 */

export const identifierLikeTokens: IdentifierLikeTokens = {
    // literals
    NaN: 'SentinelLiteral',
    false: 'BooleanLiteral',
    true: 'BooleanLiteral',
    null: 'SentinelLiteral',
    undefined: 'SentinelLiteral',

    // keywords

    abstract: 'Keyword',
    class: 'Keyword',
    const: 'Keyword',
    declare: 'Keyword',
    enum: 'Keyword',
    function: 'Keyword',
    implements: 'Keyword',
    in: 'Keyword',
    instanceof: 'Keyword',
    interface: 'Keyword',

    keyof: 'Keyword',

    let: 'Keyword',
    new: 'Keyword',
    this: 'Keyword',
    type: 'Keyword',
    typeof: 'Keyword',
    var: 'Keyword',
    void: 'Keyword',
    debugger: 'Keyword',

    // instructions

    as: 'Instruction',
    assert: 'Instruction',
    asserts: 'Instruction',
    async: 'Instruction',

    await: 'Instruction',
    break: 'Instruction',
    catch: 'Instruction',

    continue: 'Instruction',
    default: 'Instruction',
    delete: 'Instruction',
    do: 'Instruction',
    export: 'Instruction',
    finally: 'Instruction',
    for: 'Instruction',
    from: 'Instruction',
    import: 'Instruction',
    is: 'Instruction',

    package: 'Instruction',
    return: 'Instruction',
    throw: 'Instruction',
    try: 'Instruction',
    while: 'Instruction',
    with: 'Instruction',
    yield: 'Instruction',
};

// regular expresions (RegExp)

/**
 * RegExp that is used to match identifier start symbol
 *
 */

export const IDENTIFIER_START_REGEXP: RegExp = /^[a-zA-Zа-яА-Я_$#]$/;

/**
 * RegExp that is used to match identifier symbols after the first symbol
 */

export const IDENTIFIER_REGEXP: RegExp = /^[a-zA-Zа-яА-Я_$0-9]$/;
