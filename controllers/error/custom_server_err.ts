export default class CustomServerError extends Error {
    public statusCode: number;

    //300 번일떄 리다이렉션 처리를 위해 넣어줌
    public location?: string;

    constructor({statsCode = 500, message, location}: { statsCode?: number; message: string; location?: string }) {
        super(message);
        this.statusCode = statsCode;
        this.location = location;

    }

    serializeErrors(): { message: string } | string {
        return {message: this.message};
    }
}
