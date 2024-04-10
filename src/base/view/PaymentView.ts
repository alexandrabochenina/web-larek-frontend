import { IEvents } from '../../components/base/Events';
import { Payment } from '../../types';
import { ensureAllElements, ensureElement } from '../../utils/utils';
import { View } from './View';

export class PaymentView extends View {
	private emitter: IEvents;
	private cashBtn: HTMLButtonElement;
	private cardBtn: HTMLButtonElement;
	private selectedBtn: HTMLButtonElement = null;
	private address: HTMLInputElement;
	private nextBtn: HTMLButtonElement;
	private errSpan: HTMLElement;
	private inputs: HTMLInputElement[];

	constructor(element: HTMLElement, emitter: IEvents) {
		super(element);

		this.emitter = emitter;

		this.cardBtn = ensureElement<HTMLButtonElement>('[name="card"]', element);
		this.cardBtn.addEventListener('click', () =>
			this.toggleButton(this.cardBtn)
		);

		this.cashBtn = ensureElement<HTMLButtonElement>('[name="cash"]', element);
		this.cashBtn.addEventListener('click', () =>
			this.toggleButton(this.cashBtn)
		);
		this.address = ensureElement<HTMLInputElement>('[name="address"]', element);

		this.toggleButton(this.cardBtn);
		this.nextBtn = ensureElement<HTMLButtonElement>('.order__button', element);
		this.errSpan = ensureElement<HTMLElement>('.form__errors', element);
		this.inputs = ensureAllElements<HTMLInputElement>('.form__input', element);

		this.nextBtn.addEventListener('click', (event) => {
			event.preventDefault();
			this.emitter.emit('payment:submit');
		});

		this.inputs.forEach((input) => {
			input.addEventListener('input', () => this.checkFormValidity());
		});

		this.updateBtnState(true);
	}

	get addressValue(): string {
		return this.address.value;
	}

	get paymentMethod(): Payment {
		return this.selectedBtn == this.cashBtn ? Payment.Receipt : Payment.Online;
	}

	private toggleButton(btn: HTMLButtonElement) {
		if (btn === this.selectedBtn) {
			return;
		}

		btn.classList.toggle('button_alt-active');
		btn.classList.toggle('button_alt');

		if (this.selectedBtn !== null) {
			this.selectedBtn.classList.toggle('button_alt-active');
			this.selectedBtn.classList.toggle('button_alt');
		}

		this.selectedBtn = btn;
	}

	private updateBtnState(disabled: boolean) {
		this.nextBtn.disabled = disabled;
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
