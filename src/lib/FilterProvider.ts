export type FilterState = {
    activeRestaurants: string[],
    showOnlyMainCourse: boolean
}

export default class FilterProvider {

    private static readonly storageKey: string = 'filter';
    private static readonly defaultFilterState: FilterState = {
        activeRestaurants: [],
        showOnlyMainCourse: false
    };

    static load(): FilterState {
        const filter = JSON.parse(localStorage.getItem(this.storageKey) || '{}');

        return  {
            activeRestaurants: filter.activeRestaurants || this.defaultFilterState.activeRestaurants,
            showOnlyMainCourse: filter.showOnlyMainCourse
        };
    }

    static save(filter: FilterState) {
        localStorage.setItem(this.storageKey, JSON.stringify(filter));
    }
}
