import { IItem } from "./ItemModel";
import { Model } from "./Model";

export interface IGallery {
    items: IItem[];
}

export class GalleryModel extends Model<IGallery>{

    constructor(data: IGallery) {
        super(data)
    }
    get items (): IItem[] {
        return this.data.items;
    }

    set items(items:IItem[]){
        this.data.items = items;
    }
} 