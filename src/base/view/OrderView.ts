import { IEvents } from "../../components/base/events";
import { View } from "./View";

export class OrderView extends View {

    private emitter: IEvents;
    private descEl: HTMLElement
    private onCompCallback: () => void

    constructor(element: HTMLElement, emitter:IEvents) {
        super(element)

        this.emitter = emitter

        this.descEl = element.querySelector(".order-success__description")
        element.querySelector(".order-success__close").addEventListener('click', () => this.emitter.emit("order:end"))
    }

    set price(price: number) {
        this.descEl.textContent = `Списано ${price} синапсов`
    }
}