import { View } from './View';
import { CDN_URL } from '../../utils/constants';
import { IEvents } from '../../components/base/Events';
import {
	cloneTemplate,
	ensureElement,
	setItemCategoryColor,
} from '../../utils/utils';

export class GalleryView extends View {
	private emitter: IEvents;
	private itemTemplate: HTMLTemplateElement;

	constructor(
		gallery: HTMLElement,
		itemTemplate: HTMLTemplateElement,
		emitter: IEvents
	) {
		super(gallery);
		this.emitter = emitter;
		this.itemTemplate = itemTemplate;
	}

	onItemsChange(items: IItem[]) {
		const itemElement = items.map((item) => this.createElement(item));
		this.element.replaceChildren(...itemElement);
	}

	private createElement(item: IItem): HTMLElement {
		const itemElement = cloneTemplate<HTMLTemplateElement>(this.itemTemplate);
		const itemCategory = ensureElement<HTMLElement>(
			'.card__category',
			itemElement
		);
		const itemTitle = ensureElement<HTMLElement>('.card__title', itemElement);
		const itemImg = ensureElement<HTMLImageElement>(
			'.card__image',
			itemElement
		);
		const itemPrice = ensureElement<HTMLElement>('.card__price', itemElement);

		itemTitle.textContent = item.title;
		itemCategory.textContent = item.category;
		setItemCategoryColor(item.category, itemCategory);
		itemImg.src = `${CDN_URL}/${item.image}`;
		itemPrice.textContent = `${item.price?.toString() ?? '0'} синапсов`;

		itemElement.addEventListener('click', () =>
			this.emitter.emit<String>('gallery:item:click', item.id)
		);

		return itemElement;
	}
}
