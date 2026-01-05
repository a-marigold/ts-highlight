import {
    OPENED_SPAN_WITH_CLASS,
    CLOSED_SPAN,
    defaultCssClasses,
} from './constants';

import type { Token } from '../tokenizer';
import type { HighlightCSSClasses } from './types';

export const generate = (
    tokens: Token[],
    cssClasses: HighlightCSSClasses
): string => {
    const tokensLength = tokens.length;

    let generated: string =
        '<pre class="' +
        defaultCssClasses.pre +
        ' ' +
        cssClasses.pre +
        '"><code class="' +
        cssClasses.code +
        '"><div class="' +
        defaultCssClasses.line +
        ' ' +
        cssClasses.line +
        '">';

    /**
     *
     * Boolean flag that shows is the current line opened.
     * Needed for closing opened line in the end of loop.
     */
    let isLineOpened: boolean = true;

    let tokenPos = 0;
    while (tokenPos < tokensLength) {
        const currentToken = tokens[tokenPos];

        if (currentToken.type === 'WhiteSpace') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.whitespace +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            tokenPos++;

            continue;
        }

        if (currentToken.type === 'LineDivision') {
            generated += '</div>';

            if (tokenPos !== tokensLength - 1) {
                generated +=
                    '<div class="' +
                    defaultCssClasses.line +
                    ' ' +
                    cssClasses.line +
                    '">';
                // isLineOpened = false;
            }

            tokenPos++;

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

            tokenPos++;

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

            tokenPos++;

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

            tokenPos++;

            continue;
        }

        if (currentToken.type === 'Instruction') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.instruction +
                '>' +
                currentToken.value +
                CLOSED_SPAN;

            tokenPos++;

            continue;
        }

        // literals
        if (currentToken.type === 'StringLiteral') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.stringLiteral +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            tokenPos++;

            continue;
        }

        if (currentToken.type === 'NumberLiteral') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.numberLiteral +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            tokenPos++;

            continue;
        }

        if (currentToken.type === 'BooleanLiteral') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.booleanLiteral +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            tokenPos++;

            continue;
        }

        if (currentToken.type === 'NaNLiteral') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.NaNLiteral +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            tokenPos++;

            continue;
        }

        // comments
        if (currentToken.type === 'Comment') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.comment +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            tokenPos++;

            continue;
        }

        // fallback
        tokenPos++;
    }

    if (isLineOpened) {
        generated += '</div>';
    }

    generated += '</code></pre>';

    return generated;
};
