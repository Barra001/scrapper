export class AppException extends Error {
    constructor(httpStatusCode: number,  message: string,) {
        super(message,);
        this.httpStatusCode = httpStatusCode;
    }
    public httpStatusCode: number;
}