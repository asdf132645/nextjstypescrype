import CustomServerError from "@/controllers/error/custom_server_err";

export default class BadReqErr extends CustomServerError {
    constructor(message: string) {
        super({statsCode: 400, message});
    }
}