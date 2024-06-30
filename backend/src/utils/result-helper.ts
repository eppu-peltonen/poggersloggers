import { Result, ResultWithValue } from "../result"

export class ResultHelper {
    static isSuccessStatusCode(statusCode) {
        return statusCode >= 200 && statusCode < 300;
    }

    static createResponse(result: Result | ResultWithValue<any>, content: any): any {
        return {
            status: result.status,
            content: content
        };
    }
}