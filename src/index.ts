import { WebLarekApi } from './base/WebLarekApi';
import { BasketModel } from './base/model/BasketModel';
import { GalleryModel } from './base/model/GalleryModel';
import { Payment } from './types';
import { OrderModel } from './base/model/OrderModel';

import { BasketView } from './base/view/BasketView';
import { ContactsView } from './base/view/ContactsView';
import { GalleryView } from './base/view/GalleryView';
import { ItemView } from './base/view/ItemView';
import { OrderView } from './base/view/OrderView';
import { PaymentView } from './base/view/PaymentView';
import { PopupView } from './base/view/PopupView';
import './scss/styles.scss';
import { EventEmitter } from './components/base/Events';
import { cloneTemplate, ensureElement } from './utils/utils';

//темплейт для разметки модального окна корзины
const cloneBasket = cloneTemplate<HTMLElement>('#basket');
const openBasket = ensureElement<HTMLButtonElement>('.header__basket'); //открытие корзины
const itemBasket = ensureElement<HTMLTemplateElement>('#card-basket'); // темплейт для одного товара в корзине (название, номер, цена)

const emitter = new EventEmitter();
const api = new WebLarekApi();
api.getProducts().then((listResponse) => {
	galleryModel.items = listResponse.items;
	galleryView.onItemsChange(galleryModel.items);
});

const orderModel = new OrderModel({
	items: new Array<string>(),
	phone: '',
	address: '',
	payment: Payment.Online,
	email: '',
	total: 0,
});

const gallery = ensureElement<HTMLElement>('.gallery');
const basketModel = new BasketModel({ items: [] });
const basketView = new BasketView(cloneBasket, openBasket, itemBasket, emitter);
basketView.onItemsChange(basketModel.items);

const galleryTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const galleryView = new GalleryView(gallery, galleryTemplate, emitter);
const galleryModel = new GalleryModel({ items: [] });

const itemClone = cloneTemplate<HTMLTemplateElement>('#card-preview');
const itemView = new ItemView(itemClone, emitter);

const popupEl = ensureElement<HTMLElement>('.modal');
const popupView = new PopupView(popupEl);

const paymentEl = cloneTemplate<HTMLTemplateElement>('#order');
const paymentView = new PaymentView(paymentEl, emitter);

const contactsEl = cloneTemplate<HTMLTemplateElement>('#contacts');
const contactsView = new ContactsView(contactsEl, emitter);

const orderEl = cloneTemplate<HTMLTemplateElement>('#success');
const orderView = new OrderView(orderEl, emitter);

emitter.on('order:end', () => {
	popupView.close();
});
emitter.on('contacts:pay', () => {
	orderModel.email = contactsView.emailValue;
	orderModel.phone = contactsView.phoneValue;

	api.makeOrder(orderModel.order).then((order) => {
		basketModel.clear();
		basketView.onItemsChange(basketModel.items);

		orderView.price = order.total;

		popupView.setContent(orderView.element);
		popupView.open();
	});
});

emitter.on('payment:submit', () => {
	popupView.setContent(contactsView.element);
	popupView.open();

	orderModel.address = paymentView.addressValue;
	orderModel.paymentMethod = paymentView.paymentMethod;
});

emitter.on<String>('item:buy', (id) => {
	const isInBasket = basketModel.items.find((item) => item.id === id) != null;
	const item = galleryModel.items.find((item) => item.id === id);

	if (!isInBasket) {
		basketModel.addItem(item);
	} else {
		basketModel.deleteItem(item.id);
	}

	basketView.onItemsChange(basketModel.items);
	itemView.setItem(item, !isInBasket);
});

emitter.on<String>('gallery:item:click', (id) => {
	const isInBasket = basketModel.items.find((item) => item.id === id) != null;
	const item = galleryModel.items.find((item) => item.id === id);

	itemView.setItem(item, isInBasket);
	popupView.setContent(itemView.element);
	popupView.open();
});

emitter.on<String>('basket:item:delete', (id) => {
	basketModel.deleteItem(id.toString());
	basketView.onItemsChange(basketModel.items);
});

emitter.on('basket:open', () => {
	popupView.setContent(basketView.element);
	popupView.open();
});

emitter.on('basket:buy', () => {
	popupView.setContent(paymentView.element);
	popupView.open();
	orderModel.setItems(basketModel.items);
});
