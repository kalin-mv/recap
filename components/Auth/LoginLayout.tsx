import React, { ReactNode } from 'react';
// import { useTranslation } from 'src/i18n';

interface ILoginLayoutProps {
    children: ReactNode;
}

export default function LoginLayout (props: ILoginLayoutProps) {
    // const { t } = useTranslation(['login']);
    const newDate = new Date();
    return (
        <div className='flex lg:flex-row flex-col'>
            <div className='lg:h-screen lg:w-1/2 flex flex-col items-center bg-cover bg-city lg:bg-city-cut '  >
                <div className='my-5 flex flex-col'>
                    <a href="/" className='flex justify-center pt-10 mb-10'>
                        <img className="h-16 w-auto" src="/static/gt-icon-white.png"></img>
                    </a>
                    <div className='w-3/5 lg:w-full mx-auto lg:px-8 lg:font-semibold text-white opacity-75 text-center '>
                        <div className='text-base uppercase'>{ /*t(*/'making-ideas-happen'/*)*/} </div>
                        <div>{ /*t(*/'about-team'/*) */}</div>
                    </div>
                </div>
            </div>
            <div className='flex w-full flex-col '>
                <div className="flex mx-auto p-6 flex-1 ">
                    <div className="flex flex-col">
                        <div className="flex-1 flex items-center">
                            {props.children}
                        </div>
                    </div>
                </div>

                <div className="flex items-baseline mx-auto text-sm font-semibold flex-row py-6 ">
                    <div className="mr-10">
                        <span className="mr-1"> {newDate.getFullYear()}&copy;</span>
                        <a href="">NextJS App</a>
                    </div>
                </div>
            </div>
        </div>
    );

}
