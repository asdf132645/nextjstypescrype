import {InAuthUser} from "@/models/in_auth_user";
import React, {createContext, useContext} from "react";
import {Provider} from "@firebase/component";
import useFirebaseAuth from "@/hooks/use_firebase_auth";

interface InAuthUserContext {
    authUser: InAuthUser | null;
    //    로그인 여부가 진행중인지 체크
    loading: boolean;
    signInWithGoogle: () => void;
    signOut: () => void;

}
// 초기화하는 부분 const auth = useFirebaseAuth(); 이부분에서 재정의
//Context 객체 안에는 Provider라는 컴포넌트가 들어있습니다. 그리고, 그 컴포넌트간에 공유하고자 하는 값을 value 라는 Props로 설정하면 자식 컴포넌트들에서 해당 값에 바로 접근을 할 수 있습니다.
const AuthUserContext = createContext<InAuthUserContext>({
    authUser: null,
    loading: true,
    signInWithGoogle: async () => ({
        user: null, credential: null
    }),
    signOut: () => {
    },
})



export const AuthUserProvider = function ({children}: {children: React.ReactNode}){
    const auth = useFirebaseAuth();
    //authUser, loading, signInWithGoogle, signOut 을 리턴받는 게 const auth children 으로 다른 컴포넌트에서 작성한 모든 태그를 받아들임
    return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
}

export const useAuth = () => useContext(AuthUserContext);

//프로바이더는 위에 컨텍스정보를 칠드런들만 매번 변경되는 값들을 사용가능하게