import path from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import globals from 'globals';

import * as importConfig from './tools/eslint/import_config.js';
import {
    rules as rulesForJavaScript,
    createLanguageOptionsForModule,
    createLanguageOptionsForCommonJS,
} from './tools/eslint/javascript.js';
import { configs as prettierConfigs } from './tools/eslint/prettier.js';
import {
    createlanguageOptionsForTypeScript,
    config as configForTypeScript,
} from './tools/eslint/typescript.js';

const THIS_FILE_NAME = fileURLToPath(import.meta.url);
const THIS_DIR_NAME = path.dirname(THIS_FILE_NAME);

const ECMA262_VERSION = 2022;

const languageOptionsForModule = createLanguageOptionsForModule(ECMA262_VERSION, {
    ...globals.nodeBuiltin,
});

const languageOptionsForCommonJS = createLanguageOptionsForCommonJS(ECMA262_VERSION, {
    ...globals.node,
    ...globals.commonjs,
});

const JS_FILES = ['**/*.mjs', '**/*.js'];
const COMMONJS_FILES = ['**/*.cjs'];
const TYPESCRIPT_FILES = [
    // @prettier-ignore
    '**/*.ts',
    '**/*.mts',
    '**/*.cts',
];

const APPLICATION_FILES = TYPESCRIPT_FILES.map((path) => {
    return `packages/option-t/src/${path}`;
});

// https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new
export default [
    js.configs.recommended,
    {
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        rules: {
            ...rulesForJavaScript,
        },
    },
    {
        ignores: [
            // @prettier-ignore

            // Project-specific generated files
            '**/__dist/**/*',
            '**/__tmp_base/**/*',
            '**/__tmp_mjs/**/*',
            '**/esm/**/*',
            '**/lib/**/*',
        ],
    },
    {
        files: JS_FILES,
        languageOptions: languageOptionsForModule,
    },
    {
        files: JS_FILES,
        ...importConfig.configForJavaScript,
    },
    {
        files: COMMONJS_FILES,
        languageOptions: languageOptionsForCommonJS,
    },
    {
        files: ['**/__tests__/**/*'],
        languageOptions: languageOptionsForModule,
        rules: {
            'no-magic-numbers': 'off',
        },
    },
    {
        files: TYPESCRIPT_FILES,
        languageOptions: createlanguageOptionsForTypeScript(THIS_DIR_NAME),
        ...configForTypeScript,
    },
    {
        files: TYPESCRIPT_FILES,
        ...importConfig.configForTypeScript,
    },
    {
        files: APPLICATION_FILES,
        languageOptions: createlanguageOptionsForTypeScript(
            path.resolve(THIS_DIR_NAME, 'packages/option-t/'),
        ),
    },
    {
        files: APPLICATION_FILES,
        ...importConfig.configForLibaryCode,
    },
    ...prettierConfigs,
];
