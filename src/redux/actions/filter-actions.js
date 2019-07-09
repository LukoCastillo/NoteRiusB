export const FILTER_NOTE = "FILTER_NOTE";

export function filterNote(newFilter) {
    return {
        type: FILTER_NOTE,
        payload: {
            filter: newFilter
        }
    }
}