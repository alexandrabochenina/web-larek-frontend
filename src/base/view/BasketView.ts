import { IEvents } from '../../components/base/Events';
import { IItem } from '../../types';
import { cloneTemplate, ensureElement } from '../../utils/utils';
import { View } from './View';

export class BasketView extends View {
	private emitter: IEvents;

	private openBtn: HTMLButtonElement;
	private counter: HTMLElement;

	private itemContainer: HTMLElement;
	private itemTemplate: HTMLTemplateElement;

	private price: HTMLElement;
	private buyBtn: HTMLButtonElement;

	constructor(
		basket: HTMLElement,
		basketBtn: HTMLButtonElement,
		itemTemplate: HTMLTemplateElement,
		emitter: IEvents
	) {
		super(basket);

		this.emitter = emitter;
		this.openBtn = basketBtn;
		this.counter = ensureElement<HTMLElement>(
			'.header__basket-counter',
			basketBtn
		);

		this.itemContainer = ensureElement<HTMLElement>('.basket__list', basket);
		this.itemTemplate = itemTemplate;
		this.price = ensureElement<HTMLElement>('.basket__price', basket);
		this.buyBtn = ensureElement<HTMLButtonElement>('.basket__button', basket);

		this.openBtn.addEventListener('click', () =>
			this.emitter.emit('basket:open')
		);
		this.buyBtn.addEventListener('click', () =>
			this.emitter.emit('basket:buy')
		);
	}

	onItemsChange(items: IItem[]) {
		this.counter.textContent = items.length.toString();

		const totalPrice = items.reduce((acc, cur) => acc + cur.price, 0);
		this.price.textContent = `${totalPrice} синапсов`;

		const itemElements = items.map((item, index) =>
			this.createElement(item, index + 1)
		);
		this.itemContainer.replaceChildren(...itemElements);

		this.buyBtn.disabled = items.length == 0;
	}

	private createElement(item: IItem, index: number): HTMLElement {
		const itemElement = cloneTemplate<HTMLElement>(this.itemTemplate);
		const itemTitle = ensureElement<HTMLElement>('.card__title', itemElement);
		const itemPrice = ensureElement<HTMLElement>('.card__price', itemElement);
		const itemIndex = ensureElement<HTMLElement>(
			'.basket__item-index',
			itemElement
		);
		const deleteBtn = ensureElement<HTMLButtonElement>(
			'.basket__item-delete',
			itemElement
		);

		deleteBtn.addEventListener('click', () =>
			this.emitter.emit<String>('basket:item:delete', item.id)
		);

		itemTitle.textContent = item.title;
		itemPrice.textContent = item.price?.toString() ?? '0';
		itemIndex.textContent = index.toString();

		return itemElement;
	}
}
