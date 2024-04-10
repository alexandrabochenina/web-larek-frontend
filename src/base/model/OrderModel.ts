import { IItem, Payment } from '../../types';
import { Model } from './Model';
import { IOrder } from '../../types';

/* Класс модели завершенного заказа */
export class OrderModel extends Model<IOrder> {
	constructor(data: IOrder) {
		super(data);
	}

	get order(): IOrder {
		return this.data;
	}

	get items(): string[] {
		return this.data.items;
	}

	setItems(items: IItem[]) {
		this.data.items = items.map((item) => item.id);
		this.data.total = items.reduce((acc, item) => acc + item.price, 0);
	}

	get paymentMethod(): Payment {
		return this.data.payment;
	}
	set paymentMethod(paymentMethod: Payment) {
		this.data.payment = paymentMethod;
	}

	get address(): string {
		return this.data.address;
	}
	set address(address: string) {
		this.data.address = address;
	}

	get email(): string {
		return this.data.email;
	}
	set email(email: string) {
		this.data.email = email;
	}

	get phone(): string {
		return this.data.phone;
	}
	set phone(phone: string) {
		this.data.phone = phone;
	}
}
