import { IItem } from "./ItemModel";
import { Model } from "./Model";
/* Интерфейс, описывающий конечный заказ */
export interface IOrder {
    items: string[];
    payment: string;
    address: string;
    email: string;
    phone: string;
    total: number;
}
/* Класс модели завершенного заказа */
export class OrderModel extends Model<IOrder> {

    constructor(data: IOrder) {
        super(data)
    }

    get order(): IOrder {
        return this.data
    }

    get items(): string[] {
        return this.data.items
    }
    
    setItems(items: IItem[]) {
        this.data.items = items.map((item) => item.id)
        this.data.total = items.reduce((acc, item) => acc + item.price, 0)
    }

    get paymentMethod(): string {
        return this.data.payment
    }
    set paymentMethod(paymentMethod: string) {
        this.data.payment = paymentMethod
    }

    get address(): string {
        return this.data.address
    }
    set address(address: string) {
        this.data.address = address
    }

    get email(): string {
        return this.data.email
    }
    set email(email: string) {
        this.data.email = email
    }
    
    get phone(): string {
        return this.data.phone
    }
    set phone(phone: string) {
        this.data.phone = phone
    }

}