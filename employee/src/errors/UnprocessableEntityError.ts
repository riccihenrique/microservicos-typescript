import ErrorBase from "./ErrorBase";

class UnprocessableEntityError extends ErrorBase {
    constructor(message: string) {
        super(message, 422);
    }
}

export default UnprocessableEntityError;