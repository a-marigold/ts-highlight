import { tokenize } from '../tokenizer';
import type { LanguageConfig } from '../tokenizer/types';

import { generate } from '../generator';
import type { HighlightCSSClasses } from '../generator';

/**
 *
 *
 *
 * #### Transforms received `source` string to HTML with higlighted code.
 *
 * Classes could be divided with space as if they are in default HTML `class` attribute.
 *
 * @param {string} source JavaScript or TypeScript source code to highlight.
 *
 * @param {HiglightCSSClasses} cssClasses object with CSS classes.
 *
 * @returns {string} string with HTML of highlighted code.
 *
 * @example
 *
 * ```typescripts
 * const cssClasses: HighlightCSSClasses = {
 *   pre: 'pre-element-class second-class',
 *   code: 'my-code-element-class',
 *
 *   line: 'line-class my-line third-class',
 *
 *   token: 'token-class',
 *
 *   operator: 'operator-class',
 *
 *   keyword: 'keyword-class',
 *   stringLiteral: 'string-class',
 *
 *
 *   ...
 * }
 *
 * highlight('let a = "hello";', cssClasses);
 * ```
 *
 * Output will be:
 *
 * ```html
 * <pre class="pre-element-class">
 *   <code class="code-element-class">
 *     <div class="line-class"> ... </div> <!-- code line with generated tokens inside -->
 *   </code>
 * </pre>
 * ```
 */

export const highlight = (
    source: string,
    languageConfig: LanguageConfig,

    cssClasses?: HighlightCSSClasses,
): string => {
    return generate(tokenize(source, languageConfig), cssClasses || {});
};
