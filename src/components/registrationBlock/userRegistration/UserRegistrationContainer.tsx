'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputBlock from '../inputBlock/InputBlock'


import React, { useState } from 'react';
import axios from 'axios';
import RegisterLink from '../registrationLink/RegisterLink';

import styles from './UserRegistrationContainer.module.scss';
import { dmSerifDisplay400 } from '@/styles/fonts-project/fonts';

type InputsType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const UserRegisterContainer = () => {
    const params = useSearchParams();
    const router = useRouter();

    let callbackUrl = params.get('callbackUrl') || '/';

    const { register, handleSubmit, getValues, formState: { isSubmitting } } = useForm<InputsType>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const handleFormSubmit: SubmitHandler<InputsType> = async (form) => {

        const { name, email, password } = form;

        try {
            const res = await axios.post('/api/auth/register/registerUser', {
                name,
                email,
                password,
            });

            if (res.status === 200) {
                console.log('User registration was successful')
                router.push(
                    '/login'
                )
            }

        } catch (error: any) {
            console.error('Failed user registration request:', error);
        }
    };

    return (
        <div className={styles['user-registration-block']}>
            <div className={`${dmSerifDisplay400.className} ${styles['user-registration']}`}>
                <h1 className={styles['user-registration__title']}>Регистрация нового пользователя:</h1>
                <form className={styles['user-registration__form']} onSubmit={handleSubmit(handleFormSubmit)}>
                    <InputBlock
                        label="Имя"
                        id="name"
                        placeholder="Имя..."
                        register={register('name')}
                    />
                    <InputBlock
                        label="Электронная почта"
                        id="email"
                        placeholder="Электронная почта..."
                        register={register('email', {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email is invalid',
                            },
                        })}
                    />
                    <InputBlock
                        label="Пароль"
                        id="password"
                        placeholder="Пароль..."
                        register={register('password')}
                    />
                    <InputBlock
                        label="Подтвердите пароль"
                        id="confirmPassword"
                        placeholder="Повторите пароль..."
                        register={register('confirmPassword', {
                            validate: (value) => {
                                const { password } = getValues();
                                return password === value || 'Passwords should match!';
                            },
                        })}
                    />
                    <div className={styles['form__btn-registration-block']}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={styles['btn-registration']}
                        >
                            Регистрация
                        </button>
                    </div>
                </form>
                <div className={styles['link-login-block']}>
                    <span className={styles['span-login']}>Есть аккаунт?</span>
                    <RegisterLink text={'Войти в аккаунт'} href={`/login?callbackUrl=${callbackUrl}`} />
                </div>
                <div className={styles['link-home-block']}>
                    <RegisterLink text={'На главную'} href={'/'} />
                </div>
            </div>
        </div>
    );
};

export default UserRegisterContainer;