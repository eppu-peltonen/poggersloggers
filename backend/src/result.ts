import { StatusCodes } from "http-status-codes";
import { InvalidResultOperationException } from "./exception/invalid-result-operation-exception";
import { ResultHelper } from "./utils/result-helper";

export class Result {
    public _error: string = '';
    public success: boolean = false;
    public failure: boolean = false;
    public status: StatusCodes = StatusCodes.OK;
    public info: string = '';

    constructor() {}

    get error(): string {
        if (this.success) {
            throw new InvalidResultOperationException("Tried to access Error on a successful Result");
        }
        return this.error;
    }

    protected set error(value: string) {
        this._error = value;
    }

    /**
     * Creates a successful Result object. Should be called at the end of service methods.
     */
    public static ok(statusCode: StatusCodes = StatusCodes.OK): Result {
        if (!ResultHelper.isSuccessStatusCode(statusCode)) {
            throw new InvalidResultOperationException("Tried to set successful Result with an error status code");
        }

        const result = new Result();
        result.success = true;
        result.status = statusCode;
        return result;
    }

    /**
     * Creates an erroneous Result object. Should be called during validation and returned directly afterwards.
     */
    public static fail(error: string, statusCode: StatusCodes = StatusCodes.BAD_REQUEST): Result {
        if (ResultHelper.isSuccessStatusCode(statusCode)) {
            throw new InvalidResultOperationException("Tried to set failed Result with a success status code");
        }

        const result = new Result();
        result.failure = true;
        result.error = error;
        result.status = statusCode;
        return result;
    }

    public toResponse(): any {
        return ResultHelper.createResponse(this, "");
    }

    protected setErroneous(error: string): void {
        this.failure = true;
        this.success = false;
        this._error = error;
    }
}

export class ResultWithValue<T> extends Result {
    private _value: T;

    constructor(value: T) {
        super();
        this._value = value;
    }

    get value(): T {
        if (this.failure) {
            throw new InvalidResultOperationException("Tried to access Value on failed Result");
        }
        return this._value;
    }

    private set value(value: T) {
        this._value = value;
    }

    /**
     * Creates a successful Result object with Value T. Should be called at the end of service methods.
     */
    public static ok<T>(value: T, statusCode: StatusCodes = StatusCodes.OK): ResultWithValue<T> {
        if (!ResultHelper.isSuccessStatusCode(statusCode)) {
            throw new InvalidResultOperationException("Tried to set successful Result with an error status code");
        }

        const result = new ResultWithValue<T>(value);
        result.success = true;
        result.status = statusCode;
        return result;
    }

    /**
     * Creates an erroneous Result object with Value T. Should be called during validation and returned directly afterwards.
     */
    public static fail<T>(error: string, statusCode: StatusCodes = StatusCodes.BAD_REQUEST): ResultWithValue<T> {
        if (ResultHelper.isSuccessStatusCode(statusCode)) {
            throw new InvalidResultOperationException("Tried to set failed Result with a success status code");
        }

        const result = new ResultWithValue<T>(null as any);
        result.failure = true;
        result.error = error;
        result.status = statusCode;
        return result;
    }

    public toResponse(func: (value: T) => any = (v) => v): any {
        const content = func(this.value);
        return ResultHelper.createResponse(this, content);
    }

    public toJsonResponse(): any {
        return ResultHelper.createResponse(this, this._value);
    }
}