import React from 'react';
import LoginForm from 'components/Auth/LoginForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { xSave } from 'src/fetcher';
import { useRouter } from 'next/router';
import { ILoginForm } from 'src/constants';


function Login() {
    const router = useRouter();
    const onLoginClick = (data: ILoginForm) => {
        xSave('/login', data).then((result) => {
            if(result.response.identity){
                const href = '/profile';
                router.push(href);
            }
        });
    };
    return <LoginForm onSubmit={onLoginClick} />;


}

export const getStaticProps = async (context: any) => {
    return ({
        props: {
            ...await serverSideTranslations(context.locale, ['common']),
        },
    });};


export default Login;
