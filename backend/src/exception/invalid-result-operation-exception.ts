export class InvalidResultOperationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidResultOperationException";
    }
}