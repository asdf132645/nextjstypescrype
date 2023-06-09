import {InAuthUser} from "@/models/in_auth_user";
import FirebaseAdmin from "@/models/firebase_admin";

const MEMBER_COL = 'members';
const SCR_NAME_COL = 'screen_names';
type AddRes = { result: true; id: string } | {result: false; message: string}

async function add({uid, email, displayName, photoURL}: InAuthUser): Promise<AddRes>{
    //비동기로 실행되는 함수 await 사용
    try {
        //?? 두개이면 완전히 존재하지 않을 경우 빈문자열을 넣겟다
        // const addResult = FirebaseAdmin.getInstance().Firebase.collection('members')
        //     .doc(uid)
        //     // 저장
        //     .set({
        //         uid,
        //         email,
        //         displayName: displayName ?? '',
        //         photoURL: photoURL ?? '',
        //     });
        //transaction -> 데이터베이스의 상태를 변화시키기 해서 수행하는 작업의 단위, 트랜잭션은 모두 데이터베이스에 반영되거나, 아니면 전혀 반영되지 않는다.(파이어베이스 전용)
        // await FirebaseAdmin.getInstance()
        //     .Firebase.collection('screen_names')
        //     .doc(screenName)
        //     .set({
        //         uid,
        //         email,
        //         displayName: displayName ?? '',
        //         photoURL: photoURL ?? '',
        //     });
        //as 는 TypeScript보다 어떤 값의 타입을 보다 명확하게 알고 있을 때 활용한다.
        const screenName = (email as string).replace('@gmail.com', '');

        const addResult = await FirebaseAdmin.getInstance()
            .Firebase.runTransaction(async (tranasction) => {
                // uid 문서를 읽어온다.
                const memberRef = FirebaseAdmin.getInstance().Firebase.collection('members')
                    .doc(uid);
                const screenNameref = FirebaseAdmin.getInstance()
                    .Firebase.collection('screen_names')
                    .doc(screenName);
                const memberDoc = tranasction.get(memberRef);
                if (memberDoc.exists) {
                    //이미 추가된 상태
                    return false;
                }

                const addData = {
                    uid,
                    email,
                    displayName: displayName ?? '',
                    photoURL: photoURL ?? '',
                }
                // 실제로 문서를 넣는다
                await tranasction.set(memberRef, addData);
                await tranasction.set(screenNameref, addData);
                return true;

            })
        if (addResult === false) {
            return ({result: true, id: uid});
        }
        return ({result: true, id: uid});
    } catch (e) {
        console.error(e);
        //서버쪽 에러니깐 500
        return ({result: false, message: '서버에러'});
    }
}

async function findByScreenName(ScreenName: string): Promise<InAuthUser | null>{
    const memberRef = FirebaseAdmin.getInstance().Firebase.collection(SCR_NAME_COL).doc(ScreenName);
    const memverDoc = await memberRef.get();
    if(memverDoc.exists === false){
        return null;
    }
    const data = memverDoc.data() as InAuthUser;
    return data;
}

const MemberModel = {
    add,
    findByScreenName,
}

export default MemberModel;