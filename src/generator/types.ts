/**
 * Type of CSS classes object.
 *
 * Classes are used in generated HTML.
 *
 * CSS modules also can be used
 *
 * @example
 * const CSSClasses: HighlightCSSClasses = {
 *    token: 'my-token-classname',
 *    comment: 'my-comment-classname',
 *    ...
 * };
 */
export type HighlightCSSClasses = Partial<{
    /**
     * `token` class is used for every token of code, even whitespace.
     */
    token: string;

    // trivia
    whitespace: string;
    comment: string;

    keyword: string;

    operator: string;

    // identifiers
    constantIdentifier: string;
    mutableIdentifier: string;

    // literals
    numberLiteral: string;
    stringLiteral: string;
    booleanLiteral: string;
    NaNLiteral: string;
    bigintChar: string;
}>;
