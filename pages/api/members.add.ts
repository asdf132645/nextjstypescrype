import {NextApiRequest, NextApiResponse} from "next";
import MemberModel from "@/models/member/mermber.model";
import MemberCtrl from "@/controllers/member.ctrl";
import handleError from "@/controllers/error/handle_error";
// import CustomServerError from "@/controllers/error/custom_server_err";
import checkSupportMethod from "@/controllers/error/check_support_method";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {method} = req;
    const supportMetod = ['POST'];
    try {
        // if (supportMetod.indexOf(method!) === -1) {
        //     //에러반환 잘못 요청한 상시 에러
        //     throw new CustomServerError({statsCode:400, message:'지원하지 않는 메서드'})
        // }
        checkSupportMethod(supportMetod, method);
        await MemberCtrl.add(req, res);
    } catch (e) {
        console.error(e);
        //에러 처리
        handleError(e, res);
    }
}

