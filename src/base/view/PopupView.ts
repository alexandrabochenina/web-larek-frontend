import { ensureElement } from '../../utils/utils';
import { View } from './View';

export class PopupView extends View {
	private closeBtn: HTMLButtonElement;
	private content: HTMLElement;

	constructor(element: HTMLElement) {
		super(element);

		this.closeBtn = ensureElement<HTMLButtonElement>('.modal__close', element);
		this.content = ensureElement<HTMLElement>('.modal__content', element);

		this.closeBtn.addEventListener('click', () => this.close());
		this.element.addEventListener('click', () => this.close());
		this.content.addEventListener('click', (event) => event.stopPropagation());
	}

	close() {
		this.element.style.display = 'none';
	}

	open() {
		this.element.style.display = 'block';
	}

	setContent(el: HTMLElement) {
		this.content.replaceChildren(el);
	}
}
