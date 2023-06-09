import {NextApiResponse} from "next";
import CustomServerError from "@/controllers/error/custom_server_err";

const handleError = (err: unknown, res: NextApiResponse) => {
    let unknownErr = err;
    //클래스의 타입을 구분할 때에는 instanceof를 사용
    if((err instanceof CustomServerError) === false){
        unknownErr = new CustomServerError({ statsCode: 499, message: 'uknown' })
    }

    // 여기서는 커스텀에러가 된다.
    //as => 타입캐스팅

    const customErr = unknownErr as CustomServerError;
    res
        .status(customErr.statusCode)
        .setHeader('location', customErr.location ?? '')
        .send(customErr.serializeErrors());
};


export default handleError;