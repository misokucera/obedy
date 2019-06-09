export type FilterState = {
    text: string,
    showOnlyMainCourse: boolean
}

export default class FilterProvider {

    private static readonly storageKey: string = 'filter';
    private static readonly defaultFilterState: FilterState = {
        text: '',
        showOnlyMainCourse: false
    };

    static load(): FilterState {
        const filter = JSON.parse(localStorage.getItem(this.storageKey) || '{}');

        return  {
            text: filter.text || '',
            showOnlyMainCourse: filter.showOnlyMainCourse || false
        };
    }

    static save(filter: FilterState) {
        localStorage.setItem(this.storageKey, JSON.stringify(filter));
    }
}
