export abstract class Model<T> {
    protected data: T

    constructor(data: T) {
        this.data = data
    }

}