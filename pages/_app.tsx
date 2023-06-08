import type {AppProps} from "next/app";
import '../styles/globals.css';
import {ChakraProvider} from "@chakra-ui/react";
import {AuthUserProvider} from "@/contexts/auth_user.context";

//서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트
//Component
// 현재 페이지를 의미하며 페이지 변경시 해당 Component는 변경됩니다.

// pageProps
// DataFatching 메서드를 이용해 미리 가져온 초기 객체 입니다.
// getInitialProps, getStaticProps, getServerSideProps 중 하나를 통해 패칭한 초기 속성값
// 이 메서드를 사용하지 않으면 빈 객체 전달

const App = ({Component, pageProps}: AppProps) => {
    return (
        <ChakraProvider>
            <AuthUserProvider>
                <Component {...pageProps} />
            </AuthUserProvider>
        </ChakraProvider>
    );
};

export default App;