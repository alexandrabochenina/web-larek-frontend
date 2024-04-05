import { IItem } from "../model/ItemModel";
import { View } from "./View";

export class BasketView extends View {

    private openBtn: HTMLButtonElement
    private counter: HTMLElement
    
    private itemContainer: HTMLElement
    private itemTemplate: HTMLTemplateElement

    private price: HTMLElement
    private buyBtn: HTMLButtonElement

    private onDelete: (id: string) => void

    constructor(basket: HTMLElement, basketBtn: HTMLButtonElement, itemTemplate: HTMLTemplateElement) {
        super(basket)
        
        this.openBtn = basketBtn
        this.counter = basketBtn.querySelector(".header__basket-counter")

        this.itemContainer = basket.querySelector(".basket__list")
        this.itemTemplate = itemTemplate
        this.price = basket.querySelector(".basket__price")
        this.buyBtn = basket.querySelector(".basket__button")
    }

    onItemDelete(callback: (id: string) => void) {
        this.onDelete = callback;
    }

    onBasketOpen(callback: () => void) {
        this.openBtn.addEventListener('click', callback)
    }

    onBuy(callback: () => void) {
        this.buyBtn.addEventListener('click', callback)
    }

    onItemsChange(items: IItem[]) {
       this.counter.textContent = items.length.toString()
       
       let totalPrice = items.reduce((acc,cur) => acc + cur.price,0)
       this.price.textContent = `${totalPrice} синапсов`
       
       let itemElements = items.map((item, index) => this.createElement(item, index + 1))
       this.itemContainer.replaceChildren(...itemElements)

       this.buyBtn.disabled = items.length == 0
    }  

    private createElement(item: IItem, index: number): HTMLElement {
        let itemElement = this.itemTemplate.content.cloneNode(true) as HTMLElement
        let itemTitle = itemElement.querySelector(".card__title");
        let itemPrice = itemElement.querySelector(".card__price");
        let itemIndex = itemElement.querySelector(".basket__item-index");
        let deleteBtn = itemElement.querySelector(".basket__item-delete");

        deleteBtn.addEventListener('click', () => this.onDelete(item.id))

        itemTitle.textContent = item.title;
        itemPrice.textContent = item.price?.toString() ?? '0';
        itemIndex.textContent = index.toString();

        return itemElement
    }
    
}