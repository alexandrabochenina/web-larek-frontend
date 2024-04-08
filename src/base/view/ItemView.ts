import { CDN_URL } from "../../utils/constants";
import { IItem } from "../../types";
import { View } from "./View";
import { IEvents } from "../../components/base/Events";

export class ItemView extends View {
    private emitter: IEvents;
    private img: HTMLImageElement;
    private category: HTMLElement;
    private title: HTMLElement;
    private description: HTMLElement;
    private price: HTMLElement;

    private buyBtn: HTMLElement;

    private itemId: string

    constructor(element: HTMLElement, emitter:IEvents) {
        super(element)

        this.emitter = emitter

        this.img = element.querySelector(".card__image");
        this.category = element.querySelector(".card__category");
        this.title = element.querySelector(".card__title");
        this.description = element.querySelector(".card__text");
        this.price = element.querySelector(".card__price")
        this.buyBtn = element.querySelector(".card__button")

        this.buyBtn.addEventListener('click', () => this.emitter.emit<String>("item:buy", this.itemId))
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
}

