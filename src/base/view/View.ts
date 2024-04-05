export abstract class View {
    protected _element: HTMLElement
    
    constructor(element: HTMLElement) {
        this._element = element
    }

    get element(): HTMLElement {
        return this._element
    }
}