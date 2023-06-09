import {GetServerSideProps, NextPage} from "next";
import {ServiceLayout} from "@/components/service_layout";
import {Avatar, Box, Flex, Textarea, Text, Button, useToast, FormControl, Switch, FormLabel} from "@chakra-ui/react";
import {useState} from "react";
import {useAuth} from "@/contexts/auth_user.context";
import {InAuthUser} from "@/models/in_auth_user";
// import ResizeTextArea from 'react-textarea-autosize';
import axios, {AxiosResponse} from 'axios';
import {preprocess} from "zod";


interface  Props {
    userInfo: InAuthUser | null;
}

// const userInfo = {
//     uid: 'test',
//     email: 'aaaa@naver.com',
//     displayName: 'kang giyoung',
//     photoURL: '',
// }

const UserHomePage: NextPage<Props> = function ({userInfo}) {
    const [message, setMessage] = useState('');
    const [isAnonymous, setAnonymous] = useState(true);
    const toast = useToast();
    const { authUser } = useAuth();

    if(userInfo === null){
        return <p> 사용자 못찾음</p>
    }
    return (
        <ServiceLayout title='user home' minH="100vh">
            <Box mx="auto" pt="6">
                <Box borderWidth="1px" borderRadius='lg' overflow="hidden" bg='white'>
                    <Flex p="6">
                        <Avatar size='lg' src={userInfo.photoURL ?? 'https://bit.ly/broken-link'} mr='2'/>
                        <Flex direction='column' justify='center'>
                            <Text fontSize="md">{userInfo.displayName}</Text>
                            <Text fontSize="xs">{userInfo.email}</Text>
                        </Flex>
                    </Flex>
                </Box>
                <Box borderWidth="1px" borderRadius='lg' overflow="hidden" bg='white'>
                    <Flex align='center' p='2'>
                        {/* authUser?.photoURL 만약 없으면 에러가 되니깐 ?? 로 다시 초기화값을 넣어준다. */}
                        <Avatar size='xs' src={isAnonymous ? 'https://bit.ly/broken-link' : authUser?.photoURL ?? 'https://bit.ly/broken-link'} mr='2'/>
                        <Textarea bg="gray.100" border="none" placeholder="뭐가 궁금함?" resize='none' minH='unset'
                                  value={message}
                                  onChange={(e) => {
                                      if(e.currentTarget.value){
                                          const lineCount = (e.currentTarget.value.match((/[^\n]*\n[^\n]*/gi))?.length ?? 1) + 1;
                                          if(lineCount > 7){
                                              toast({
                                                  title:'최대 7줄',
                                                  position: 'top-right'
                                              })
                                              return;
                                          }
                                      }
                                      setMessage(e.currentTarget.value);
                                  }}
                        ></Textarea>
                        <Button
                            disabled={message.length === 0}
                            bgColor='#FFV86C' color='white' bg='yellow.500' variant='solid' size='sm'>등록</Button>
                    </Flex>
                    <FormControl display='flex' alignItems='center' mt='1' mx='2' pb='2'>
                        <Switch size='sm' colorScheme='orange' id='anonymous' mr='1' isChecked={isAnonymous} onChange={()=>{
                            //기존의 값에 반대의 값을 넣게 하기
                            if(authUser === null){
                                toast({title:'로그인 필요', position:'top-right'});
                                return;
                            }
                            setAnonymous((prev) => !prev);
                        }} />
                        <FormLabel htmlFor='anonymous' mb='0' fontSize='xx-smal'>
                            anonymous
                        </FormLabel>
                    </FormControl>
                </Box>

            </Box>
        </ServiceLayout>
    )
}

// html 에서 그리기전에 서버사이드에서 받아오는 처리



export const getServerSideProps: GetServerSideProps<Props> = async ({query}) =>{
    const {screenName} = query;
    if (screenName === undefined){
        return {
            props: {
                userInfo: null,
            }
        }
    }
    // 서버사이드 가 아닌 클라이언트 js 이기 떄문에 페치 사용 하지 않고 axios 사용
    try {
        //클라이언트 쪽이기떄문에 베이스 url 필요
        const protocol = process.env.PROTOCOL || 'http';
        const host = process.env.HOST || 'localhost';
        const port = process.env.PORT || '3000';
        const baseUrl = `${protocol}://${host}:${port}`
        // const userInfo =
        const userInfoRefs: AxiosResponse<InAuthUser> = await axios(`${baseUrl}/api/user.info/${screenName}`);
        return {
            props:{
                userInfo: userInfoRefs.data ?? null,
            }
        }
    }catch (e) {
        console.error(e);
        return {
            props: {
                userInfo: null,
            }
        }
    }
}

export default UserHomePage;