import { OPENED_SPAN_WITH_CLASS, CLOSED_SPAN } from './constants';

import type { Token } from '../tokenizer';
import type { HighlightCSSClasses } from './types';

export const generate = (
    tokens: Token[],
    cssClasses: HighlightCSSClasses
): string => {
    const tokensLength = tokens.length;

    let generated: string = '';

    let tokenPos = 0;
    while (tokenPos < tokensLength) {
        const currentToken = tokens[tokenPos];

        if (currentToken.type === 'WhiteSpace') {
            generated +=
                OPENED_SPAN_WITH_CLASS +
                cssClasses.token +
                ' ' +
                cssClasses.whitespace +
                '">';

            let charPos = 0;
            while (charPos < currentToken.value.length) {
                generated += ' ';
                charPos++;
            }

            generated += CLOSED_SPAN;

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

        if (currentToken.type === 'StringLiteral') {
            // generated+=
        }

        tokenPos++;
    }

    return generated;
};
