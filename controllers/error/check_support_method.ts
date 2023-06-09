//method 인수는 요청받은 메서드

import BadReqErr from "@/controllers/error/bad_request_err";

export default function checkSupportMethod(supportMethod: string[], method?: string){
    if(supportMethod.indexOf(method!) === -1){
        //에러 반환
        throw new BadReqErr('지원하지 않는 메서드');
    }
}