import ErrorBase from "./ErrorBase";

class NotFoundError extends ErrorBase {
    constructor(message: string) {
        super(message, 404);
    }
}

export default NotFoundError;