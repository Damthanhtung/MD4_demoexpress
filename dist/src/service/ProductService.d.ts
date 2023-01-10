declare class ProductService {
    constructor();
    getAll: () => Promise<{
        name: string;
        price: number;
        image: string;
    }[]>;
    save: (product: any) => Promise<string>;
}
declare const _default: ProductService;
export default _default;
