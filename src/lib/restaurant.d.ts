export type DailyMenu = {
    updateTime: number,
    dishes: Dish[]
};

export type Dish = {
    id: string,
    name: string,
    price: string
}