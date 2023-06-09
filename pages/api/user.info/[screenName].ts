import {NextApiRequest, NextApiResponse} from "next";
import MemberModel from "@/models/member/mermber.model";
import MemberCtrl from "@/controllers/member.ctrl";
import handleError from "@/controllers/error/handle_error";
// import CustomServerError from "@/controllers/error/custom_server_err";
import checkSupportMethod from "@/controllers/error/check_support_method";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {method} = req;
    const supportMetod = ['GET'];
    try {
        checkSupportMethod(supportMetod, method);
        await MemberCtrl.findByScreenName(req, res);
    } catch (e) {
        console.error(e);
        //에러 처리
        handleError(e, res);
    }
}

