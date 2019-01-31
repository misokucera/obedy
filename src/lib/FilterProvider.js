const storageFilterKey = 'filter';

const defaultFilter = {
    activeRestaurants: [],
    showOnlyMainCourse: false
};

class FilterProvider {
    static load() {
        const filter = JSON.parse(localStorage.getItem(storageFilterKey)) || defaultFilter;

        return  {
            activeRestaurants: filter.activeRestaurants || defaultFilter.activeRestaurants,
            showOnlyMainCourse: filter.showOnlyMainCourse
        };
    }

    static save(filter) {
        localStorage.setItem(storageFilterKey, JSON.stringify(filter));
    }
}

export default FilterProvider;