import ErrorBase from "./ErrorBase";

class BadRequestError extends ErrorBase {
    constructor(message: string) {
        super(message, 400);
    }
}

export default BadRequestError;