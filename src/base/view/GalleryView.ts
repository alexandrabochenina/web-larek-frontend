import { View } from "./View";
import { IItem } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { IEvents } from "../../components/base/events";

export class GalleryView extends View {
    
    private emitter: IEvents;
    private itemTemplate: HTMLTemplateElement;

    constructor(gallery: HTMLElement, itemTemplate: HTMLTemplateElement, emitter: IEvents) {
        super(gallery);
        this.emitter = emitter;
        this.itemTemplate = itemTemplate;
    }

    onItemsChange(items: IItem[]) {
        let itemElement = items.map(item => this.createElement(item));
        this.element.replaceChildren(...itemElement)
    }

    private createElement(item: IItem): HTMLElement {
        let itemElement = this.itemTemplate.content.cloneNode(true) as HTMLButtonElement;
        let itemCategory = itemElement.querySelector(".card__category") as HTMLElement;
        let itemTitle =  itemElement.querySelector(".card__title") as HTMLElement;
        let itemImg =  itemElement.querySelector(".card__image") as HTMLImageElement;
        let itemPrice =  itemElement.querySelector(".card__price") as HTMLElement;

        itemTitle.textContent = item.title;
        itemCategory.textContent = item.category;
        itemImg.src = `${CDN_URL}/${item.image}`;
        itemPrice.textContent = item.price?.toString() ?? "0";

        itemElement.firstElementChild.addEventListener('click', () => this.emitter.emit<String>("gallery:item:click", item.id))

        return itemElement;
    }

}

