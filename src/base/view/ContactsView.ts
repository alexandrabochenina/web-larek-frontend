import { IEvents } from "../../components/base/Events";
import { View } from "./View";

export class ContactsView extends View {
    private emitter: IEvents;
    private email: HTMLInputElement;
    private phone: HTMLInputElement;
    private payBtn: HTMLButtonElement;


    constructor(element: HTMLElement, emitter: IEvents) {
        super(element)

        this.emitter = emitter

        this.email = element.querySelector('[name="email"]');
        this.email.addEventListener('input', () => this.updateBtnState());

        this.phone = element.querySelector('[name="phone"]');
        this.phone.addEventListener('input', () => this.updateBtnState());

        this.payBtn = element.querySelector(".button")

        this.payBtn.addEventListener('click', (event) => {
            event.preventDefault()
            this.emitter.emit("contacts:pay")
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
}