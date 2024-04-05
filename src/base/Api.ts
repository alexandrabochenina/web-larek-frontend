import { API_URL } from "../utils/constants";
import { IItem } from "./model/ItemModel";
import { IOrder } from "./model/OrderModel";

export class Api {
    getProducts(): Promise<IItem[]> {
        return fetch(`${API_URL}/product`).then((res) => {
           return res.json().then(obj => {
                return obj.items as IItem[]
            })
        })
    }

    makeOrder(order: IOrder): Promise<IOrder> {
        return fetch(`${API_URL}/order`, {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then((res) => {
            return res.json().then(obj => {
                return obj as IOrder
            })
          });
    }
}