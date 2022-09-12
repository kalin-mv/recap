import SignupForm from 'components/Auth/SignupForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React from 'react';
import { ISignupForm } from 'src/constants';
import { xSave } from 'src/fetcher';

function Signup() {
    const router = useRouter();
    const onSubmit = (data: ISignupForm) => {
        xSave('/signUp', data).then((result) => {
            if(result.response && result.response.userEmail){
                const href = '/';
                router.push(href);
            }
        });
    };
    return <SignupForm onSubmit={onSubmit} />;
}

export const getStaticProps = async (context: any) => {
    return ({
        props: {
            ...await serverSideTranslations(context.locale, ['common', 'auth']),
        },
    });};

export default Signup;