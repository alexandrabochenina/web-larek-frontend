import { IItem } from '../../types';
import { Model } from './Model';
import { IGallery } from '../../types';

export class GalleryModel extends Model<IGallery> {
	constructor(data: IGallery) {
		super(data);
	}
	get items(): IItem[] {
		return this.data.items;
	}

	set items(items: IItem[]) {
		this.data.items = items;
	}
}
