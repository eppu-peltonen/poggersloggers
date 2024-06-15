export class Result<T> {

    constructor(public statusCode: number, public data: T) {}

    static Ok<T>(data: T): Result<T> {
        return new Result(200, data);
    }

    static Created<T>(data: T): Result<T> {
        return new Result(201, data);
    }

    static NotFound<T>(): Result<T> {
        return new Result(404, null);
    }
}