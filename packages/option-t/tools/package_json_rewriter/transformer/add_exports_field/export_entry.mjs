import * as assert from 'node:assert/strict';

class AbstractExportEntry {
    key() {
        throw new EvalError(`please override on ${this.constructor.name}`);
    }
    toJSON() {
        throw new EvalError(`please override on ${this.constructor.name}`);
    }
}

const EXTENSION_MJS = 'js';
const EXTENSION_DMTS = 'd.ts';

export class ExportEntry extends AbstractExportEntry {
    #key;
    #path;

    constructor(key, path) {
        super();

        assert.strictEqual(key.startsWith('/'), false, `key (${key}) should not start with /`);
        assert.strictEqual(key.endsWith('/'), false, `key (${key}) should not end with /`);

        this.#key = key;
        this.#path = path;
        Object.freeze(this);
    }

    key() {
        const key = this.#key;
        // For `main` field
        if (key === '.') {
            return key;
        }

        const k = `./${this.#key}`;
        return k;
    }

    toJSON() {
        const p = this.#path !== null ? this.#path : this.#key;

        const esm = `./esm/${p}.${EXTENSION_MJS}`;
        const dmts = `./esm/${p}.${EXTENSION_DMTS}`;
        const entry = constructDualPackagePathValue({
            esm,
            dmts,
        });
        return entry;
    }
}

function constructDualPackagePathValue({ esm, dmts }) {
    assert.strictEqual(typeof esm, 'string', 'esm should be string');
    assert.strictEqual(typeof dmts, 'string', 'dmts should be string');

    const importCondition = constructPathValue({
        filepath: esm,
        dts: dmts,
    });

    // [By the document of Node.js v14.2](https://nodejs.org/api/esm.html#esm_resolution_algorithm),
    //  * Condition matching is applied in object order from first to last within the "exports" object.
    //  * `["node", "import"]` is used as _defaultEnv_ for its ES Module resolver.
    //
    // see also https://nodejs.org/api/packages.html#conditional-exports
    return Object.freeze({
        // By observing some behaviors, if we add `types` to here, tsc (at least 4.7 ~ 4.9) use its `types` field
        // to determine a module type for this entry point.
        // For example, if we set `d.ts` for ES Module, tsc will think this entrypoint is ESM.

        import: importCondition,

        // _default_ should be placed to the last.
        // https://nodejs.org/api/packages.html#conditional-exports
        default: importCondition,
    });
}

function constructPathValue({ filepath, dts }) {
    assert.strictEqual(typeof filepath, 'string', 'filepath should be string');
    assert.strictEqual(typeof dts, 'string', 'dts should be string');

    // [By the document of Node.js v14.2](https://nodejs.org/api/esm.html#esm_resolution_algorithm),
    //  * Condition matching is applied in object order from first to last within the "exports" object.
    //  * `["node", "import"]` is used as _defaultEnv_ for its ES Module resolver.
    //
    // see also https://nodejs.org/api/packages.html#conditional-exports
    return Object.freeze({
        // > Note that the "types" condition should always come first in "exports".
        // https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#package-json-exports-imports-and-self-referencing
        types: dts,
        // _default_ should be placed to the last.
        // https://nodejs.org/api/packages.html#conditional-exports
        default: filepath,
    });
}
