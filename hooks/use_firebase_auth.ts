import {useEffect, useState} from "react";
import {InAuthUser} from "@/models/in_auth_user";
import {GoogleAuthProvider, signInWithPopup, User} from "firebase/auth";
import FirebaseClient from "@/models/firebase_client";
import firebase from "firebase/compat";

// 커스텀 훅
export default function useFirebaseAuth(){
    //
    const [authUser, setAuthUser] = useState<InAuthUser | null>(null);
    const [loading, setLoading] = useState(true);
        // 동기화 처리
    async function signInWithGoogle(): Promise<void>{
        const provider = new GoogleAuthProvider();
        try {
            const signInResult = await signInWithPopup(FirebaseClient.getInstance().Auth, provider);
            // 서버사이드 저장하기 위한 코드
            if(signInResult.user){
                console.info(signInResult.user);
                const resp = await fetch('/api/members.add',{
                    method: 'POST',
                    headers:{
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        uid: signInResult.user.uid,
                        email: signInResult.user.email,
                        displayName: signInResult.user.displayName,
                        photoURL: signInResult.user.photoURL,
                    }),
                });
                console.info({status: resp.status});
                const respData = await resp.json();
                console.info(respData);

            }
        } catch (err){
            console.error(err);
        }
    }

    const clear = () => {
        setAuthUser(null);
        setLoading(true);
    }

    const signOut = () => FirebaseClient.getInstance().Auth.signOut().then(clear)

    const authStateChanged = async (authState: User | null) => {
        if(authState === null){
            setAuthUser(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setAuthUser({
            uid: authState.uid,
            email: authState.email,
            photoURL: authState.photoURL,
            displayName: authState.displayName,
        });
        setLoading(false);
    }

    //useEffect 훅을 넣어서 초기동작을 잡아줄수있다.
    //useEffect 라는 Hook 을 사용하여 컴포넌트가 마운트 됐을 때 (처음 나타났을 때), 언마운트 됐을 때 (사라질 때), 그리고 업데이트 될 때 (특정 props가 바뀔 때) 특정 작업을 처리하는 방법
    useEffect(() =>{
        const unsubscribe = FirebaseClient.getInstance().Auth.onAuthStateChanged(authStateChanged);
        // 마운트가 해지 될떄 언마운트가 될떄
        return () => unsubscribe();
    },[])//빈 배열 초기화시 최초 한번만 실행 값이 있을 경우는 해당값이 변경될때마다 실행

    return {
        authUser,
        loading,
        signInWithGoogle,
        signOut,
    }
}