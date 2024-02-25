export interface Product {
    name: string;
    description: string;
    price: number;
}

export interface UpdateProduct {
    _id: string;
    name?: string;
    description?: string;
    price?: number;
}