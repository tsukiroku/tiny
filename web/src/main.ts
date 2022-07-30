import App from './App.svelte';

// @ts-ignore
require.config({
    paths: {
        vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs',
    },
});

let editor = null;

// @ts-ignore
require(['vs/editor/editor.main'], () => {
    const keywords = [
        'let',
        'func',
        'true',
        'false',
        'if',
        'else',
        'return',
        'while',
        'in',
        'typeof',
        'null',
        'throw',
        'delete',
        'use',
    ];

    const stds = [
        'print',
        'println',
        'readline',
        'push',
        'pop',
        'shift',
        'unshift',
        'slice',
        'join',
        'forEach',
        'repeat',
        'funcTools',
        'length',
        'match',
        'string',
        'number',
        'boolean',
        'ternary',
        'subString',
        'rMatch',
        'rTest',
        'replace',
        'split',
        'concat',
    ];

    monaco.languages.register({ id: 'tiny' });

    monaco.languages.setLanguageConfiguration('tiny', {
        autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"' },
            { open: "'", close: "'" },
        ],
        brackets: [
            ['{', '}'],
            ['[', ']'],
            ['(', ')'],
        ],
        comments: {
            lineComment: '//',
        },
    });

    monaco.languages.setMonarchTokensProvider('tiny', {
        keywords,
        stds,
        tokenizer: {
            root: [
                [/\/\/.*$/, 'comment'],
                [/\@.*$/, 'decorator'],
                [/[{}()\[\]]/, 'bracket'],
                [
                    /@?[a-zA-Z][\w$]*/,
                    {
                        cases: {
                            '@keywords': 'keyword',
                            '@stds': 'function',
                            '@default': 'identifier',
                        },
                    },
                ],
                [/[a-zA-Z_][a-zA-Z0-9_]*\(/, 'function'],
                [/"([^"\\]|\\.)*"/, 'string'],
                [/'([^'\\]|\\.)*'/, 'string'],
                [/\d+/, 'number'],
                [/[<>](?!@)/, 'delimiter'],
                [/@?[=!+\-*%&|^~/]/, 'delimiter'],
                [/[?:;.,]/, 'delimiter'],
                [/\s+/, 'white'],
            ],
        },
    });

    monaco.editor.defineTheme('tinyTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'identifier', foreground: '#BBBBBB' },
            { token: 'decorator', foreground: '#b366ff' },
            { token: 'delimiter', foreground: '#BBBBBB' },
            { token: 'bracket', foreground: '#BBBBBB' },
            { token: 'function', foreground: '#dcdc90' },
        ],
    });

    monaco.languages.registerCompletionItemProvider('tiny', {
        provideCompletionItems: () => ({
            suggestions: [
                ...keywords.map((keyword) => ({
                    label: keyword,
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: keyword,
                })),
                {
                    label: 'let',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule
                            .InsertAsSnippet,
                    insertText: 'let ${1:name} = ${2:literal};',
                },
                {
                    label: 'func',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule
                            .InsertAsSnippet,
                    insertText: 'func ${1:name}(${2:params}) {\n\t${3:body}\n}',
                },
                {
                    label: 'true',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule
                            .InsertAsSnippet,
                    insertText: 'true',
                },
                {
                    label: 'false',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule
                            .InsertAsSnippet,
                    insertText: 'false',
                },
                {
                    label: 'if',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule
                            .InsertAsSnippet,
                    insertText: 'if (${1:condition}) {\n\t${2:body}\n}',
                },
                {
                    label: 'else',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule
                            .InsertAsSnippet,
                    insertText: 'else {\n\t${1:body}\n}',
                },
                {
                    label: 'return',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule
                            .InsertAsSnippet,
                    insertText: 'return ${1:value};',
                },
                {
                    label: 'while',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule
                            .InsertAsSnippet,
                    insertText: 'while (${1:condition}) {\n\t${2:body}\n}',
                },
                {
                    label: 'in',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule
                            .InsertAsSnippet,
                    insertText: 'in',
                },
                {
                    label: 'typeof',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule
                            .InsertAsSnippet,
                    insertText: 'typeof ${1:value}',
                },
                {
                    label: 'null',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule
                            .InsertAsSnippet,
                    insertText: 'null',
                },
                {
                    label: 'throw',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule
                            .InsertAsSnippet,
                    insertText: "throw '${1:message}';",
                },
                {
                    label: 'delete',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule
                            .InsertAsSnippet,
                    insertText: 'delete ${1:env};',
                },
                {
                    label: 'use',
                    insertTextRules:
                        monaco.languages.CompletionItemInsertTextRule
                            .InsertAsSnippet,
                    insertText: "use '${1:path};'",
                },
            ],
        }),
    });

    editor = monaco.editor.create(document.getElementById('editor'), {
        value: window.location.hash
            ? decodeURIComponent(window.location.hash.substr(1))
            : `// Welcome to the Tiny language playground.
// Try writing some code, try running it.
// you can run it by clicking the 'Run' button.

// Try it
// - Share    : you can share your code by url.
// - Docs     : https://github.com/tsukiroku/tiny/tree/main/docs
// - Examples : you can find some examples here.

// Enjoy!

let someVariable = 'Hello, World!';
println(someVariable);
`,
        language: 'tiny',
        theme: 'tinyTheme',
        automaticLayout: true,
        fontSize: 17,
        fontFamily: 'Fira Code',
        fontLigatures: true,
    });
});

const app = new App({
    target: document.body,
});

export default app;
export { editor };
