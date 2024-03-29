import { ExportEntry } from './export_entry.mjs';

export function loadPublicAPIDefinitions(seq) {
    const EXPORT_ENTRIES = [];
    for (const item of seq) {
        const name = item.name();
        const path = item.filepath();
        const entry = new ExportEntry(name, path);
        EXPORT_ENTRIES.push(entry);
    }

    return EXPORT_ENTRIES;
}

export async function addPublicAPIToExportsFields(o, publicApiList) {
    // https://nodejs.org/api/esm.html
    for (const entry of publicApiList) {
        const key = entry.key();

        // eslint-disable-next-line no-param-reassign
        o[key] = entry;
    }
}
