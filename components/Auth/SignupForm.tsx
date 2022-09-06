import React, { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import LoginLayout from './LoginLayout';
import Input from 'components/Form/Input';
import { Formik, Form, Field } from 'formik';
import { email, passwordL1, required } from 'src/validators';
import { ISignupForm } from 'src/constants';

interface ISignupFormProps  {
    onSubmit: (data: ISignupForm) => void;
}

const SignupForm = (props: ISignupFormProps) => {
    const { t } = useTranslation(['common', 'auth']);

    const { onSubmit } = props;
    const initValues: ISignupForm = useMemo(() => ({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
    }), []);


    const validate = (values: ISignupForm) => {
        const errors: any = {};
        if (!values.confirm) {
            errors.confirm = 'Value is required';
        } else if (values.confirm !== values.password) {
            errors.confirm = 'Passwords do not match';
        }
        return errors;
    };

    return (
        <LoginLayout>
            <div>
                <h1 className="font-semibold lg:text-left text-center">{ t('auth:signing-up')}</h1>
                <h4 className="font-medium mr-1 text-center lg:text-left">{ t('auth:enter-to-create')}</h4>
                <Formik 
                    initialValues={initValues}
                    validate={validate} 
                    onSubmit={onSubmit}
                    enableReinitialize={true}>
                    {({ handleSubmit, isSubmitting }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <Field
                                    name="firstName"
                                    component={Input}
                                    type="text"
                                    label={ t('first-name')}
                                    validate={required}
                                    required/>
                                <Field
                                    name="lastName"
                                    component={Input}
                                    type="text"
                                    label={ t('last-name')}
                                    validate={required}
                                    required/>
                                <Field
                                    name="email"
                                    component={Input}
                                    type="text"
                                    label={ t('email')}
                                    required
                                    validate={email}/>
                                <Field
                                    name="password"
                                    component={Input}
                                    type="password"
                                    label={ t('password')}
                                    required
                                    validate={passwordL1}/>
                                <Field
                                    name="confirm"
                                    component={Input}
                                    type="password"
                                    required
                                    label={ t('auth:confirm-password')}/>
                                <div className="my-4">
                                    <button
                                        className="btn btn-primary btn-lg"
                                        type="submit"
                                        disabled={isSubmitting}>
                                        { t('auth:sign-up')}
                                    </button>
                                </div>
                            </Form>
                        );}}
                </Formik>
            </div>
        </LoginLayout>
    );
};

export default SignupForm;
