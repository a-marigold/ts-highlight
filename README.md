# <p align='center'> **ts-highlight** </p>

<div align='center'>

[![CI](https://github.com/a-marigold/crumb/actions/workflows/ci.yaml/badge.svg)](https://github.com/a-marigold/ts-highlight/actions) [![npm](https://img.shields.io/npm/v/ts-highlight)](https://npmjs.com/package/ts-highlight)

</div>

<div align='center'>

![marigolds](assets/marigolds.webp)

</div>

### Usage

```typescript
import { higlight, type HighlightCSSClasses } from 'ts-higlight';

// styles of generated code are extensible
const cssClasses: HiglightCSSClasses = {
    pre: 'pre-class second-pre-class', // classes can be divided as if they are in HTML `class` attribute
    code: 'code-class',
    line: 'Example-module-css-module__m3Y3uq__line', // classes can be CSS module strings

    token: 'token-class', // `token` class is the class of every token of generated code

    // Every token has its own class for fine grained configuration
    operator: 'operator-class',

    identifier: 'identifier',
    keyword: 'keyword',

    bigintChar: 'bigint-class', // class of bigint character (`10n` - `n` is `bigintChar`)
    stringLiteral: 'string',

    whitespace: 'whitespace', // even whitespace has its own class

    ...
};

highlight(`let a = 'hello';`, cssClasses);
```

Real output will be:

```html
<pre class="pre-class second-pre-class">
    <code class="code-class">
        <div class="Example-module-css-module__m3Y3uq__line">
            <span class="token-class keyword">let</span>
            <span class="token-class whitespace"> </span>
            <span class="token-class identifier">a</span>
            <span class="token-class whitespace"> </span>
            <span class="token-class operator-class">=</span>
            <span class="token-class whitespace"> </span>
            <span class="token-class string">'hello'</span>
            <span class="token-class operator">;</span>
        </div>
    </code>
</pre>
```
