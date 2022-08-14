export type TCategory = {
    id: number;
    name: string;
};

export type TIngredient = {
    id: number;
    name: string;
    price: number;
};

export type TCharacteristic = {
    id: number;
    name: string;
    filter: number[];
    type: {
        id: number;
        name: string;
        value: string;
    };
};

export type TProduct = {
    id: number;
    name: string;
    price: number;
    photo: string;
    weight: {
        count: number;
        metric_system: string;
    };
    characteristics: TCharacteristic[];
    additional_product: number[];
};

export type TProductModel = {
    id: number;
    name: string;
    photo: string;
    ingredients: TIngredient[];
    products: TProduct[];
    selects: {
        id: number;
        name: string;
        value: string;
        items: {
            id: number;
            name: string;
        }[];
    }[];
};

export type TCatalogItem = {
    category: TCategory;
    product_models: TProductModel[];
};
