export type Restaurant = {
    id: string,
    source: string,
    order: number,
    color: string,
    name: string,
    url: string
}

export type DailyMenu = {
    updateTime: number,
    dishes: Dish[]
};

export type Dish = {
    id: string,
    name: string,
    price: string
}