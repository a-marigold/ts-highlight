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
            generated += ' </div>';

            generated +=
                '<div class="' +
                defaultCssClasses.line +
                ' ' +
                cssClasses.line +
                '">';

            if (tokenPos === tokensLength - 1) {
                generated += ' </div>';
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
                '">' +
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
                cssClasses.string +
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
                cssClasses.number +
                '">' +
                currentToken.value;

            tokenPos++;

            if (tokens[tokenPos].value === 'n') {
                generated +=
                    CLOSED_SPAN +
                    OPENED_SPAN_WITH_CLASS +
                    cssClasses.token +
                    ' ' +
                    cssClasses.bigintChar +
                    '">' +
                    tokens[tokenPos].value;
            }

            generated += CLOSED_SPAN;

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

            tokenPos++;

            continue;
        }

        if (currentToken.type === 'NaNLiteral') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.NaN +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            tokenPos++;

            continue;
        }

        if (currentToken.type === 'UndefinedLiteral') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.undefined +
                '">' +
                currentToken.value +
                CLOSED_SPAN;

            tokenPos++;

            continue;
        }

        if (currentToken.type === 'NullLiteral') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.null +
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

    generated += '</div></code></pre>';

    return generated;
};
