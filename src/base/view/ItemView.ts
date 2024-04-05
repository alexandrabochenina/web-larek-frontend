import { CDN_URL } from "../../utils/constants";
import { IItem } from "../model/ItemModel";
import { View } from "./View";

export class ItemView extends View {
    private img: HTMLImageElement;
    private category: HTMLElement;
    private title: HTMLElement;
    private description: HTMLElement;
    private price: HTMLElement;

    private buyBtn: HTMLElement;

    private itemId: string

    constructor(element: HTMLElement) {
        super(element)
        this.img = element.querySelector(".card__image");
        this.category = element.querySelector(".card__category");
        this.title = element.querySelector(".card__title");
        this.description = element.querySelector(".card__text");
        this.price = element.querySelector(".card__price")
        this.buyBtn = element.querySelector(".card__button")
    }

    setItem(item: IItem, isInBasket: boolean) {
        this.itemId = item.id

        this.img.src = `${CDN_URL}/${item.image}`;
        this.category.textContent = item.category;
        this.title.textContent = item.title;
        this.description.textContent = item.description;
        this.price.textContent = item.price?.toString() ?? "0";

        this.buyBtn.textContent = isInBasket ? "Убрать" : "Добавить";
    }

    onBtnClick(callback: (id: string) => void) {
        this.buyBtn.addEventListener('click', () => callback(this.itemId))
    }
}

