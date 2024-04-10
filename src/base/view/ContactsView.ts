import { IEvents } from '../../components/base/Events';
import { ensureAllElements, ensureElement } from '../../utils/utils';
import { View } from './View';

export class ContactsView extends View {
	private emitter: IEvents;
	private email: HTMLInputElement;
	private phone: HTMLInputElement;
	private payBtn: HTMLButtonElement;
	private errSpan: HTMLElement;
	private inputs: HTMLInputElement[];

	constructor(element: HTMLElement, emitter: IEvents) {
		super(element);

		this.emitter = emitter;
		this.email = ensureElement<HTMLInputElement>('[name="email"]', element);
		this.phone = ensureElement<HTMLInputElement>('[name="phone"]', element);
		this.payBtn = ensureElement<HTMLButtonElement>('.button', element);
		this.errSpan = ensureElement<HTMLElement>('.form__errors', element);
		this.inputs = ensureAllElements<HTMLInputElement>('.form__input', element);

		this.payBtn.addEventListener('click', (event) => {
			event.preventDefault();
			this.emitter.emit('contacts:pay');
		});
		this.inputs.forEach((input) => {
			input.addEventListener('input', () => this.checkFormValidity());
		});

		this.updateBtnState(true);
	}

	get emailValue(): string {
		return this.email.value;
	}

	get phoneValue(): string {
		return this.phone.value;
	}

	private updateBtnState(disabled: boolean) {
		this.payBtn.disabled = disabled;
	}

	private checkFormValidity() {
		let formValid = true;
		this.inputs.forEach((input) => {
			const inputEl = input as HTMLInputElement;
			if (!inputEl.validity.valid) {
				this.errSpan.textContent = inputEl.validationMessage;
				formValid = false;
			}
		});

		if (formValid) {
			this.errSpan.textContent = '';
		}
		this.updateBtnState(!formValid);
	}
}
