import React from 'react';
import { useTranslation } from 'next-i18next';
import LoginLayout from './LoginLayout';
import Link from 'next/link';
import Input from 'components/Form/Input';
import { Formik, Form, Field } from 'formik';
import { email, required } from 'src/validators';
import { ILoginForm } from 'src/constants';

interface ILoginFormProps  {
    onSubmit: (data: ILoginForm) => void;
}

const LoginForm = (props: ILoginFormProps) => {
    const { t } = useTranslation('common');

    const { onSubmit } = props;

    return (
        <LoginLayout>
            <div>
                <h1 className="font-semibold text-center">{t('welcome')}</h1>
                <Formik 
                    initialValues={{email: '', password: ''}} 
                    onSubmit={onSubmit}
                    enableReinitialize={true}>
                    {({ handleSubmit, isSubmitting }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <Field
                                    name="email"
                                    component={Input}
                                    type="text"
                                    label={t('email')}
                                    validate={email}
                                    required />
                                <div className="relative flex flex-row">
                                    <div className=" w-full">
                                        <Field
                                            name="password"
                                            component={Input}
                                            type="password"
                                            label={t('password')}
                                            validate={required}
                                            required />
                                    </div>
                            
                                    <Link href="/forgot-password" as="/forgot-password">
                                        <a className="absolute right-0 link font-bold text-base">
                                            { t('forgot-password')}
                                        </a>
                                    </Link>
                                </div>
                                <div className="my-3">
                                    <button type="submit"
                                        className="btn btn-primary btn-lg"
                                        // disabled={isSubmitting}
                                    >
                                        {t('sign-in')}
                                    </button>
                                </div>
                            </Form>
                        );}}
                </Formik>
            </div>
        </LoginLayout>
    );
};

export default LoginForm;
