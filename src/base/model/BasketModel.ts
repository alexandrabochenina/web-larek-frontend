import { IItem } from "../../types";
import { Model } from "./Model";
import { IBasket } from "../../types";


/* Класс описывающий модель корзины, с геттером получения товаров, находящихся в корзине, методом deleteItem для удаления товаров, addItem - для добавления, clear - для очистки корзины, когда заказ успешно оформлен*/
export class BasketModel extends Model <IBasket> {

  constructor(data: IBasket) {
    super(data)
  }
  
  get items() {
    return this.data.items
  }
  
  public deleteItem(itemId: string) {
    let index = this.data.items.findIndex((item) => item.id === itemId)
    if (index == -1) {
      return
    } else {
      this.items.splice(index,1);
    }
  }

  public addItem(item:IItem) {
    this.items.unshift(item);
  }

  public clear () {
    this.items.splice(0,this.items.length);
  }
}
