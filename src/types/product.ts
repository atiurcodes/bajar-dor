
export type ChangeDirection = "up" | "down" | "flat";

export interface ProductChange {
    dir: ChangeDirection;
    pct: number;
}

export interface ProductMarket {
    market: string;
    division: string;
    min: number;
    max: number;
}

export interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;

    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;

    change: ProductChange;
    markets: ProductMarket[];
}

export interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}
