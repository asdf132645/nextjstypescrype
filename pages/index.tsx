import {NextPage} from "next";
import {ServiceLayout} from "@/components/service_layout";
import {Box, Center, Flex} from "@chakra-ui/react";
import {GoogleLoginButton} from "@/components/google_login_button"
import {useAuth} from "@/contexts/auth_user.context";



const IndexPage: NextPage = () => {

    // 값 끌어다가 쓰기
    const {signInWithGoogle, authUs} = useAuth();

    console.info(authUs)

    return <ServiceLayout title='test' backgroundColor="gray.50">
        <Box maxW="md" mx="auto">
            <img src="/main_logo.svg"/>
            <Flex justify="center">
                <h2>#Blah</h2>
            </Flex>
        </Box>
        {/*<Box>로그인 버튼</Box>*/}
        {/*React.js의 Content 활용*/}
        <Center mt="20">
            <GoogleLoginButton onclick={signInWithGoogle}/>
        </Center>
    </ServiceLayout>
};

export default IndexPage;