import test from 'ava';

const PlainOption = require('../../../__dist/cjs/PlainOption');

const testcase = [
    [{
        ok: true,
        value: 1
    }, false],
    [{
        ok: false,
    }, true],
];

for (const [input, expected] of testcase) {
    test(`\`${String(JSON.stringify(input))}\` should be \`${String(expected)}\``, (t) => {
        t.is(PlainOption.isNone(input), expected);
    });
}
