import * as assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from '@pkgjs/parseargs';

const FROM_EXTENSION = 'js';
const TO_EXTENSION = 'mjs';

function debug(input) {
    const filename = fileURLToPath(import.meta.url);
    console.log(`${filename}: ${input}`);
}

async function* getAllDescendantFiles(subrootDir) {
    const children = await fs.readdir(subrootDir, {
        encoding: 'utf8',
        withFileTypes: true,
    });

    for (const dirent of children) {
        const fullpath = path.resolve(subrootDir, dirent.name);
        if (dirent.isFile()) {
            yield fullpath;
            continue;
        }

        if (dirent.isDirectory()) {
            yield* getAllDescendantFiles(fullpath);
            continue;
        }

        continue;
    }
}

async function* filterFiles(fileList, patternRegExp) {
    for await (const file of fileList) {
        const ok = patternRegExp.test(file);
        if (!ok) {
            continue;
        }

        yield file;
    }
}

function bulkRename(filePathList, targetPattern, replaceValue) {
    const result = [];
    for (const oldFilePath of filePathList) {
        const newFilePath = oldFilePath.replace(targetPattern, replaceValue);
        const r = fs.rename(oldFilePath, newFilePath);
        result.push(r);
    }

    return Promise.all(result);
}

function parseCliOptions() {
    const CLI_OPTION_TARGET_DIR = 'target-dir';

    const options = {
        [CLI_OPTION_TARGET_DIR]: {
            type: 'string',
        },
    };

    const { values } = parseArgs({
        options,
        strict: true,
    });

    const targetDir = values[CLI_OPTION_TARGET_DIR];
    assert.ok(!!targetDir, 'no targetDir');

    return {
        targetDir,
    };
}

(async function main() {
    const {
        targetDir: TARGET_DIR,
    } = parseCliOptions();

    const cwd = process.cwd();
    const subrootDir = path.resolve(cwd, TARGET_DIR);
    debug(`subrootDir is ${subrootDir}`);

    const allfiles = getAllDescendantFiles(subrootDir);

    const targetPattern = new RegExp(`\\.${FROM_EXTENSION}$`, 'u');

    const targetFiles = [];
    for await (const file of filterFiles(allfiles, targetPattern)) {
        targetFiles.push(file);
    }
    debug(`got target files`);

    await bulkRename(targetFiles, targetPattern, `.${TO_EXTENSION}`);
    debug(`complete to rename all`);
})().catch((e) => {
    console.error(e);
    process.exit(1);
});
