'use client';

import { useState } from 'react';
import { HidePasswordIcon, ShowPasswordIcon } from './PasswordIcons';

interface Props {
  formik?: any;
  name: string;
  className?: string;
  useFormik?: boolean;
  showError?: boolean;
  error?: string;
  blurFunction?: () => void;
}

function OutlinedInput({
  formik,
  name,
  className = '',
  useFormik = true,
  showError = false,
  error,
  blurFunction,
  ...rest
}: Props & React.HTMLProps<HTMLInputElement>) {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordReveal = () => {
    setPasswordShown(!passwordShown);
  };

  // Floating label needs a placeholder to work
  rest.placeholder = rest.placeholder || '';
  return (
    <div className={'floatingInputContainer ' + className}>
      {useFormik ? (
        <>
          <div className='relative'>
            <input
              {...rest}
              id={name}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                blurFunction?.();
              }}
              type={passwordShown ? 'text' : rest.type}
              className={
                formik.touched[name] && formik.errors[name] ? 'inputError peer' : 'peer'
              }
            />
            {rest.label && (
              <label
                htmlFor={name}
                className={`${
                  formik.touched[name] && formik.errors[name]
                    ? 'errorText absolute duration-300 bg-white transform -translate-y-4 scale-75 top-1 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                    : 'absolute duration-300 transform bg-white -translate-y-4 scale-75 top-1 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-[#64748B]'
                }`}
              >
                {rest.label}

                {rest.required && <span>*</span>}
              </label>
            )}
            {rest.type === 'password' && (
              <div
                className='cursor-pointer flex items-center'
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 12,
                }}
                onClick={togglePasswordReveal}
              >
                {passwordShown ? <HidePasswordIcon /> : <ShowPasswordIcon />}
              </div>
            )}
          </div>

          {formik.touched[name] && formik.errors[name] && (
            <div className='error mt-[7px]'>{formik.errors[name]}</div>
          )}
        </>
      ) : (
        <>
          <div className='relative'>
            <input
              {...rest}
              id={name}
              type={passwordShown ? 'text' : rest.type}
              className={showError ? 'inputError peer' : 'peer'}
            />
            {rest.label && (
              <label
                htmlFor={name}
                className={`${
                  showError
                    ? 'errorText absolute duration-300 bg-white transform -translate-y-4 scale-75 top-1 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                    : 'absolute duration-300 transform bg-white -translate-y-4 scale-75 top-1 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
                }`}
              >
                {rest.label}
              </label>
            )}
            {rest.type === 'password' && (
              <div
                className='cursor-pointer flex items-center'
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 12,
                }}
                onClick={togglePasswordReveal}
              >
                {passwordShown ? <HidePasswordIcon /> : <ShowPasswordIcon />}
              </div>
            )}
          </div>

          {showError && <div className='error mt-[7px]'>{error}</div>}
        </>
      )}
    </div>
  );
}

export default OutlinedInput;
