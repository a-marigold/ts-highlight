import type { HighlightCSSClasses } from './types';

import defaultStyles from './defaults.module.css';

/**
 * String with opened `span` HTML element with opened `class` attribute.
 *
 * There is double quote `"` in `class` attribute
 *
 * @example
 * ```typescript
 * OPENED_SPAN_WITH_CLASS + 'text-class' + '">' + 'lorem ipsum' + '</span>';
 * // Output: '<span class="text-class">lorem ipsum</span>'
 * ```
 */
export const OPENED_SPAN_WITH_CLASS = '<span class="';

/**
 *
 *  String with closed `span` HTML element.
 *
 *
 * @example
 * ```typescript
 * '<span class="' + 'text-class' + '">' + 'dolor' + CLOSED_SPAN;
 * // Output: <span class="text-class">dolor</span>
 * ```
 */
export const CLOSED_SPAN = '</span>';

export const defaultCssClasses: HighlightCSSClasses = {
    pre: defaultStyles.pre,
    line: defaultStyles.line,
};
