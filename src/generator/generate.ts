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
                '<span class="' +
                cssClasses.token +
                ' ' +
                cssClasses.whitespace +
                '">';

            let charPos = 0;
            while (charPos < currentToken.value.length) {
                generated += ' ';
                charPos++;
            }

            generated += '</span>';

            tokenPos++;

            continue;
        }

        if (currentToken.type === 'Operator') {
            generated +=
                '<span class="' +
                cssClasses.token +
                ' ' +
                cssClasses.operator +
                '">' +
                currentToken.value +
                '</span>';

            tokenPos++;

            continue;
        }

        if (currentToken.type === 'Identifier') {
            generated +=
                '<span class="' +
                cssClasses.token +
                ' ' +
                cssClasses.mutableIdentifier +
                '">' +
                currentToken.value +
                '</span>';

            tokenPos++;

            continue;
        }

        if (currentToken.type === 'Keyword') {
            generated +=
                '<span class="' +
                cssClasses.token +
                ' ' +
                cssClasses.keyword +
                '">' +
                currentToken.value +
                '</span>';

            tokenPos++;

            continue;
        }

        tokenPos++;
    }

    return generated;
};
