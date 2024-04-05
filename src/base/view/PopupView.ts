import { View } from "./View";

export class PopupView extends View {
   
    private closeBtn: HTMLButtonElement;
    private content: HTMLElement;

    constructor(element: HTMLElement) {
        super(element)

        this.closeBtn = element.querySelector(".modal__close");
        this.closeBtn.addEventListener('click', () => this.close());
        this.content = element.querySelector(".modal__content");
    }

    close() {
        this.element.style.display = "none"
    }

    open() {
        this.element.style.display = "block";
    }

    setContent(el: HTMLElement) {
        this.content.replaceChildren(el);
    }
}
