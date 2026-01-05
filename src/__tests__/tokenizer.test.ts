import { describe, it, expect } from 'bun:test';

import { tokenize } from '../tokenizer';

describe('tokenizer', () => {
    it('should return a valid tokens array', () => {
        const source = `
        let num = 10;

        
        console.log(num++);
        `;

        const tokens = tokenize(source);

        console.log(tokens);
        expect(tokens.length).toBe(25);
        expect(
            tokens.some(
                (token) => token.type === 'Operator' && token.value === '++'
            )
        ).toBe(true);
    });

    it('should group `space` or `tab` order to one `WhiteSpace` token', () => {
        const tabSource = `\t\t\t\t\t\t`;
        const spaceSource = '      ';

        const tabTokens = tokenize(tabSource);
        const spaceTokens = tokenize(spaceSource);

        expect(tabTokens.length).toBe(1);
        expect(tabTokens[0].type).toBe('WhiteSpace');
        expect(tabTokens[0].value.length).toBe(tabSource.length);

        expect(spaceTokens.length).toBe(1);
        expect(spaceTokens[0].type).toBe('WhiteSpace');
        expect(spaceTokens[0].value.length).toBe(spaceSource.length);
    });

    it('should handle CRLF and LF line feeds to `LineDivision` token', () => {
        const CRLFSource = '\r\n\r\n\r\n\r\n\r\n\r\n';
        const LFSource = '\n\n\n\n\n\n';

        const CRLFTokens = tokenize(CRLFSource);
        const LFTokens = tokenize(LFSource);

        expect(CRLFTokens.length).toBe(CRLFSource.length / 2);
        for (let i = CRLFTokens.length - 1; i > 0; i--) {
            expect(CRLFTokens[i].type).toBe('LineDivision');
        }

        expect(LFTokens.length).toBe(LFSource.length);

        for (let i = 0; i < CRLFTokens.length; i++) {
            expect(LFTokens[i].type).toBe('LineDivision');
        }
    });
});
