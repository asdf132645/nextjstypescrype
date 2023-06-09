// 컨트롤러~~

import {NextApiRequest, NextApiResponse} from "next";
import MemberModel from "@/models/member/mermber.model";
import handler from "@/pages/api/members.add";
import BadReqErr from "@/controllers/error/bad_request_err";
async function add(req: NextApiRequest, res: NextApiResponse) {
    const {
        uid,
        email,
        displayName,
        photoURL,
    } = req.body;

    if (uid === undefined || uid === null) {
        // res.status(400).json({
        //     result: false, message: 'uid 가 누락 되었습니다.',
        // })
        // 클래스 사용시에는 throw new 사용
        throw new BadReqErr('uid 가 누락 되었습니다.')
    }

    if (email === undefined || email === null) {
        // res.status(400).json({
        //     result: false, message: 'email 가 누락 되었습니다.',
        // })
        throw new BadReqErr('email 가 누락 되었습니다.')
    }
    const addRes = await MemberModel.add({uid, email, displayName, photoURL});
    if(addRes.result === true){
        return res.status(200).json(addRes);
    }
    res.status(500).json(addRes);

}
//동적 페이지 이동을 사용하기위한 코드
async function findByScreenName(req: NextApiRequest, res: NextApiResponse){
    const {screenName} = req.query;
    // 쿼리에서 들어오는것은 스트링일수도있고 스트링 어레이일수 도있음 아래와같이 처리 해준다.
    if (screenName === undefined || screenName === null){
        throw new BadReqErr('screenName이 누락됨 ');
    }
    // 타입 찾아주기 어떤걸 써줄지 해줘야함
    const extractScreenName = Array.isArray(screenName) ? screenName[0]: screenName;
    const findResult = await MemberModel.findByScreenName(extractScreenName);
    if (findResult === null){
        return res.status(404).end();
    }
    res.status(200).json(findResult);
}

const MemberCtrl = {
    add,
    findByScreenName,
};

export default MemberCtrl;