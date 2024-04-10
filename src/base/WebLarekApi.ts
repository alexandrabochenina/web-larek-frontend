import { API_URL } from '../utils/constants';
import { ApiListResponse, ApiMakeOrderResponse, IItem } from '../types';
import { IOrder } from '../types';
import { Api } from '../components/base/Api';

export class WebLarekApi extends Api {
	constructor() {
		super(API_URL);
	}

	getProducts(): Promise<ApiListResponse<IItem>> {
		return this.get('/product').then((obj) => obj as ApiListResponse<IItem>);
	}

	makeOrder(order: IOrder): Promise<ApiMakeOrderResponse> {
		return this.post('/order', order).then(
			(obj) => obj as ApiMakeOrderResponse
		);
	}
}
