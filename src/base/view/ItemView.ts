import { CDN_URL } from '../../utils/constants';
import { IItem } from '../../types';
import { View } from './View';
import { IEvents } from '../../components/base/Events';
import { ensureElement, setItemCategoryColor } from '../../utils/utils';

export class ItemView extends View {
	private emitter: IEvents;
	private img: HTMLImageElement;
	private category: HTMLElement;
	private title: HTMLElement;
	private description: HTMLElement;
	private price: HTMLElement;

	private buyBtn: HTMLButtonElement;

	private itemId: string;

	constructor(element: HTMLElement, emitter: IEvents) {
		super(element);

		this.emitter = emitter;

		this.img = ensureElement<HTMLImageElement>('.card__image', element);
		this.category = ensureElement<HTMLElement>('.card__category', element);
		this.title = ensureElement<HTMLElement>('.card__title', element);
		this.description = ensureElement<HTMLElement>('.card__text', element);
		this.price = ensureElement<HTMLElement>('.card__price', element);
		this.buyBtn = ensureElement<HTMLButtonElement>('.card__button', element);

		this.buyBtn.addEventListener('click', () =>
			this.emitter.emit<String>('item:buy', this.itemId)
		);
	}

	setItem(item: IItem, isInBasket: boolean) {
		this.itemId = item.id;

		this.img.src = `${CDN_URL}/${item.image}`;
		this.category.textContent = item.category;
		setItemCategoryColor(item.category, this.category);
		this.title.textContent = item.title;
		this.description.textContent = item.description;
		this.price.textContent = `${item.price?.toString() ?? '0'} синапсов`;

		this.buyBtn.textContent = isInBasket ? 'Убрать' : 'Добавить';

		this.buyBtn.disabled = item.price <= 0;
	}
}
