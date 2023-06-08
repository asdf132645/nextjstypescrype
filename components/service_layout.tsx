import React from "react";
import Head from "next/head";
import {GNB} from './GNB';
import {Box, BoxProps} from "@chakra-ui/react";

interface Props {
    title: string;
    children: React.ReactNode;
}

// 서비스 레이아웃은 각페이지를 구성 할떄 사용하는 파일 (계속 쓰이는 컴포넌트들은 여기서 사용 바텀, 메뉴, 등등)

export const ServiceLayout: React.FC<Props & BoxProps> = function ({title = 'kk', children, ...boxProps}) {
    return (
        <Box {...boxProps}>
            <Head>
                <title>{title}</title>
            </Head>
            <GNB />
            {children}
        </Box>
    )
}

