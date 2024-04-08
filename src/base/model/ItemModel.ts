import {Model} from "./Model"
import { IItem } from "../../types"

export class ItemModel extends Model<IItem> {
    
    constructor(data: IItem) {
        super(data)
    }
    
    get id():string {
        return this.data.id
    } // геттер для получения ID
    get title():string {
        return this.data.title
    } // геттер для получения заголовка
    get image():string {
        return this.data.image
    }// геттер для получения картинки
    get category():string {
        return this.data.category
    }// геттер для получения категории
    get price():number {
        return this.data.price
    } // геттер для получения цены
    get description():string {
        return this.data.description
    }// геттер для получения описания
}
