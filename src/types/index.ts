export interface IGallery {
	items: IItem[];
}

export interface IOrder extends IPayment, IContacts {
	total: number;
	items: string[];
}

export enum Payment {
	None,
	Online,
	Receipt,
}

export interface IPayment {
	address: string;
	payment: Payment;
}

export interface IContacts {
	phone: string;
	email: string;
}

export interface IBasket {
	items: IItem[];
}

export type CategoryType =
	| 'другое'
	| 'софт-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export interface IItem {
	id: string;
	image: string;
	category: CategoryType;
	title: string;
	description: string;
	price: number | null;
}

export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export type ApiMakeOrderResponse = {
	id: string;
	total: number;
};
