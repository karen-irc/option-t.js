import path from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import globals from 'globals';

import {
    rules as rulesForJavaScript,
    createLanguageOptionsForModule,
    createLanguageOptionsForCommonJS,
} from './tools/eslint/javascript.js';
import * as importConfig from './tools/eslint/import_config.js';
import {
    createlanguageOptionsForTypeScript,
    config as configForTypeScript,
} from './tools/eslint/typescript.js';
import { configs as prettierConfigs } from './tools/eslint/prettier.js';

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
            '**/__tmp_cjs/**/*',
            '**/cjs/**/*',
            '**/esm/**/*',
            '**/lib/**/*',
        ],
    },
    {
        files: ['**/*.mjs', '**/*.js'],
        languageOptions: languageOptionsForModule,
    },
    {
        files: ['**/*.cjs'],
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
        files: [
            // @prettier-ignore
            '**/*.ts',
            '**/*.mts',
            '**/*.cts',
        ],
        languageOptions: createlanguageOptionsForTypeScript(THIS_DIR_NAME),
        ...configForTypeScript,
    },
    {
        files: [
            // @prettier-ignore
            'packages/option-t/**/*.ts',
            'packages/option-t/**/*.mts',
            'packages/option-t/**/*.cts',
        ],
        languageOptions: createlanguageOptionsForTypeScript(
            path.resolve(THIS_DIR_NAME, 'packages/option-t/'),
        ),
        ...configForTypeScript,
    },
    {
        files: [
            // @prettier-ignore
            'packages/option-t/src/**/*.ts',
            'packages/option-t/src/**/*.mts',
            'packages/option-t/src/**/*.cts',
        ],
        ...importConfig.configForLibaryCode,
    },
    ...prettierConfigs,
];
