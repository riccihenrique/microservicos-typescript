import ErrorBase from "./ErrorBase";

class ConflictError extends ErrorBase {
    constructor(message: string) {
        super(message, 409);
    }
}

export default ConflictError;