import { API_URL } from "../utils/constants";
import { IItem } from "../types";
import { IOrder } from "../types"; 
import { Api, ApiListResponse } from "../components/base/api";


export class WebLarekApi extends Api {

  constructor() {
    super(API_URL)
  }

    getProducts(): Promise<IItem[]> {
      return this.get("/product").then(obj => (obj as ApiListResponse<IItem>).items)
    }

    makeOrder(order: IOrder): Promise<IOrder> {
      return this.post("/order", order).then(obj => obj as IOrder)
    }
}