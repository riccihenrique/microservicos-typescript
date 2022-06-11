abstract class ErrorBase extends Error {
    private _statusCode: number = 0;

    constructor(message: string, statusCode: number) {
        super(message);
        this._statusCode = statusCode;
    }

    get stausCode() {
        return this._statusCode;
    }
}

export default ErrorBase;