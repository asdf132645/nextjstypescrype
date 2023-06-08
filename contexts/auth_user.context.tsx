import {InAuthUser} from "@/models/in_auth_user";
import React, {createContext, useContext} from "react";
import {Provider} from "@firebase/component";

interface InAuthUserContext {
    authUser: InAuthUser | null;
    //    로그인 여부가 진행중인지 체크
    loading: boolean;
    signInWithGoogle: () => void;
    signOut: () => void;

}

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
    return <AuthUserContext.Provider>{children}</AuthUserContext.Provider>
}

export const useAuth = () => useContext(AuthUserContext);

//프로바이더는 위에 컨텍스정보를 칠드런들만 매번 변경되는 값들을 사용가능하게