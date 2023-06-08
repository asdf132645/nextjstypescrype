import {Box, Button} from "@chakra-ui/react"

interface Props {
    onclick: () => void;
}

// js 함수는 일급 객체 이다. 변수에 할당, 함수 인수로 전달, 함수에서 반환 가능

export const GoogleLoginButton = function ({onclick}: Props) {
    return (<Box>
        <Button size="lg" width="full"  maxW="md" bgColor="#4285f4" color="white" colorScheme="blue"
                leftIcon={<img src="/google.svg" style={{backgroundColor: 'white', padding: '8px',}}/>}
                onClick={onclick}
        >
            goole btn
        </Button>
    </Box>)
}