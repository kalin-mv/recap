import React, { useMemo } from 'react';

export interface InputProps {
    label: string;
    className?: string;
    labelClass?: string;
    required?: boolean
    form?: any;
    field?: any;
}

export default function Input(props: InputProps) {
    const { className, label, labelClass,
        required, 
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    } = props;

    const colorLine = useMemo(() => touched[field.name] && errors[field.name] ? 'error' : '', [errors, touched]);
    const colorLabel = useMemo(() => touched[field.name] && errors[field.name] ? 'text-red-500' : 'text-gray-700', [errors, touched]);
    const errorText = useMemo(() => touched[field.name] && errors[field.name] ? errors[field.name] : '', [errors, touched]);

    return (
        <div className={`form-group flex-col ${className?className:''}`}>
            {label && (
                <div className='flex-row mr-10'>
                    <label className={`${labelClass} ${colorLabel}`}>
                        {label || '\u00A0'}
                    </label>
                    {required && <span className="text-red-500" >*</span>}
                </div>
            )}
            <div className={`form-control relative cursor-pointer ${colorLine}`}>
                <input 
                    {...field} {...props}
                    className='text-base py-2 px-5 pr-12'
                />
                <div className='form-text-error'>
                    {errorText}
                </div>
            </div>
        </div>
    );
}