import ProductDTO from "./ProductDTO";

export default class CreateOrderDTO {
    userModelId?: number;
    addressModelId?: number;

    products: ProductDTO[] = [];


    public constructor(userModelId: number, addressModelId: number, products: ProductDTO[]) {
        this.userModelId = userModelId;
        this.addressModelId = addressModelId;
        this.products = products;
    }
}