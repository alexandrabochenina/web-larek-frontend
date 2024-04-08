import { IEvents } from "../../components/base/Events";
import { Payment } from "../../types";
import { View } from "./View";

export class PaymentView extends View {
    
    private emitter: IEvents;
    private cashBtn: HTMLButtonElement;
    private cardBtn: HTMLButtonElement;
    private selectedBtn: HTMLButtonElement = null;
    private address: HTMLInputElement;
    private nextBtn: HTMLButtonElement;

    private onNextCallback: () => void

    constructor(element: HTMLElement, emitter: IEvents) {
        super(element)

        this.emitter = emitter

        this.cardBtn = element.querySelector('[name="card"]');
        this.cardBtn.addEventListener('click', () => this.toggleButton(this.cardBtn));
        
        this.cashBtn = element.querySelector('[name="cash"]');
        this.cashBtn.addEventListener('click', () => this.toggleButton(this.cashBtn));

        this.toggleButton(this.cardBtn);

        this.address = element.querySelector('[name="address"]');
        this.address.addEventListener('input', () => this.updateBtnState());

        this.nextBtn = element.querySelector(".order__button");

        this.nextBtn.addEventListener('click', (event) => {
            event.preventDefault()
            this.emitter.emit("payment:submit")
        })
    }

    get addressValue(): string {
        return this.address.value
    }

    get paymentMethod(): Payment {
        return this.selectedBtn == this.cashBtn ?  Payment.Receipt : Payment.Online;
    }

    private toggleButton(btn: HTMLButtonElement) {
        if (btn === this.selectedBtn) {
            return
        }

        btn.classList.toggle('button_alt-active')
        btn.classList.toggle('button_alt')

        if(this.selectedBtn !== null) {
            this.selectedBtn.classList.toggle('button_alt-active');
            this.selectedBtn.classList.toggle('button_alt')
        }

        this.selectedBtn = btn;
    }

    private updateBtnState() {
        this.nextBtn.disabled = this.address.value.length === 0;
    }


}

