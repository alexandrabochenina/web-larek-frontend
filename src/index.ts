import { Api } from './base/Api';
import { BasketModel } from './base/model/BasketModel';
import { GalleryModel } from './base/model/GalleryModel';
import { IItem } from './base/model/ItemModel';
import { OrderModel } from './base/model/OrderModel';

import { BasketView } from './base/view/BasketView';
import { ContactsView } from './base/view/ContactsView';
import {GalleryView} from './base/view/GalleryView';
import { ItemView } from './base/view/ItemView';
import { OrderView } from './base/view/OrderView';
import { PaymentView } from './base/view/PaymentView';
import { PopupView } from './base/view/PopupView';
import './scss/styles.scss';

let basketTemplate = document.querySelector("#basket") as HTMLTemplateElement; //темплейт для разметки модального окна корзины
let cloneBasket = basketTemplate.content.cloneNode(true) as HTMLElement;
let openBasket = document.querySelector(".header__basket") as HTMLButtonElement; //открытие корзины
let itemBasket = document.querySelector('#card-basket') as HTMLTemplateElement // темплейт для одного товара в корзине (название, номер, цена)

let api = new Api()
api.getProducts().then(items => {
    galleryModel.items = items;
    galleryView.onItemsChange(galleryModel.items);
})

let gallery = document.querySelector(".gallery") as HTMLElement 
let basketModel = new BasketModel({items:[]})
let basketView = new BasketView(cloneBasket.firstElementChild as HTMLElement, openBasket, itemBasket)
basketView.onItemsChange(basketModel.items)
basketView.onItemDelete((id) => {
    basketModel.deleteItem(id)
    basketView.onItemsChange(basketModel.items)
})

basketView.onBasketOpen(() => {
    popupView.setContent(basketView.element);
    popupView.open()
    
})

basketView.onBuy(()=> {
    popupView.setContent(paymentView.element);
    popupView.open()
    orderModel.setItems(basketModel.items)
})


let galleryTemplate = document.querySelector("#card-catalog") as HTMLTemplateElement;
let galleryView = new GalleryView(gallery, galleryTemplate);
let galleryModel = new GalleryModel({items:[]});

galleryView.onItemClick((id) => {
    let isInBasket = basketModel.items.find(item => item.id === id) != null;
    let item = galleryModel.items.find(item => item.id === id)

    itemView.setItem(item, isInBasket)
    popupView.setContent(itemView.element)
    popupView.open()
})

let itemViewElement = document.querySelector("#card-preview") as HTMLTemplateElement;
let itemClone = itemViewElement.content.cloneNode(true) as HTMLElement;

let itemView = new ItemView(itemClone.firstElementChild as HTMLElement);
itemView.onBtnClick((id) => {
    let isInBasket = basketModel.items.find(item => item.id === id) != null;
    let item = galleryModel.items.find(item => item.id === id)
    if (!isInBasket) {
        basketModel.addItem(item)
    } else {
        basketModel.deleteItem(item.id)
    }

    basketView.onItemsChange(basketModel.items);
    itemView.setItem(item, !isInBasket)
})

let popupEl = document.querySelector(".modal") as HTMLElement
let popupView = new PopupView(popupEl);


let paymentTemplate = document.querySelector("#order") as HTMLTemplateElement;
let paymentEl = paymentTemplate.content.cloneNode(true) as HTMLElement;
let paymentView = new PaymentView(paymentEl.firstElementChild as HTMLElement);

paymentView.nextClick(() => {
    popupView.setContent(contactsView.element);
    popupView.open()

    orderModel.address = paymentView.addressValue 
    orderModel.paymentMethod = paymentView.paymentMethod
})

let contactsTemplate = document.querySelector("#contacts") as HTMLTemplateElement;
let contactsEl = contactsTemplate.content.cloneNode(true) as HTMLElement;
let contactsView = new ContactsView(contactsEl.firstElementChild as HTMLElement);


let orderTemplate = document.querySelector("#success") as HTMLTemplateElement;
let orderEl = orderTemplate.content.cloneNode(true) as HTMLElement;
let orderView = new OrderView(orderEl.firstElementChild as HTMLElement);

orderView.onComplete(() => {
    popupView.close()
})
contactsView.payClick(() => {
    orderModel.email = contactsView.emailValue
    orderModel.phone = contactsView.phoneValue

    api.makeOrder(orderModel.order).then(order => {
        basketModel.clear()
        basketView.onItemsChange(basketModel.items)

        orderView.price = order.total

        popupView.setContent(orderView.element);
        popupView.open()
    })
})



let orderModel = new OrderModel({
    items: new Array<string>(),
    phone: "",
    address: "",
    payment: "",
    email: "",
    total: 0
})

