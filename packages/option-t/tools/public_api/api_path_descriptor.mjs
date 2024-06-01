import * as assert from 'node:assert/strict';

export class ApiPathDescriptor {
    #actualFilePath = null;
    #shouldHideInDoc = false;
    #isDeprecatedPath = false;
    #deprecatedPathMessage = '';
    #isExperimental = false;

    constructor(actualFilePath) {
        this.#actualFilePath = actualFilePath;
        Object.seal(this);
    }

    get actualFilePath() {
        return this.#actualFilePath;
    }

    get shouldHideInDoc() {
        return this.#shouldHideInDoc;
    }

    setShouldHideInDoc(val) {
        assert.strictEqual(typeof val, 'boolean');
        this.#shouldHideInDoc = val;
    }

    get isDeprecatedPath() {
        return this.#isDeprecatedPath;
    }

    get deprecatedPathMessage() {
        return this.#deprecatedPathMessage;
    }

    setIsDeprecatedPath(val, message) {
        assert.strictEqual(typeof val, 'boolean');
        assert.strictEqual(typeof message, 'string');
        this.#isDeprecatedPath = val;
        this.#deprecatedPathMessage = message;
    }

    get isExperimental() {
        return this.#isExperimental;
    }

    setIsExperimental(val) {
        assert.strictEqual(typeof val, 'boolean');
        this.#isExperimental = val;
    }
}

export function pathRedirectionTo(actualFilePath) {
    const desc = new ApiPathDescriptor(actualFilePath);
    return Object.freeze(desc);
}

export function pathRedirectionForLegacy(actualFilePath) {
    const desc = new ApiPathDescriptor(actualFilePath);
    desc.setShouldHideInDoc(true);
    return Object.freeze(desc);
}

export function pathRedirectionMarkedAsDeprecated(
    actualFilePath,
    message = 'Use snake_case path instead.',
) {
    const desc = new ApiPathDescriptor(actualFilePath);
    desc.setIsDeprecatedPath(true, message);
    return Object.freeze(desc);
}

export function pathRedirectionForRoot(actualFilePath) {
    const desc = new ApiPathDescriptor(actualFilePath);
    desc.setShouldHideInDoc(true);
    return Object.freeze(desc);
}

export function pathRedirectionToAsExperimental(actualFilePath) {
    const desc = new ApiPathDescriptor(actualFilePath);
    desc.setIsExperimental(true);
    return Object.freeze(desc);
}

export function pathExperimentalAndHidden(actualFilePath) {
    const desc = new ApiPathDescriptor(actualFilePath);
    desc.setShouldHideInDoc(true);
    desc.setIsExperimental(true);
    return Object.freeze(desc);
}
