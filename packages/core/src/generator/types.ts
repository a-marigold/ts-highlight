/**
 * Type of CSS classes object.
 *
 * Classes are used in generated HTML.
 *
 * CSS modules also can be used
 *
 * &nbsp;
 *
 * Default generated HTML structure:
 * ```html
 * <pre>
 *   <code>
 *     <div> ... </div> <!-- line -->
 *
 *     ...
 *   </code>
 * </pre>
 * ```
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
     *
     *
     * `pre` class is used for `<pre> </pre>` HTML element in highlighted HTML
     */
    pre: string;

    /**
     * `code` class is used for `<code> </code>` HTML element in highlighted HTML
     */
    code: string;

    /**
     * `line` class is used for every line of code (`<div> </div>` HTML element)
     */
    line: string;

    /**
     *
     */

    // trivia

    whitespace: string;
    comment: string;

    // identifier like token types ('Keyword', 'Instruction')
    keyword: string;
    instruction: string;

    operator: string;

    // identifiers
    identifier: string;

    // literals
    number: string;
    string: string;
    boolean: string;

    /**
     * `sentinel` means an empty value in programming languages (`null`, `undefined`, `NaN`, `nil`).
     *
     * @example
     *
     *
     *
     *
     *
     * ```markdown
     * `nil` in go, `null` in javascript
     * ```
     */
    sentinel: string;
    bigintChar: string;
}>;
