import { IItem } from '../../types';
import { Model } from './Model';
import { IBasket } from '../../types';

export class BasketModel extends Model<IBasket> {
	constructor(data: IBasket) {
		super(data);
	}

	get items() {
		return this.data.items;
	}

	public deleteItem(itemId: string) {
		const index = this.data.items.findIndex((item) => item.id === itemId);
		if (index == -1) {
			return;
		} else {
			this.items.splice(index, 1);
		}
	}

	public addItem(item: IItem) {
		this.items.unshift(item);
	}

	public clear() {
		this.items.splice(0, this.items.length);
	}
}
