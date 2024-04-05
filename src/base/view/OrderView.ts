import { View } from "./View";

export class OrderView extends View {

    private descEl: HTMLElement
    private onCompCallback: () => void

    constructor(element: HTMLElement) {
        super(element)

        this.descEl = element.querySelector(".order-success__description")
        element.querySelector(".order-success__close").addEventListener('click', () => this.onCompCallback())
    }

    set price(price: number) {
        this.descEl.textContent = `Списано ${price} синапсов`
    }

    onComplete(callback: () => void) {
        this.onCompCallback = callback;
    }

}