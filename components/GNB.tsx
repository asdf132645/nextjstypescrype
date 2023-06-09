import {useAuth} from "@/contexts/auth_user.context";
import {Box, Button, Flex, Spacer} from "@chakra-ui/react";

export const GNB = function () {
    const {loading, authUser, signOut, signInWithGoogle} = useAuth();

    const loginBtn = (<Button fontSize='sm' fontWeight={600} color="white" bg="pink.400" _hover={{
        bg: 'pink.300',
    }} onClick={signInWithGoogle}
    >로그인</Button>);

    const logOutBtn = (<Button as="a" variant="link" onClick={signOut}>로그아웃</Button>);

    const authInitialized = loading || authUser === null;

    return (<Box>
        <Flex minH="60px" py={{base: 2}} px={{base: 4}} align="center">
            <Spacer/>
            <Box flex="1">
                <img style={{height: '40px'}} src="/logo.svg"/>
            </Box>
            <Box justifyContent="flex-end">
                {/*   */}
                {authInitialized ? loginBtn : logOutBtn}
            </Box>
        </Flex>
    </Box>)
}