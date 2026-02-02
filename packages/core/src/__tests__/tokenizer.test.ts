import { describe, it, expect } from 'bun:test';

import { tokenize } from '../tokenizer';
import type { LanguageConfig } from '../tokenizer/types';

const configuration: LanguageConfig = {};

describe('tokenizer', () => {
    it('should return a valid tokens array', () => {
        const source = `
        let num = 10;

        


        console.log(num++);
        `;
        const tokens = tokenize(source);

        expect(tokens.length).toBe(25);
        expect(
            tokens.some(
                (token) => token.type === 'Operator' && token.value === '++',
            ),
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
        const CRLFSource = '\r\n'.repeat(6);
        const LFSource = '\n'.repeat(6);

        const CRLFTokens = tokenize(CRLFSource);

        const LFTokens = tokenize(LFSource);

        expect(CRLFTokens.length).toBe(LFTokens.length);

        expect(CRLFTokens.length).toBe(CRLFSource.length / 2);

        for (let i = 0; i < CRLFTokens.length; i++) {
            expect(CRLFTokens[i].type).toBe('LineDivision');
        }

        expect(LFTokens.length).toBe(LFSource.length);

        for (let i = 0; i < CRLFTokens.length; i++) {
            expect(LFTokens[i].type).toBe('LineDivision');
        }
    });

    it('should handle numbers with underscores as `NumberLiteral` token', () => {
        const tokens = tokenize('1_000_000');

        expect(tokens.length).toBe(1);

        expect(tokens[0].type).toBe('NumberLiteral');
    });
});
