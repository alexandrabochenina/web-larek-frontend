import { View } from "./View";
import { CategoryType, IItem } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { IEvents } from "../../components/base/Events";

export class GalleryView extends View {
    
    private emitter: IEvents;
    private itemTemplate: HTMLTemplateElement;
    private categoryColorMap: Map<CategoryType, string>

    constructor(gallery: HTMLElement, itemTemplate: HTMLTemplateElement, emitter: IEvents) {
        super(gallery);
        this.emitter = emitter;
        this.itemTemplate = itemTemplate;

        this.categoryColorMap = new Map();
        this.categoryColorMap.set('другое', 'card__category_other');
        this.categoryColorMap.set('дополнительное', 'card__category_additional');
        this.categoryColorMap.set('софт-скил', 'card__category_soft');
        this.categoryColorMap.set('хард-скил', 'card__category_hard');
        this.categoryColorMap.set('кнопка', 'card__category_button');
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
        this.setColor(item.category, itemCategory)
        itemImg.src = `${CDN_URL}/${item.image}`;
        itemPrice.textContent = item.price?.toString() ?? "0";

        itemElement.firstElementChild.addEventListener('click', () => this.emitter.emit<String>("gallery:item:click", item.id))

        return itemElement;
    }

    private setColor(category: CategoryType, el: HTMLElement) {
        for (let val in this.categoryColorMap.values) {
            el.classList.remove(val)
        }

        el.classList.add(this.categoryColorMap.get(category))
    }

}

