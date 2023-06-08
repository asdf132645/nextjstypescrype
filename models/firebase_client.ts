import {Auth, getAuth} from 'firebase/auth';
import {initializeApp, getApps} from "firebase/app";
import getConfig from 'next/config';

// 콘피그값 사용하기 위한 명령어
const { publicRuntimeConfig } = getConfig();

// 환경변수는 nodejs 사용 가능 한데 클라이언트 js 에서는 사용불가하기떄문에 next.config.js 에서 수정해줘야함
const FirebaseCredentials = {
    apiKey: publicRuntimeConfig.apiKey,
    authDomain: publicRuntimeConfig.authDomain,
    projectId: publicRuntimeConfig.projectId,
}

export default class FirebaseClient {
    private static  instance: FirebaseClient;

    private auth: Auth;

    public constructor() {
        const apps = getApps();
        if(apps.length === 0){
            console.info('파이어베이스 클라이언트 init start');
            initializeApp(FirebaseCredentials);
        }
        //할당
        this.auth = getAuth();
        console.info('firebase auth');
    }
    //  instance 를 주기적으로 계속 사용하기 위해서


    public get Auth(): Auth {
        return this.auth;
    }

    static getInstance(): FirebaseClient {
        if(FirebaseClient.instance === undefined || FirebaseClient.instance === null) {
            FirebaseClient.instance = new FirebaseClient();
        }
        return FirebaseClient.instance;
    }
}