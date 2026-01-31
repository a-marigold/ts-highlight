import { OPENED_SPAN_WITH_CLASS, CLOSED_SPAN } from './constants';

import type { Token } from '../tokenizer';
import type { HighlightCSSClasses } from './types';

/**
 * #### Generates HTML with highlighted code from provided `tokens`
 *
 * @param {Token[]} tokens Array with language tokens (from `tokenize` function).
 * @param {HighlightCSSClasses} cssClasses Object with CSS classes for generated HTML
 *
 * @returns {stirng} Generated HTML string
 *
 *
 *
 *
 */
export const generate = (
    tokens: Token[],

    cssClasses: HighlightCSSClasses,
): string => {
    const tokensLength = tokens.length;

    let generated: string =
        '<pre class="' +
        cssClasses.pre +
        '"><code class="' +
        cssClasses.code +
        '"><div class="' +
        cssClasses.line +
        '">';

    let pos = 0;
    while (pos < tokensLength) {
        const currentToken = tokens[pos];

        if (currentToken.type === 'WhiteSpace') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.whitespace +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            pos++;

            continue;
        }

        if (currentToken.type === 'LineDivision') {
            generated += ' </div>';

            generated += '<div class="' + cssClasses.line + '">';

            if (pos === tokensLength - 1) {
                generated += ' </div>';
            }

            pos++;

            continue;
        }

        if (currentToken.type === 'Operator') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.operator +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            pos++;

            continue;
        }

        if (currentToken.type === 'Identifier') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.mutableIdentifier +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            pos++;

            continue;
        }

        if (currentToken.type === 'Keyword') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.keyword +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            pos++;

            continue;
        }

        if (currentToken.type === 'Instruction') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.instruction +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            pos++;

            continue;
        }

        // literals
        if (currentToken.type === 'StringLiteral') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.string +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            pos++;

            continue;
        }

        if (currentToken.type === 'NumberLiteral') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.number +
                '">' +
                currentToken.value;

            pos++;

            if (tokens[pos].value === 'n') {
                generated +=
                    CLOSED_SPAN +
                    OPENED_SPAN_WITH_CLASS +
                    cssClasses.token +
                    ' ' +
                    cssClasses.bigintChar +
                    '">' +
                    tokens[pos].value;

                pos++;
            }

            generated += CLOSED_SPAN;

            continue;
        }

        if (currentToken.type === 'SentinelLiteral') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.sentinel +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            pos++;

            continue;
        }

        if (currentToken.type === 'BooleanLiteral') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.boolean +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            pos++;

            continue;
        }

        if (currentToken.type === 'Comment') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.comment +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            pos++;

            continue;
        }

        // fallback
        pos++;
    }

    generated += '</div></code></pre>';

    return generated;
};
