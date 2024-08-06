'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputBlock from '../inputBlock/InputBlock'


import React from 'react';
import axios from 'axios';
import RegisterLink from '../registrationLink/RegisterLink';

import styles from './AdminRegistrationContainer.module.scss';
import { dmSerifDisplay400 } from '@/styles/fonts-project/fonts';

type InputsType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const AdminRegisterContainer = () => {
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
            const res = await axios.post('/api/auth/register/registerAdmin', {
                name,
                email,
                password,
            });

            if (res.status === 200) {
                console.log('Admin registration was successful')
                router.push(
                    '/login'
                )
            }
        } catch (error: any) {
            console.error('Failed admin registration request:', error);
        }
    };

    return (
        <div className={styles['admin-registeration-block']}>
            <div className={`${dmSerifDisplay400.className} ${styles['admin-registeration']}`}>
                <h1 className={styles['admin-registeration__title']}>Регистрация нового администратора:</h1>
                <form className={styles['admin-registeration__form']} onSubmit={handleSubmit(handleFormSubmit)}>
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
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
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
                    <div className={styles['form__btn-registeration-block']}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={styles['btn-registeration']}
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

export default AdminRegisterContainer;