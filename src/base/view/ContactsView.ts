import { View } from "./View";

export class ContactsView extends View {
    private email: HTMLInputElement;
    private phone: HTMLInputElement;
    private payBtn: HTMLButtonElement;

    private onPayCallback: () => void;

    constructor(element: HTMLElement) {
        super(element)
        this.email = element.querySelector('[name="email"]');
        this.email.addEventListener('input', () => this.updateBtnState());

        this.phone = element.querySelector('[name="phone"]');
        this.phone.addEventListener('input', () => this.updateBtnState());

        this.payBtn = element.querySelector(".button")
        this.payBtn.addEventListener('click', (evt) => {
            evt.preventDefault()
            this.onPayCallback()
        })

    }

    get emailValue(): string {
        return this.email.value
    }

    get phoneValue(): string{
        return this.phone.value
    }

    updateBtnState() {
        this.payBtn.disabled = this.email.value.length === 0 || this.phone.value.length === 0;
    }

    payClick(callback: () => void) {
        this.onPayCallback = callback
    }
}